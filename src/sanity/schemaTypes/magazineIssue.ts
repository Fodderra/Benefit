import { defineField, defineType } from 'sanity';

export const magazineIssue = defineType({
  name: 'magazineIssue',
  title: 'Magazine Issue',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Issue Title (EN)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'titleKa', title: 'Issue Title (KA)', type: 'string' }),
    defineField({ name: 'issueNumber', title: 'Issue Number', type: 'number' }),
    defineField({ name: 'quarter', title: 'Quarter', type: 'string', options: { list: ['Q1', 'Q2', 'Q3', 'Q4'] } }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pdfUrl', title: 'PDF URL', type: 'url' }),
    defineField({ name: 'pages', title: 'Magazine Pages (Images)', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'descriptionKa', title: 'Description (KA)', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'title', issueNumber: 'issueNumber', year: 'year', media: 'cover' },
    prepare({ title, issueNumber, year, media }) {
      return { title, subtitle: `Issue #${issueNumber} — ${year}`, media };
    },
  },
});
