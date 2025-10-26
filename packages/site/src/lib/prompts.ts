export const SITE_URL = 'https://turnstonetechsoftware.com';

export interface PromptButton {
  id: string;
  icon: string;
  label: string;
  prompt: string;
  copyText: string;
}

export const promptButtons: PromptButton[] = [
  {
    id: 'quick-overview',
    icon: '⚡',
    label: 'Quick Overview',
    prompt: `Give me a quick overview of Jordan Morano's background. Focus on:
- Current role and key responsibilities
- Core technical skills and expertise
- What makes him unique as a candidate

Keep it brief and highlight the most impressive aspects.`,
    copyText: `${SITE_URL}

Give me a quick overview of Jordan Morano's background. Focus on:
- Current role and key responsibilities
- Core technical skills and expertise
- What makes him unique as a candidate

Keep it brief and highlight the most impressive aspects.`,
  },
  {
    id: 'deep-dive',
    icon: '🔍',
    label: 'Deep Dive',
    prompt: `Analyze Jordan Morano's professional profile comprehensively:

1. Career progression and trajectory
2. Technical depth across frontend, backend, and distributed systems
3. Leadership experience and team management
4. Major projects and their business impact
5. Open source contributions and community involvement
6. Strengths and unique qualifications

Provide a thorough analysis suitable for senior hiring managers.`,
    copyText: `${SITE_URL}

Analyze Jordan Morano's professional profile comprehensively:

1. Career progression and trajectory
2. Technical depth across frontend, backend, and distributed systems
3. Leadership experience and team management
4. Major projects and their business impact
5. Open source contributions and community involvement
6. Strengths and unique qualifications

Provide a thorough analysis suitable for senior hiring managers.`,
  },
  {
    id: 'job-match',
    icon: '🎯',
    label: 'Job Match',
    prompt: `Evaluate Jordan Morano's fit for this role:

[PASTE YOUR JOB DESCRIPTION HERE]

Analyze:
1. Skills match (required vs. preferred)
2. Experience level alignment
3. Domain expertise relevance
4. Leadership/team fit
5. Potential gaps and how he might address them
6. Overall recommendation (Strong fit / Good fit / Partial fit / Not a fit)

Be honest and specific in your assessment.`,
    copyText: `${SITE_URL}

Evaluate Jordan Morano's fit for this role:

[PASTE YOUR JOB DESCRIPTION HERE]

Analyze:
1. Skills match (required vs. preferred)
2. Experience level alignment
3. Domain expertise relevance
4. Leadership/team fit
5. Potential gaps and how he might address them
6. Overall recommendation (Strong fit / Good fit / Partial fit / Not a fit)

Be honest and specific in your assessment.`,
  },
  {
    id: 'technical-review',
    icon: '⚙️',
    label: 'Technical Review',
    prompt: `As a senior engineer would assess a peer, review Jordan Morano's technical background:

1. **Frontend expertise**: React, TypeScript, modern build tools, performance optimization
2. **Backend systems**: Elixir/Phoenix, Ruby/Rails, distributed systems architecture
3. **Infrastructure**: Microservices, real-time systems, scalability patterns
4. **Code quality**: Testing, CI/CD, code review practices
5. **Technical leadership**: Architecture decisions, mentoring, best practices

Rate technical depth, breadth, and leadership capability. What technical challenges is he best suited for?`,
    copyText: `${SITE_URL}

As a senior engineer would assess a peer, review Jordan Morano's technical background:

1. **Frontend expertise**: React, TypeScript, modern build tools, performance optimization
2. **Backend systems**: Elixir/Phoenix, Ruby/Rails, distributed systems architecture
3. **Infrastructure**: Microservices, real-time systems, scalability patterns
4. **Code quality**: Testing, CI/CD, code review practices
5. **Technical leadership**: Architecture decisions, mentoring, best practices

Rate technical depth, breadth, and leadership capability. What technical challenges is he best suited for?`,
  },
  {
    id: 'compare',
    icon: '📊',
    label: 'Compare Candidates',
    prompt: `Compare Jordan Morano against other candidates:

**Candidates to compare:**
[PASTE OTHER CANDIDATE PROFILES OR NAMES HERE]

**Comparison criteria:**
1. Technical skills and expertise
2. Leadership and team management
3. System architecture experience
4. Communication and collaboration
5. Career trajectory and growth
6. Cultural fit indicators

Provide a side-by-side comparison with specific strengths and trade-offs for each candidate.`,
    copyText: `${SITE_URL}

Compare Jordan Morano against other candidates:

**Candidates to compare:**
[PASTE OTHER CANDIDATE PROFILES OR NAMES HERE]

**Comparison criteria:**
1. Technical skills and expertise
2. Leadership and team management
3. System architecture experience
4. Communication and collaboration
5. Career trajectory and growth
6. Cultural fit indicators

Provide a side-by-side comparison with specific strengths and trade-offs for each candidate.`,
  },
  {
    id: 'just-link',
    icon: '✏️',
    label: 'Just the Link',
    prompt: '',
    copyText: SITE_URL,
  },
];
