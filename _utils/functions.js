/**
 * Utility functions
 */

/* Imports */

const { envData, slugParents, slugBases, urls } = require('./variables')

/* Get slug helper */

const _getParentSlug = (id = '', p = []) => {
  if (slugParents?.[id]) {
    p.unshift(slugParents[id])

    _getParentSlug(slugParents[id].id, p)
  }
}

/* Return slug with base from slug base and parents */

const getSlug = ({
  id = '',
  slug = '',
  page = 0,
  contentType = 'page',
  returnParents = false
}) => {
  /* Index */

  if (slug === '/') {
    return ''
  }

  /* Slug base */

  const slugBase = slugBases[contentType]

  /* Parents */

  let p = []
  let pp = []

  _getParentSlug(contentType === 'page' ? id : slugBase.archiveId, p)

  if (p.length) {
    pp = p

    p = p.map(item => item.slug)

    p = `${p.join('/')}/`
  } else {
    p = ''
  }

  /* Slug */

  const s = `${p}${slugBase.slug}${slugBase.slug ? '/' : ''}${slug}${page ? `/?page=${page}` : ''}`

  /* Parents and slug return */

  if (returnParents) {
    if (slugBase?.slug) {
      pp.push({
        ...slugBase,
        contentType: 'page',
        id: slugBase.archiveId
      })
    }

    return {
      slug: s,
      parents: pp
    }
  }

  /* Slug return */

  return s
}

/* Return absolute url */

const getPermalink = (slug = '', trailingSlash = true) => {
  let url = '/'

  if (envData.prod) {
    url = urls.production
  }

  return `${url}${slug}${slug && trailingSlash ? '/' : ''}`
}

/* Get link from external and internal options */

const getLink = (internalLink = false, externalLink = '') => {
  if (externalLink) {
    return externalLink
  } else if (internalLink) {
    const contentType = internalLink.sys.contentType.sys.id
    const internalFields = Object.assign({ slug: '' }, internalLink.fields)

    return getPermalink(getSlug({
      contentType,
      id: internalLink.sys.id,
      slug: internalFields.slug
    }))
  }
}

/* Get responsive image output */

const getImage = ({
  data,
  classes = '',
  attr = '',
  quality = 75,
  width = 'auto',
  height = 'auto'
}) => {
  /* Data required */

  if (!data) {
    return ''
  }

  const { file, description = '' } = data

  /* File required */

  if (!file) {
    return ''
  }

  const { url = '', details } = file

  /* Details required */

  if (!details) {
    return ''
  }

  /* Dimensions */

  const naturalWidth = details.image.width
  const naturalHeight = details.image.height
  const aspectRatio = naturalHeight / naturalWidth
  const aspectRatioReverse = naturalWidth / naturalHeight

  let w = naturalWidth
  let h = naturalHeight

  if (width !== 'auto') {
    w = width
    h = height === 'auto' ? height * aspectRatio : height
  }

  if (height !== 'auto') {
    h = height
    w = width === 'auto' ? width * aspectRatioReverse : width
  }

  /* Src and sizes attributes */

  const src = `https:${url}?fm=webp&q=${quality}&w=${w}&h=${h}`
  const sizes = `(min-width: ${w / 16}rem) ${w / 16}rem, 100vw`

  let srcset = [200, 400, 600, 800, 1200, 1600, 2000]

  srcset = srcset.filter(s => s < w)
  srcset.push(w)

  srcset = srcset.map(s => {
    return `https:${url}?fm=webp&q=${quality}&w=${s}&h=${Math.round(s * aspectRatio)} ${s}w`
  })

  /* Output */

  return `
    <img${classes ? ` class="${classes}"` : ''} alt="${description}" src="${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}"${attr ? ` ${attr}` : ''}>
  `
}

/* Get rgba from hex color string */

const getRgba = (hex = '', alpha = 1) => {
  const alphaCodes = {
    FF: 1,
    FC: 0.99,
    FA: 0.98,
    F7: 0.97,
    F5: 0.96,
    F2: 0.95,
    F0: 0.94,
    ED: 0.93,
    EB: 0.92,
    E8: 0.91,
    E6: 0.9,
    E3: 0.89,
    E0: 0.88,
    DE: 0.87,
    DB: 0.86,
    D9: 0.85,
    D6: 0.84,
    D4: 0.83,
    D1: 0.82,
    CF: 0.81,
    CC: 0.8,
    C9: 0.79,
    C7: 0.78,
    C4: 0.77,
    C2: 0.76,
    BF: 0.75,
    BD: 0.74,
    BA: 0.73,
    B8: 0.72,
    B5: 0.71,
    B3: 0.7,
    B0: 0.69,
    AD: 0.68,
    AB: 0.67,
    A8: 0.66,
    A6: 0.65,
    A3: 0.64,
    A1: 0.63,
    '9E': 0.62,
    '9C': 0.61,
    99: 0.6,
    96: 0.59,
    94: 0.58,
    91: 0.57,
    '8F': 0.56,
    '8C': 0.55,
    '8A': 0.54,
    87: 0.53,
    85: 0.52,
    82: 0.51,
    80: 0.5,
    '7D': 0.49,
    '7A': 0.48,
    78: 0.47,
    75: 0.46,
    73: 0.45,
    70: 0.44,
    '6E': 0.43,
    '6B': 0.42,
    69: 0.41,
    66: 0.4,
    63: 0.39,
    61: 0.38,
    '5E': 0.37,
    '5C': 0.36,
    59: 0.35,
    57: 0.34,
    54: 0.33,
    52: 0.32,
    '4F': 0.31,
    '4D': 0.3,
    '4A': 0.29,
    47: 0.28,
    45: 0.27,
    42: 0.26,
    40: 0.25,
    '3D': 0.24,
    '3B': 0.23,
    38: 0.22,
    36: 0.21,
    33: 0.2,
    30: 0.19,
    '2E': 0.18,
    '2B': 0.17,
    29: 0.16,
    26: 0.15,
    24: 0.14,
    21: 0.13,
    '1F': 0.12,
    '1C': 0.11,
    '1A': 0.1,
    17: 0.09,
    14: 0.08,
    12: 0.07,
    '0F': 0.06,
    '0D': 0.05,
    '0A': 0.04,
    '08': 0.03,
    '05': 0.02,
    '03': 0.01,
    '00': 0
  }

  let r = 0
  let g = 0
  let b = 0
  let a = alpha

  r = `0x${hex[1]}${hex[2]}`
  g = `0x${hex[3]}${hex[4]}`
  b = `0x${hex[5]}${hex[6]}`

  if (hex.length === 9) {
    a = alphaCodes[(hex[7] + hex[8]).toUpperCase()]
  }

  r = +r
  g = +g
  b = +b

  return [r, g, b, a].join(', ')
}

/* Exports */

module.exports = {
  getSlug,
  getPermalink,
  getLink,
  getImage,
  getRgba
}
