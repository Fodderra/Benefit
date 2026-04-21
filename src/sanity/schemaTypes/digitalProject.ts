import { defineField, defineType } from 'sanity';

export const digitalProject = defineType({
  name: 'digitalProject',
  title: 'Digital Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleKa', title: 'Project Title (KA)', type: 'string' }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'type', title: 'Project Type', type: 'string', options: { list: ['Brand Film', 'Interview', 'Campaign Video', 'Event Coverage', 'Social Content'] } }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube/Vimeo)', type: 'url' }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionKa', title: 'Description (KA)', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'thumbnail' },
  },
});
