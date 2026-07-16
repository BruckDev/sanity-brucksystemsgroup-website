import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'display',
      title: 'Display copy',
      type: 'object',
      fields: [
        defineField({name: 'backCta', title: 'Back call to action', type: 'link'}),
        defineField({name: 'readTimeLabel', title: 'Read time label', type: 'string'}),
        defineField({
          name: 'relatedServicesTitle',
          title: 'Related services title',
          type: 'string',
        }),
        defineField({
          name: 'relatedIndustriesTitle',
          title: 'Related industries title',
          type: 'string',
        }),
        defineField({name: 'closingTitle', title: 'Closing title', type: 'string'}),
        defineField({name: 'closingText', title: 'Closing text', type: 'text', rows: 3}),
        defineField({name: 'closingCta', title: 'Closing call to action', type: 'link'}),
      ],
    }),
    defineField({
      name: 'articleType',
      title: 'Content type',
      type: 'string',
      options: {
        list: ['Article', 'Report', 'Perspective'],
        layout: 'radio',
      },
      initialValue: 'Article',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated read time',
      type: 'string',
      initialValue: '5 min read',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'relatedIndustries',
      title: 'Related industries',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'industry'}]})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
