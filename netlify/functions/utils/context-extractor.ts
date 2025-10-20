/**
 * Utilities for extracting relevant context from user queries
 */

import contextData from '../../../ai-chat-rag-system/context.json';
import { TOPIC_PATTERNS } from '../config/topics';

/**
 * Extract relevant context based on the user's message
 */
export function extractRelevantContext(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  const context: string[] = [];
  const matchedKeys = new Set<string>();

  // Check each topic pattern
  for (const pattern of TOPIC_PATTERNS) {
    if (pattern.keywords.test(lowerMessage)) {
      // Add context for each matched key
      for (const key of pattern.contextKeys) {
        if (matchedKeys.has(key)) continue; // Avoid duplicates
        matchedKeys.add(key);

        const contextValue = getContextValue(key);
        if (contextValue) {
          context.push(contextValue);
        }
      }
    }
  }

  // If no specific context matched, provide a general overview
  if (context.length === 0) {
    context.push(
      `Professional Summary: ${JSON.stringify(contextData.professional.experience_summary)}`,
      `Expertise: ${JSON.stringify(contextData.expertise_topics.slice(0, 5))}`
    );
  }

  return context.join('\n\n');
}

/**
 * Get context value by key from the context data
 */
function getContextValue(key: string): string | null {
  switch (key) {
    case 'current_role':
      return `Current Role: ${JSON.stringify(contextData.professional.current_role)}`;

    case 'experience_summary':
      return `Experience: ${JSON.stringify(contextData.professional.experience_summary)}`;

    case 'technical_expertise':
      return `Technical Expertise: ${JSON.stringify(contextData.professional.technical_expertise)}`;

    case 'opinions':
      return `Technical Opinions: ${JSON.stringify(contextData.professional.technical_expertise.opinions)}`;

    case 'key_projects':
      return `Key Projects: ${JSON.stringify(contextData.professional.key_projects)}`;

    case 'achievements':
      return `Achievements: ${JSON.stringify(contextData.professional.achievements)}`;

    case 'location':
      return `Location: ${contextData.personal.location}`;

    case 'interests':
      return `Interests: ${JSON.stringify(contextData.personal.interests)}`;

    case 'typical_weekend':
      return `Typical Weekend: ${JSON.stringify(contextData.personal.typical_weekend)}`;

    case 'favorite_places':
      return `Favorite Places: ${JSON.stringify(contextData.personal.favorite_places)}`;

    case 'previous_experience':
      return `Previous Experience: ${JSON.stringify(contextData.professional.previous_experience)}`;

    case 'background':
      return `Background: ${JSON.stringify(contextData.personal.background)}`;

    case 'education':
      return `Education: ${JSON.stringify(contextData.professional.education)}`;

    case 'career_advice':
      return `Career Advice: ${JSON.stringify(contextData.professional.career_advice)}`;

    case 'contact':
      return `Contact: ${JSON.stringify(contextData.contact)}`;

    case 'availability':
      return `Availability: ${JSON.stringify(contextData.professional.availability)}`;

    case 'leadership':
      return `Leadership: ${JSON.stringify(contextData.professional.experience_summary.leadership)}`;

    case 'work_style':
      return `Work Style: ${JSON.stringify(contextData.professional.work_style)}`;

    case 'ai_tooling':
      return `AI Tooling: ${JSON.stringify(contextData.professional.technical_expertise.ai_tooling)}`;

    case 'side_projects':
      return `Side Projects: ${JSON.stringify(contextData.professional.side_projects)}`;

    case 'parenting_balance':
      return `Parenting Balance: ${JSON.stringify(contextData.personal.parenting_balance)}`;

    default:
      return null;
  }
}
