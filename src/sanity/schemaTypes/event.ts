import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleKa', title: 'Title (KA)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'date', title: 'Event Date', type: 'datetime', validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 4 }),
    defineField({ name: 'descriptionKa', title: 'Description (KA)', type: 'text', rows: 4 }),
    defineField({ name: 'speakers', title: 'Speakers', type: 'array', of: [{ type: 'object', fields: [{ name: 'name', type: 'string', title: 'Name' }, { name: 'role', type: 'string', title: 'Role' }, { name: 'photo', type: 'image', title: 'Photo' }] }] }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['upcoming', 'past'] }, initialValue: 'upcoming' }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url' }),
  ],
  preview: {
    select: { title: 'title', date: 'date', status: 'status', media: 'coverImage' },
    prepare({ title, date, status, media }) {
      return { title, subtitle: `${status?.toUpperCase()} — ${date ? new Date(date).toLocaleDateString() : ''}`, media };
    },
  },
});
