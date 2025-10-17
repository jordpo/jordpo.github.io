# Recommendations Feature

This portfolio includes a recommendations system that allows visitors to submit professional recommendations via GitHub Issues, which are reviewed and approved before appearing on the site.

**⚠️ Requires Netlify Deployment:** This feature uses Netlify serverless functions. See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for setup instructions.

## How It Works

### For Visitors Submitting Recommendations

1. Visit the portfolio and scroll to the "Recommendations" section
2. Click "Add a Recommendation"
3. Fill out the form with:
   - Your name (required)
   - Your title and company (optional)
   - Your relationship to Jordan (optional)
   - GitHub username (optional)
   - Skills you'd like to endorse (optional, multi-select)
   - Your recommendation testimonial (required)
   - Profile photo (optional, max 1MB)

4. Click "Submit Recommendation"
5. A GitHub issue will be automatically created with your recommendation
6. **No GitHub account required!** The issue is created via the public API
7. You can optionally track the status via the issue link that opens

### For Portfolio Owner (Jordan)

When someone submits a recommendation:

1. **You'll receive a GitHub notification** about the new issue labeled "recommendation"
2. **Review the issue** containing:
   - All recommendation details (name, title, company, relationship, skills, testimonial)
   - Photo data (if provided) in a collapsible section
3. **To approve:**
   - Comment `/approve` on the issue
   - A GitHub Action automatically:
     - Creates a new branch
     - Extracts data from the issue
     - Downloads and saves the photo (if provided)
     - Updates `recommendations.json`
     - Creates a Pull Request
     - Closes the issue
4. **Review and merge the PR** to publish the recommendation
5. **To decline:**
   - Simply close the issue without commenting `/approve`
   - Optionally add a comment explaining why

Once the PR is merged, the recommendation automatically appears on your portfolio on the next deployment.

## File Structure

```
public/
├── data/
│   └── recommendations.json          # Stores all approved recommendations
└── images/
    └── recommendations/              # Stores recommendation profile photos
        ├── .gitkeep
        └── {name-timestamp}.{ext}    # Auto-generated filenames

src/
├── components/
│   ├── RecommendationsSection.vue   # Displays recommendations
│   └── RecommendationForm.vue       # Form modal for submissions
└── utils/
    └── submitRecommendation.ts      # Helper utilities (reference)

.github/
└── workflows/
    └── create-recommendation-pr.yml # Automation workflow
```

## Recommendation Data Schema

```typescript
interface Recommendation {
  name: string                    // Recommender's name
  title?: string                  // Job title
  company?: string                // Company name
  relationship?: string           // Relationship context
  githubUsername?: string         // GitHub username for profile link
  skillRecommendations?: string[] // Skills endorsed
  testimonial: string             // The actual recommendation
  photo?: string                  // Filename in public/images/recommendations/
  date: string                    // ISO date string (YYYY-MM-DD)
}
```

## GitHub Actions Workflow

The workflow ([.github/workflows/recommendation-issue-to-pr.yml](.github/workflows/recommendation-issue-to-pr.yml)) is triggered when you comment `/approve` on a recommendation issue:

**Trigger Conditions:**
- Issue has the label "recommendation"
- Comment contains `/approve`
- Comment is from the repository owner (you)

**Workflow Steps:**
1. Parses the issue body to extract all recommendation data
2. Creates a new branch named `recommendation/{sanitized-name}-{timestamp}`
3. Processes the photo (if provided):
   - Decodes from base64
   - Saves to `public/images/recommendations/` with sanitized filename
4. Updates `recommendations.json` with the new entry
5. Commits changes
6. Creates a Pull Request with a formatted body
7. Comments on the issue with the PR link
8. Closes the issue

## Benefits of the Issue-Based Approach

✅ **No GitHub account required** - Visitors can submit via public API
✅ **Built-in moderation** - You approve with a simple `/approve` comment
✅ **Full visibility** - All submissions are tracked as issues
✅ **Easy management** - Close spam/invalid submissions without approval
✅ **Automatic PR creation** - Approved recommendations become PRs automatically
✅ **Zero cost** - Everything runs on GitHub's free tier
✅ **Transparent process** - Submitters can track their recommendation status

## Customization

### Adding Skills

Edit the `availableSkills` array in [RecommendationForm.vue](src/components/RecommendationForm.vue):

```typescript
const availableSkills = [
  'TypeScript', 'React', 'Vue.js',
  // Add more skills here
]
```

### Styling

The components use Tailwind CSS classes matching your portfolio theme. Key customization points:

- **Card backgrounds**: `.card` class
- **Primary colors**: `primary-*` Tailwind classes
- **Spacing**: Adjust `gap-*` and `space-y-*` utilities

### Photo Requirements

- **Format**: Any image format (jpg, png, gif, etc.)
- **Size limit**: 1MB
- **Dimensions**: Auto-scaled to 64px circle in display
- **Storage**: Base64 encoded in issue, decoded to file by workflow

## Future Enhancements

Potential improvements you might consider:

1. **Direct API Integration**: Implement a serverless function to trigger workflow_dispatch directly from the form (requires GitHub token management)

2. **Email Notifications**: Add custom notifications beyond GitHub's default PR notifications

3. **Moderation Queue**: Add a separate review page before creating PRs

4. **Rich Text Editor**: Allow formatting in testimonials

5. **LinkedIn Integration**: Import recommendations from LinkedIn

6. **Filtering/Sorting**: Add UI to filter recommendations by skills or date

7. **Analytics**: Track recommendation views and engagement

## Security Considerations

- The form validates required fields client-side
- Photos are size-limited to 1MB
- Serverless function uses GitHub Personal Access Token (stored securely in Netlify)
- Token permissions are scoped to minimum required (`repo`, `write:org`)
- GitHub Actions workflow runs in GitHub's secure environment
- PRs require your manual approval before merging
- No sensitive data is stored or transmitted beyond GitHub
- CORS is properly configured to prevent unauthorized domains

## Troubleshooting

### Recommendation not appearing after merge

- Check that the deployment completed successfully
- Verify `recommendations.json` was updated in the main branch
- Clear browser cache and reload

### Photo not displaying

- Ensure the photo file exists in `public/images/recommendations/`
- Check the filename matches the one in `recommendations.json`
- Verify the image was committed in the PR

### Workflow fails to run

- Ensure you have GitHub Actions enabled for the repository
- Check that workflow permissions allow creating PRs
- Review the Actions logs for specific errors

## Support

For issues or questions about the recommendations feature, please [open an issue](https://github.com/jordpo/jordpo.github.io/issues) on GitHub.
