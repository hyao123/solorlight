import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
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
    defineField({ name: 'series', type: 'reference', to: [{ type: 'productSeries' }] }),
    defineField({ name: 'images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'specs', type: 'object',
      fields: [
        { name: 'wattage', type: 'number', title: 'Wattage (W)' },
        { name: 'batteryCapacity', type: 'number', title: 'Battery Capacity (Ah)' },
        { name: 'lumens', type: 'number', title: 'Lumens' },
        { name: 'colorTemp', type: 'string', title: 'Color Temperature' },
        { name: 'ipRating', type: 'string', title: 'IP Rating' },
        { name: 'poleHeight', type: 'number', title: 'Pole Height (m)' },
        { name: 'workingHours', type: 'number', title: 'Working Hours/Night' },
      ],
    }),
    defineField({
      name: 'description', type: 'object',
      fields: [
        { name: 'en', type: 'array', of: [{ type: 'block' }], title: 'English' },
        { name: 'ru', type: 'array', of: [{ type: 'block' }], title: 'Russian' },
      ],
    }),
    defineField({ name: 'certificates', type: 'array', of: [{ type: 'reference', to: [{ type: 'certificate' }] }] }),
    defineField({ name: 'isHotProduct', type: 'boolean', initialValue: false }),
    defineField({
      name: 'seoTitle', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'seoDescription', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
  ],
})
