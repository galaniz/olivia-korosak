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

const { getContext } = require('../_utils/functions')
const site = require('../_utils/site')

/* Function */

const layout = ({
  meta = {},
  gradients = '',
  content = '',
  script = ''
}) => {
  /* Title */

  const title = (meta?.title ? `${meta.title} | ` : '') + site.title

  /* Description */

  const description = meta?.description ? meta.description : site.meta.description

  /* Canonical */

  const canonical = meta?.canonical ? `<link rel="canonical" href="${meta.canonical}">` : ''

  /* Prev */

  const prev = meta?.prev ? `<link rel="prev" href="${meta.prev}">` : ''

  /* Next */

  const next = meta?.next ? `<link rel="next" href="${meta.next}">` : ''

  /* Robots */

  const robots = meta?.robots ? meta?.robots : true

  /* Output */

  return `
    <!DOCTYPE html>
    <html lang="en" id="${site.namespace}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${robots && getContext() !== 'production' ? `<meta name="robots" content="noindex, nofollow">` : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <link rel="stylesheet" href="${site.styles}" media="all">
        <link rel="apple-touch-icon" sizes="180x180" href="${site.links.assets}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${site.links.assets}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${site.links.assets}favicon/favicon-16x16.png">
        <link rel="manifest" href="${site.links.assets}favicon/site.webmanifest">
        <link rel="mask-icon" href="${site.links.assets}favicon/safari-pinned-tab.svg" color="${site.theme.tint}">
        <meta name="msapplication-TileColor" content="${site.theme.tint}">
        <meta name="theme-color" content="${site.theme.base}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${site.namespace} l-relative l-z-index-1 l-flex l-flex-column">
        ${gradients}
        ${content}
        ${script}
        <script type="module" src="${site.script}"></script>
      </body>
    </html>
  `
}

/* Exports */

module.exports = layout
