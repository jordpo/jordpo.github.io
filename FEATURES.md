# AI-First Portfolio Features

## Overview

This portfolio is fundamentally different from traditional portfolio sites. It's designed for the AI era where visitors primarily interact through AI browsers, assistants, and agents.

## Core Philosophy

**Reject traditional web navigation. Embrace AI as the primary interface.**

Instead of forcing visitors to click through pages, this site:
- Provides a **minimal landing page** with clear instruction: "Ask your AI about me"
- Offers **6 optimized prompt buttons** for common queries
- Exposes **structured JSON APIs** for AI consumption
- Includes an **MCP server** for advanced AI agent queries
- Costs **$0/month** to operate

---

## Key Features

### 1. Minimal Landing Page

**Design:**
- Purple/blue gradient background
- 180px circular avatar
- Name: **Jordan Morano**
- Title: **Staff Software Engineer**
- Clear instruction for AI browser users
- No traditional navigation menu
- No footer clutter

**Purpose:**
- Get out of the way
- Let AI browsers handle the interaction
- Provide escape hatch for humans (prompt buttons)

**User Flow:**
1. Visitor arrives at site
2. Sees instruction: "Ask your AI about me"
3. Opens AI browser (⌘K in Arc, Perplexity, ChatGPT)
4. AI reads structured data and answers questions
5. OR: Clicks prompt button for pre-written query

### 2. Six Prompt Buttons

Each button copies an optimized prompt + URL to clipboard:

**⚡ Quick Overview**
- Brief summary of role, tech stack, uniqueness
- 3-4 sentence answer
- Ideal for first impression

**🔍 Deep Dive**
- Comprehensive career analysis
- Full work history breakdown
- Leadership experience
- Technical depth assessment
- Major projects and impact

**🎯 Job Match**
- Evaluates fit for specific role
- User pastes job description
- AI assesses:
  - Skills match (required vs preferred)
  - Experience level alignment
  - Domain expertise
  - Leadership fit
  - Potential gaps
  - Overall recommendation

**⚙️ Technical Review**
- Deep technical assessment
- Frontend expertise (React, TypeScript, build tools)
- Backend systems (Elixir/Phoenix, Ruby/Rails)
- Infrastructure (microservices, real-time, scale)
- Code quality practices
- Technical leadership capability

**📊 Compare Candidates**
- Side-by-side comparison
- User provides other candidate profiles
- AI compares on:
  - Technical skills
  - Leadership experience
  - Architecture expertise
  - Communication/collaboration
  - Career trajectory
  - Cultural fit indicators

**✏️ Just the Link**
- URL only
- No pre-written prompt
- For custom queries

**Implementation:**
- Client-side JavaScript
- Navigator Clipboard API
- Toast notifications
- Works in all modern browsers
- No server calls needed

### 3. Structured JSON APIs

Four endpoints optimized for AI consumption:

**`/api/experience.json`**
```json
[
  {
    "role": "Staff Software Engineer (Front End Lead)",
    "company": "PowerAuctions LLC",
    "location": "Vermont (remote)",
    "startDate": "2022-07",
    "endDate": "present",
    "technologies": ["TypeScript", "React", "Elixir", ...],
    "achievements": ["100% uptime on 10+ platforms...", ...],
    "teamSize": "4 developers",
    "description": "Full markdown description..."
  }
]
```

**`/api/projects.json`**
```json
[
  {
    "name": "Configurator Platform",
    "role": "Lead Developer",
    "technologies": ["Elixir", "Phoenix", "LiveView"],
    "impact": "Cut developer iteration time by 50%",
    "period": "2022-present",
    "category": "featured",
    "url": null,
    "stats": null,
    "description": "Full markdown description..."
  }
]
```

**`/api/skills.json`**
```json
{
  "languages": ["TypeScript", "JavaScript", "Elixir", ...],
  "frameworks": ["React", "Next.js", "Ember.js", ...],
  "tools": ["Git", "Docker", "AWS", ...],
  "areas": ["Frontend Architecture", "Distributed Systems", ...]
}
```

**`/api/query.json?q=typescript`**
```json
{
  "query": "typescript",
  "experiences": [...],
  "projects": [...],
  "skills": [...],
  "totalResults": 15
}
```

**Features:**
- Static generation (built at compile time)
- 1-hour cache headers
- No authentication required
- CORS enabled
- Pretty-printed JSON
- Markdown in description fields

### 4. MCP Server

Three tools for advanced AI agent queries:

**Tool: query_experience**
```typescript
{
  query: "elixir projects"
}
// Returns: Matching experience, projects, skills with context
```

**Tool: check_skills**
```typescript
{
  skills: ["TypeScript", "React", "Kubernetes"]
}
// Returns: ✅/❌ for each skill with work experience context
```

**Tool: get_projects**
```typescript
{
  category: "featured" | "openSource" | "all",
  technology?: "Elixir"
}
// Returns: Filtered projects with full descriptions
```

**Usage:**
- Claude Desktop integration
- Direct CLI usage (stdio)
- HTTP endpoint (via Fly.io)
- Future: Arc browser MCP support

**Benefits:**
- AI agents can query portfolio directly
- No web scraping needed
- Structured, validated responses
- Always-on availability

### 5. AI Discovery Metadata

**`/.well-known/ai-instructions.json`**

Provides AI browsers with:
- Available API endpoints
- MCP server location
- Instructions for querying
- Key strengths summary

**Standards compliance:**
- Follows emerging `.well-known` conventions
- Compatible with AI browsers
- Future-proof for new AI discovery protocols

### 6. Content Collections

**Type-safe content management:**

