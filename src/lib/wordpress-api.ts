// WordPress API configuration and utilities
// Server-side: call WP directly. Client-side: go through our proxy to avoid CORS.
const WP_DIRECT = 'https://dev.moreyeahs.com/wp-json/wp/v2';
const WP_PROXY  = '/api/wp';

function wpUrl(path: string): string {
  const isServer = typeof window === 'undefined';
  const base = isServer ? WP_DIRECT : WP_PROXY;
  return `${base}/${path}`;
}

// Shared fetch options — revalidate every 10 minutes
const CACHE_OPTS: RequestInit = { next: { revalidate: 600 } };

export interface FeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details?: {
    sizes?: {
      medium?:    { source_url: string };
      large?:     { source_url: string };
      thumbnail?: { source_url: string };
    };
  };
}

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    'wp:featuredmedia'?: FeaturedMedia[];
    author?: Array<{ name: string; avatar_urls: { '24': string } }>;
  };
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface CaseStudyAcfContentSection {
  section_icon: boolean | string;
  section_title: string;
  icon_color: string;
  section_content: string;
  section_quotes: Array<{ quote_text: string }> | false;
  section_bullet_points: Array<{ bullet_text: string }> | false;
}

export interface CaseStudyAcfSidebarItem {
  item_text: string;
}

export interface CaseStudyAcfSidebarSection {
  section_title: string;
  section_items: CaseStudyAcfSidebarItem[];
}

export interface CaseStudyAcfFields {
  header_section?: {
    logo?: boolean | string;
    title?: string;
    subtitle?: string;
    dynamic_heading?: string;
    background_image?: boolean | string;
    gradient_colors?: { color_1?: string; color_2?: string } | string;
  };
  sidebar_section?: {
    sidebar_sections?: CaseStudyAcfSidebarSection[];
  };
  client_section?: {
    client_image?: boolean | string;
    client_name?: string;
    client_designation?: string;
    client_company?: string;
    client_content?: string;
  };
  content_sections?: CaseStudyAcfContentSection[] | string;
  testimonial_quote?: {
    quote_text?: string;
    quote_author?: string;
  };
  cta_section?: {
    cta_title?: string;
    cta_content?: string;
    cta_buttons?: boolean | string;
  };
}

export interface CaseStudy {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  acf_fields?: CaseStudyAcfFields;
  _embedded?: {
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
    'wp:featuredmedia'?: FeaturedMedia[];
    author?: Array<{ name: string; avatar_urls: { '24': string } }>;
  };
}

const OLD_WP_BASE = 'https://dev.moreyeahs.com/moreyeahs-new/wp-content/';
const NEW_WP_BASE = 'https://dev.moreyeahs.com/wp-content/';

export function rewriteWPUrls(html: string): string {
  return html.replaceAll(OLD_WP_BASE, NEW_WP_BASE);
}

/* ── Local fallback images for case studies that have no WP featured media ── */
const CASE_STUDY_LOCAL_IMAGES: Record<string, string> = {
  'end-to-end-salesforce-implementation-for-a-pet-sales-marketplace':
    '/images/case-studies/End-to-End-Salesforce-Implementation-for-a-Pet-Sales-Marketplace-1.jpg',
  'salesforce-nonprofit-cloud-transformation-for-buffalo-conservation-and-community-empowerment':
    '/images/case-studies/Salesforce-Nonprofit-Cloud-Transformation-for-Buffalo-Conservation-and-Community-Empowerment-1-scaled.png',
  'salesforce-crm-implementation-for-a-multi-sector-real-estate-infrastructure-enterprise':
    '/images/case-studies/Salesforce-CRM-Implementation-for-a-Multi-Sector-Real-Estate-and-Infrastructure-Enterprise-1.jpg',
  'intelligent-ai-driven-solution-that-streamlines-and-modernizes-enterprise-document-management':
    '/images/case-studies/Intelligent-AI-driven-solution-that-streamlines-and-modernizes-enterprise-document-management.jpg',
  'advanced-ai-based-defect-detection-pit-mapping':
    '/images/case-studies/Advanced-AI-Based-Defect-Detection-and-Pit-Mapping-1-1-scaled.png',
  'ai-powered-seed-counting-and-purity-analysis-solution-for-accurate-scalable-and-automated-quality-assurance-in-agriculture':
    '/images/case-studies/AI-Powered-Seed-Counting-and-Purity-Analysis-Solution-for-Accurate-Scalable-and-Automated-Quality-Assurance-in-Agriculture.jpg',
  'ai-powered-solution-for-actionable-table-tennis-performance-insights-and-competitive-advantage':
    '/images/case-studies/AI-powered-solution-for-actionable-table-tennis-performance-insights-and-competitive-advantage.jpg',
  'a-real-time-healthcare-data-platform-enabling-actionable-clinical-and-patient-insights':
    '/images/case-studies/A-real-time-healthcare-data-platform-enabling-actionable-clinical-and-patient-insights-1.jpg',
  'ai-driven-solution-streamlining-clinical-site-assessment-for-efficient-and-compliant-trial-launches':
    '/images/case-studies/AI-driven solution streamlining clinical site assessment for efficient and compliant trial launches.png',
  'ai-driven-surveillance-platform-enabling-real-time-threat-detection-and-centralized-security-management':
    '/images/case-studies/AI-driven-surveillance-platform-enabling-real-time-threat-detection-and-centralized-security-management.jpg',
};

