function block(text: string) {
  return {
    _key: text.slice(0, 12).replace(/\s+/g, '-').toLowerCase(),
    _type: 'block' as const,
    children: [{_key: `${text.slice(0, 8)}-span`, _type: 'span' as const, marks: [], text}],
    markDefs: [],
    style: 'normal' as const,
  }
}

export function toBlocks(paragraphs: string[]) {
  return paragraphs.map(block)
}

export const fallbackSettings = {
  siteTitle: 'Bruck Systems Group',
  brandEyebrow: 'Consulting and technology',
  headerNavigation: [
    {
      label: 'Services',
      href: '/services',
      children: [
        {label: 'Digital Transformation', href: '/services/digital-transformation'},
        {label: 'Custom Software Solutions', href: '/services/custom-software-solutions'},
        {label: 'Data, Analytics and Automation', href: '/services/data-analytics-and-automation'},
        {
          label: 'Financial and Operational Advisory',
          href: '/services/financial-and-operational-advisory',
        },
        {
          label: 'Government Technology and Procurement Support',
          href: '/services/government-technology-and-procurement-support',
        },
      ],
    },
    {
      label: 'Industries',
      href: '/industries',
      children: [
        {label: 'Government and Public Sector', href: '/industries/government-and-public-sector'},
        {
          label: 'Financial and Professional Services',
          href: '/industries/financial-and-professional-services',
        },
        {
          label: 'Small and Mid-Sized Businesses',
          href: '/industries/small-and-mid-sized-businesses',
        },
        {label: 'Nonprofits', href: '/industries/nonprofits'},
        {
          label: 'Tax and Revenue Administration',
          href: '/industries/tax-and-revenue-administration',
        },
      ],
    },
    {label: 'Insights', href: '/insights'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
  ],
  contactMethods: [
    {label: 'Email', value: 'hello@brucksystems.com', href: 'mailto:hello@brucksystems.com'},
    {label: 'Phone', value: '(555) 010-2026', href: 'tel:+15550102026'},
    {label: 'Office', value: 'Headquarters information coming soon'},
  ],
  footerColumns: [
    {
      title: 'Services',
      links: [
        {label: 'Digital Transformation', href: '/services/digital-transformation'},
        {label: 'Custom Software Solutions', href: '/services/custom-software-solutions'},
        {label: 'Data, Analytics and Automation', href: '/services/data-analytics-and-automation'},
      ],
    },
    {
      title: 'Government',
      links: [
        {label: 'Government Capabilities', href: '/government'},
        {
          label: 'Procurement Support',
          href: '/services/government-technology-and-procurement-support',
        },
        {label: 'Contact Our Team', href: '/contact'},
      ],
    },
    {
      title: 'Company',
      links: [
        {label: 'About', href: '/about'},
        {label: 'Insights', href: '/insights'},
        {label: 'Privacy', href: '/privacy'},
        {label: 'Accessibility', href: '/accessibility'},
      ],
    },
  ],
  footerNote: toBlocks([
    'Bruck Systems Group is a modern consulting and technology company supporting public agencies, businesses, and mission-driven organizations.',
  ]),
  linkedin: '',
  seo: {
    title: 'Bruck Systems Group',
    description:
      'Bruck Systems Group helps public- and private-sector organizations modernize operations, build effective technology solutions, and turn complex challenges into measurable results.',
  },
}

export const fallbackServices = [
  {
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    summary: 'Align strategy, operations, and technology around a clear roadmap for modernization.',
    clientProblem: toBlocks([
      'Organizations often know change is needed but struggle to prioritize initiatives, align stakeholders, and move from planning into delivery.',
    ]),
    whatWeProvide: toBlocks([
      'Bruck Systems Group helps leaders define practical transformation priorities, sequence work around business value, and build the governance needed to sustain momentum.',
    ]),
    deliverables: [
      'Transformation roadmaps',
      'Operating model recommendations',
      'Implementation plans',
    ],
    outcomes: ['Clearer decision-making', 'Faster execution', 'Reduced delivery risk'],
    featuredStats: [
      {value: 'Roadmap-first', label: 'Planning tied to execution'},
      {value: 'Cross-functional', label: 'Strategy, process, and technology aligned'},
    ],
    cta: {label: 'Discuss transformation priorities', href: '/contact', style: 'primary'},
    seo: {
      title: 'Digital Transformation Services | Bruck Systems Group',
      description:
        'Modernization strategy, operating model design, and implementation planning for public and private sector organizations.',
    },
  },
  {
    title: 'Custom Software Solutions',
    slug: 'custom-software-solutions',
    summary:
      'Design and deliver software tailored to operational realities, compliance needs, and end users.',
    clientProblem: toBlocks([
      'Off-the-shelf tools can leave critical workflow gaps, while legacy systems often slow delivery and frustrate staff and customers.',
    ]),
    whatWeProvide: toBlocks([
      'We translate business requirements into secure, maintainable applications with a focus on usability, integration, and long-term supportability.',
    ]),
    deliverables: ['Requirements definition', 'Application design', 'Modern web platforms'],
    outcomes: ['Better user experience', 'Streamlined workflows', 'Lower manual effort'],
    featuredStats: [
      {value: 'User-centered', label: 'Built around real operational needs'},
      {value: 'Maintainable', label: 'Designed for long-term change'},
    ],
    cta: {label: 'Plan a software initiative', href: '/contact', style: 'primary'},
    seo: {
      title: 'Custom Software Solutions | Bruck Systems Group',
      description:
        'Custom application strategy, design, and delivery for secure, maintainable digital services.',
    },
  },
  {
    title: 'Data, Analytics and Automation',
    slug: 'data-analytics-and-automation',
    summary:
      'Turn fragmented data and manual processes into decision-ready reporting and efficient operations.',
    clientProblem: toBlocks([
      'Leaders need reliable data and repeatable processes, but many teams still depend on spreadsheets, disconnected systems, and manual handoffs.',
    ]),
    whatWeProvide: toBlocks([
      'We design data flows, reporting models, and automation opportunities that improve visibility while reducing administrative burden.',
    ]),
    deliverables: [
      'Data integration plans',
      'Dashboards and reporting',
      'Workflow automation maps',
    ],
    outcomes: ['Improved visibility', 'Fewer manual tasks', 'More timely decisions'],
    featuredStats: [
      {value: 'Decision-ready', label: 'Reporting built for action'},
      {value: 'Workflow-aware', label: 'Automation grounded in operations'},
    ],
    cta: {label: 'Explore data and automation support', href: '/contact', style: 'primary'},
    seo: {
      title: 'Data, Analytics and Automation | Bruck Systems Group',
      description:
        'Data integration, analytics, and workflow automation support for organizations seeking better visibility and efficiency.',
    },
  },
  {
    title: 'Financial and Operational Advisory',
    slug: 'financial-and-operational-advisory',
    summary:
      'Strengthen planning, performance, and execution across finance and core business operations.',
    clientProblem: toBlocks([
      'Growth, budget pressure, and operational complexity can make it difficult to maintain control while still investing in strategic priorities.',
    ]),
    whatWeProvide: toBlocks([
      'Bruck Systems Group helps organizations assess operating performance, clarify process bottlenecks, and support decisions with actionable financial and operational insight.',
    ]),
    deliverables: [
      'Operational assessments',
      'Performance improvement plans',
      'Financial process analysis',
    ],
    outcomes: ['Improved performance', 'Clearer operating visibility', 'Better resource alignment'],
    featuredStats: [
      {value: 'Operationally grounded', label: 'Recommendations linked to day-to-day work'},
      {value: 'Decision-focused', label: 'Analysis designed for leadership action'},
    ],
    cta: {label: 'Talk through an advisory need', href: '/contact', style: 'primary'},
    seo: {
      title: 'Financial and Operational Advisory | Bruck Systems Group',
      description:
        'Operational assessments, financial process support, and performance improvement planning.',
    },
  },
  {
    title: 'Government Technology and Procurement Support',
    slug: 'government-technology-and-procurement-support',
    summary:
      'Support modernization, procurement strategy, and delivery coordination for government environments.',
    clientProblem: toBlocks([
      'Public-sector initiatives face complex approvals, procurement constraints, and the need to modernize without disrupting essential services.',
    ]),
    whatWeProvide: toBlocks([
      'We help agencies and partners shape practical modernization efforts, support RFI and RFP development, and contribute structured delivery support across technology initiatives.',
    ]),
    deliverables: [
      'Procurement support materials',
      'Modernization planning',
      'Workflow and systems analysis',
    ],
    outcomes: [
      'Clearer procurement inputs',
      'Stronger modernization planning',
      'Reduced coordination friction',
    ],
    featuredStats: [
      {value: 'Mission-aware', label: 'Designed for public-sector realities'},
      {value: 'Procurement-ready', label: 'Support from planning through response'},
    ],
    cta: {label: 'Start a government inquiry', href: '/contact', style: 'primary'},
    seo: {
      title: 'Government Technology and Procurement Support | Bruck Systems Group',
      description:
        'Government modernization, procurement support, workflow improvement, and custom technology planning.',
    },
  },
]

export const fallbackIndustries = [
  {
    title: 'Government and Public Sector',
    slug: 'government-and-public-sector',
    summary:
      'Modernization support for agencies balancing service delivery, compliance, and operational efficiency.',
    overview: toBlocks([
      'Public organizations need modernization strategies that work within procurement constraints, oversight expectations, and mission-critical operating environments.',
    ]),
    priorities: [
      'Service modernization',
      'Operational efficiency',
      'Data visibility',
      'Delivery coordination',
    ],
    cta: {label: 'View government capabilities', href: '/government', style: 'secondary'},
  },
  {
    title: 'Financial and Professional Services',
    slug: 'financial-and-professional-services',
    summary:
      'Support for firms seeking better workflows, reporting, client-facing systems, and scalable operations.',
    overview: toBlocks([
      'Regulated and service-oriented businesses need reliable systems, strong process control, and a technology posture that supports growth without creating unnecessary complexity.',
    ]),
    priorities: [
      'Workflow optimization',
      'Reporting and analytics',
      'Client experience',
      'Process modernization',
    ],
    cta: {label: 'Discuss a business initiative', href: '/contact', style: 'secondary'},
    services: [],
    seo: {
      title: 'Financial and Professional Services | Bruck Systems Group',
      description:
        'Support for financial and professional services organizations seeking stronger operations and technology alignment.',
    },
  },
  {
    title: 'Small and Mid-Sized Businesses',
    slug: 'small-and-mid-sized-businesses',
    summary:
      'Practical transformation and technology support for organizations that need progress without enterprise overhead.',
    overview: toBlocks([
      'Growing businesses often need stronger systems and clearer processes, but they also need solutions proportionate to their scale, budget, and pace of change.',
    ]),
    priorities: [
      'Scalable systems',
      'Process efficiency',
      'Targeted automation',
      'Execution planning',
    ],
    cta: {label: 'Explore services', href: '/services', style: 'secondary'},
    services: [],
    seo: {
      title: 'Small and Mid-Sized Businesses | Bruck Systems Group',
      description: 'Practical consulting and technology support for growing businesses.',
    },
  },
  {
    title: 'Nonprofits',
    slug: 'nonprofits',
    summary:
      'Mission-aligned support for organizations managing constrained resources, reporting requirements, and service delivery goals.',
    overview: toBlocks([
      'Nonprofits need technology and operating models that improve impact, streamline internal work, and support transparent decision-making.',
    ]),
    priorities: [
      'Program operations',
      'Resource stewardship',
      'Reporting support',
      'Service delivery workflows',
    ],
    cta: {label: 'Talk to our team', href: '/contact', style: 'secondary'},
    services: [],
    seo: {
      title: 'Nonprofits | Bruck Systems Group',
      description: 'Operational and technology support for nonprofit organizations.',
    },
  },
  {
    title: 'Tax and Revenue Administration',
    slug: 'tax-and-revenue-administration',
    summary:
      'Structured support for tax administration modernization, workflow improvement, and data integration.',
    overview: toBlocks([
      'Revenue organizations depend on clear workflows, integrated information, and technology that can support both internal efficiency and public-facing service delivery.',
    ]),
    priorities: [
      'Tax administration modernization',
      'Document workflows',
      'System integration',
      'Application support',
    ],
    cta: {label: 'Review government support', href: '/government', style: 'secondary'},
    services: [],
    seo: {
      title: 'Tax and Revenue Administration | Bruck Systems Group',
      description:
        'Tax administration modernization, workflow improvement, and technology support.',
    },
  },
]

export const fallbackInsights = [
  {
    title: 'Designing modernization roadmaps that organizations can actually execute',
    slug: 'designing-modernization-roadmaps',
    excerpt:
      'A practical perspective on sequencing modernization work around decision-making, delivery capacity, and measurable outcomes.',
    articleType: 'Article',
    estimatedReadTime: '4 min read',
    publishedAt: '2026-07-01T09:00:00.000Z',
    body: toBlocks([
      'Modernization efforts stall when strategy, operations, and delivery planning are treated as separate tracks.',
      'A stronger roadmap connects business priorities to implementation realities, clarifies near-term decisions, and creates visible momentum early.',
    ]),
    seo: {
      title: 'Modernization Roadmaps | Bruck Systems Group',
      description:
        'A practical perspective on building modernization roadmaps that move from strategy into execution.',
    },
    relatedServices: [],
    relatedIndustries: [],
  },
  {
    title: 'Where workflow automation creates the most value first',
    slug: 'workflow-automation-value-first',
    excerpt:
      'How to identify automation opportunities that reduce friction without introducing unnecessary complexity.',
    articleType: 'Perspective',
    estimatedReadTime: '5 min read',
    publishedAt: '2026-06-18T09:00:00.000Z',
    body: toBlocks([
      'Automation works best when teams start with high-friction workflows that are repeatable, measurable, and clearly owned.',
      'The strongest opportunities improve turnaround time, reduce handoffs, and make information easier to trust.',
    ]),
    seo: {
      title: 'Workflow Automation Value | Bruck Systems Group',
      description:
        'How to prioritize workflow automation initiatives for measurable operational value.',
    },
    relatedServices: [],
    relatedIndustries: [],
  },
]

export const fallbackCaseStudies = [
  {
    title: 'Operational visibility for a cross-functional service environment',
    slug: 'operational-visibility-cross-functional-service-environment',
    excerpt:
      'Illustrative placeholder case-study structure for future client-approved examples managed through Sanity.',
    challenge: toBlocks([
      'Detailed client stories, logos, and measurable results should only be added after they are approved for publication.',
    ]),
    approach: toBlocks([
      'This section is structured to support editor-managed case studies in the future, including challenge, approach, outcomes, and metrics.',
    ]),
    outcomes: [
      'Placeholder content only',
      'Awaiting approved client example',
      'Ready for Sanity-managed updates',
    ],
    metrics: [
      {value: 'Asset needed', label: 'Replace with approved results'},
      {value: 'CMS-ready', label: 'Case study fields are already built'},
    ],
    body: toBlocks([
      'Use this template to publish future case studies once client approval, wording, and any supporting assets are available.',
    ]),
    seo: {
      title: 'Case Study Placeholder | Bruck Systems Group',
      description: 'Editorial case study structure prepared for future approved examples.',
    },
    industry: null,
    services: [],
  },
]

export const fallbackLeaders = [
  {
    name: 'Leadership profile coming soon',
    role: 'Executive leadership placeholder',
    shortBio:
      'Add approved leadership biographies, photos, and role details in Sanity when they are available.',
    fullBio: toBlocks([
      'This section intentionally uses placeholder copy until leadership biographies and photos are ready for publication.',
    ]),
  },
]

export const fallbackHome = {
  title: 'Strategy, technology and execution-working as one.',
  overview: toBlocks([
    'Bruck Systems Group helps public- and private-sector organizations modernize operations, build effective technology solutions and turn complex challenges into measurable results.',
  ]),
  heroPrimaryCta: {label: 'Explore Our Services', href: '/services', style: 'primary'},
  heroSecondaryCta: {label: 'Talk to Our Team', href: '/contact', style: 'secondary'},
  heroHighlights: [
    {value: 'Public + private', label: 'Experience designed for both sectors'},
    {value: 'Execution-minded', label: 'Strategy grounded in delivery'},
    {value: 'CMS-ready', label: 'Content can be updated through Sanity'},
  ],
  servicesTitle: 'Services that connect strategy to implementation',
  servicesIntro: toBlocks([
    'From modernization strategy to software delivery and procurement support, Bruck Systems Group brings a practical, cross-functional approach to complex work.',
  ]),
  servicesVideoTitle: 'Complex challenges deserve smarter solutions.',
  servicesVideoText:
    "At Bruck Systems, we don't just recommend solutions, we build them for you. We help organizations solve operational, technology, and business challenges by combining strategic consulting with custom software, AI, and digital transformation.",
  servicesVideoLinks: [
    {label: 'Our approach', href: '/about', style: 'secondary'},
    {label: 'Client stories', href: '/insights/case-studies', style: 'secondary'},
    {label: 'Insights', href: '/insights', style: 'secondary'},
  ],
  insightsTitle: 'Insights and case studies',
  insightsIntro: toBlocks([
    'An editorial area built for perspectives, reports, and future client-approved case studies.',
  ]),
  industriesTitle: 'Industries served',
  industriesIntro: toBlocks([
    'Our approach is designed for organizations where operational clarity, accountability, and measurable progress matter.',
  ]),
  governmentTitle: 'Government-focused capabilities',
  governmentIntro: toBlocks([
    'Bruck Systems Group supports agencies and partners with modernization planning, workflow improvement, data integration, and procurement-related delivery support.',
  ]),
  governmentCapabilities: [
    'Technology modernization',
    'Workflow and document automation',
    'Data integration',
    'Tax administration modernization',
    'Custom application development',
    'RFI and RFP support',
    'Subcontracting and teaming support',
  ],
  engineeringCapabilitiesTitle: 'Engineering capabilities for complex, connected systems',
  engineeringCapabilitiesIntro: toBlocks([
    'Bruck Systems Group combines hands-on architecture and delivery experience to build, modernize, integrate, and operate business-critical software.',
  ]),
  engineeringCapabilities: [
    {
      title: 'Full-stack application delivery',
      text: 'Design and deliver web, native-client, and service-based applications from database architecture through user experience and production support.',
    },
    {
      title: 'Legacy modernization',
      text: 'Evolve established platforms, codebases, and workflows while protecting compatibility, reducing risk, and creating a practical path forward.',
    },
    {
      title: 'Data platforms and performance',
      text: 'Model, integrate, and optimize SQL Server and related data platforms for reliable operations, reporting, high-volume workflows, and secure file handling.',
    },
    {
      title: 'Systems integration and automation',
      text: 'Connect business systems, APIs, webhooks, queues, notifications, and external platforms to remove manual handoffs and improve operational visibility.',
    },
    {
      title: 'Security and resilient operations',
      text: 'Build in authorization, certificate-based trust, OAuth 2.0, JWT, secure communications, background services, and operational safeguards from the start.',
    },
    {
      title: 'Technical leadership and delivery',
      text: 'Lead architecture, developer workflows, source-control transitions, and cross-functional delivery with a focus on maintainable systems and measurable progress.',
    },
  ],
  whyUsTitle: 'Why Bruck Systems Group',
  whyUsCards: [
    {
      title: 'Strategic and technical fluency',
      text: 'We bridge strategy, operations, data, and software delivery so decisions translate into practical execution.',
    },
    {
      title: 'Designed for complex environments',
      text: 'Our positioning fits regulated, mission-driven, and cross-functional organizations that need disciplined progress.',
    },
    {
      title: 'Professional without unnecessary complexity',
      text: 'We focus on clarity, measurable outcomes, and solutions proportionate to the client’s context.',
    },
  ],
  finalCtaTitle: 'Bring structure and momentum to your next initiative',
  finalCtaText: toBlocks([
    'Whether you are modernizing systems, improving workflows, or planning a new digital service, Bruck Systems Group can help shape the path forward.',
  ]),
  finalPrimaryCta: {label: 'Contact Us', href: '/contact', style: 'primary'},
  finalSecondaryCta: {label: 'View Government Support', href: '/government', style: 'secondary'},
}

export const fallbackAbout = {
  title: 'About Bruck Systems Group',
  overview: toBlocks([
    'Bruck Systems Group is a modern consulting and technology company serving government agencies, private businesses, and nonprofit organizations.',
  ]),
  mission: toBlocks([
    'Our mission is to help organizations modernize responsibly, work more effectively, and make progress on high-impact initiatives with clarity and confidence.',
  ]),
  leadershipIntro: toBlocks([
    'Leadership biographies can be updated in Sanity as approved profiles become available.',
  ]),
  principles: [
    {
      title: 'Clarity over noise',
      text: 'We prioritize structured thinking, direct communication, and practical next steps.',
    },
    {
      title: 'Execution matters',
      text: 'Recommendations should be realistic, measurable, and usable by the teams responsible for delivery.',
    },
    {
      title: 'Context-first solutions',
      text: 'We shape technology and operational change around the realities of each organization.',
    },
  ],
  approach: [
    {title: 'Assess', text: 'Clarify goals, constraints, risks, and current-state realities.'},
    {
      title: 'Design',
      text: 'Translate priorities into a practical roadmap, solution concept, or decision framework.',
    },
    {
      title: 'Deliver',
      text: 'Support implementation with an emphasis on coordination, quality, and measurable value.',
    },
  ],
  cta: {label: 'Talk to Our Team', href: '/contact', style: 'primary'},
  seo: {
    title: 'About | Bruck Systems Group',
    description:
      'Learn about Bruck Systems Group, our mission, operating principles, and approach to client engagements.',
  },
}

export const fallbackGovernment = {
  title: 'Government Technology and Procurement Support',
  overview: toBlocks([
    'Bruck Systems Group supports public-sector modernization with a disciplined approach to operations, technology planning, workflow improvement, and procurement-aligned execution support.',
  ]),
  capabilities: [
    {
      title: 'Technology modernization',
      text: 'Assess legacy environments, prioritize opportunities, and shape practical modernization roadmaps.',
    },
    {
      title: 'Workflow and document automation',
      text: 'Reduce manual effort and improve consistency across intake, review, routing, and approvals.',
    },
    {
      title: 'Data integration',
      text: 'Connect systems and reporting flows to improve visibility and reduce reconciliation overhead.',
    },
    {
      title: 'Tax administration modernization',
      text: 'Support revenue-related workflows, service delivery, and operational improvement initiatives.',
    },
    {
      title: 'Custom application development',
      text: 'Plan and deliver secure, maintainable applications tailored to mission needs.',
    },
    {
      title: 'RFI and RFP support',
      text: 'Contribute structured inputs, solution framing, and delivery perspectives for procurements.',
    },
  ],
  supportAreas: [
    'Modernization planning',
    'Requirements support',
    'Workflow redesign',
    'Application strategy',
    'Data and reporting coordination',
    'Subcontracting and teaming support',
  ],
  vendorInformation: toBlocks([
    'Vendor profile details, procurement identifiers, and downloadable capability documents should be added only when they are approved for publication.',
  ]),
  teaming: toBlocks([
    'Bruck Systems Group is open to conversations regarding subcontracting and teaming opportunities aligned with our service areas and delivery capabilities.',
  ]),
  cta: {label: 'Start a Government Inquiry', href: '/contact', style: 'primary'},
  seo: {
    title: 'Government Support | Bruck Systems Group',
    description:
      'Government modernization, workflow automation, data integration, custom software, and procurement support.',
  },
}

export const fallbackContact = {
  title: 'Contact Bruck Systems Group',
  overview: toBlocks([
    'Use the form below to share your needs, timelines, and areas of interest. A live submission handler has not been connected yet, so this form currently demonstrates the experience and validation states only.',
  ]),
  formNote:
    'This form design is not connected to an email inbox or CRM yet. Add a real submission handler before presenting it as a live contact channel.',
  seo: {
    title: 'Contact | Bruck Systems Group',
    description:
      'Get in touch with Bruck Systems Group about services, partnerships, or government-related inquiries.',
  },
}

export const fallbackServicesLanding = {
  eyebrow: 'Services',
  title: 'Consulting and technology services designed for real operational progress.',
  overview: toBlocks([
    'Bruck Systems Group helps organizations modernize responsibly, build fit-for-purpose software, improve visibility through data, and move initiatives from planning into execution.',
  ]),
  heroPrimaryCta: {label: 'Talk to Our Team', href: '/contact', style: 'primary'},
  heroSecondaryCta: {label: 'View Government Support', href: '/government', style: 'secondary'},
  sectionEyebrow: 'Capabilities',
  sectionTitle: 'Five core service areas',
  sectionDescription:
    'Each service is structured around client challenges, practical deliverables, and measurable business outcomes.',
  deliverablesLabel: 'Example deliverables',
  outcomesLabel: 'Expected outcomes',
  detailCtaLabel: 'Read More',
  seo: {
    title: 'Services | Bruck Systems Group',
    description:
      'Explore Bruck Systems Group services across digital transformation, custom software, analytics, advisory, and government support.',
  },
}

export const fallbackIndustriesLanding = {
  eyebrow: 'Industries',
  title: 'Sector-aware support for organizations with real constraints and real stakes.',
  overview: toBlocks([
    'Bruck Systems Group serves public agencies, private businesses, and nonprofit organizations with a practical approach to modernization, software, operations, and delivery support.',
  ]),
  heroPrimaryCta: {label: 'Explore Services', href: '/services', style: 'primary'},
  heroSecondaryCta: {label: 'Contact Us', href: '/contact', style: 'secondary'},
  sectionEyebrow: 'Industries',
  sectionTitle: 'Industries served',
  sectionDescription: toBlocks([
    'Our approach is designed for organizations where operational clarity, accountability, and measurable progress matter.',
  ]),
  governmentCta: {label: 'View Government Capabilities', href: '/government', style: 'secondary'},
  seo: {
    title: 'Industries | Bruck Systems Group',
    description:
      'See how Bruck Systems Group supports government, regulated, mission-driven, and growth-oriented organizations.',
  },
}

export const fallbackInsightsLanding = {
  eyebrow: 'Insights',
  title: 'Editorial content for leaders navigating complex operational and technology decisions.',
  overview: toBlocks([
    'This area is structured for articles, reports, perspectives, and case studies managed through Sanity.',
  ]),
  heroPrimaryCta: {label: 'Contact Us', href: '/contact', style: 'primary'},
  heroSecondaryCta: {label: 'Explore Services', href: '/services', style: 'secondary'},
  insightsEyebrow: 'Articles and reports',
  insightsTitle: 'Latest insights',
  caseStudiesEyebrow: 'Case studies',
  caseStudiesTitle: 'Prepared for future approved examples',
  caseStudiesDescription:
    'No past-performance claims are published here unless that information is provided and approved.',
  caseStudiesCta: {label: 'Discuss an Initiative', href: '/contact', style: 'secondary'},
  seo: {
    title: 'Insights | Bruck Systems Group',
    description:
      'Editorial insights, perspectives, reports, and future case studies from Bruck Systems Group.',
  },
}

export const fallbackPrivacyPage = {
  eyebrow: 'Privacy',
  title: 'Privacy information placeholder',
  overview: toBlocks([
    'Replace this page with organization-specific privacy language once legal and operational requirements are confirmed.',
  ]),
  body: toBlocks([
    'This placeholder page exists so the site includes a clear privacy destination in the footer. Before launch, add approved privacy language covering data collection, contact forms, analytics, and any third-party services used on the website.',
  ]),
  seo: {
    title: 'Privacy | Bruck Systems Group',
    description: 'Placeholder privacy information for the Bruck Systems Group website.',
  },
}

export const fallbackAccessibilityPage = {
  eyebrow: 'Accessibility',
  title: 'Accessibility statement placeholder',
  overview: toBlocks([
    'This page can be replaced with a formal accessibility statement when preferred language and support contact details are available.',
  ]),
  body: toBlocks([
    'The website has been built with responsive layouts, visible focus states, readable contrast, and keyboard-friendly navigation. Before launch, add the organization’s preferred accessibility contact method and any formal policy text required for your audience.',
  ]),
  seo: {
    title: 'Accessibility | Bruck Systems Group',
    description: 'Accessibility commitment placeholder for the Bruck Systems Group website.',
  },
}
