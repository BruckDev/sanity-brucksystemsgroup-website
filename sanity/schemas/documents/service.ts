import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'display',
      title: 'Display copy',
      type: 'object',
      fields: [
        defineField({name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string'}),
        defineField({name: 'backCta', title: 'Back call to action', type: 'link'}),
        defineField({name: 'clientProblemLabel', title: 'Client problem label', type: 'string'}),
        defineField({name: 'whatWeProvideLabel', title: 'What we provide label', type: 'string'}),
        defineField({name: 'deliverablesTitle', title: 'Deliverables title', type: 'string'}),
        defineField({name: 'outcomesTitle', title: 'Outcomes title', type: 'string'}),
        defineField({name: 'closingTitle', title: 'Closing title', type: 'string'}),
        defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3}),
        defineField({name: 'closingCta', title: 'Closing call to action', type: 'link'}),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Service image',
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description for screen readers.',
        }),
      ],
    }),
    defineField({
      name: 'clientProblem',
      title: 'Client problem',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'whatWeProvide',
      title: 'What Bruck Systems Group provides',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'deliverables',
      title: 'Example deliverables',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'outcomes',
      title: 'Expected business outcomes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featuredStats',
      title: 'Featured highlights',
      type: 'array',
      of: [defineArrayMember({type: 'stat'})],
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'link',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
