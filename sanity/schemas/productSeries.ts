import { defineField, defineType } from 'sanity'

export const productSeriesSchema = defineType({
  name: 'productSeries',
  title: 'Product Series',
  type: 'document',
  fields: [
    defineField({ name: 'slug', type: 'slug', options: { source: 'name.en' } }),
    defineField({
      name: 'name', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'description', type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ru', type: 'text', title: 'Russian' },
      ],
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'targetScene', type: 'string',
      options: { list: ['road', 'community', 'rural', 'industrial'] },
    }),
    defineField({ name: 'sortOrder', type: 'number' }),
  ],
})
