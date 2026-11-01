import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
        defineField({name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string'}),
        defineField({name: 'backCta', title: 'Back call to action', type: 'link'}),
        defineField({name: 'challengeLabel', title: 'Challenge label', type: 'string'}),
        defineField({name: 'approachLabel', title: 'Approach label', type: 'string'}),
        defineField({name: 'outcomesTitle', title: 'Outcomes title', type: 'string'}),
        defineField({name: 'industryLabel', title: 'Industry label', type: 'string'}),
        defineField({
          name: 'relatedServicesLabel',
          title: 'Related services label',
          type: 'string',
        }),
        defineField({name: 'placeholderNote', title: 'Placeholder note', type: 'text', rows: 4}),
        defineField({name: 'closingCta', title: 'Closing call to action', type: 'link'}),
      ],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{type: 'industry'}],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [defineArrayMember({type: 'stat'})],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
