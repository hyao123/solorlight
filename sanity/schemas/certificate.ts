import { defineField, defineType } from 'sanity'

export const certificateSchema = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'logo', type: 'image' }),
    defineField({ name: 'validUntil', type: 'date' }),
  ],
})
