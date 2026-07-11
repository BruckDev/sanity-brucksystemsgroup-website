import ImageBox from '@/components/ImageBox'
import {TimelineSection} from '@/components/TimelineSection'
import type {PathSegment} from '@sanity/client/csm'
import {PortableText} from 'next-sanity'
import Link from 'next/link'
import type {ReactElement} from 'react'
import {Children, cloneElement, Fragment, isValidElement} from 'react'

const urlPattern = /(https?:\/\/[^\s<]+)/g
const urlCandidatePattern = /^https?:\/\/[^\s<]+$/
const trailingPunctuationPattern = /[),.;!?]+$/

function linkifyTextNode(text: string, keyPrefix: string): React.ReactNode {
  const parts = text.split(urlPattern)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (!part) return null

    if (urlCandidatePattern.test(part)) {
      const trailingPunctuation = part.match(trailingPunctuationPattern)?.[0] ?? ''
      const href = trailingPunctuation
        ? part.slice(0, -trailingPunctuation.length)
        : part

      return (
        <Fragment key={`${keyPrefix}-url-${index}`}>
          <a
            className="underline decoration-[color:var(--accent)] underline-offset-4 transition hover:text-[color:var(--accent)]"
            href={href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {href}
          </a>
          {trailingPunctuation}
        </Fragment>
      )
    }

    return part
  })
}

function linkifyChildren(node: React.ReactNode, keyPrefix = 'node'): React.ReactNode {
  if (typeof node === 'string') {
    return linkifyTextNode(node, keyPrefix)
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => linkifyChildren(child, `${keyPrefix}-${index}`))
  }

  if (isValidElement(node)) {
    if (node.type === Link || node.type === 'a') {
      return node
    }

    const element = node as ReactElement<{children?: React.ReactNode}>
    const children = element.props?.children
    if (!children) {
      return element
    }

    return cloneElement(element, {
      children: Children.map(children, (child, index) =>
        linkifyChildren(child, `${keyPrefix}-${index}`),
      ),
    })
  }

  return node
}

export function CustomPortableText({
  id,
  type,
  path,
  paragraphClasses,
  value,
}: {
  id: string | null
  type: string | null
  path: PathSegment[]
  paragraphClasses?: string
  value: any
}) {
  const components: any = {
    block: {
      normal: ({children}) => {
        return <p className={paragraphClasses}>{linkifyChildren(children)}</p>
      },
    },
    marks: {
      link: ({children, value}: any) => {
        if (!value?.href) return children

        return (
          <Link
            className="underline decoration-[color:var(--accent)] underline-offset-4 transition hover:text-[color:var(--accent)]"
            href={value.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      image: ({value}) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox image={value} alt={value?.alt} classesWrapper="relative aspect-[16/9]" />
            {value?.caption ? (
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                {value.caption}
              </div>
            ) : null}
          </div>
        )
      },
      timeline: ({value}) => {
        const {items, _key} = value
        return (
          <TimelineSection
            key={_key}
            id={id}
            type={type}
            path={[...path, {_key}, 'items']}
            timelines={items}
          />
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
