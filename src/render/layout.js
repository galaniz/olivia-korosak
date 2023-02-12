/**
 * Layout output
 *
 * @param {object} args {
 *  @param {object} meta
 *  @param {string} gradients
 *  @param {string} content
 *  @param {string} script
 * }
 * @return {string} HTML - html
 */

/* Imports */

const { envData } = require('../vars/data')
const { enumNamespace, enumSite, enumColors } = require('../vars/enums')
const { getPermalink } = require('../utils')

/* Function */

const layout = ({
  meta = {},
  gradients = '',
  content = '',
  script = ''
}) => {
  /* Title */

  const title = (meta?.title ? `${meta.title} | ` : '') + enumSite.title

  /* Description */

  const description = meta?.description ? meta.description : enumSite.meta.description

  /* Canonical */

  const canonical = meta?.canonical ? `<link rel="canonical" href="${meta.canonical}">` : ''

  /* Prev */

  const prev = meta?.prev ? `<link rel="prev" href="${meta.prev}">` : ''

  /* Next */

  const next = meta?.next ? `<link rel="next" href="${meta.next}">` : ''

  /* Robots */

  const robots = meta?.robots ? meta?.robots : true

  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Output */

  return `
    <!DOCTYPE html>
    <html lang="en" id="${enumNamespace}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${!robots && !envData.prod ? `<meta name="robots" content="noindex, nofollow">` : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <link rel="stylesheet" href="${assetsLink}css/${enumNamespace}.css" media="all">
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <link rel="mask-icon" href="${assetsLink}favicon/safari-pinned-tab.svg" color="${enumColors.tint}">
        <meta name="msapplication-TileColor" content="${enumColors.tint}">
        <meta name="theme-color" content="${enumColors.base}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${enumNamespace} l-relative l-z-index-1 l-flex l-flex-column">
        ${gradients}
        ${content}
        ${script}
        <script type="module" src="${assetsLink}js/${enumNamespace}.js"></script>
      </body>
    </html>
  `
}

/* Exports */

module.exports = layout
