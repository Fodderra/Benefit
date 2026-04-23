import { sanityFetch } from '@/sanity/lib/client';
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import EventsClient, { EventItem } from './EventsClient';

interface SanityEvent {
  _id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
  coverImage?: { asset?: { url?: string } } | null;
  speakers?: { name: string; role: string }[];
}

const STATIC_UPCOMING: EventItem[] = [
  {
    _id: 'u1',
    title: 'Benefit Talks IV',
    date: 'September 20, 2025',
    location: 'Tbilisi Marriott Hotel',
    description: 'The fourth edition of Benefit Talks brings together the most influential business leaders, entrepreneurs, and premium brands for an unforgettable evening of insight and connection.',
    tags: ['Keynote Speakers', 'Networking', 'After Party'],
    status: 'upcoming',
  },
  {
    _id: 'u2',
    title: 'Benefit Business Breakfast',
    date: 'June 12, 2025',
    location: 'Rooms Hotel Tbilisi',
    description: 'An exclusive morning gathering for senior executives and decision-makers — premium coffee, curated conversations, and strategic connections in an intimate setting.',
    tags: ['Exclusive', 'Invite Only', 'Morning Format'],
    status: 'upcoming',
  },
];

const STATIC_PAST: EventItem[] = [
  { _id: 'p1', title: 'Benefit Talks III', date: 'November 15, 2024', location: 'Biltmore Hotel Tbilisi', attendees: '350+', highlights: ['12 speakers', 'Live performance', 'Brand activations'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit1/800/600' },
  { _id: 'p2', title: 'Benefit Talks II', date: 'May 22, 2024', location: 'Sheraton Grand Tbilisi', attendees: '280+', highlights: ['8 speakers', 'Panel discussion', 'Gala dinner'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit2/800/600' },
  { _id: 'p3', title: 'Benefit Talks I', date: 'October 18, 2023', location: 'Radisson Blu Iveria', attendees: '200+', highlights: ['6 speakers', 'Networking', 'Press coverage'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit3/800/600' },
  { _id: 'p4', title: 'Benefit Launch Event', date: 'March 5, 2023', location: 'Fabrika, Tbilisi', attendees: '150+', highlights: ['Brand reveal', 'Magazine launch', 'VIP cocktail'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit4/800/600' },
  { _id: 'p5', title: 'Business Leaders Forum', date: 'September 9, 2023', location: 'Marriott Tbilisi', attendees: '180+', highlights: ['CEO roundtable', 'Fireside chat', 'Awards'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit5/800/600' },
  { _id: 'p6', title: 'Benefit Gala Dinner 2023', date: 'December 8, 2023', location: 'Courtyard Tbilisi', attendees: '220+', highlights: ['Black tie', 'Live music', 'Charity auction'], status: 'past', thumbnail: 'https://picsum.photos/seed/benefit6/800/600' },
];

export default async function EventsPage() {
  let upcoming: EventItem[] = STATIC_UPCOMING;
  let past: EventItem[] = STATIC_PAST;

  try {
    const raw = await sanityFetch<SanityEvent[]>(EVENTS_QUERY);
    if (raw && raw.length > 0) {
      const mapped: EventItem[] = raw.map(e => ({
        _id: e._id,
        title: e.title,
        date: e.date ? new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
        location: e.location ?? '',
        description: e.description,
        status: e.status,
        registrationUrl: e.registrationUrl,
        coverImage: e.coverImage ?? null,
        tags: [],
      }));
      const sanityUpcoming = mapped.filter(e => e.status === 'upcoming');
      const sanityPast     = mapped.filter(e => e.status === 'past');
      if (sanityUpcoming.length > 0) upcoming = sanityUpcoming;
      if (sanityPast.length > 0)     past     = sanityPast;
    }
  } catch {
    // Sanity not configured yet — show static content
  }

  return <EventsClient upcoming={upcoming} past={past} />;
}
