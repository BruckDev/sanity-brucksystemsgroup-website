import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact Bruck Systems Group',
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
        defineField({
          name: 'contactInformationLabel',
          title: 'Contact information label',
          type: 'string',
        }),
        defineField({name: 'importantNoteLabel', title: 'Important note label', type: 'string'}),
      ],
    }),
    defineField({
      name: 'form',
      title: 'Contact form copy',
      type: 'object',
      fields: [
        defineField({name: 'nameLabel', title: 'Name label', type: 'string'}),
        defineField({name: 'organizationLabel', title: 'Organization label', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email label', type: 'string'}),
        defineField({name: 'phoneLabel', title: 'Phone label', type: 'string'}),
        defineField({
          name: 'serviceInterestLabel',
          title: 'Service interest label',
          type: 'string',
        }),
        defineField({name: 'messageLabel', title: 'Message label', type: 'string'}),
        defineField({
          name: 'serviceOptions',
          title: 'Service options',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          options: {layout: 'tags'},
        }),
        defineField({
          name: 'defaultServiceOption',
          title: 'Default service option',
          type: 'string',
        }),
        defineField({name: 'submitLabel', title: 'Submit label', type: 'string'}),
        defineField({name: 'nameError', title: 'Name validation error', type: 'string'}),
        defineField({name: 'emailError', title: 'Email validation error', type: 'string'}),
        defineField({name: 'messageError', title: 'Message validation error', type: 'string'}),
        defineField({name: 'validationSummary', title: 'Validation summary', type: 'string'}),
        defineField({
          name: 'inactiveFallback',
          title: 'Inactive form fallback',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'formNote',
      title: 'Form note',
      type: 'text',
      rows: 3,
      initialValue:
        'This form design is ready for a live handler, but submissions are not enabled until an email or CRM destination is connected.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
