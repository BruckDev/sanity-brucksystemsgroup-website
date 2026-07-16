import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Bruck Systems Group',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'display',
      title: 'Display copy',
      type: 'object',
      fields: [
        defineField({name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string'}),
        defineField({name: 'secondaryCta', title: 'Secondary call to action', type: 'link'}),
        defineField({name: 'missionEyebrow', title: 'Mission eyebrow', type: 'string'}),
        defineField({name: 'missionTitle', title: 'Mission title', type: 'string'}),
        defineField({name: 'approachEyebrow', title: 'Approach eyebrow', type: 'string'}),
        defineField({name: 'approachTitle', title: 'Approach title', type: 'string'}),
        defineField({name: 'principlesEyebrow', title: 'Principles eyebrow', type: 'string'}),
        defineField({name: 'principlesTitle', title: 'Principles title', type: 'string'}),
        defineField({name: 'leadershipEyebrow', title: 'Leadership eyebrow', type: 'string'}),
        defineField({name: 'leadershipTitle', title: 'Leadership title', type: 'string'}),
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'leadershipIntro',
      title: 'Leadership intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'principles',
      title: 'Operating principles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'approach',
      title: 'Approach to engagements',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
          ],
        }),
      ],
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
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
