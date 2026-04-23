import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ywf7o1w0',
  dataset: 'production',
  apiVersion: '2026-04-21',
  useCdn: false,
});

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60, tags: ['sanity'] },
  });
}
