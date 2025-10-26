# Netlify Deployment Guide - Monorepo

Complete guide for deploying the AI-first portfolio monorepo to Netlify.

## Quick Start

**If Netlify is already configured:** Just push to main.

```bash
git push origin main
# Netlify auto-deploys in ~2 minutes
```

---

## Why Netlify?

Perfect for this AI-first portfolio:

✅ **Free hosting** - 100GB bandwidth, 300 build minutes/month
✅ **Automatic deployments** - Push to GitHub → Live site
✅ **Monorepo support** - `base` directory configuration
✅ **Static site generation** - Perfect for Astro
✅ **Custom domains** - Free SSL with Let's Encrypt
✅ **Build previews** - Test PRs before merging
✅ **Edge CDN** - Fast global delivery
✅ **No serverless functions needed** - Static APIs via Astro

---

## Initial Setup

### Step 1: Sign Up for Netlify

1. Go to https://app.netlify.com
2. Click "Sign up"
3. Choose "Sign up with GitHub" (recommended)
4. Authorize Netlify to access your GitHub account

### Step 2: Import Repository

1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select your repository: `jordpo/jordpo.github.io`
4. Click "Deploy"

### Step 3: Configure Build Settings

Netlify should auto-detect settings from `netlify.toml`, but verify:

```
Base directory: packages/site
Build command: npm run build
Publish directory: dist
```

**Important:** The base directory must be `packages/site` for monorepo support.

### Step 4: Set Environment Variables

Go to "Site Configuration" → "Environment Variables":

```
NODE_VERSION=20
```

That's it! No other environment variables needed.

### Step 5: Deploy

Click "Deploy site" and wait ~2 minutes.

Your site will be live at: `https://[random-name].netlify.app`

---

## Custom Domain Setup

To use `turnstonetechsoftware.com`:

### Step 1: Add Domain in Netlify

1. Go to "Domain management" → "Custom domains"
2. Click "Add custom domain"
3. Enter: `turnstonetechsoftware.com`
4. Click "Verify"

### Step 2: Configure DNS

**Option A: Use Netlify DNS (Recommended)**

1. Transfer DNS management to Netlify
2. Netlify automatically configures records
3. Free SSL certificate auto-provisioned

**Option B: Use External DNS**

Point your domain's DNS records to Netlify:

```
# Apex domain
A record: @ → 75.2.60.5

# www subdomain
CNAME: www → [your-site].netlify.app
```

### Step 3: Enable HTTPS

1. Go to "Domain management" → "HTTPS"
2. Click "Verify DNS configuration"
3. Wait for SSL certificate provisioning (5-10 minutes)
4. Enable "Force HTTPS"

**Note:** SSL is automatic and free via Let's Encrypt.

---

## Monorepo Configuration

The `netlify.toml` in the repository root configures monorepo deployment:

```toml
[build]
  base = "packages/site"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

**Key points:**

- `base = "packages/site"` - Netlify works from this directory
- Build command runs in workspace root but operates on site package
- All paths in `publish` are relative to `base`
- Environment variables apply to build process

---

## Build Process

When you push to main, Netlify:

1. **Clones repository** from GitHub
2. **Installs dependencies** via `npm install` (workspace-aware)
3. **Changes to base** directory (`packages/site`)
4. **Runs build** command (`npm run build`)
5. **Publishes** `dist` directory to CDN
6. **Purges cache** for instant updates

**Build time:** ~60-90 seconds
**Deployment time:** ~2 minutes total

---

## Troubleshooting

### Build Fails: "Command not found"

**Cause:** Node version mismatch

**Fix:**
1. Go to "Site Configuration" → "Environment Variables"
2. Add `NODE_VERSION=20`
3. Trigger redeploy

### Build Fails: "Cannot find package"

**Cause:** Monorepo not configured correctly

**Fix:**
1. Check `netlify.toml` has `base = "packages/site"`
2. Ensure `packages/site/package.json` exists
3. Verify workspace configuration in root `package.json`

### CSS Not Loading

**Cause:** Tailwind content paths incorrect

**Fix:**
1. Check `packages/site/tailwind.config.mjs`
2. Ensure paths are relative to site package

### API Endpoints Return 404

**Cause:** Redirect configuration wrong

**Fix:**
1. Check `netlify.toml` has `force = false` on SPA fallback
2. Verify API routes exist in `packages/site/src/pages/api/`

---

## Manual Deployment

Deploy via Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build locally
npm run build

# Deploy to production
netlify deploy --prod
```

---

## Rollback

If a deployment breaks the site:

1. Go to "Deploys"
2. Find the last working deployment
3. Click "..." → "Publish deploy"
4. Site reverts instantly

---

## Summary

**Deployment is automatic:**
1. Push to `main` branch
2. Netlify detects changes
3. Builds from `packages/site`
4. Deploys to turnstonetechsoftware.com
5. Live in ~2 minutes

**Cost: $0/month**

**Questions?** Check the [main README](./README.md) or [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.
