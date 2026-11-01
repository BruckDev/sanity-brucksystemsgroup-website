import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      initialValue: 'Bruck Systems Group',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brandEyebrow',
      title: 'Brand eyebrow',
      type: 'string',
      initialValue: 'Consulting and technology',
    }),
    defineField({
      name: 'headerNavigation',
      title: 'Header navigation',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
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
      name: 'contactMethods',
      title: 'Contact methods',
      type: 'array',
      of: [defineArrayMember({type: 'contactMethod'})],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'string',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      of: [defineArrayMember({type: 'footerColumn'})],
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
    }),
    defineField({
      name: 'uiText',
      title: 'UI text',
      type: 'object',
      fields: [
        defineField({
          name: 'brandEyebrow',
          title: 'Legacy brand eyebrow',
          type: 'string',
          initialValue: 'Consulting and technology',
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
          initialValue: 'Overview',
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
        defineField({
          name: 'heroStatsHeading',
          title: 'Hero statistics heading',
          type: 'string',
          initialValue: 'Key focus areas',
        }),
        defineField({
          name: 'headerContactCtaLabel',
          title: 'Header contact CTA label',
          type: 'string',
          initialValue: 'Contact Us',
        }),
        defineField({
          name: 'headerMenuToggleLabel',
          title: 'Header mobile-menu toggle label',
          type: 'string',
          initialValue: 'Toggle menu',
        }),
        defineField({
          name: 'mainNavigationLabel',
          title: 'Main navigation accessibility label',
          type: 'string',
          initialValue: 'Main navigation',
        }),
        defineField({
          name: 'mobileNavigationLabel',
          title: 'Mobile navigation accessibility label',
          type: 'string',
          initialValue: 'Mobile navigation',
        }),
        defineField({
          name: 'footerLinkedinLabel',
          title: 'Footer LinkedIn label',
          type: 'string',
          initialValue: 'LinkedIn',
        }),
        defineField({
          name: 'footerLinkedinPlaceholder',
          title: 'Footer LinkedIn placeholder',
          type: 'string',
          initialValue: 'LinkedIn profile placeholder',
        }),
        defineField({
          name: 'footerPrivacyLabel',
          title: 'Footer privacy-link label',
          type: 'string',
          initialValue: 'Privacy',
        }),
        defineField({
          name: 'footerAccessibilityLabel',
          title: 'Footer accessibility-link label',
          type: 'string',
          initialValue: 'Accessibility',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: 'Navigation, footer, contact details, and SEO',
      }
    },
  },
})
