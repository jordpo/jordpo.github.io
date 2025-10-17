# Netlify Deployment Guide

This guide will help you deploy your portfolio to Netlify with serverless functions support.

## Why Netlify?

✅ **Free hosting** for personal projects
✅ **Automatic deployments** from GitHub
✅ **Serverless functions** (for recommendations feature)
✅ **Custom domains** with free SSL
✅ **Build previews** for pull requests
✅ **Perfect for AI chat features** (future enhancement)

## Prerequisites

1. GitHub account (you have this)
2. Netlify account (free - sign up at https://netlify.com)
3. GitHub Personal Access Token with `repo` and `write:org` scopes

## Step 1: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: `Netlify Portfolio Functions`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:org` (Read and write org data - needed for issues)
5. Click "Generate token"
6. **IMPORTANT:** Copy the token immediately (you won't see it again!)

## Step 2: Connect GitHub to Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your repository: `jordpo/jordpo.github.io`

## Step 3: Configure Build Settings

Netlify should auto-detect the settings, but verify:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

Click "Deploy site"

## Step 4: Add Environment Variables

After the initial deploy:

1. Go to "Site configuration" → "Environment variables"
2. Click "Add a variable"
3. Add the following:

   **Key:** `GITHUB_TOKEN`
   **Value:** [Paste your GitHub Personal Access Token]
   **Scopes:** All scopes (Production, Deploy Previews, Branch deploys)

4. Click "Create variable"

## Step 5: Trigger Redeploy

Since you added environment variables after the first deploy:

1. Go to "Deploys"
2. Click "Trigger deploy" → "Deploy site"

This ensures the function has access to the GITHUB_TOKEN.

## Step 6: Update GitHub Pages (Optional)

If you want to keep your `jordpo.github.io` domain:

1. Go to your Netlify site settings
2. Navigate to "Domain management" → "Custom domains"
3. Click "Add custom domain"
4. Enter: `jordpo.github.io`
5. Follow instructions to update your GitHub Pages DNS settings

Alternatively, Netlify will provide a free subdomain like `jordpo-portfolio.netlify.app`.

## Step 7: Test the Recommendations Feature

Once deployed:

1. Visit your Netlify site URL
2. Scroll to the Recommendations section
3. Click "Add a Recommendation"
4. Fill out the form and submit
5. Check your GitHub repository for a new issue!
6. Comment `/approve` on the issue to create the PR

## Troubleshooting

### Function returns 500 error
- Check that `GITHUB_TOKEN` environment variable is set
- Verify the token has correct permissions (`repo` and `write:org`)
- Check function logs in Netlify dashboard

### CORS errors
- The function includes CORS headers, but check browser console for details
- Ensure you're using the Netlify domain (not localhost for production testing)

### Build fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version matches (20)

## Features Available After Deployment

### Current:
- ✅ Recommendations system with serverless function
- ✅ Automatic PR creation via `/approve` comments
- ✅ No GitHub account required for visitors

### Future (Easy to Add):
- 🤖 AI chat window powered by Claude/OpenAI
- 📊 Analytics integration
- 🔍 Search functionality
- 📬 Contact form with serverless backend

## Local Development with Netlify Functions

To test functions locally:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Run local dev server with functions
netlify dev
```

This will:
- Start your Vite dev server
- Run functions at `http://localhost:8888/.netlify/functions/`
- Use environment variables from `.env` file

Create a `.env` file (don't commit this!):
```
GITHUB_TOKEN=your_github_token_here
```

## Cost

**Free tier includes:**
- 100 GB bandwidth/month
- 125,000 serverless function requests/month
- Unlimited sites
- Automatic HTTPS

Perfect for personal portfolio! If you add AI chat later, the free tier is still plenty.

## Next Steps

1. ✅ Deploy to Netlify
2. ✅ Set up GitHub token
3. ✅ Test recommendations feature
4. 🎨 (Optional) Set up custom domain
5. 🤖 (Future) Add AI chat feature

---

Questions? Check [Netlify docs](https://docs.netlify.com) or the issues tab.
