# Testing Documentation

This directory contains unit and integration tests for the portfolio application, with a focus on the recommendations system.

## Setup

Tests are run using [Vitest](https://vitest.dev/), a fast Vite-native testing framework.

### Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui
```

## Test Structure

### Unit Tests (`tests/unit/`)

#### `parseRecommendation.test.ts`

Tests for the recommendation issue parsing logic extracted from the GitHub Actions workflow.

**What it tests:**
- Photo URL parsing from multiple markdown formats
- Filename extraction from URLs
- Complete issue body parsing
- Edge cases (empty skills, missing photos, multiline testimonials)

**Key test case:** Validates that the photo URL is correctly extracted from the issue body format:
```markdown
### Profile Photo

![photo.jpg](https://github.com/.../photo.jpg)

**Photo URL:** https://github.com/.../photo.jpg
```

This was the critical bug fix - the original regex pattern only matched `github.com` URLs but needed to match any HTTPS URL including GitHub CDN URLs.

### Integration Tests (`tests/integration/`)

#### `recommendations.test.ts`

Integration tests for the full recommendations display system.

**What it tests:**
- Empty state rendering when no recommendations exist
- Rendering recommendations from JSON data
- Photo display and path resolution
- Skills badge rendering
- GitHub username link generation
- Graceful handling of missing photos
- Data structure validation

**Data flow tested:**
1. Fetch recommendations from `/data/recommendations.json`
2. Parse and validate recommendation objects
3. Render recommendation cards with all fields
4. Display skills as badges
5. Link to GitHub profiles

## Test Coverage

Current test coverage includes:

- ✅ Photo URL parsing (all markdown formats)
- ✅ Issue body parsing (complete flow)
- ✅ Recommendation component rendering
- ✅ Data structure validation
- ✅ Edge cases (empty fields, missing data)

## Related Files

The tests work in conjunction with these production files:

- [`src/utils/parseRecommendation.ts`](../src/utils/parseRecommendation.ts) - Parsing utilities (extracted for testability)
- [`src/components/RecommendationsSection.vue`](../src/components/RecommendationsSection.vue) - Display component
- [`src/components/RecommendationForm.vue`](../src/components/RecommendationForm.vue) - Submission form
- [`.github/workflows/recommendation-issue-to-pr.yml`](../.github/workflows/recommendation-issue-to-pr.yml) - GitHub Actions workflow
- [`public/data/recommendations.json`](../public/data/recommendations.json) - Recommendations data

## Adding New Tests

When adding new tests:

1. **Unit tests** - For pure functions and utilities
   - Place in `tests/unit/`
   - Name file `*.test.ts`
   - Focus on isolated logic testing

2. **Integration tests** - For component behavior and data flow
   - Place in `tests/integration/`
   - Name file `*.test.ts`
   - Mock external dependencies (fetch, etc.)

## Continuous Integration

Tests should be run:
- Before committing changes
- In CI/CD pipeline before deployment
- When modifying recommendation parsing logic
- When updating recommendation components

## Bug Fix History

### Photo URL Parsing Issue (2024-10)

**Problem:** Photo URLs were not being extracted from recommendation issue bodies, resulting in empty `photo` and `photoFileName` fields in the parsed data.

**Root Cause:** The regex pattern `/!\[.*?\]\((https:\/\/github\.com\/[^\)]+)\)/` was too restrictive, only matching `github.com` URLs and not GitHub CDN URLs used by GitHub Releases.

**Solution:** Updated regex to `/!\[.*?\]\((https?:\/\/[^\)]+)\)/` to match any HTTPS URL.

**Validation:** Created comprehensive unit tests in `parseRecommendation.test.ts` to validate all photo URL parsing scenarios.
