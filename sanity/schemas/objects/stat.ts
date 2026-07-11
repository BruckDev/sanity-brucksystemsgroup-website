import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stat',
  title: 'Stat or highlight',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
