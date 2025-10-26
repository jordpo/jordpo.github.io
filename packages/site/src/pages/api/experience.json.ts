import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const experiences = await getCollection('experience');

  // Sort by order and format for API
  const formattedExperiences = experiences
    .sort((a, b) => a.data.order - b.data.order)
    .map((exp) => ({
      role: exp.data.role,
      company: exp.data.company,
      location: exp.data.location,
      startDate: exp.data.startDate,
      endDate: exp.data.endDate,
      technologies: exp.data.technologies,
      achievements: exp.data.achievements,
      teamSize: exp.data.teamSize,
      description: exp.body,
    }));

  return new Response(JSON.stringify(formattedExperiences, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
