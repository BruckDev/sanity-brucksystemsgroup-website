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
      name: 'display',
      title: 'Display copy',
      type: 'object',
      description: 'Labels, headings, and accessibility text used around homepage content.',
      fields: [
        defineField({
          name: 'heroEyebrow',
          title: 'Hero eyebrow',
          type: 'string',
          initialValue: 'Bruck Systems Group',
        }),
        defineField({
          name: 'heroBackgroundImageAlt',
          title: 'Hero background image alt text',
          type: 'string',
          initialValue:
            'Abstract digital network background with glowing blue lines and hexagonal interface shapes.',
        }),
        defineField({
          name: 'servicesEyebrow',
          title: 'Services eyebrow',
          type: 'string',
          initialValue: 'Services overview',
        }),
        defineField({
          name: 'serviceCardLinkLabel',
          title: 'Service card link label',
          type: 'string',
          initialValue: 'View service',
        }),
        defineField({
          name: 'allServicesLinkLabel',
          title: 'All services link label',
          type: 'string',
          initialValue: 'Explore All Services',
        }),
        defineField({
          name: 'servicesAnimationAriaLabel',
          title: 'Services animation accessibility label',
          type: 'string',
          initialValue: 'Abstract blue technology animation',
        }),
        defineField({
          name: 'insightsEyebrow',
          title: 'Insights eyebrow',
          type: 'string',
          initialValue: 'Insights',
        }),
        defineField({
          name: 'caseStudiesEyebrow',
          title: 'Case studies eyebrow',
          type: 'string',
          initialValue: 'Case studies',
        }),
        defineField({
          name: 'caseStudiesTitle',
          title: 'Case studies title',
          type: 'string',
          initialValue: 'Editorial-ready client story structure',
        }),
        defineField({
          name: 'caseStudiesDescription',
          title: 'Case studies description',
          type: 'text',
          rows: 3,
          initialValue:
            'The site is prepared for future approved case studies without inventing past performance.',
        }),
        defineField({
          name: 'caseStudyPlaceholderLabel',
          title: 'Case study placeholder label',
          type: 'string',
          initialValue: 'Placeholder structure',
        }),
        defineField({
          name: 'industriesEyebrow',
          title: 'Industries eyebrow',
          type: 'string',
          initialValue: 'Industries',
        }),
        defineField({
          name: 'governmentEyebrow',
          title: 'Government eyebrow',
          type: 'string',
          initialValue: 'Government',
        }),
        defineField({
          name: 'governmentCtaLabel',
          title: 'Government CTA label',
          type: 'string',
          initialValue: 'View Government Capabilities',
        }),
        defineField({
          name: 'governmentPanelTitle',
          title: 'Government panel title',
          type: 'string',
          initialValue: 'Mission-focused support for procurement and modernization.',
        }),
        defineField({
          name: 'governmentPanelSubtitle',
          title: 'Government panel subtitle',
          type: 'string',
          initialValue: 'Government support',
        }),
        defineField({
          name: 'engineeringEyebrow',
          title: 'Engineering eyebrow',
          type: 'string',
          initialValue: 'Engineering delivery',
        }),
        defineField({
          name: 'whyUsEyebrow',
          title: 'Why us eyebrow',
          type: 'string',
          initialValue: 'Why us',
        }),
        defineField({
          name: 'finalCtaEyebrow',
          title: 'Final CTA eyebrow',
          type: 'string',
          initialValue: 'Contact',
        }),
      ],
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
      name: 'servicesVideoTitle',
      title: 'Services video title',
      type: 'string',
      initialValue: 'Complex challenges deserve smarter solutions.',
    }),
    defineField({
      name: 'servicesVideoText',
      title: 'Services video supporting text',
      type: 'text',
      rows: 4,
      initialValue:
        "At Bruck Systems, we don't just recommend solutions, we build them for you. We help organizations solve operational, technology, and business challenges by combining strategic consulting with custom software, AI, and digital transformation.",
    }),
    defineField({
      name: 'servicesVideoLinks',
      title: 'Services video links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      validation: (rule) => rule.max(3),
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
      name: 'engineeringCapabilitiesTitle',
      title: 'Engineering capabilities title',
      type: 'string',
      initialValue: 'Engineering capabilities for complex, connected systems',
    }),
    defineField({
      name: 'engineeringCapabilitiesIntro',
      title: 'Engineering capabilities intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'engineeringCapabilities',
      title: 'Engineering capabilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'text', title: 'Description', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'title', subtitle: 'text'}},
        }),
      ],
      validation: (rule) => rule.max(6),
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
