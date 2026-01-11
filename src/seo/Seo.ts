/**
 * Seo
 */

/* Imports */

import type { SeoSchema } from './seoTypes.js'
import type { Item } from '../global/globalTypes.js'
import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderMeta } from '@alanizcreative/formation-static/render/renderTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { setSeoSitemapItem } from './seoSitemap.js'
import { config } from '../config/config.js'

/**
 * Additional schema data.
 *
 * @type {SeoSchema}
 */
const seoSchema: SeoSchema = new Map()

/**
 * Output head link and meta tags.
 *
 * @param {RenderMeta} meta
 * @param {Item} itemData
 * @param {string} assetsLink
 * @param {boolean} [home=false]
 * @return {string}
 */
const Seo = (meta: RenderMeta, itemData: Item, assetsLink: string, home: boolean = false): string => {
  /* Meta */

  const {
    url,
    paginationTitle,
    description,
    image,
    canonical,
    canonicalParams,
    prev,
    next,
    index = true
  } = meta

  let { title } = meta

  /* Data */

  const { hero, date, dateModified } = itemData

  /* Output */

  let output = ''

  /* Locale */

  const locale = 'en-CA'

  /* Title */

  if (isStringStrict(paginationTitle)) {
    title = `${title} - ${paginationTitle}`
  }

  title = `${title} | ${config.title}`
  output += `<title>${title}</title>`

  /* Description */

  output += `<meta name="description" content="${isStringStrict(description) ? description : config.meta.description}">`

  /* Robots */

  output += `<meta name="robots" content="${!index || config.env.dev ? 'noindex, nofollow' : 'index, follow'}">`

  /* Canonical */

  if (isStringStrict(canonical) && index) {
    output += `<link rel="canonical" href="${canonical}${isStringStrict(canonicalParams) ? canonicalParams : ''}">`
  }

  /* Prev */

  if (isStringStrict(prev)) {
    output += `<link rel="prev" href="${prev}">`
  }

  /* Next */

  if (isStringStrict(next)) {
    output += `<link rel="next" href="${next}">`
  }

  /* Image */

  let imageLink = `${assetsLink}${config.meta.image}`

  if (image) {
    imageLink = `${assetsLink}${image}`
  }

  /* Hero */

  const heroImage = hero?.image

  let hasHero = false
  let heroImageId = ''
  let heroImageLink = ''
  let heroImageWidth = 0
  let heroImageHeight = 0

  if (isObjectStrict(heroImage)) {
    const {
      url: heroLink,
      width: heroWidth,
      height: heroHeight
    } = heroImage

    if (heroLink && heroWidth && heroHeight) {
      hasHero = true
      heroImageId = `${url}#primaryimage`
      heroImageLink = heroLink
      heroImageWidth = heroWidth
      heroImageHeight = heroHeight

      if (!image) {
        imageLink = heroImageLink
      }
    }
  }

  output += `<meta name="image" content="${imageLink}">`

  /* Open graph */

  output += /* html */`
    <meta property="og:locale" content="en_CA">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${config.title}">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageLink}">
  `

  /* Twitter */

  output += /* html */`
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${imageLink}">
    <meta content="summary_large_image" property="twitter:card">
  `

  /* Schema and sitemap */

  const siteUrl = getPermalink()
  const siteId = `${siteUrl}#website`
  const personId = `${siteUrl}#person`

  /* Person and site */

  const person: Generic = {
    '@type': 'Person',
    '@id': personId,
    name: 'Graciela Alaniz',
    jobTitle: 'Web developer/designer',
    url: siteUrl
  }

  const graph: Generic[] = [
    person,
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: siteUrl,
      name: config.title,
      description: config.meta.description,
      publisher: {
        '@id': personId
      },
      inLanguage: locale
    }
  ]

  /* Hero image */

  if (hasHero) {
    graph.push({
      '@type': 'ImageObject',
      inLanguage: locale,
      '@id': heroImageId,
      url: heroImageLink,
      contentUrl: heroImageLink,
      width: heroImageWidth,
      height: heroImageHeight
    })
  }

  /* Breadcrumbs */

  const breadcrumbs = seoSchema.get('breadcrumbs')
  const hasBreadcrumbs = breadcrumbs?.length
  const breadcrumbId = `${url}#breadcrumb`

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: breadcrumbs
    })
  }

  /* Web page */

  const webPageId = `${url}#webpage`
  const webPage: Generic = {
    '@type': 'WebPage',
    '@id': webPageId,
    url,
    name: title,
    isPartOf: {
      '@id': siteId
    },
    inLanguage: locale,
    datePublished: date,
    dateModified: dateModified,
    description,
    potentialAction: [
      {
        '@type': 'ReadAction',
        target: [url]
      }
    ]
  }

  if (home) {
    webPage.about = { '@id': personId }
  }

  if (hasHero) {
    webPage.primaryImageOfPage = { '@id': heroImageId }
    webPage.image = { '@id': heroImageId }
    webPage.thumbnailUrl = heroImageLink
  }

  if (hasBreadcrumbs) {
    webPage.breadcrumb = { '@id': breadcrumbId }
  }

  graph.push(webPage)

  output += `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph
  })}</script>`

  if (index) {
    setSeoSitemapItem(itemData, assetsLink)
  }

  /* Result */

  return output
}

/* Exports */

export {
  Seo,
  seoSchema
}
