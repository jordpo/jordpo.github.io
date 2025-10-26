import { z } from 'zod';

const SITE_API = 'https://turnstonetechsoftware.com/api';

export const getProjectsSchema = z.object({
  category: z
    .enum(['featured', 'openSource', 'all'])
    .optional()
    .default('all')
    .describe('Filter by project category: featured (work projects), openSource, or all'),
  technology: z
    .string()
    .optional()
    .describe('Filter by technology (e.g., "Elixir", "TypeScript")'),
});

export async function getProjects(args: z.infer<typeof getProjectsSchema>) {
  try {
    const response = await fetch(`${SITE_API}/projects.json`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    let projects = await response.json();

    // Filter by category
    if (args.category && args.category !== 'all') {
      projects = projects.filter((p: any) => p.category === args.category);
    }

    // Filter by technology
    if (args.technology) {
      const techLower = args.technology.toLowerCase();
      projects = projects.filter((p: any) =>
        p.technologies.some((tech: string) => tech.toLowerCase().includes(techLower))
      );
    }

    // Format the response
    let result = `Jordan Morano's Projects`;

    if (args.category && args.category !== 'all') {
      result += ` (${args.category})`;
    }
    if (args.technology) {
      result += ` using ${args.technology}`;
    }

    result += `\n\nTotal: ${projects.length} projects\n\n`;

    projects.forEach((project: any) => {
      result += `## ${project.name}\n\n`;
      result += `**Role**: ${project.role}\n`;
      result += `**Period**: ${project.period}\n`;
      result += `**Category**: ${project.category}\n`;
      result += `**Technologies**: ${project.technologies.join(', ')}\n`;
      result += `**Impact**: ${project.impact}\n`;

      if (project.url) {
        result += `**URL**: ${project.url}\n`;
      }

      if (project.stats) {
        result += `**Stats**: `;
        if (project.stats.stars) result += `${project.stats.stars} stars, `;
        if (project.stats.language) result += `${project.stats.language}`;
        result += `\n`;
      }

      // Extract first paragraph of description
      const descLines = project.description.split('\n');
      const firstPara = descLines.find((line: string) => line.trim().length > 0);
      if (firstPara) {
        result += `\n${firstPara.replace(/^#+\s*/, '')}\n`;
      }

      result += `\n---\n\n`;
    });

    if (projects.length === 0) {
      result += 'No projects match the specified criteria.\n';
    }

    return result;
  } catch (error) {
    return `Error fetching projects: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
