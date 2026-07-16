import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'insightsLanding',
  title: 'Insights Landing Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'eyebrow', title: 'Hero eyebrow', type: 'string', initialValue: 'Insights'}),
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
    defineField({name: 'insightsEyebrow', title: 'Insights section eyebrow', type: 'string'}),
    defineField({name: 'insightsTitle', title: 'Insights section title', type: 'string'}),
    defineField({
      name: 'caseStudiesEyebrow',
      title: 'Case studies section eyebrow',
      type: 'string',
    }),
    defineField({name: 'caseStudiesTitle', title: 'Case studies section title', type: 'string'}),
    defineField({
      name: 'caseStudiesDescription',
      title: 'Case studies section description',
      type: 'text',
      rows: 3,
    }),
    defineField({name: 'caseStudiesCta', title: 'Case studies call to action', type: 'link'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Insights Landing Page'})},
})
