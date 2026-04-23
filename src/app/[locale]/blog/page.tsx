import { sanityFetch } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import BlogClient, { Post } from './BlogClient';

interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt?: string;
  coverImage?: { asset?: { url?: string } } | null;
  publishedAt?: string;
}

const STATIC_POSTS: Post[] = [
  {
    slug: 'georgia-business-influence',
    title: "Georgia's Most Influential Business Leaders 2026",
    category: 'Business',
    date: 'Apr 10, 2026',
    readTime: '6 min',
    excerpt: "Meet the entrepreneurs and executives shaping Georgia's economic landscape — from fintech founders to hospitality magnates rewriting the rulebook.",
    thumbnail: 'https://picsum.photos/seed/blog01/800/500',
  },
  {
    slug: 'luxury-hospitality-tbilisi',
    title: 'The Rise of Luxury Hospitality in Tbilisi',
    category: 'Hospitality',
    date: 'Mar 28, 2026',
    readTime: '4 min',
    excerpt: 'International hotel brands are racing to plant flags in the Georgian capital. What does this mean for local operators — and for guests?',
    thumbnail: 'https://picsum.photos/seed/blog02/800/500',
  },
  {
    slug: 'benefit-talks-recap',
    title: 'Benefit Talks III: Highlights & Key Takeaways',
    category: 'Events',
    date: 'Mar 15, 2026',
    readTime: '5 min',
    excerpt: '350 executives. 12 speakers. One evening that produced more deals than most trade fairs do in a week. Here is what you missed.',
    thumbnail: 'https://picsum.photos/seed/blog03/800/500',
  },
  {
    slug: 'georgian-fashion-week',
    title: 'Georgian Fashion: A New Creative Force',
    category: 'Fashion',
    date: 'Feb 22, 2026',
    readTime: '7 min',
    excerpt: 'Local designers are landing Paris showrooms and London stockists. We trace the path from Tbilisi ateliers to global runways.',
    thumbnail: 'https://picsum.photos/seed/blog04/800/500',
  },
  {
    slug: 'fine-dining-guide',
    title: 'Tbilisi Fine Dining: The Ultimate 2026 Guide',
    category: 'Gastronomy',
    date: 'Feb 10, 2026',
    readTime: '8 min',
    excerpt: 'From Michelin-calibre tasting menus to the hidden wine-cellar restaurants only locals know — the definitive guide to eating well in the capital.',
    thumbnail: 'https://picsum.photos/seed/blog05/800/500',
  },
  {
    slug: 'premium-lifestyle-2026',
    title: 'Defining Premium Lifestyle in the Modern Era',
    category: 'Lifestyle',
    date: 'Jan 30, 2026',
    readTime: '5 min',
    excerpt: "Wealth has quietly redefined itself. Today's premium audience prioritises time, craft, and access over logos. Brands that understand this are winning.",
    thumbnail: 'https://picsum.photos/seed/blog06/800/500',
  },
  {
    slug: 'investment-opportunities',
    title: 'Investment Opportunities in Georgia: 2026 Overview',
    category: 'Business',
    date: 'Jan 18, 2026',
    readTime: '9 min',
    excerpt: 'Real estate, renewables, agri-tech and logistics: four sectors where capital is flowing in — and where the early-mover advantage is still available.',
    thumbnail: 'https://picsum.photos/seed/blog07/800/500',
  },
  {
    slug: 'boutique-hotels',
    title: 'Boutique Hotels Redefining Georgian Hospitality',
    category: 'Hospitality',
    date: 'Jan 5, 2026',
    readTime: '4 min',
    excerpt: 'The boutique revolution: intimate, story-driven stays that trade square footage for authenticity — and charge a premium for it.',
    thumbnail: 'https://picsum.photos/seed/blog08/800/500',
  },
  {
    slug: 'wine-culture',
    title: "Georgia's Wine Culture: Ancient Tradition Meets Modern Commerce",
    category: 'Gastronomy',
    date: 'Dec 20, 2025',
    readTime: '6 min',
    excerpt: "The world's oldest wine country is its newest export sensation. How Georgian winemakers are turning 8,000-year-old amber vessels into a global luxury category.",
    thumbnail: 'https://picsum.photos/seed/blog09/800/500',
  },
];

export default async function BlogPage() {
  let posts: Post[] = STATIC_POSTS;

  try {
    const raw = await sanityFetch<SanityPost[]>(POSTS_QUERY);
    if (raw && raw.length > 0) {
      posts = raw.map(p => ({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        category: p.category ?? 'Business',
        date: p.publishedAt
          ? new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
          : '',
        excerpt: p.excerpt ?? '',
        coverImage: p.coverImage ?? null,
      }));
    }
  } catch {
    // Sanity not configured yet — show static content
  }

  return <BlogClient posts={posts} />;
}
