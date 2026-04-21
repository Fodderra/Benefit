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
  { slug: 'georgia-business-influence', title: "Georgia's Most Influential Business Leaders 2025", category: 'Business', date: 'Apr 10, 2025', readTime: '6 min', excerpt: "Meet the entrepreneurs and executives shaping Georgia's economic landscape in 2025." },
  { slug: 'luxury-hospitality-tbilisi', title: 'The Rise of Luxury Hospitality in Tbilisi', category: 'Hospitality', date: 'Mar 28, 2025', readTime: '4 min', excerpt: 'How international hotel brands are transforming the Georgian capital into a premium destination.' },
  { slug: 'benefit-talks-recap', title: 'Benefit Talks III: Highlights & Key Takeaways', category: 'Events', date: 'Mar 15, 2025', readTime: '5 min', excerpt: 'Recapping the most impactful moments from our third high-level business gathering.' },
  { slug: 'georgian-fashion-week', title: 'Georgian Fashion: A New Creative Force', category: 'Fashion', date: 'Feb 22, 2025', readTime: '7 min', excerpt: 'How local designers are gaining international recognition while preserving cultural heritage.' },
  { slug: 'fine-dining-guide', title: 'Tbilisi Fine Dining: The Ultimate 2025 Guide', category: 'Gastronomy', date: 'Feb 10, 2025', readTime: '8 min', excerpt: 'From Michelin-calibre restaurants to hidden gems.' },
  { slug: 'premium-lifestyle-2025', title: 'Defining Premium Lifestyle in the Modern Era', category: 'Lifestyle', date: 'Jan 30, 2025', readTime: '5 min', excerpt: 'What does luxury mean in 2025? Beyond material goods, the pursuit of meaningful experiences.' },
  { slug: 'investment-opportunities', title: 'Investment Opportunities in Georgia: 2025 Overview', category: 'Business', date: 'Jan 18, 2025', readTime: '9 min', excerpt: 'Key sectors attracting foreign and domestic investment.' },
  { slug: 'boutique-hotels', title: 'Boutique Hotels Redefining Georgian Hospitality', category: 'Hospitality', date: 'Jan 5, 2025', readTime: '4 min', excerpt: 'The boutique revolution: intimate, story-driven stays that rival global luxury chains.' },
  { slug: 'wine-culture', title: "Georgia's Wine Culture: Ancient Tradition Meets Modern Commerce", category: 'Gastronomy', date: 'Dec 20, 2024', readTime: '6 min', excerpt: "How the world's oldest wine country is leveraging tradition in today's premium market." },
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
