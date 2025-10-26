import { defineCollection, z } from 'astro:content';

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    technologies: z.array(z.string()),
    achievements: z.array(z.string()).optional(),
    teamSize: z.string().optional(),
    order: z.number(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    technologies: z.array(z.string()),
    impact: z.string(),
    period: z.string(),
    category: z.enum(['featured', 'openSource']),
    url: z.string().optional(),
    stats: z.object({
      stars: z.number().optional(),
      language: z.string().optional(),
    }).optional(),
    order: z.number(),
  }),
});

const skillsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    languages: z.array(z.string()),
    frameworks: z.array(z.string()),
    tools: z.array(z.string()),
    areas: z.array(z.string()),
  }),
});

export const collections = {
  experience: experienceCollection,
  projects: projectsCollection,
  skills: skillsCollection,
};
