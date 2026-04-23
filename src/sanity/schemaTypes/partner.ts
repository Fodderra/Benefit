import { defineField, defineType } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Brand Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'website', title: 'Website URL', type: 'url' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['Luxury', 'Hospitality', 'Fashion', 'Finance', 'Tech', 'Other'] } }),
    defineField({ name: 'description', title: 'Description (EN)', type: 'text', rows: 2 }),
    defineField({ name: 'descriptionKa', title: 'Description (KA)', type: 'text', rows: 2 }),
    defineField({ name: 'featured', title: 'Featured Partner', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'logo' },
  },
});
