# Recommendations Feature

This portfolio includes a recommendations system that allows visitors to submit professional recommendations, which are reviewed via GitHub Pull Requests before appearing on the site.

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
5. Your browser will:
   - Copy the recommendation details to your clipboard
   - Open a new tab to the GitHub Actions workflow page

6. On the GitHub Actions page:
   - Click "Run workflow"
   - Fill in the form fields with your information (paste from clipboard)
   - Click "Run workflow" again
   - A Pull Request will be created automatically

### For Portfolio Owner (Jordan)

When someone submits a recommendation:

1. You'll receive a GitHub notification about the new PR
2. Review the PR which will contain:
   - Updated `public/data/recommendations.json` with the new recommendation
   - The recommender's photo in `public/images/recommendations/` (if provided)
3. Review the content and decide:
   - Merge to approve and publish the recommendation
   - Request changes if needed
   - Close without merging to decline

Once merged, the recommendation automatically appears on your portfolio on the next deployment.

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

The workflow ([.github/workflows/create-recommendation-pr.yml](.github/workflows/create-recommendation-pr.yml)) is triggered manually via `workflow_dispatch` and:

1. Creates a new branch named `recommendation/{sanitized-name}-{timestamp}`
2. Processes the photo (if provided):
   - Decodes from base64
   - Saves to `public/images/recommendations/` with sanitized filename
3. Updates `recommendations.json` with the new entry
4. Commits changes
5. Creates a Pull Request with a formatted body

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
- **Storage**: Base64 encoded in workflow input, decoded to file

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
- GitHub Actions workflow runs in GitHub's secure environment
- PRs require your manual approval before merging
- No sensitive data is stored or transmitted
- Workflow uses GitHub's built-in authentication

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
