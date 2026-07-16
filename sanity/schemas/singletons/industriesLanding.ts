import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'industriesLanding',
  title: 'Industries Landing Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      initialValue: 'Industries',
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
    defineField({name: 'heroPrimaryCta', title: 'Primary call to action', type: 'link'}),
    defineField({name: 'heroSecondaryCta', title: 'Secondary call to action', type: 'link'}),
    defineField({name: 'sectionEyebrow', title: 'Industries section eyebrow', type: 'string'}),
    defineField({name: 'sectionTitle', title: 'Industries section title', type: 'string'}),
    defineField({
      name: 'sectionDescription',
      title: 'Industries section description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'governmentCta',
      title: 'Government capabilities call to action',
      type: 'link',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Industries Landing Page'})},
})
