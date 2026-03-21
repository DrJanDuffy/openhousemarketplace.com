/**
 * Primary keyword focus: SEO (Google), AEO (answer engines), GEO (generative / AI search).
 * Use in titles, meta descriptions, H1/H2, FAQ JSON-LD, and WebSite/ WebPage schema.
 * NAP and business name still come from config/gbp.ts (Google Business Profile).
 */

/** Target phrase for Summerlin + Las Vegas open house intent */
export const SEO_PRIMARY_KEYWORD = 'Summerlin Las Vegas Open Houses' as const

export const SEO_HOME_TITLE = 'Summerlin Las Vegas Open Houses | Dr. Jan Duffy Real Estate' as const

export const SEO_HOME_DESCRIPTION =
  'Summerlin Las Vegas open houses this weekend in Summerlin West—The Ridges, Red Rock Country Club, Summerlin Centre, and more. Search MLS listings, tour homes, and schedule a private showing with Dr. Jan Duffy at Open House Market Place.'

export const SEO_OPEN_HOUSES_TITLE =
  'Summerlin Las Vegas Open Houses | Weekend Tours & Private Showings' as const

export const SEO_OPEN_HOUSES_DESCRIPTION =
  "Browse Summerlin Las Vegas open houses and weekend home tours. Luxury homes, new construction, and family homes in Las Vegas's premier master-planned community. Schedule a private showing with Dr. Jan Duffy."

/** Section heading on homepage (featured listings strip) */
export const SEO_FEATURED_OPEN_HOUSES_HEADING = 'Featured Summerlin Las Vegas Open Houses This Weekend' as const

/** Open Houses hub page: FAQ for JSON-LD + visible dl (AEO) */
export const OPEN_HOUSES_PAGE_FAQS = [
  {
    question: 'When are Summerlin Las Vegas open houses?',
    answer:
      "Summerlin Las Vegas open houses are usually held on weekends (Saturday and Sunday), often from late morning through afternoon. Times vary by listing—check our featured list and Dr. Jan Duffy's home search for current dates, addresses, and hours.",
  },
  {
    question: 'How do I find Summerlin Las Vegas open houses this weekend?',
    answer:
      'Use the Open House Market Place Open Houses page, the featured weekend list on the homepage, or the MLS home search to filter by open house dates. You can also schedule a private showing with Dr. Jan Duffy if you prefer a one-on-one tour in Summerlin or Las Vegas.',
  },
  {
    question: 'What should I bring to a Summerlin open house?',
    answer:
      'Bring questions, a notepad or phone for notes, and comfortable shoes. If you may make an offer, a pre-approval letter helps. Dr. Jan Duffy can help you compare homes after touring Summerlin Las Vegas open houses.',
  },
  {
    question: 'Are there open houses in Summerlin West neighborhoods like The Ridges or Red Rock Country Club?',
    answer:
      'Yes. Summerlin Las Vegas open houses are held across Summerlin West, including The Ridges, Red Rock Country Club, Summerlin Centre, The Trails, and nearby areas. Use our neighborhood pages and search tools to find homes that match your price range and lifestyle.',
  },
] as const

/** Visible + JSON-LD FAQ for homepage (AEO / rich results) */
export const HOME_PAGE_FAQS = [
  {
    question: 'What are Summerlin Las Vegas open houses?',
    answer:
      'Summerlin Las Vegas open houses are scheduled showings of homes for sale in Summerlin, Nevada—usually on weekends—where buyers can tour a property during posted hours. Open House Market Place lists Summerlin open houses, connects you to MLS search, and helps you book a private showing with Dr. Jan Duffy (Berkshire Hathaway HomeServices Nevada Properties, License S.0197614.LLC).',
  },
  {
    question: 'Where can I find open houses in Summerlin, Las Vegas?',
    answer:
      'Open houses are held across Summerlin West and surrounding Summerlin villages, including The Ridges, Red Rock Country Club, Summerlin Centre, The Trails, and Sun City Summerlin, plus zip codes 89135, 89138, and 89144. Use this site’s Open Houses page, featured weekend list, and home search to find current Summerlin Las Vegas open houses.',
  },
  {
    question: 'How do I schedule a private showing instead of an open house?',
    answer:
      'Use the contact form, Calendly scheduling links, or call Open House Market Place at (702) 200-3422. Dr. Jan Duffy can arrange a private tour of Summerlin and Las Vegas listings that match your budget and neighborhood preferences.',
  },
] as const
