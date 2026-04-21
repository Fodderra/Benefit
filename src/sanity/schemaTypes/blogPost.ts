import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleKa', title: 'Title (KA)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Business', 'Lifestyle', 'Fashion', 'Hospitality', 'Gastronomy', 'Events'] } }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Excerpt (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'excerptKa', title: 'Excerpt (KA)', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Body (EN)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'bodyKa', title: 'Body (KA)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'coverImage' },
    prepare({ title, category, media }) {
      return { title, subtitle: category, media };
    },
  },
});
