import { z } from 'zod';

const SITE_API = 'https://turnstonetechsoftware.com/api';

export const queryExperienceSchema = z.object({
  query: z.string().describe('Natural language query about work experience (e.g., "elixir projects", "leadership", "distributed systems")'),
});

export async function queryExperience(args: z.infer<typeof queryExperienceSchema>) {
  try {
    const response = await fetch(`${SITE_API}/query.json?q=${encodeURIComponent(args.query)}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json() as {
      totalResults: number;
      experiences: Array<{
        role: string;
        company: string;
        startDate: string;
        endDate: string;
        technologies: string[];
      }>;
      projects: Array<{
        name: string;
        category: string;
        role: string;
        technologies: string[];
      }>;
      skills: string[];
    };

    // Format the response for better readability
    let result = `Search results for "${args.query}":\n\n`;
    result += `Total matches: ${data.totalResults}\n\n`;

    if (data.experiences.length > 0) {
      result += `## Experience Matches (${data.experiences.length})\n\n`;
      data.experiences.forEach((exp) => {
        result += `**${exp.role}** at ${exp.company}\n`;
        result += `Period: ${exp.startDate} - ${exp.endDate}\n`;
        result += `Technologies: ${exp.technologies.join(', ')}\n\n`;
      });
    }

    if (data.projects.length > 0) {
      result += `## Project Matches (${data.projects.length})\n\n`;
      data.projects.forEach((proj) => {
        result += `**${proj.name}** (${proj.category})\n`;
        result += `Role: ${proj.role}\n`;
        result += `Technologies: ${proj.technologies.join(', ')}\n\n`;
      });
    }

    if (data.skills.length > 0) {
      result += `## Skill Matches (${data.skills.length})\n\n`;
      result += data.skills.join(', ') + '\n\n';
    }

    if (data.totalResults === 0) {
      result += 'No matches found. Try different search terms.\n';
    }

    return result;
  } catch (error) {
    return `Error querying experience: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
