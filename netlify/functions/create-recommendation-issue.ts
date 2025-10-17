import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

interface RecommendationData {
  name: string
  title?: string
  company?: string
  relationship?: string
  githubUsername?: string
  skillRecommendations?: string[]
  testimonial: string
  photo?: string
  photoFileName?: string
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    // Parse request body
    const data: RecommendationData = JSON.parse(event.body || '{}')

    // Validate required fields
    if (!data.name || !data.testimonial) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name and testimonial are required' })
      }
    }

    // Get GitHub token from environment variables
    const githubToken = process.env.GITHUB_TOKEN
    if (!githubToken) {
      console.error('GITHUB_TOKEN environment variable not set')
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      }
    }

    // Build issue body
    let issueBody = `## Recommendation Submission

**From:** ${data.name}`

    if (data.title || data.company) {
      const position = [data.title, data.company].filter(Boolean).join(' at ')
      issueBody += `\n**Position:** ${position}`
    }

    if (data.relationship) {
      issueBody += `\n**Relationship:** ${data.relationship}`
    }

    if (data.githubUsername) {
      issueBody += `\n**GitHub:** @${data.githubUsername}`
    }

    if (data.skillRecommendations && data.skillRecommendations.length > 0) {
      issueBody += `\n**Skills Endorsed:** ${data.skillRecommendations.join(', ')}`
    }

    issueBody += `\n\n### Testimonial\n\n${data.testimonial}`

    // Upload photo to GitHub Releases if provided
    let photoUrl = ''
    if (data.photo && data.photoFileName) {
      console.log(`Uploading photo to GitHub Releases: ${data.photoFileName}`)

      try {
        // Convert base64 to buffer
        const base64Data = data.photo.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64Data, 'base64')

        // Create a unique filename with timestamp
        const timestamp = Date.now()
        const ext = data.photoFileName.split('.').pop() || 'jpg'
        const uploadFilename = `recommendation-photo-${timestamp}.${ext}`

        // Upload to GitHub Release
        // First, ensure the release exists (we'll use a "recommendations-photos" release)
        const releaseTag = 'recommendations-photos'
        let releaseId: number

        // Try to get existing release
        const getReleaseResponse = await fetch(
          `https://api.github.com/repos/jordpo/jordpo.github.io/releases/tags/${releaseTag}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `token ${githubToken}`,
              'User-Agent': 'Netlify-Function'
            }
          }
        )

        if (getReleaseResponse.ok) {
          const releaseData = await getReleaseResponse.json()
          releaseId = releaseData.id
        } else {
          // Create the release if it doesn't exist
          const createReleaseResponse = await fetch(
            'https://api.github.com/repos/jordpo/jordpo.github.io/releases',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${githubToken}`,
                'Content-Type': 'application/json',
                'User-Agent': 'Netlify-Function'
              },
              body: JSON.stringify({
                tag_name: releaseTag,
                name: 'Recommendation Photos',
                body: 'Storage for recommendation profile photos',
                draft: false,
                prerelease: false
              })
            }
          )

          if (!createReleaseResponse.ok) {
            throw new Error('Failed to create release for photo storage')
          }

          const newRelease = await createReleaseResponse.json()
          releaseId = newRelease.id
        }

        // Upload the asset
        const uploadResponse = await fetch(
          `https://uploads.github.com/repos/jordpo/jordpo.github.io/releases/${releaseId}/assets?name=${uploadFilename}`,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `token ${githubToken}`,
              'Content-Type': 'application/octet-stream',
              'User-Agent': 'Netlify-Function'
            },
            body: buffer
          }
        )

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          console.error('Failed to upload photo:', errorData)
          throw new Error('Failed to upload photo to GitHub')
        }

        const asset = await uploadResponse.json()
        photoUrl = asset.browser_download_url

        console.log(`Photo uploaded successfully: ${photoUrl}`)

        // Add photo reference to issue
        issueBody += `\n\n### Profile Photo\n\n![${data.photoFileName}](${photoUrl})\n\n**Photo URL:** ${photoUrl}`

      } catch (err) {
        console.error('Error uploading photo:', err)
        issueBody += `\n\n### Profile Photo\n\n⚠️ Photo upload failed: ${data.photoFileName}`
      }
    }

    issueBody += `\n\n---\n\n**Next Steps:** Jordan will review this recommendation and approve it by commenting \`/approve\` on this issue. Once approved, a pull request will be automatically created.`

    // Create GitHub issue
    const response = await fetch('https://api.github.com/repos/jordpo/jordpo.github.io/issues', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Netlify-Function'
      },
      body: JSON.stringify({
        title: `Recommendation from ${data.name}`,
        body: issueBody,
        labels: ['recommendation']
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('GitHub API error:', errorData)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({
          error: errorData.message || 'Failed to create GitHub issue'
        })
      }
    }

    const issueData = await response.json()

    // Return success with issue URL
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        issueUrl: issueData.html_url,
        issueNumber: issueData.number
      })
    }

  } catch (error) {
    console.error('Error creating issue:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : 'Internal server error'
      })
    }
  }
}

export { handler }
