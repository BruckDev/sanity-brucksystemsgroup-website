import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL or path',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'children',
      title: 'Sub-items',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
    }),
  ],
})
