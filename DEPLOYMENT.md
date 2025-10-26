# Deployment Guide

Complete deployment instructions for the AI-first portfolio monorepo.

## Overview

This monorepo deploys to two platforms:

- **Static Site** → Netlify (turnstonetechsoftware.com)
- **MCP Server** → Fly.io (optional)

Both are configured to use free tiers. **Total cost: $0/month**

---

## Static Site Deployment (Netlify)

### Automatic Deployment

The site auto-deploys to Netlify when you push to the `main` branch.

**How it works:**
1. Push changes to `main` branch
2. Netlify detects changes and starts build
3. Runs `npm run build` from `packages/site` directory
4. Publishes `packages/site/dist` to turnstonetechsoftware.com
5. Site is live in ~2 minutes

### Initial Netlify Setup

If this is your first time deploying:

1. **Sign up for Netlify**
   - Go to https://app.netlify.com
   - Sign up with GitHub (free account)

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select `jordpo/jordpo.github.io`

3. **Configure Build Settings**

   Netlify should auto-detect settings from `netlify.toml`, but verify:

   ```
   Base directory: packages/site
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy Site**
   - Click "Deploy site"
   - Wait for build to complete
   - Site will be live at a random Netlify subdomain

5. **Configure Custom Domain**

   To use turnstonetechsoftware.com:

   - Go to "Domain management" → "Custom domains"
   - Click "Add custom domain"
   - Enter: `turnstonetechsoftware.com`
   - Follow DNS configuration instructions
   - Add `www.turnstonetechsoftware.com` as alias

### Manual Deployment via CLI

Install Netlify CLI:
```bash
npm install -g netlify-cli
```

Deploy:
```bash
# Build locally
npm run build

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

### Environment Variables

Set in Netlify dashboard under "Site Configuration" → "Environment Variables":

```
NODE_VERSION=20
```

No other environment variables are needed for the static site.

### Build Configuration (netlify.toml)

The monorepo configuration is in the root `netlify.toml`:

```toml
[build]
  base = "packages/site"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

Key points:
- `base = "packages/site"` tells Netlify to work from the site package
- All paths are relative to the base directory
- Build runs from workspace root but operates on site package

### Troubleshooting Netlify

**Build fails with "command not found":**
- Check that `NODE_VERSION` is set to 20 in environment variables
- Verify `netlify.toml` has correct `base` directory

**404 errors on API routes:**
- Ensure `netlify.toml` has the SPA fallback redirect (`force = false`)
- API routes are static files, not serverless functions

**CSS not loading:**
- Check that `packages/site/tailwind.config.mjs` has correct content paths
- Verify build completed successfully in Netlify logs

**Images not loading:**
- Ensure images are in `packages/site/public/` directory
- Check paths are correct in Astro components

---

## MCP Server Deployment (Fly.io)

The MCP server is **optional**. Deploy it if you want AI agents to query your portfolio via MCP tools remotely.

The MCP server supports two modes:
- **Stdio** (local): For Claude Desktop on your machine
- **HTTP** (remote): For deployment to Fly.io with remote access

### Prerequisites

1. **Sign up for Fly.io**
   - Go to https://fly.io/app/sign-up
   - Free tier includes 3 shared-cpu-1x 256MB VMs
   - Credit card required (but free tier is truly free)

2. **Install Fly CLI**
   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh

   # Add to PATH (macOS/Linux)
   export PATH="$HOME/.fly/bin:$PATH"
   ```

3. **Login**
   ```bash
   fly auth login
   ```

### Initial Deployment

**IMPORTANT:** Run these commands from `packages/mcp-server/`, not from the monorepo root!

```bash
# Navigate to MCP server directory
cd packages/mcp-server

# Deploy (fly.toml already exists with correct config)
fly deploy
```

The deployment will:
1. Build Docker image from Dockerfile
2. Install dependencies and compile TypeScript
3. Push to Fly.io registry
4. Start VM with MCP server in HTTP mode
5. Assign URL: https://jordan-morano-mcp.fly.dev

**First deployment notes:**
- If `fly.toml` doesn't exist, run `fly launch` first
- App name: `jordan-morano-mcp` (or your preference)
- Region: Choose closest to your target audience (default: bos)
- The server will automatically run in HTTP mode via `MCP_TRANSPORT_MODE=http` env var

### Update Deployment

After making changes to the MCP server:

```bash
# Navigate to MCP server directory (from monorepo root)
cd packages/mcp-server

# Build and test locally first (optional but recommended)
npm run build

# Test in HTTP mode locally
MCP_TRANSPORT_MODE=http PORT=8080 node dist/index.js
# Visit http://localhost:8080/health to verify

# Deploy to Fly.io
fly deploy
```

### Test Deployment

After deploying, verify the server is working:

```bash
# Health check
curl https://jordan-morano-mcp.fly.dev/health
# Expected: {"status":"ok","server":"jordan-morano-portfolio-mcp"}

# Check logs
fly logs

# Check status
fly status
```

### Configuration

The `fly.toml` is pre-configured for HTTP mode and free tier:

```toml
app = "jordan-morano-mcp"
primary_region = "bos"

[env]
  PORT = "8080"
  NODE_ENV = "production"
  MCP_TRANSPORT_MODE = "http"  # ← Enables HTTP mode

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = false    # Always-on, no cold starts
  auto_start_machines = true
  min_machines_running = 1      # One instance always running

[[vm]]
  memory = "256mb"               # Fits in free tier
  cpu_kind = "shared"
  cpus = 1
```

Key points:
- `MCP_TRANSPORT_MODE = "http"` - Enables HTTP transport (vs stdio)
- `memory = "256mb"` - Fits in free tier
- `auto_stop_machines = false` - Always-on, no cold starts
- `min_machines_running = 1` - One instance always running

