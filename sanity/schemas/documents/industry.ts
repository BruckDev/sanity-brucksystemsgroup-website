import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'industry',
  title: 'Industry',
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
        defineField({name: 'overviewLabel', title: 'Overview label', type: 'string'}),
        defineField({name: 'prioritiesTitle', title: 'Priorities title', type: 'string'}),
        defineField({
          name: 'relatedServicesLabel',
          title: 'Related services label',
          type: 'string',
        }),
        defineField({name: 'closingTitle', title: 'Closing title', type: 'string'}),
        defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3}),
        defineField({name: 'closingCta', title: 'Closing call to action', type: 'link'}),
      ],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'priorities',
      title: 'Typical priorities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'services',
      title: 'Related services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
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
