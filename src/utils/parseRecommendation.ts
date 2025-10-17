/**
 * Utility functions for parsing recommendation issue bodies
 * Extracted from GitHub Actions workflow for testability
 */

export interface ParsedRecommendation {
  name: string
  title: string
  company: string
  relationship: string
  githubUsername: string
  skills: string[]
  testimonial: string
  photo: string
  photoFileName: string
}

/**
 * Parse photo URL from issue body using multiple regex patterns
 */
export function parsePhotoUrl(issueBody: string): string | null {
  // Try multiple patterns to extract photo URL
  const patterns = [
    /\*\*Photo URL:\*\*\s+(https?:\/\/[^\s\)]+)/i,  // **Photo URL:** https://...
    /Photo URL:\s+(https?:\/\/[^\s\)]+)/i,           // Photo URL: https://...
    /!\[.*?\]\((https?:\/\/[^\)]+)\)/                // Extract from markdown image ![...](https://...)
  ]

  for (const pattern of patterns) {
    const match = issueBody.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return null
}

/**
 * Extract filename from photo URL
 */
export function extractPhotoFileName(photoUrl: string): string {
  const urlParts = photoUrl.split('/')
  return urlParts[urlParts.length - 1]
}

/**
 * Parse the full recommendation issue body
 */
export function parseRecommendationIssue(issueBody: string): ParsedRecommendation {
  // Extract name
  const nameMatch = issueBody.match(/\*\*From:\*\*\s+(.+)/i)
  const name = nameMatch ? nameMatch[1].trim() : ''

  // Extract position (title and company)
  const positionMatch = issueBody.match(/\*\*Position:\*\*\s+(.+?)\s+at\s+(.+)/i)
  let title = ''
  let company = ''
  if (positionMatch) {
    title = positionMatch[1].trim()
    company = positionMatch[2].trim()
  } else {
    // If no " at " separator, try to get the whole position as title
    const fallbackMatch = issueBody.match(/\*\*Position:\*\*\s+(.+)/i)
    if (fallbackMatch) {
      title = fallbackMatch[1].trim()
    }
  }

  // Extract relationship
  const relationshipMatch = issueBody.match(/\*\*Relationship:\*\*\s+(.+)/i)
  const relationship = relationshipMatch ? relationshipMatch[1].trim() : ''

  // Extract GitHub username (with or without @ symbol)
  let githubUsername = ''
  const githubMatchWithAt = issueBody.match(/\*\*GitHub:\*\*\s+@(.+)/i)
  if (githubMatchWithAt) {
    githubUsername = githubMatchWithAt[1].trim()
  } else {
    // Try without @ symbol
    const githubMatchWithoutAt = issueBody.match(/\*\*GitHub:\*\*\s+([^\s]+)/i)
    if (githubMatchWithoutAt) {
      githubUsername = githubMatchWithoutAt[1].trim()
    }
  }

  // Extract skills
  const skillsMatch = issueBody.match(/\*\*Skills Endorsed:\*\*\s*(.*)$/im)
  const skillsStr = skillsMatch ? skillsMatch[1].trim() : ''
  const skills = skillsStr
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('###'))

  // Extract testimonial
  const testimonialMatch = issueBody.match(/### Testimonial\s+(.+?)(?=###|$)/s)
  const testimonial = testimonialMatch ? testimonialMatch[1].trim() : ''

  // Extract photo URL
  const photoUrl = parsePhotoUrl(issueBody)
  const photo = photoUrl || ''
  const photoFileName = photoUrl ? extractPhotoFileName(photoUrl) : ''

  return {
    name,
    title,
    company,
    relationship,
    githubUsername,
    skills,
    testimonial,
    photo,
    photoFileName,
  }
}
