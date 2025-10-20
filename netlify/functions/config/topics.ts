/**
 * Topic configuration for context extraction and validation
 */

export interface TopicPattern {
  keywords: RegExp;
  contextKeys: string[];
}

/**
 * Maps user query patterns to relevant context sections
 */
export const TOPIC_PATTERNS: TopicPattern[] = [
  {
    keywords: /\b(experience|role|job|work|powerauctions|current|position|team|responsibilities)\b/i,
    contextKeys: ['current_role', 'experience_summary']
  },
  {
    keywords: /\b(tech|technology|stack|languages?|frameworks?|tools?|skills?|typescript|react|elixir|vite)\b/i,
    contextKeys: ['technical_expertise', 'opinions']
  },
  {
    keywords: /\b(projects?|built|building|work|portfolio|configurator|snapshot)\b/i,
    contextKeys: ['key_projects', 'achievements']
  },
  {
    keywords: /\b(vermont|location|remote|where|live|based|burlington|hiking|weekend)\b/i,
    contextKeys: ['location', 'interests', 'typical_weekend', 'favorite_places']
  },
  {
    keywords: /\b(career|background|history|started|transition|previous|past|finance|bootcamp)\b/i,
    contextKeys: ['previous_experience', 'background', 'education', 'career_advice']
  },
  {
    keywords: /\b(contact|email|reach|hire|available|github|opportunity|opportunities|job|role|position|referral|consulting|advisory)\b/i,
    contextKeys: ['contact', 'availability']
  },
  {
    keywords: /\b(leadership|lead|team|mentor|manage|mentoring|code\s*review)\b/i,
    contextKeys: ['leadership', 'work_style', 'experience_summary']
  },
  {
    keywords: /\b(ai|artificial|intelligence|mcp|tooling|automation|augment)\b/i,
    contextKeys: ['ai_tooling', 'key_projects']
  },
  {
    keywords: /\b(advice|learn|tips|recommend|suggest|beginner|junior)\b/i,
    contextKeys: ['career_advice', 'work_style']
  },
  {
    keywords: /\b(gelato|morano|business|entrepreneurship|restaurant|paris|sister)\b/i,
    contextKeys: ['background']
  },
  {
    keywords: /\b(remote|wfh|work.*home|focus|productivity|routine|day)\b/i,
    contextKeys: ['work_style']
  },
  {
    keywords: /\b(parent|parenting|family|balance|kids?|children)\b/i,
    contextKeys: ['parenting_balance', 'interests']
  },
  {
    keywords: /\b(game|games|gaming|nintendo|zelda|mario)\b/i,
    contextKeys: ['interests']
  },
  {
    keywords: /\b(open\s*source|contribute|contributions?|side\s*project)\b/i,
    contextKeys: ['side_projects']
  }
];

/**
 * Patterns for inappropriate topics that should be blocked
 */
export const BLOCKED_PATTERNS = [
  /\b(proprietary|confidential|secret|internal)\s+(algorithm|code|system)/i,
  /\b(salary|compensation|pay|wage)\b/i,
  /client\s+(financial|data|information)/i,
  /\b(politics|political|election)\b/i,
];

/**
 * Default redirect message for inappropriate topics
 */
export const REDIRECT_MESSAGE =
  "I try to keep our conversations focused on my professional experience and technical expertise. Is there something specific about my work or background you'd like to know more about?";
