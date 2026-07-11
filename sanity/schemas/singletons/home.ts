import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Hero title',
      type: 'string',
      initialValue: 'Strategy, technology and execution-working as one.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Hero overview',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Primary call to action',
      type: 'link',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Secondary call to action',
      type: 'link',
    }),
    defineField({
      name: 'heroHighlights',
      title: 'Hero highlights',
      type: 'array',
      of: [defineArrayMember({type: 'stat'})],
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services section title',
      type: 'string',
      initialValue: 'Core services built for measurable progress',
    }),
    defineField({
      name: 'servicesIntro',
      title: 'Services section intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
    }),
    defineField({
      name: 'insightsTitle',
      title: 'Insights section title',
      type: 'string',
      initialValue: 'Insight-led thinking for complex environments',
    }),
    defineField({
      name: 'insightsIntro',
      title: 'Insights section intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'featuredInsights',
      title: 'Featured insights',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'insight'}]})],
    }),
    defineField({
      name: 'featuredCaseStudies',
      title: 'Featured case studies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})],
    }),
    defineField({
      name: 'industriesTitle',
      title: 'Industries section title',
      type: 'string',
      initialValue: 'Focused support across public, regulated and mission-driven sectors',
    }),
    defineField({
      name: 'industriesIntro',
      title: 'Industries section intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'featuredIndustries',
      title: 'Featured industries',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'industry'}]})],
    }),
    defineField({
      name: 'governmentTitle',
      title: 'Government capabilities title',
      type: 'string',
      initialValue: 'Government contracting and modernization support',
    }),
    defineField({
      name: 'governmentIntro',
      title: 'Government capabilities intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'governmentCapabilities',
      title: 'Government capabilities',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'whyUsTitle',
      title: 'Why Bruck Systems Group title',
      type: 'string',
      initialValue: 'Why organizations choose Bruck Systems Group',
    }),
    defineField({
      name: 'whyUsCards',
      title: 'Why us cards',
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
      name: 'finalCtaTitle',
      title: 'Final CTA title',
      type: 'string',
      initialValue: 'Ready to move from planning to execution?',
    }),
    defineField({
      name: 'finalCtaText',
      title: 'Final CTA text',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'finalPrimaryCta',
      title: 'Final primary CTA',
      type: 'link',
    }),
    defineField({
      name: 'finalSecondaryCta',
      title: 'Final secondary CTA',
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
      return {
        subtitle: 'Home',
        title: 'Homepage',
      }
    },
  },
})
