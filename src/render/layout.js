/**
 * Render - layout
 */

/* Imports */

const { envData } = require('../vars/data')
const { enumNamespace, enumSite, enumColors } = require('../vars/enums')
const { getPermalink } = require('../utils')

/**
 * Function - output html
 *
 * @param {object} args {
 *  @prop {object} meta
 *  @prop {string} gradients
 *  @prop {string} content
 *  @prop {string} script
 * }
 * @return {string} HTML - html
 */

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

  /* No index */

  let noIndex = meta?.noIndex ? meta.noIndex : false

  if (envData.dev) {
    noIndex = true
  }

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
        ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
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
        <style>
          @media (prefers-reduced-motion: reduce) {
            .reduce-motion-show {
              display: block;
            }

            .reduce-motion-hide {
              display: none;
            }
          }

          @keyframes e-pt-fb {
            0% { opacity: 1; }
            99% { opacity: 0; }
            100% { opacity: 0; visibility: hidden; }
          }

          .e-pt {
            position: fixed;
            background: #17181d;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 1;
            z-index: 200;
            visibility: visible;
            transition: visibility 150ms ease 0ms, opacity 150ms ease;
          }

          .js .e-pt[data-show="false"] {
            opacity: 0;
            visibility: hidden;
            transition: visibility 0ms ease 150ms, opacity 150ms ease 10ms;
          }

          .no-js .e-pt[data-show="true"] {
            transition: none;
            animation: 150ms ease 800ms forwards e-pt-fb;
          }
        </style>
      </head>
      <body class="${enumNamespace} no-js l-relative l-z-index-1 l-flex l-flex-column">
        <div class="e-pt reduce-motion-hide" id="js-pt" data-show="true"></div>
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
