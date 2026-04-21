import { sanityFetch } from '@/sanity/lib/client';
import { MAGAZINE_QUERY } from '@/sanity/lib/queries';
import MagazineClient, { Issue } from './MagazineClient';

interface SanityIssue {
  _id: string;
  title: string;
  issueNumber: number;
  quarter: string;
  year: number;
  cover?: { asset?: { url?: string } } | null;
  pdfUrl?: string;
}

const STATIC_ISSUES: Issue[] = [
  { number: 4, quarter: 'Q4', year: 2024, title: 'The Power of Influence', cover: '/first-frame.png' },
  { number: 3, quarter: 'Q3', year: 2024, title: 'Luxury Reimagined', cover: '/first-frame.png' },
  { number: 2, quarter: 'Q2', year: 2024, title: 'Business & Beyond', cover: '/first-frame.png' },
  { number: 1, quarter: 'Q1', year: 2024, title: 'The Premier Issue', cover: '/first-frame.png' },
];

export default async function MagazinePage() {
  let issues: Issue[] = STATIC_ISSUES;

  try {
    const raw = await sanityFetch<SanityIssue[]>(MAGAZINE_QUERY);
    if (raw && raw.length > 0) {
      issues = raw.map(i => ({
        _id: i._id,
        number: i.issueNumber,
        quarter: i.quarter,
        year: i.year,
        title: i.title,
        cover: i.cover?.asset?.url ?? null,
        pdfUrl: i.pdfUrl ?? null,
      }));
    }
  } catch {
    // Sanity not configured yet — show static content
  }

  return <MagazineClient issues={issues} />;
}
