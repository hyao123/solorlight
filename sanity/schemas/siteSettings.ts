import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', type: 'string' }),
    defineField({ name: 'whatsappNumber', type: 'string', description: 'e.g. +8613800000000' }),
    defineField({ name: 'contactEmail', type: 'string' }),
    defineField({
      name: 'address', type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ru', type: 'string', title: 'Russian' },
      ],
    }),
    defineField({
      name: 'socialLinks', type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'youtube', type: 'url' },
        { name: 'alibaba', type: 'url' },
      ],
    }),
  ],
})
