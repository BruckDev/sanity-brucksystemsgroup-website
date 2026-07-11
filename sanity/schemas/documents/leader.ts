import {DocumentIcon, ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Leadership Profile',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short bio',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    defineField({
      name: 'fullBio',
      title: 'Full bio',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})
