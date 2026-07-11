import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactMethod',
  title: 'Contact method',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Optional. For example mailto:hello@example.com or tel:+1...',
    }),
  ],
})