### Environment Variables (Fly.io)

Set secrets via CLI:

```bash
fly secrets set PORT=8080
```

For additional secrets:
```bash
fly secrets set API_KEY=your_key_here
```

View current secrets:
```bash
fly secrets list
```

### Monitoring

View logs:
```bash
fly logs
```

Check status:
```bash
fly status
```

View dashboard:
```bash
fly dashboard
```

### Cost Monitoring

Check usage:
```bash
fly apps list
fly dashboard
```

**Free tier limits:**
- 3 shared-cpu-1x 256MB VMs
- 160GB outbound data transfer/month
- This server uses 1 VM = **$0/month**

### Troubleshooting Fly.io

**Build fails:**
- Check Dockerfile syntax
- Verify all dependencies are in package.json
- Check build logs: `fly logs`

**Server won't start:**
- Verify PORT environment variable is set
- Check MCP server listens on correct port
- Review logs: `fly logs`

**Can't connect to server:**
- Check if app is deployed: `fly status`
- Verify URL: `fly info`
- Test locally first: `npm run build && node dist/index.js`

**Out of memory:**
- Increase memory in fly.toml (may exceed free tier)
- Optimize server code

---

## Post-Deployment

### Update .well-known/ai-instructions.json

After deploying the MCP server, update the AI instructions file:

```bash
# Edit packages/site/public/.well-known/ai-instructions.json
{
  "mcp": {
    "server": "https://jordan-morano-mcp.fly.dev",
    "status": "active",
    "description": "MCP server for advanced AI agent queries"
  }
}
```

Then redeploy the site:
```bash
git add .
git commit -m "Update MCP server URL"
git push origin main
```

### Test Deployments

**Test Static Site:**
```bash
# Visit site
open https://turnstonetechsoftware.com

# Test API endpoints
curl https://turnstonetechsoftware.com/api/experience.json
curl https://turnstonetechsoftware.com/api/projects.json
curl https://turnstonetechsoftware.com/api/skills.json
curl "https://turnstonetechsoftware.com/api/query.json?q=typescript"
```

**Test MCP Server:**
```bash
# Health check
curl https://jordan-morano-mcp.fly.dev/health
# Expected: {"status":"ok","server":"jordan-morano-portfolio-mcp"}

# Or with custom domain (after DNS setup)
curl https://mcp.turnstonetechsoftware.com/health
```

**Use with Claude Desktop:**

Local (stdio mode):
```json
{
  "mcpServers": {
    "jordan-portfolio-local": {
      "command": "/Users/yourusername/.asdf/shims/node",
      "args": ["/path/to/packages/mcp-server/dist/index.js"]
    }
  }
}
```

Remote (HTTP mode - after deployment):
```json
{
  "mcpServers": {
    "jordan-portfolio-remote": {
      "url": "https://mcp.turnstonetechsoftware.com/mcp"
    }
  }
}
```

### Monitoring

**Netlify:**
- Dashboard: https://app.netlify.com
- Build logs: Site → Deploys → Select deployment
- Analytics: Site → Analytics (if enabled)

**Fly.io:**
- Dashboard: https://fly.io/dashboard
- Logs: `fly logs`
- Metrics: `fly dashboard` → Your app

---

## Local Development

Always test locally before deploying:

```bash
# Static site
npm run dev
# Visit http://localhost:4321

# MCP server
cd packages/mcp-server
npm run dev
# Server runs on stdio (for Claude Desktop)

# Build everything
npm run build --workspaces

# Type check
npm run build --workspace=packages/site
```

---

## Rollback

### Netlify Rollback

1. Go to Site → Deploys
2. Find the working deployment
3. Click "Publish deploy"
4. Site reverts instantly

### Fly.io Rollback

```bash
# List previous releases
fly releases

# Rollback to previous version
fly releases rollback
```

---

## CI/CD

Currently using:
- **Netlify** - Automatic deploys from GitHub
- **Manual** - Fly.io deploys via CLI

To add GitHub Actions for Fly.io:

1. Create `.github/workflows/deploy-mcp.yml`
2. Add Fly.io API token to GitHub Secrets
3. Configure workflow to deploy on push to main

See Fly.io docs: https://fly.io/docs/app-guides/continuous-deployment-with-github-actions/

---

## DNS Configuration

If using custom domain:

**For turnstonetechsoftware.com:**

1. Point apex domain to Netlify:
   ```
   A record: @ → 75.2.60.5
   ```

2. Point www subdomain:
   ```
   CNAME: www → [your-site].netlify.app
   ```

3. Enable HTTPS in Netlify (automatic with Let's Encrypt)

**For MCP server subdomain (optional):**

1. Create subdomain in DNS:
   ```
   CNAME: mcp → jordan-morano-mcp.fly.dev
   ```

2. Add custom domain in Fly.io:
   ```bash
   fly certs create mcp.turnstonetechsoftware.com
   ```

---

## Cost Breakdown

| Service | Tier | Cost | Usage |
|---------|------|------|-------|
| **Netlify** | Free | $0 | Static site hosting |
| **Fly.io** | Free | $0 | 1 VM (256MB) |
| **Domain** | Variable | ~$12/year | turnstonetechsoftware.com |
| **Total/month** | | **$0** | |

**Limits:**
- Netlify: 100GB bandwidth, 300 build minutes/month
- Fly.io: 3 VMs, 160GB transfer/month

Both are well within limits for a personal portfolio.

---

## Questions?

- **Netlify docs:** https://docs.netlify.com
- **Fly.io docs:** https://fly.io/docs
- **Astro docs:** https://docs.astro.build
- **MCP docs:** https://modelcontextprotocol.io
