import { describe, it, expect } from 'vitest'
import {
  parsePhotoUrl,
  extractPhotoFileName,
  parseRecommendationIssue,
} from '../../src/utils/parseRecommendation'

describe('parsePhotoUrl', () => {
  it('should parse photo URL from **Photo URL:** format', () => {
    const issueBody = `
## Recommendation Submission

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe(
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    )
  })

  it('should parse photo URL from Photo URL: format (without bold)', () => {
    const issueBody = `
## Recommendation Submission

Photo URL: https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe(
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    )
  })

  it('should parse photo URL from markdown image syntax', () => {
    const issueBody = `
## Recommendation Submission

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg)
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe(
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    )
  })

  it('should handle both markdown image and Photo URL line', () => {
    const issueBody = `
## Recommendation Submission

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg)

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe(
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    )
  })

  it('should return null when no photo URL is found', () => {
    const issueBody = `
## Recommendation Submission

**From:** John Doe
**Position:** Senior Engineer at Tech Corp
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBeNull()
  })

  it('should handle GitHub CDN URLs', () => {
    const issueBody = `
![photo.jpg](https://uploads.github.com/some-path/photo.jpg)
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe('https://uploads.github.com/some-path/photo.jpg')
  })

  it('should handle http URLs and upgrade them', () => {
    const issueBody = `
**Photo URL:** http://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg
    `
    const result = parsePhotoUrl(issueBody)
    expect(result).toBe(
      'http://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg'
    )
  })
})

describe('extractPhotoFileName', () => {
  it('should extract filename from GitHub Release URL', () => {
    const url =
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    const result = extractPhotoFileName(url)
    expect(result).toBe('recommendation-photo-1760731084613.jpg')
  })

  it('should extract filename from simple URL', () => {
    const url = 'https://example.com/images/photo.jpg'
    const result = extractPhotoFileName(url)
    expect(result).toBe('photo.jpg')
  })

  it('should handle URLs with query parameters', () => {
    const url = 'https://example.com/photo.jpg?v=123'
    const result = extractPhotoFileName(url)
    expect(result).toBe('photo.jpg?v=123')
  })
})

describe('parseRecommendationIssue', () => {
  it('should parse complete recommendation issue body', () => {
    const issueBody = `## Recommendation Submission

**From:** John Doe
**Position:** Senior Engineer at Tech Corp
**Relationship:** Colleague
**GitHub:** @johndoe
**Skills Endorsed:** TypeScript, Vue.js, Node.js

### Testimonial

John is an exceptional engineer with deep expertise in full-stack development.

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg)

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg

---

**Next Steps:** Jordan will review this recommendation and approve it by commenting \`/approve\` on this issue.`

    const result = parseRecommendationIssue(issueBody)

    expect(result).toEqual({
      name: 'John Doe',
      title: 'Senior Engineer',
      company: 'Tech Corp',
      relationship: 'Colleague',
      githubUsername: 'johndoe',
      skills: ['TypeScript', 'Vue.js', 'Node.js'],
      testimonial:
        'John is an exceptional engineer with deep expertise in full-stack development.',
      photo:
        'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg',
      photoFileName: 'recommendation-photo-1760731084613.jpg',
    })
  })

  it('should parse the actual failing issue body from the user', () => {
    const issueBody = `## Recommendation Submission

**From:** dd
**Position:** dd at dd
**Relationship:** dd
**GitHub:** @dd
**Skills Endorsed:** TypeScript

### Testimonial

dd

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg)

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg

---

**Next Steps:** Jordan will review this recommendation and approve it by commenting \`/approve\` on this issue. Once approved, a pull request will be automatically created.`

    const result = parseRecommendationIssue(issueBody)

    expect(result.name).toBe('dd')
    expect(result.title).toBe('dd')
    expect(result.company).toBe('dd')
    expect(result.relationship).toBe('dd')
    expect(result.githubUsername).toBe('dd')
    expect(result.skills).toEqual(['TypeScript'])
    expect(result.testimonial).toBe('dd')

    // This is the critical assertion that was failing
    expect(result.photo).toBe(
      'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg'
    )
    expect(result.photoFileName).toBe('recommendation-photo-1760731084613.jpg')
  })

  it('should handle missing photo', () => {
    const issueBody = `## Recommendation Submission

**From:** Jane Smith
**Position:** Product Manager at StartupCo
**Relationship:** Manager
**GitHub:** @janesmith
**Skills Endorsed:** Leadership, Product Strategy

### Testimonial

Great product leader with clear vision.`

    const result = parseRecommendationIssue(issueBody)

    expect(result.name).toBe('Jane Smith')
    expect(result.photo).toBe('')
    expect(result.photoFileName).toBe('')
  })

  it('should handle single skill', () => {
    const issueBody = `**From:** Test User
**Position:** Developer at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:** JavaScript

### Testimonial

Good developer.`

    const result = parseRecommendationIssue(issueBody)
    expect(result.skills).toEqual(['JavaScript'])
  })

  it('should handle empty skills', () => {
    const issueBody = `**From:** Test User
**Position:** Developer at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:**

### Testimonial

Good developer.`

    const result = parseRecommendationIssue(issueBody)
    expect(result.skills).toEqual([])
  })

  it('should handle multiline testimonial', () => {
    const issueBody = `**From:** Test User
**Position:** Developer at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:** JavaScript

### Testimonial

This is a longer testimonial
that spans multiple lines
and has various formatting.

It includes paragraphs.

### Profile Photo`

    const result = parseRecommendationIssue(issueBody)
    expect(result.testimonial).toContain('This is a longer testimonial')
    expect(result.testimonial).toContain('that spans multiple lines')
    expect(result.testimonial).toContain('It includes paragraphs.')
  })
})
