import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    siteTitle,
    brandEyebrow,
    headerNavigation[]{
      label,
      href,
      description,
      children[]{
        label,
        href,
        style
      }
    },
    contactMethods[]{
      label,
      value,
      href
    },
    linkedin,
    footerColumns[]{
      title,
      body,
      links[]{
        label,
        href,
        style
      }
    },
    footerNote,
    ogImage,
    seo
  }
`)

export const homeQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    title,
    overview,
    heroPrimaryCta{label, href, style},
    heroSecondaryCta{label, href, style},
    heroHighlights[]{value, label},
    servicesTitle,
    servicesIntro,
    featuredServices[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    },
    insightsTitle,
    insightsIntro,
    featuredInsights[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      articleType,
      estimatedReadTime,
      publishedAt
    },
    featuredCaseStudies[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt
    },
    industriesTitle,
    industriesIntro,
    featuredIndustries[]->{
      _id,
      title,
      "slug": slug.current,
      summary
    },
    governmentTitle,
    governmentIntro,
    governmentCapabilities,
    whyUsTitle,
    whyUsCards[]{
      title,
      text
    },
    finalCtaTitle,
    finalCtaText,
    finalPrimaryCta{label, href, style},
    finalSecondaryCta{label, href, style},
    seo
  }
`)

export const servicesQuery = defineQuery(`
  *[_type == "service"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    summary,
    clientProblem,
    whatWeProvide,
    deliverables,
    outcomes,
    featuredStats[]{value, label},
    cta{label, href, style},
    seo
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    clientProblem,
    whatWeProvide,
    deliverables,
    outcomes,
    featuredStats[]{value, label},
    cta{label, href, style},
    seo
  }
`)

export const industriesQuery = defineQuery(`
  *[_type == "industry"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    summary,
    overview,
    priorities,
    services[]->{
      title,
      "slug": slug.current
    },
    cta{label, href, style},
    seo
  }
`)

export const industryBySlugQuery = defineQuery(`
  *[_type == "industry" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    overview,
    priorities,
    services[]->{
      title,
      "slug": slug.current
    },
    cta{label, href, style},
    seo
  }
`)

export const insightsQuery = defineQuery(`
  *[_type == "insight"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    articleType,
    estimatedReadTime,
    publishedAt,
    seo
  }
`)

export const insightBySlugQuery = defineQuery(`
  *[_type == "insight" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    articleType,
    estimatedReadTime,
    publishedAt,
    body,
    relatedServices[]->{
      title,
      "slug": slug.current
    },
    relatedIndustries[]->{
      title,
      "slug": slug.current
    },
    seo
  }
`)

export const caseStudiesQuery = defineQuery(`
  *[_type == "caseStudy"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    seo
  }
`)

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    challenge,
    approach,
    outcomes,
    metrics[]{value, label},
    body,
    industry->{
      title,
      "slug": slug.current
    },
    services[]->{
      title,
      "slug": slug.current
    },
    seo
  }
`)

export const leadersQuery = defineQuery(`
  *[_type == "leader"] | order(name asc){
    _id,
    name,
    role,
    shortBio,
    headshot,
    fullBio
  }
`)

export const aboutQuery = defineQuery(`
  *[_type == "about"][0]{
    _id,
    title,
    overview,
    mission,
    leadershipIntro,
    principles[]{
      title,
      text
    },
    approach[]{
      title,
      text
    },
    cta{label, href, style},
    seo
  }
`)

export const governmentQuery = defineQuery(`
  *[_type == "governmentPage"][0]{
    _id,
    title,
    overview,
    capabilities[]{
      title,
      text
    },
    supportAreas,
    vendorInformation,
    capabilityStatement{
      asset->
    },
    teaming,
    cta{label, href, style},
    seo
  }
`)

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    _id,
    title,
    overview,
    formNote,
    seo
  }
`)
