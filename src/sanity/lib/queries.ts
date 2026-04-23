export const POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    titleKa,
    "slug": slug.current,
    category,
    excerpt,
    excerptKa,
    coverImage,
    publishedAt,
    featured
  }
`;

export const EVENTS_QUERY = `
  *[_type == "event"] | order(date desc) {
    _id,
    title,
    titleKa,
    date,
    location,
    description,
    descriptionKa,
    status,
    registrationUrl,
    coverImage,
    speakers[] {
      name,
      role,
      photo
    }
  }
`;

export const PARTNERS_QUERY = `
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    category,
    website,
    featured,
    "logoUrl": logo.asset->url
  }
`;

export const MAGAZINE_QUERY = `
  *[_type == "magazineIssue"] | order(issueNumber desc) {
    _id,
    title,
    titleKa,
    issueNumber,
    quarter,
    year,
    cover,
    pdfUrl,
    description,
    descriptionKa,
    publishedAt
  }
`;
