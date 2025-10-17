import { describe, it, expect } from 'vitest'
import { parseRecommendationIssue, parsePhotoUrl } from '../../src/utils/parseRecommendation'

describe('Edge Cases from Real Issue Bodies', () => {
  it('should parse the first real failing case with multiple skills', () => {
    const issueBody = `## Recommendation Submission

**From:** dd
**Position:** dd at dd
**Relationship:** dd
**GitHub:** @dd
**Skills Endorsed:** React, OpenAI/Anthropic APIs, Docker

### Testimonial

dd

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732081172.jpg)

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732081172.jpg

---

**Next Steps:** Jordan will review this recommendation and approve it by commenting \`/approve\` on this issue. Once approved, a pull request will be automatically created.`

    const result = parseRecommendationIssue(issueBody)

    expect(result.name).toBe('dd')
    expect(result.title).toBe('dd')
    expect(result.company).toBe('dd')
    expect(result.relationship).toBe('dd')
    expect(result.githubUsername).toBe('dd')
    expect(result.skills).toEqual(['React', 'OpenAI/Anthropic APIs', 'Docker'])
    expect(result.testimonial).toBe('dd')
    expect(result.photo).toBe('https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732081172.jpg')
    expect(result.photoFileName).toBe('recommendation-photo-1760732081172.jpg')
  })

  it('should parse the second real failing case', () => {
    const issueBody = `## Recommendation Submission

**From:** bb
**Position:** bb at bb
**Relationship:** bb
**GitHub:** @bb
**Skills Endorsed:** TypeScript, React, Performance Optimization

### Testimonial

aiodfjakjasd

### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732262374.jpg)

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732262374.jpg

---

**Next Steps:** Jordan will review this recommendation and approve it by commenting \`/approve\` on this issue. Once approved, a pull request will be automatically created.`

    const result = parseRecommendationIssue(issueBody)

    expect(result.name).toBe('bb')
    expect(result.title).toBe('bb')
    expect(result.company).toBe('bb')
    expect(result.relationship).toBe('bb')
    expect(result.githubUsername).toBe('bb')
    expect(result.skills).toEqual(['TypeScript', 'React', 'Performance Optimization'])
    expect(result.testimonial).toBe('aiodfjakjasd')
    expect(result.photo).toBe('https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760732262374.jpg')
    expect(result.photoFileName).toBe('recommendation-photo-1760732262374.jpg')
  })

  it('should handle skills with special characters and slashes', () => {
    const issueBody = `**From:** Test
**Position:** Dev at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:** OpenAI/Anthropic APIs, Node.js/Express, React/Vue

### Testimonial

Great!`

    const result = parseRecommendationIssue(issueBody)
    expect(result.skills).toEqual(['OpenAI/Anthropic APIs', 'Node.js/Express', 'React/Vue'])
  })

  it('should handle very long testimonials', () => {
    const issueBody = `**From:** Test
**Position:** Dev at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:** JavaScript

### Testimonial

This is a very long testimonial that spans multiple paragraphs.

It has various formatting and breaks.

The person is really great and deserves a long recommendation.

They've done amazing work on multiple projects including:
- Project A
- Project B
- Project C

I highly recommend them for any software engineering position.

### Profile Photo`

    const result = parseRecommendationIssue(issueBody)
    expect(result.testimonial).toContain('This is a very long testimonial')
    expect(result.testimonial).toContain('I highly recommend them')
  })

  it('should handle photo URL with query parameters', () => {
    const issueBody = `**From:** Test
**Position:** Dev at Company
**Relationship:** Peer
**GitHub:** @test
**Skills Endorsed:** JavaScript

### Testimonial

Great!

### Profile Photo

![photo.jpg](https://example.com/photo.jpg?v=123&size=large)

**Photo URL:** https://example.com/photo.jpg?v=123&size=large`

    const result = parseRecommendationIssue(issueBody)
    expect(result.photo).toBe('https://example.com/photo.jpg?v=123&size=large')
    expect(result.photoFileName).toBe('photo.jpg?v=123&size=large')
  })

  it('should handle different GitHub URL formats', () => {
    const urls = [
      'https://github.com/user/repo/releases/download/tag/photo.jpg',
      'https://uploads.github.com/path/to/photo.jpg',
      'https://github-releases.githubusercontent.com/path/photo.jpg',
      'https://user-images.githubusercontent.com/photo.jpg',
    ]

    urls.forEach(url => {
      const issueBody = `### Profile Photo

![photo.jpg](${url})

**Photo URL:** ${url}`

      const result = parsePhotoUrl(issueBody)
      expect(result).toBe(url)
    })
  })

  it('should handle markdown image without Photo URL line', () => {
    const issueBody = `### Profile Photo

![photo.jpg](https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg)`

    const result = parsePhotoUrl(issueBody)
    expect(result).toBe('https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg')
  })

  it('should handle Photo URL line without markdown image', () => {
    const issueBody = `### Profile Photo

**Photo URL:** https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg`

    const result = parsePhotoUrl(issueBody)
    expect(result).toBe('https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/photo.jpg')
  })

  it('should handle extra whitespace in fields', () => {
    const issueBody = `**From:**    John Doe
**Position:**   Developer   at    Company
**Relationship:**   Colleague
**GitHub:**   @johndoe
**Skills Endorsed:**   JavaScript  ,   TypeScript  ,  React

### Testimonial

Great developer!`

    const result = parseRecommendationIssue(issueBody)
    expect(result.name).toBe('John Doe')
    expect(result.title).toBe('Developer')
    expect(result.company).toBe('Company')
    expect(result.relationship).toBe('Colleague')
    expect(result.githubUsername).toBe('johndoe')
    expect(result.skills).toEqual(['JavaScript', 'TypeScript', 'React'])
  })

  it('should handle GitHub username without @ symbol', () => {
    const issueBody = `**From:** Test
**Position:** Dev at Company
**Relationship:** Peer
**GitHub:** testuser
**Skills Endorsed:** JavaScript

### Testimonial

Great!`

    const result = parseRecommendationIssue(issueBody)
    // Should still try to extract something, even if format is slightly off
    expect(result.githubUsername).toBeTruthy()
  })

  it('should handle missing company in position', () => {
    const issueBody = `**From:** Test
**Position:** Freelance Developer
**Relationship:** Client
**GitHub:** @test
**Skills Endorsed:** JavaScript

### Testimonial

Great!`

    const result = parseRecommendationIssue(issueBody)
    // When there's no " at " separator, the whole position becomes the title
    expect(result.title).toBeTruthy()
  })
})