```typescript
// Experience collection
defineCollection({
  type: 'content',
  schema: z.object({
    role: z.string(),
    company: z.string(),
    technologies: z.array(z.string()),
    achievements: z.array(z.string()).optional(),
    // ... with Zod validation
  }),
})
```

**Benefits:**
- Compile-time type checking
- Schema validation
- Markdown support with frontmatter
- Easy to add/update content
- No database needed

**Content:**
- 5 work experiences (10+ years)
- 9 projects (4 featured, 5 open source)
- 40+ technologies across 4 categories
- All with detailed descriptions

### 7. Zero-Cost Architecture

**Free tier usage:**
- Netlify: Static site hosting (100GB/month)
- Fly.io: MCP server (1 VM, 256MB)
- GitHub: Code hosting and version control
- Total: **$0/month**

**Why this works:**
- Static generation (no server costs)
- Minimal JavaScript (fast loads)
- Efficient caching (reduced bandwidth)
- Small footprint (256MB VM sufficient)
- Low traffic (personal portfolio)

### 8. Developer Experience

**Local development:**
```bash
npm run dev
# Instant hot reload
# TypeScript type checking
# Content collection validation
```

**Content updates:**
```bash
# Add experience
echo "---
role: Senior Engineer
---
Description..." > packages/site/src/content/experience/new.md

# Rebuild
npm run build
# Content validated, APIs regenerated, types checked
```

**Deployment:**
```bash
git push origin main
# Netlify auto-deploys in ~2 minutes
```

---

## Technical Highlights

### Performance

- **First Contentful Paint:** < 1s
- **Total Bundle Size:** < 50KB (gzipped)
- **API Response Time:** < 50ms (static files)
- **Lighthouse Score:** 100/100 (Performance)

### SEO & Discovery

- Semantic HTML
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- AI discovery metadata
- Fast page loads

### Accessibility

- Semantic HTML structure
- Keyboard navigation
- Focus indicators
- Color contrast compliance
- Screen reader friendly
- ARIA labels where needed

### Security

- HTTPS enforced
- Security headers (Netlify)
- No user input (no XSS risk)
- No authentication (no credential theft)
- Static site (no server vulnerabilities)
- CORS configured properly

---

## What Makes This Different

### Traditional Portfolio

❌ Multiple pages with navigation
❌ About, Experience, Projects, Contact tabs
❌ Custom chat widget (complex, expensive)
❌ Form submissions (server costs)
❌ JavaScript-heavy SPA (slow loads)
❌ Manual content updates in components

### AI-First Portfolio

✅ Single landing page
✅ Instruction: "Ask your AI"
✅ No custom chat (use AI browsers)
✅ Structured JSON APIs
✅ Minimal JavaScript (fast)
✅ Content collections (easy updates)
✅ MCP server (advanced queries)
✅ $0/month operation

---

## Use Cases

### For Job Seekers

1. **Initial outreach:** Include URL in application
2. **Recruiter screening:** AI can quickly assess fit
3. **Technical interviews:** Reviewers can deep-dive
4. **Reference checks:** Complete work history available
5. **Portfolio reviews:** All projects documented

### For Recruiters

1. **Quick assessment:** Ask AI for overview
2. **Skills verification:** Check specific technologies
3. **Experience validation:** Detailed work history
4. **Comparison:** Side-by-side with other candidates
5. **Deep dive:** Technical review before interview

### For Hiring Managers

1. **Team fit:** Assess leadership style
2. **Technical depth:** Review architecture decisions
3. **Project impact:** Quantified achievements
4. **Communication:** Well-documented work
5. **Growth potential:** Career trajectory visible

### For Developers

1. **Open source:** Review contributions
2. **Technical decisions:** See real-world examples
3. **Career path:** Hedge fund → Staff Engineer journey
4. **Mentorship:** Leadership philosophy documented
5. **Learning:** Project architectures explained

---

## Future Enhancements

**Potential additions (all maintaining $0/month):**

- **Real-time updates:** GitHub Actions to trigger rebuilds
- **Analytics:** Privacy-respecting visitor tracking
- **Blog:** Content collection for articles
- **Talks:** Videos and slides from presentations
- **Recommendations:** Social proof from colleagues
- **Languages:** i18n support for multiple languages

**All optional. Current feature set is complete and intentional.**

---

## Design Decisions

### Why No Navigation?

Traditional navigation assumes humans will browse multiple pages. But:
- AI browsers read all content at once
- Humans prefer AI-mediated answers
- Navigation adds complexity
- Single page forces clarity

### Why Prompt Buttons?

Not everyone knows how to use AI browsers yet:
- Lowers barrier to entry
- Teaches AI interaction patterns
- Pre-optimized queries save time
- Clipboard makes it easy

### Why MCP Server?

AI agents need structured data:
- Direct tool calling (no web scraping)
- Validated responses
- Advanced queries beyond JSON
- Future-proof for agent ecosystem

### Why Astro?

Perfect for this use case:
- Static generation (fast, cheap)
- Content collections (type-safe)
- API routes (JSON endpoints)
- Minimal JavaScript (performance)
- Great DX (TypeScript, hot reload)

### Why Monorepo?

Site and server are related but separate:
- Shared types (future)
- Coordinated deploys
- Single repository
- Clear boundaries

---

## Success Metrics

### Traditional Metrics (Not Primary)

- Page views
- Time on site
- Bounce rate

### AI-Era Metrics (Primary)

- API endpoint hits
- MCP server queries
- Prompt button clicks
- AI browser interactions
- Job applications via AI

**Focus:** Help AI browsers help humans make decisions.

---

## Conclusion

This portfolio rejects traditional web paradigms in favor of AI-first design. It's minimal, fast, free, and effective. The content is comprehensive, the APIs are structured, and the MCP server enables advanced queries.

**Built for the AI era. No navigation required. Just ask your AI.**
