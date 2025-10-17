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

    // Add photo if provided
    if (data.photo && data.photoFileName) {
      issueBody += `\n\n### Profile Photo\n\nFilename: \`${data.photoFileName}\`\n\n<details>\n<summary>Base64 Photo Data (click to expand)</summary>\n\n\`\`\`\n${data.photo}\n\`\`\`\n\n</details>`
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
