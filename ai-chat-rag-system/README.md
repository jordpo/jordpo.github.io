# AI Chat System - Context Data

This folder contains the context data (knowledge base) used by the AI chat assistant.

## Files

- **context.json** - Your professional information, experience, projects, and contact details
- **personality.json** - Communication style rules (currently reference only, not actively used)

## Configuration

The actual chat system configuration lives in:
- `netlify/functions/config/` - System prompt, API settings, topic patterns
- `netlify/functions/utils/` - Context extraction, rate limiting, validation logic

## Updating Your Information

Edit `context.json` to update:
- Current role and company
- Technical skills and expertise
- Projects and achievements
- Education and background
- Contact information

Changes will automatically be picked up by the context extraction system.

## Setup

See the main project README for setup instructions, including:
1. Getting an Anthropic API key
2. Setting environment variables
3. Testing locally
4. Deploying to Netlify
