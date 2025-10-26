import { z } from 'zod';

const SITE_API = 'https://turnstonetechsoftware.com/api';

export const checkSkillsSchema = z.object({
  skills: z.array(z.string()).describe('List of skills/technologies to check (e.g., ["TypeScript", "React", "Kubernetes"])'),
});

export async function checkSkills(args: z.infer<typeof checkSkillsSchema>) {
  try {
    const [skillsResponse, experienceResponse] = await Promise.all([
      fetch(`${SITE_API}/skills.json`),
      fetch(`${SITE_API}/experience.json`),
    ]);

    if (!skillsResponse.ok || !experienceResponse.ok) {
      throw new Error('Failed to fetch skills or experience data');
    }

    const skillsData = await skillsResponse.json();
    const experienceData = await experienceResponse.json();

    // Flatten all skills into a searchable list
    const allSkills = [
      ...skillsData.languages,
      ...skillsData.frameworks,
      ...skillsData.tools,
      ...skillsData.areas,
    ].map((s: string) => s.toLowerCase());

    // Check each requested skill
    let result = `Skill Assessment for Jordan Morano:\n\n`;

    args.skills.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      const hasSkill = allSkills.some((s) => s.includes(skillLower) || skillLower.includes(s));

      result += `**${skill}**: `;

      if (hasSkill) {
        result += `✅ YES\n`;

        // Find relevant experience
        const relevantExperience = experienceData.filter((exp: any) =>
          exp.technologies.some((tech: string) => tech.toLowerCase().includes(skillLower))
        );

        if (relevantExperience.length > 0) {
          result += `  Used at: `;
          result += relevantExperience.map((exp: any) => exp.company).join(', ');
          result += `\n`;
        }
      } else {
        result += `❌ Not listed\n`;
      }

      result += `\n`;
    });

    // Summary
    const matchedCount = args.skills.filter((skill) => {
      const skillLower = skill.toLowerCase();
      return allSkills.some((s) => s.includes(skillLower) || skillLower.includes(s));
    }).length;

    result += `\nSummary: ${matchedCount}/${args.skills.length} skills matched\n`;

    return result;
  } catch (error) {
    return `Error checking skills: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
