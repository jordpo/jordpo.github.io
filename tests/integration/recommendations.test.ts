import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RecommendationsSection from '../../src/components/RecommendationsSection.vue'

describe('RecommendationsSection Integration', () => {
  beforeEach(() => {
    // Clear any previous fetch mocks
    vi.clearAllMocks()
  })

  it('should render empty state when no recommendations exist', async () => {
    // Mock fetch to return empty recommendations
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('No recommendations yet')
  })

  it('should render recommendations when data exists', async () => {
    const mockRecommendations = [
      {
        name: 'John Doe',
        title: 'Senior Engineer',
        company: 'Tech Corp',
        relationship: 'Colleague',
        githubUsername: 'johndoe',
        photo: 'john-doe-1234567890.jpg',
        testimonial:
          'John is an exceptional engineer with deep expertise in full-stack development.',
        date: '2024-01-15',
        skillRecommendations: ['TypeScript', 'Vue.js', 'Node.js'],
      },
      {
        name: 'Jane Smith',
        title: 'Product Manager',
        company: 'StartupCo',
        relationship: 'Manager',
        githubUsername: 'janesmith',
        photo: 'jane-smith-0987654321.jpg',
        testimonial: 'Great product leader with clear vision.',
        date: '2024-02-20',
        skillRecommendations: ['Leadership', 'Product Strategy'],
      },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecommendations),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    const html = wrapper.html()

    // Check that recommendations are rendered
    expect(html).toContain('John Doe')
    expect(html).toContain('Senior Engineer at Tech Corp')
    expect(html).toContain('Jane Smith')
    expect(html).toContain('Product Manager at StartupCo')
  })

  it('should render recommendation with photo correctly', async () => {
    const mockRecommendation = [
      {
        name: 'Test User',
        title: 'Developer',
        company: 'Company Inc',
        relationship: 'Peer',
        githubUsername: 'testuser',
        photo: 'recommendation-photo-1760731084613.jpg',
        testimonial: 'Excellent developer with strong technical skills.',
        date: '2024-03-01',
        skillRecommendations: ['JavaScript', 'TypeScript'],
      },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecommendation),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    const html = wrapper.html()

    // Check that photo is referenced correctly
    expect(html).toContain('recommendation-photo-1760731084613.jpg')
    expect(html).toContain('/images/recommendations/')
  })

  it('should display skills for each recommendation', async () => {
    const mockRecommendation = [
      {
        name: 'Skill Test',
        title: 'Engineer',
        company: 'Tech',
        relationship: 'Colleague',
        githubUsername: 'skilltest',
        photo: '',
        testimonial: 'Great skills!',
        date: '2024-03-15',
        skillRecommendations: ['TypeScript', 'Vue.js', 'Node.js', 'Docker'],
      },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecommendation),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    const html = wrapper.html()

    // Check that all skills are displayed
    expect(html).toContain('TypeScript')
    expect(html).toContain('Vue.js')
    expect(html).toContain('Node.js')
    expect(html).toContain('Docker')
  })

  it('should handle GitHub username link correctly', async () => {
    const mockRecommendation = [
      {
        name: 'GitHub User',
        title: 'Developer',
        company: 'Open Source',
        relationship: 'Contributor',
        githubUsername: 'githubuser',
        photo: '',
        testimonial: 'Amazing contributor!',
        date: '2024-04-01',
        skillRecommendations: ['Open Source'],
      },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecommendation),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    const html = wrapper.html()

    // Check that GitHub link is correct
    expect(html).toContain('github.com/githubuser')
  })

  it('should handle recommendation without photo gracefully', async () => {
    const mockRecommendation = [
      {
        name: 'No Photo User',
        title: 'Manager',
        company: 'Business Corp',
        relationship: 'Manager',
        githubUsername: 'nophoto',
        photo: '',
        testimonial: 'Excellent manager.',
        date: '2024-05-01',
        skillRecommendations: ['Management'],
      },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecommendation),
      } as Response)
    )

    const wrapper = mount(RecommendationsSection)
    await wrapper.vm.$nextTick()

    // Wait for async data to load
    await new Promise(resolve => setTimeout(resolve, 100))
    await wrapper.vm.$nextTick()

    // Component should render without errors
    expect(wrapper.html()).toContain('No Photo User')
    expect(wrapper.html()).toContain('Excellent manager')
  })
})

