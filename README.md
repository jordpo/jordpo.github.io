# Jordan Morano - AI-First Portfolio

A radically minimal, AI-first portfolio site with monorepo architecture. No traditional navigation. No custom chat widget. Just structured data APIs and prompt buttons optimized for AI browsers.

**Live Site:** [turnstonetechsoftware.com](https://turnstonetechsoftware.com)

## Philosophy

This portfolio is designed for the AI era. Instead of forcing visitors to navigate traditional web interfaces, it provides:

- **Minimal landing page** with one instruction: "Ask your AI about me"
- **6 prompt buttons** that copy optimized queries to clipboard
- **Structured JSON APIs** for AI consumption
- **MCP server** for advanced AI agent queries
- **Zero cost** ($0/month using free tiers)

## Architecture

```
jordpo.github.io/
├── packages/
│   ├── site/                    # Astro static site (Netlify)
│   │   ├── src/
│   │   │   ├── content/         # Markdown content collections
│   │   │   │   ├── experience/  # Work history (5 positions)
│   │   │   │   ├── projects/    # Portfolio (9 projects)
│   │   │   │   └── skills/      # Technical skills
│   │   │   ├── pages/
│   │   │   │   ├── index.astro  # Landing page
│   │   │   │   └── api/         # JSON endpoints
│   │   │   ├── layouts/         # Page layouts
│   │   │   └── lib/             # Prompts, utilities
│   │   ├── public/
│   │   │   ├── .well-known/     # AI discovery
│   │   │   ├── avatar.jpg
│   │   │   └── resume.pdf
│   │   └── package.json
│   │
│   └── mcp-server/              # MCP server (Fly.io)
│       ├── src/
│       │   ├── index.ts         # Server entry
│       │   └── tools/           # MCP tools
│       ├── Dockerfile
│       ├── fly.toml
│       └── package.json
│
├── package.json                 # Root workspace config
└── netlify.toml                # Monorepo deployment
```

## Tech Stack

**Static Site (packages/site/)**
- **Astro 4.16** - Static site generation
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Content Collections** - Structured content with Zod schemas

**MCP Server (packages/mcp-server/)**
- **@modelcontextprotocol/sdk** - Official MCP SDK
- **TypeScript** - Type safety
- **Zod** - Schema validation

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
# Install all workspace dependencies
npm install

# Start the static site (http://localhost:4321)
npm run dev

# Start the MCP server (stdio mode)
npm run mcp:dev

# Build the static site
npm run build

# Preview production build
npm run preview
```

### Working with Content

All content is managed through Astro content collections in `packages/site/src/content/`:

**Add new experience:**
```bash
# Create packages/site/src/content/experience/company-name.md
---
role: Senior Software Engineer
company: Company Name
location: Remote
startDate: "2023-01"
endDate: present
technologies: ["TypeScript", "React"]
order: 1
---

Your experience description in markdown...
```

**Add new project:**
```bash
# Create packages/site/src/content/projects/project-name.md
---
name: Project Name
role: Lead Developer
technologies: ["Elixir", "Phoenix"]
impact: "Reduced latency by 50%"
period: "2023-present"
category: featured
order: 1
---

Project description in markdown...
```

**Update skills:**
```bash
# Edit packages/site/src/content/skills/skills.json
{
  "languages": ["TypeScript", "JavaScript", ...],
  "frameworks": ["React", "Astro", ...],
  "tools": ["Git", "Docker", ...],
  "areas": ["Frontend Architecture", ...]
}
```

### Development Workflow

```bash
# Work on the site
cd packages/site
npm run dev

# Work on MCP server
cd packages/mcp-server
npm run dev

# Type check everything
npm run build --workspaces
```

## API Endpoints

The site exposes JSON APIs for AI consumption:

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/experience.json` | Complete work history | `curl https://turnstonetechsoftware.com/api/experience.json` |
| `/api/projects.json` | All portfolio projects | `curl https://turnstonetechsoftware.com/api/projects.json` |
| `/api/skills.json` | Technical skills | `curl https://turnstonetechsoftware.com/api/skills.json` |
| `/api/query.json?q=elixir` | Natural language search | `curl https://turnstonetechsoftware.com/api/query.json?q=typescript` |

All endpoints return JSON with 1-hour cache headers.

## MCP Server

The MCP server provides three tools for AI agents:

### Tools

**1. query_experience**
```typescript
// Search work experience with natural language
{
  query: "elixir projects" | "leadership" | "distributed systems"
}
```

**2. check_skills**
```typescript
// Verify specific skills
{
  skills: ["TypeScript", "React", "Kubernetes"]
}
```

**3. get_projects**
```typescript
// Retrieve portfolio projects
{
  category: "featured" | "openSource" | "all",
  technology?: "Elixir" // optional filter
}
```

### Using the MCP Server

**As a CLI tool (stdio):**
```bash
cd packages/mcp-server
npm run start
```

**In Claude Desktop:**
```json
{
  "mcpServers": {
    "jordan-morano-portfolio": {
      "command": "node",
      "args": ["/path/to/packages/mcp-server/dist/index.js"]
    }
  }
}
```

**Via Fly.io (once deployed):**
```bash
curl https://jordan-morano-mcp.fly.dev
```

## Deployment

### Static Site → Netlify

The site auto-deploys to Netlify on push to `main`.

**Manual deployment:**
```bash
# Build locally
npm run build

# Deploy via Netlify CLI
netlify deploy --prod
```

**Configuration:**
- Build command: `npm run build`
- Publish directory: `packages/site/dist`
- Node version: 20

The `netlify.toml` is configured for monorepo with `base = "packages/site"`.

### MCP Server → Fly.io

**Initial setup:**
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login

# Deploy from mcp-server directory
cd packages/mcp-server
fly deploy
```

**Configuration:**
- Dockerfile included
- fly.toml configured for 256MB, 1 CPU (free tier)
- Always-on, no cold starts

**Update deployment:**
```bash
cd packages/mcp-server
fly deploy
```

## Prompt Buttons

The landing page includes 6 prompt buttons that copy optimized queries:

1. **⚡ Quick Overview** - Brief summary of role, tech, uniqueness
2. **🔍 Deep Dive** - Comprehensive career analysis
3. **🎯 Job Match** - Evaluate fit for a specific role
4. **⚙️ Technical Review** - Deep technical assessment
5. **📊 Compare Candidates** - Side-by-side comparison
6. **✏️ Just the Link** - URL only for custom queries

Each button copies the URL + pre-written prompt optimized for AI browsers (Arc, Perplexity, ChatGPT).

## Project Structure

```
packages/site/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content collection schemas
│   │   ├── experience/*.md        # Work history
│   │   ├── projects/*.md          # Portfolio projects
│   │   └── skills/skills.json     # Technical skills
│   ├── layouts/
│   │   └── Layout.astro           # Base layout
│   ├── lib/
│   │   └── prompts.ts             # Prompt button definitions
│   ├── pages/
│   │   ├── index.astro            # Landing page
│   │   └── api/*.json.ts          # API endpoints
│   └── env.d.ts
├── public/
│   ├── .well-known/
│   │   └── ai-instructions.json   # AI discovery metadata
│   ├── avatar.jpg                 # Profile photo
│   └── resume.pdf                 # Resume PDF
└── astro.config.mjs               # Astro configuration

packages/mcp-server/
├── src/
│   ├── index.ts                   # MCP server entry
│   └── tools/
│       ├── query-experience.ts    # Experience search
│       ├── check-skills.ts        # Skills verification
│       └── get-projects.ts        # Project retrieval
├── Dockerfile                     # Docker build
├── fly.toml                       # Fly.io config
└── tsconfig.json                  # TypeScript config
```

## Content Collections

Content is managed with Astro's type-safe content collections:

**Experience Collection** (`packages/site/src/content/experience/`)
- 5 positions: PowerAuctions, Envoy, IcarusWorks, Agilion, Hedge Fund
- Frontmatter: role, company, dates, technologies, achievements, team size
- Body: Markdown description with projects and impact

**Projects Collection** (`packages/site/src/content/projects/`)
- 9 projects: 4 featured (work), 5 open source
- Frontmatter: name, role, technologies, impact, period, category
- Body: Markdown description with technical details

**Skills Collection** (`packages/site/src/content/skills/`)
- JSON format: languages, frameworks, tools, areas
- Used by API endpoints and MCP server

## Environment Variables

**Development:**
```bash
# No environment variables needed for local dev
npm run dev
```

**Production (Netlify):**
```bash
# Set in Netlify dashboard under Site Configuration > Environment Variables
NODE_VERSION=20
```

**Production (Fly.io):**
```bash
# Set via Fly CLI
fly secrets set PORT=8080
```

## Testing

```bash
# Type check
npm run build --workspace=packages/site

# Test MCP server locally
cd packages/mcp-server
npm run build
node dist/index.js

# Test API endpoints locally
npm run dev
curl http://localhost:4321/api/experience.json
```

## Cost

**Total: $0/month**

- **Netlify Free Tier:** 100GB bandwidth, 300 build minutes/month
- **Fly.io Free Tier:** 3 shared-cpu-1x 256MB VMs (using 1)

## Migration from Vue 3

This site was migrated from a Vue 3 SPA. Key changes:

- ❌ Removed: Vue components, Vite, Vitest, Netlify functions, custom chat widget
- ✅ Added: Astro, content collections, API routes, MCP server, prompt buttons
- 📦 Migrated: All content from `public/ai-profile.json` to content collections
- 🎨 Kept: Tailwind config, color scheme, domain (turnstonetechsoftware.com)

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [FEATURES.md](./FEATURES.md) - Feature overview and design philosophy
- [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) - Netlify-specific setup

## License

ISC

---

**Built for the AI era.** No navigation required. Just ask your AI.
