import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');

  // Sort by order and format for API
  const formattedProjects = projects
    .sort((a, b) => a.data.order - b.data.order)
    .map((project) => ({
      name: project.data.name,
      role: project.data.role,
      technologies: project.data.technologies,
      impact: project.data.impact,
      period: project.data.period,
      category: project.data.category,
      url: project.data.url,
      stats: project.data.stats,
      description: project.body,
    }));

  return new Response(JSON.stringify(formattedProjects, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
