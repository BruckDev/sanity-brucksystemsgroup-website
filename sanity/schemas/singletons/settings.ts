import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'home',
            },
            {
              type: 'page',
            },
            {
              type: 'project',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      description: 'This is a block of text that will be displayed at the bottom of the page.',
      title: 'Footer Info',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'uiText',
      title: 'Interface text',
      type: 'object',
      fields: [
        defineField({
          name: 'brandEyebrow',
          title: 'Brand eyebrow',
          type: 'string',
          initialValue: 'Content Architecture',
        }),
        defineField({
          name: 'fallbackSiteTitle',
          title: 'Fallback site title',
          type: 'string',
          initialValue: 'Bruck Systems Group',
        }),
        defineField({
          name: 'sectionEyebrow',
          title: 'Section eyebrow',
          type: 'string',
          initialValue: 'System Overview',
        }),
        defineField({
          name: 'untitledFallback',
          title: 'Untitled fallback',
          type: 'string',
          initialValue: 'Untitled',
        }),
        defineField({
          name: 'projectDurationLabel',
          title: 'Project duration label',
          type: 'string',
          initialValue: 'Duration',
        }),
        defineField({
          name: 'projectClientLabel',
          title: 'Project client label',
          type: 'string',
          initialValue: 'Client',
        }),
        defineField({
          name: 'projectSiteLabel',
          title: 'Project site label',
          type: 'string',
          initialValue: 'Site',
        }),
        defineField({
          name: 'projectTagsLabel',
          title: 'Project tags label',
          type: 'string',
          initialValue: 'Tags',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: 'Menu Items, Footer Info, and Open Graph Image',
      }
    },
  },
})
