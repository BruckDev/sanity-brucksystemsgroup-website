import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesLanding',
  title: 'Services Landing Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Hero eyebrow', type: 'string', initialValue: 'Services'}),
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
    defineField({name: 'sectionEyebrow', title: 'Services section eyebrow', type: 'string'}),
    defineField({name: 'sectionTitle', title: 'Services section title', type: 'string'}),
    defineField({
      name: 'sectionDescription',
      title: 'Services section description',
      type: 'text',
      rows: 3,
    }),
    defineField({name: 'deliverablesLabel', title: 'Deliverables label', type: 'string'}),
    defineField({name: 'outcomesLabel', title: 'Outcomes label', type: 'string'}),
    defineField({name: 'detailCtaLabel', title: 'Service detail link label', type: 'string'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Services Landing Page'})},
})
