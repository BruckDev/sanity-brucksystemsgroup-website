import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'governmentPage',
  title: 'Government Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Government Technology and Procurement Support',
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
        defineField({name: 'capabilitiesEyebrow', title: 'Capabilities eyebrow', type: 'string'}),
        defineField({name: 'capabilitiesTitle', title: 'Capabilities title', type: 'string'}),
        defineField({name: 'supportAreasLabel', title: 'Support areas label', type: 'string'}),
        defineField({
          name: 'vendorInformationLabel',
          title: 'Vendor information label',
          type: 'string',
        }),
        defineField({
          name: 'downloadCapabilityStatementLabel',
          title: 'Capability statement download label',
          type: 'string',
        }),
        defineField({
          name: 'capabilityStatementEmptyMessage',
          title: 'Capability statement empty message',
          type: 'text',
          rows: 3,
        }),
        defineField({name: 'teamingTitle', title: 'Teaming title', type: 'string'}),
        defineField({
          name: 'relatedServicesTitle',
          title: 'Related services title',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
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
      name: 'supportAreas',
      title: 'Support areas',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'vendorInformation',
      title: 'Vendor information',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'capabilityStatement',
      title: 'Capability statement PDF',
      type: 'file',
    }),
    defineField({
      name: 'teaming',
      title: 'Teaming and subcontracting',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'relatedServices',
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
  preview: {
    prepare() {
      return {title: 'Government Page'}
    },
  },
})
