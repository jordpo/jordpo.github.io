import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return new Response(
      JSON.stringify({
        error: 'Query parameter "q" is required',
        usage: '/api/query.json?q=typescript',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  // Get all content
  const experiences = await getCollection('experience');
  const projects = await getCollection('projects');
  const skills = await getEntry('skills', 'skills');

  // Search experiences
  const matchingExperiences = experiences
    .filter(
      (exp) =>
        exp.data.role.toLowerCase().includes(query) ||
        exp.data.company.toLowerCase().includes(query) ||
        exp.data.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
        exp.body.toLowerCase().includes(query)
    )
    .map((exp) => ({
      type: 'experience',
      role: exp.data.role,
      company: exp.data.company,
      technologies: exp.data.technologies,
      startDate: exp.data.startDate,
      endDate: exp.data.endDate,
    }));

  // Search projects
  const matchingProjects = projects
    .filter(
      (project) =>
        project.data.name.toLowerCase().includes(query) ||
        project.data.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
        project.body.toLowerCase().includes(query)
    )
    .map((project) => ({
      type: 'project',
      name: project.data.name,
      role: project.data.role,
      technologies: project.data.technologies,
      category: project.data.category,
    }));

  // Search skills
  const matchingSkills: string[] = [];
  if (skills) {
    const allSkills = [
      ...skills.data.languages,
      ...skills.data.frameworks,
      ...skills.data.tools,
      ...skills.data.areas,
    ];
    matchingSkills.push(...allSkills.filter((skill) => skill.toLowerCase().includes(query)));
  }

  const results = {
    query,
    experiences: matchingExperiences,
    projects: matchingProjects,
    skills: matchingSkills,
    totalResults: matchingExperiences.length + matchingProjects.length + matchingSkills.length,
  };

  return new Response(JSON.stringify(results, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
