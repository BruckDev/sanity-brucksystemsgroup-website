import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'accessibilityPage',
  title: 'Accessibility Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      initialValue: 'Accessibility',
    }),
    defineField({
      name: 'title',
      title: 'Hero title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Hero overview',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'body',
      title: 'Page body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Accessibility Page'})},
})
