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
    uiText{
      heroStatsHeading,
      headerContactCtaLabel,
      headerMenuToggleLabel,
      mainNavigationLabel,
      mobileNavigationLabel,
      footerLinkedinLabel,
      footerLinkedinPlaceholder,
      footerPrivacyLabel,
      footerAccessibilityLabel
    },
    ogImage,
    seo
  }
`)

export const homeQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    title,
    display{
      heroEyebrow,
      heroBackgroundImageAlt,
      servicesEyebrow,
      serviceCardLinkLabel,
      allServicesLinkLabel,
      servicesAnimationAriaLabel,
      insightsEyebrow,
      caseStudiesEyebrow,
      caseStudiesTitle,
      caseStudiesDescription,
      caseStudyPlaceholderLabel,
      industriesEyebrow,
      governmentEyebrow,
      governmentCtaLabel,
      governmentPanelTitle,
      governmentPanelSubtitle,
      engineeringEyebrow,
      whyUsEyebrow,
      finalCtaEyebrow
    },
    overview,
    heroPrimaryCta{label, href, style},
    heroSecondaryCta{label, href, style},
    heroHighlights[]{value, label},
    servicesTitle,
    servicesIntro,
    servicesVideoTitle,
    servicesVideoText,
    servicesVideoLinks[]{label, href, style},
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
      publishedAt,
      coverImage{
        ...,
        asset->
      }
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
    engineeringCapabilitiesTitle,
    engineeringCapabilitiesIntro,
    engineeringCapabilities[]{title, text},
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
    image{
      ...,
      asset->
    },
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
    display{
      heroEyebrow,
      backCta{label, href, style},
      clientProblemLabel,
      whatWeProvideLabel,
      deliverablesTitle,
      outcomesTitle,
      closingTitle,
      closingText,
      closingCta{label, href, style}
    },
    image{
      ...,
      asset->
    },
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
    display{
      heroEyebrow,
      backCta{label, href, style},
      overviewLabel,
      prioritiesTitle,
      relatedServicesLabel,
      closingTitle,
      closingText,
      closingCta{label, href, style}
    },
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
    coverImage{
      ...,
      asset->
    },
    seo
  }
`)

export const insightBySlugQuery = defineQuery(`
  *[_type == "insight" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    display{
      backCta{label, href, style},
      readTimeLabel,
      relatedServicesTitle,
      relatedIndustriesTitle,
      closingTitle,
      closingText,
      closingCta{label, href, style}
    },
    articleType,
    estimatedReadTime,
    publishedAt,
    coverImage{
      ...,
      asset->
    },
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
    display{
      heroEyebrow,
      backCta{label, href, style},
      challengeLabel,
      approachLabel,
      outcomesTitle,
      industryLabel,
      relatedServicesLabel,
      placeholderNote,
      closingCta{label, href, style}
    },
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
    display{
      heroEyebrow,
      secondaryCta{label, href, style},
      missionEyebrow,
      missionTitle,
      approachEyebrow,
      approachTitle,
      principlesEyebrow,
      principlesTitle,
      leadershipEyebrow,
      leadershipTitle
    },
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
    display{
      heroEyebrow,
      secondaryCta{label, href, style},
      capabilitiesEyebrow,
      capabilitiesTitle,
      supportAreasLabel,
      vendorInformationLabel,
      downloadCapabilityStatementLabel,
      capabilityStatementEmptyMessage,
      teamingTitle,
      relatedServicesTitle
    },
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
    relatedServices[]->{
      title,
      "slug": slug.current
    },
    cta{label, href, style},
    seo
  }
`)

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    _id,
    title,
    display{
      heroEyebrow,
      contactInformationLabel,
      importantNoteLabel
    },
    form{
      nameLabel,
      organizationLabel,
      emailLabel,
      phoneLabel,
      serviceInterestLabel,
      messageLabel,
      serviceOptions,
      defaultServiceOption,
      submitLabel,
      nameError,
      emailError,
      messageError,
      validationSummary,
      inactiveFallback
    },
    overview,
    formNote,
    seo
  }
`)

export const servicesLandingQuery = defineQuery(`
  *[_type == "servicesLanding"][0]{
    _id,
    eyebrow,
    title,
    overview,
    heroPrimaryCta{label, href, style},
    heroSecondaryCta{label, href, style},
    sectionEyebrow,
    sectionTitle,
    sectionDescription,
    deliverablesLabel,
    outcomesLabel,
    detailCtaLabel,
    seo
  }
`)

export const industriesLandingQuery = defineQuery(`
  *[_type == "industriesLanding"][0]{
    _id,
    eyebrow,
    title,
    overview,
    heroPrimaryCta{label, href, style},
    heroSecondaryCta{label, href, style},
    sectionEyebrow,
    sectionTitle,
    sectionDescription,
    governmentCta{label, href, style},
    seo
  }
`)

export const insightsLandingQuery = defineQuery(`
  *[_type == "insightsLanding"][0]{
    _id,
    eyebrow,
    title,
    overview,
    heroPrimaryCta{label, href, style},
    heroSecondaryCta{label, href, style},
    insightsEyebrow,
    insightsTitle,
    caseStudiesEyebrow,
    caseStudiesTitle,
    caseStudiesDescription,
    caseStudiesCta{label, href, style},
    seo
  }
`)

export const privacyPageQuery = defineQuery(`
  *[_type == "privacyPage"][0]{
    _id,
    eyebrow,
    title,
    overview,
    body,
    seo
  }
`)

export const accessibilityPageQuery = defineQuery(`
  *[_type == "accessibilityPage"][0]{
    _id,
    eyebrow,
    title,
    overview,
    body,
    seo
  }
`)