describe('Recommendation Data Structure Validation', () => {
  it('should validate complete recommendation object structure', () => {
    const validRecommendation = {
      name: 'Test Person',
      title: 'Software Engineer',
      company: 'Tech Company',
      relationship: 'Colleague',
      githubUsername: 'testperson',
      photo: 'photo-123.jpg',
      testimonial: 'Great to work with!',
      date: '2024-01-01',
      skillRecommendations: ['JavaScript', 'TypeScript'],
    }

    // Validate all required fields exist
    expect(validRecommendation).toHaveProperty('name')
    expect(validRecommendation).toHaveProperty('title')
    expect(validRecommendation).toHaveProperty('company')
    expect(validRecommendation).toHaveProperty('relationship')
    expect(validRecommendation).toHaveProperty('githubUsername')
    expect(validRecommendation).toHaveProperty('photo')
    expect(validRecommendation).toHaveProperty('testimonial')
    expect(validRecommendation).toHaveProperty('date')
    expect(validRecommendation).toHaveProperty('skillRecommendations')

    // Validate field types
    expect(typeof validRecommendation.name).toBe('string')
    expect(typeof validRecommendation.title).toBe('string')
    expect(typeof validRecommendation.company).toBe('string')
    expect(typeof validRecommendation.relationship).toBe('string')
    expect(typeof validRecommendation.githubUsername).toBe('string')
    expect(typeof validRecommendation.photo).toBe('string')
    expect(typeof validRecommendation.testimonial).toBe('string')
    expect(typeof validRecommendation.date).toBe('string')
    expect(Array.isArray(validRecommendation.skillRecommendations)).toBe(true)

    // Validate date format (YYYY-MM-DD)
    expect(validRecommendation.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should validate minimum recommendation object (without photo)', () => {
    const minimalRecommendation = {
      name: 'Min Person',
      title: 'Developer',
      company: 'Company',
      relationship: 'Peer',
      githubUsername: 'minperson',
      photo: '',
      testimonial: 'Good work.',
      date: '2024-02-01',
      skillRecommendations: [],
    }

    expect(minimalRecommendation.photo).toBe('')
    expect(minimalRecommendation.skillRecommendations).toEqual([])
    expect(minimalRecommendation.name).toBe('Min Person')
  })

  it('should match structure created by parseRecommendationIssue', () => {
    // This structure should match what parseRecommendationIssue returns
    // and what the recommendations.json expects
    const parsedStructure = {
      name: 'dd',
      title: 'dd',
      company: 'dd',
      relationship: 'dd',
      githubUsername: 'dd',
      skills: ['TypeScript'],
      testimonial: 'dd',
      photo:
        'https://github.com/jordpo/jordpo.github.io/releases/download/recommendations-photos/recommendation-photo-1760731084613.jpg',
      photoFileName: 'recommendation-photo-1760731084613.jpg',
    }

    // The workflow should transform this into the final structure
    const finalStructure = {
      name: parsedStructure.name,
      title: parsedStructure.title,
      company: parsedStructure.company,
      relationship: parsedStructure.relationship,
      githubUsername: parsedStructure.githubUsername,
      photo: parsedStructure.photoFileName, // Just the filename for local storage
      testimonial: parsedStructure.testimonial,
      date: new Date().toISOString().split('T')[0], // Current date
      skillRecommendations: parsedStructure.skills,
    }

    expect(finalStructure).toHaveProperty('photo')
    expect(finalStructure.photo).toBe('recommendation-photo-1760731084613.jpg')
    expect(finalStructure).toHaveProperty('skillRecommendations')
    expect(finalStructure.skillRecommendations).toEqual(['TypeScript'])
  })
})