export function getLocalCaseStudyImage(slug: string): string | null {
  return CASE_STUDY_LOCAL_IMAGES[slug] ?? null;
}

// Extract the best available cover image URL from embedded media
export function getCoverImage(
  embedded?: CaseStudy['_embedded'] | WordPressPost['_embedded'],
): string | null {
  const media = embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  const url =
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium?.source_url ??
    media.source_url ??
    null;
  return url ? rewriteWPUrls(url) : null;
}

// Fetch all posts with optional filters
export async function fetchPosts(params?: {
  search?: string;
  categories?: number[];
  page?: number;
  perPage?: number;
}): Promise<WordPressPost[]> {
  try {
    const searchParams = new URLSearchParams({
      _embed: 'true', // Include embedded data (categories, authors, featured media)
      per_page: String(params?.perPage || 10),
      page: String(params?.page || 1),
    });

    if (params?.search) {
      searchParams.append('search', params.search);
    }

    if (params?.categories && params.categories.length > 0) {
      searchParams.append('categories', params.categories.join(','));
    }

    const url = `${wpUrl('posts')}?${searchParams.toString()}`;
    const response = await fetch(url, { next: { revalidate: 600 } });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchAllPosts(params?: {
  search?: string;
  categories?: number[];
  perPage?: number;
}): Promise<WordPressPost[]> {
  const pageSize = params?.perPage ?? 100;
  let allPosts: WordPressPost[] = [];
  let page = 1;

  while (true) {
    const pagePosts = await fetchPosts({
      search: params?.search,
      categories: params?.categories,
      page,
      perPage: pageSize,
    });

    if (pagePosts.length === 0) {
      break;
    }

    allPosts = allPosts.concat(pagePosts);

    if (pagePosts.length < pageSize) {
      break;
    }

    page += 1;
    if (page > 20) {
      break;
    }
  }

  return allPosts;
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${wpUrl('posts')}?slug=${slug}&_embed=true`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all pages
export async function fetchPages(params?: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<WordPressPage[]> {
  try {
    const searchParams = new URLSearchParams({
      per_page: String(params?.perPage || 10),
      page: String(params?.page || 1),
    });

    if (params?.search) {
      searchParams.append('search', params.search);
    }

    const url = `${wpUrl('pages')}?${searchParams.toString()}`;
    const response = await fetch(url, { next: { revalidate: 600 } });

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Fetch all categories
export async function fetchCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(
      `${wpUrl('categories')}?per_page=100`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch all case studies
export async function fetchCaseStudies(params?: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<CaseStudy[]> {
  try {
    const searchParams = new URLSearchParams({
      _embed: 'true',
      per_page: String(params?.perPage || 10),
      page: String(params?.page || 1),
    });

    if (params?.search) {
      searchParams.append('search', params.search);
    }

    const url = `${wpUrl('case_study')}?${searchParams.toString()}`;
    const response = await fetch(url, { next: { revalidate: 600 } });

    if (!response.ok) {
      throw new Error(`Failed to fetch case studies: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

// Fetch all case studies (paginated)
export async function fetchAllCaseStudies(params?: {
  search?: string;
  perPage?: number;
}): Promise<CaseStudy[]> {
  const pageSize = params?.perPage ?? 100;
  let allStudies: CaseStudy[] = [];
  let page = 1;

  while (true) {
    const pageStudies = await fetchCaseStudies({
      search: params?.search,
      page,
      perPage: pageSize,
    });

    if (pageStudies.length === 0) {
      break;
    }

    allStudies = allStudies.concat(pageStudies);

    if (pageStudies.length < pageSize) {
      break;
    }

    page += 1;
    if (page > 20) {
      break;
    }
  }

  return allStudies;
}

// Fetch a single case study by slug
export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    // Primary: lookup by slug query, which is more reliable for custom post types.
    const r1 = await fetch(
      `${wpUrl('case_study')}?slug=${encodeURIComponent(slug)}&_embed=true`,
      CACHE_OPTS
    );
    if (r1.ok) {
      const data = await r1.json();
      if (Array.isArray(data) && data.length > 0) return data[0];
    }

    const r2 = await fetch(
      `${wpUrl('case_study')}/${encodeURIComponent(slug)}?_embed=true`,
      CACHE_OPTS
    );
    if (r2.ok) {
      const data = await r2.json();
      if (data && (Array.isArray(data) ? data.length > 0 : data.id)) {
        return Array.isArray(data) ? data[0] : (data as CaseStudy);
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug}:`, error);
    return null;
  }
}
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Utility function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
