# WordPress API Integration Guide

This guide explains how to use the WordPress API integration in your MoreYeahs Next.js website.

## Overview

The application now fetches data from your WordPress API endpoints:
- **Posts**: `https://dev.moreyeahs.com/wp-json/wp/v2/posts`
- **Pages**: `https://dev.moreyeahs.com/wp-json/wp/v2/pages`
- **Categories**: `https://dev.moreyeahs.com/wp-json/wp/v2/categories`

## Files Created/Updated

### 1. **WordPress API Utilities** (`src/lib/wordpress-api.ts`)
Contains all functions to fetch data from WordPress:

```typescript
// Fetch posts with filters
fetchPosts({ search, categories, page, perPage })

// Fetch a single post by slug
fetchPostBySlug(slug)

// Fetch all pages
fetchPages({ search, page, perPage })

// Fetch all categories
fetchCategories()

// Utility functions
stripHtmlTags(html)        // Remove HTML tags from content
truncateText(text, length) // Truncate text with ellipsis
formatDate(dateString)     // Format dates nicely
```

### 2. **Updated Blog Page** (`src/app/blog/page.tsx`)
- Now fetches posts from WordPress API
- Displays loading/error states
- Transforms WordPress post data to match your UI
- Supports pagination and filtering

### 3. **Updated Resources Page** (`src/app/resources/page.tsx`)
- Now fetches pages from WordPress API
- Displays loading/error states
- Transforms WordPress page data for your UI
- Supports search and tagging

### 4. **Example Dynamic Pages** (New)
- `src/app/blog/[slug]/page-example.tsx` - Template for individual blog posts
- `src/app/resources/[slug]/page-example.tsx` - Template for individual resource pages

## Usage Examples

### Example 1: Fetch Recent Blog Posts

```typescript
import { fetchPosts } from '@/lib/wordpress-api';

const posts = await fetchPosts({
  perPage: 10,
  page: 1,
});

posts.forEach(post => {
  console.log(post.title.rendered);
  console.log(post.slug);
});
```

### Example 2: Fetch Post by Slug

```typescript
import { fetchPostBySlug } from '@/lib/wordpress-api';

const post = await fetchPostBySlug('my-blog-post');

if (post) {
  console.log(post.title.rendered);
  console.log(post.content.rendered);
}
```

### Example 3: Search Posts

```typescript
import { fetchPosts } from '@/lib/wordpress-api';

const results = await fetchPosts({
  search: 'microservices',
  perPage: 20,
});
```

### Example 4: Fetch Posts by Category

```typescript
import { fetchPosts, fetchCategories } from '@/lib/wordpress-api';

// Get all categories first
const categories = await fetchCategories();
const aiCategory = categories.find(c => c.slug === 'ai-ml');

// Fetch posts in that category
const posts = await fetchPosts({
  categories: [aiCategory?.id || 0],
  perPage: 10,
});
```

## Setting Up Dynamic Post Pages

To create dynamic blog post pages:

1. Create `src/app/blog/[slug]/page.tsx` using the example from `page-example.tsx`
2. This will automatically handle URLs like `/blog/my-post-title`
3. The page will fetch the post data from WordPress and display it

Similarly, for resources pages:

1. Create `src/app/resources/[slug]/page.tsx` using the example from `page-example.tsx`
2. This will handle URLs like `/resources/my-resource-title`

## Data Types

### WordPressPost
```typescript
{
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  categories: number[];
  _embedded?: {
    'wp:term'?: Array<Array<{ id, name, slug }>>;
    author?: Array<{ name, avatar_urls }>;
  };
}
```

### WordPressPage
```typescript
{
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
}
```

### WordPressCategory
```typescript
{
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}
```

## Caching Strategy

All API calls use Next.js caching with a 1-hour revalidation period:

```typescript
const response = await fetch(url, {
  next: { revalidate: 3600 }, // Cache for 1 hour
});
```

To update cached data immediately, you can:
1. Redeploy the application
2. Use `revalidatePath()` in a server action (Next.js 13+)
3. Modify the revalidate time in the function calls

## Error Handling

All fetch functions include built-in error handling:

```typescript
import { fetchPosts } from '@/lib/wordpress-api';

try {
  const posts = await fetchPosts();
  // Handle data...
} catch (error) {
  console.error('Failed to fetch posts:', error);
  // Fallback UI...
}
```

The blog and resources pages display user-friendly error messages when data fails to load.

## Environment Setup

No additional environment variables are required. The WordPress base URL is hardcoded in `wordpress-api.ts`:

```typescript
const WP_API_BASE = 'https://dev.moreyeahs.com/wp-json/wp/v2';
```

To use a different WordPress site, update this constant in `src/lib/wordpress-api.ts`.

## Testing the Integration

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/blog` - should display WordPress posts
3. Visit `http://localhost:3000/resources` - should display WordPress pages
4. Check the browser console for any API errors

## Troubleshooting

### Posts/Resources not loading
- Check network tab in browser DevTools to see API requests
- Verify WordPress site is accessible at `https://dev.moreyeahs.com`
- Check if API endpoints return data: visit `https://dev.moreyeahs.com/wp-json/wp/v2/posts` in browser
- Look for CORS issues if running locally

### Styling or display issues
- HTML content from WordPress may contain inline styles
- Use `stripHtmlTags()` to remove HTML before displaying
- Sanitize HTML if needed using libraries like `sanitize-html`

### Performance concerns
- Consider increasing `perPage` limits if you have many items
- Use pagination to load content incrementally
- The 1-hour caching helps reduce API calls

## Next Steps

1. Create the dynamic post/resource pages as shown in examples
2. Test fetching different endpoints
3. Add category/tag filtering if needed
4. Implement search functionality
5. Consider adding comments or related posts
6. Set up webhooks to revalidate cache when WordPress content changes

## Additional Resources

- [WordPress REST API Documentation](https://developer.wordpress.org/rest-api/)
- [Next.js Data Fetching Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)
