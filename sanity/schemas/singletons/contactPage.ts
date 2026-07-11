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
