/**
 * Submits a recommendation by triggering the GitHub Actions workflow
 *
 * Note: This requires a GitHub Personal Access Token with 'workflow' scope
 * to be stored in the environment or passed by the user.
 *
 * For production use, you'll need to:
 * 1. Create a GitHub Personal Access Token with 'workflow' scope
 * 2. Either:
 *    - Store it as a GitHub secret and create a serverless function to proxy requests
 *    - Use a service like Netlify Functions or Vercel Edge Functions
 *    - Or provide instructions for users to use the GitHub UI directly
 */

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

export async function submitRecommendation(data: RecommendationData): Promise<void> {
  // GitHub API endpoint for triggering workflow_dispatch
  // const GITHUB_API_URL = 'https://api.github.com/repos/jordpo/jordpo.github.io/actions/workflows/create-recommendation-pr.yml/dispatches'

  // For now, we'll throw an error with instructions
  // You'll need to implement the actual submission logic based on your preferred method
  throw new Error(`
    To submit this recommendation, please follow these steps:

    1. Go to: https://github.com/jordpo/jordpo.github.io/actions/workflows/create-recommendation-pr.yml
    2. Click "Run workflow"
    3. Fill in the form with the following information:
       - Name: ${data.name}
       ${data.title ? `- Title: ${data.title}` : ''}
       ${data.company ? `- Company: ${data.company}` : ''}
       ${data.relationship ? `- Relationship: ${data.relationship}` : ''}
       ${data.githubUsername ? `- GitHub Username: ${data.githubUsername}` : ''}
       ${data.skillRecommendations?.length ? `- Skills: ${data.skillRecommendations.join(', ')}` : ''}
       - Testimonial: ${data.testimonial}
    4. Click "Run workflow"

    A pull request will be created automatically for Jordan to review!
  `)

  // Uncomment and implement this when you have a backend endpoint or token mechanism:
  /*
  const token = import.meta.env.VITE_GITHUB_TOKEN // This would need to be set up

  const response = await fetch(GITHUB_API_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main',
      inputs: {
        name: data.name,
        title: data.title || '',
        company: data.company || '',
        relationship: data.relationship || '',
        githubUsername: data.githubUsername || '',
        skillRecommendations: data.skillRecommendations?.join(', ') || '',
        testimonial: data.testimonial,
        photo: data.photo || '',
        photoFileName: data.photoFileName || ''
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Failed to submit recommendation: ${response.statusText}`)
  }
  */
}
