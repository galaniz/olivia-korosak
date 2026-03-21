/**
 * Components - Layout
 */

/* Imports */

import type { LayoutArgs } from './LayoutTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import {
  scripts,
  outputScripts,
  outputStyles
} from '@alanizcreative/formation-static/scripts/scripts.js'
import { config, configVars } from '../../config/config.js'
import { getGradient } from '../../utils/gradient/gradient.js'
import { Seo, seoSchema } from '../../seo/Seo.js'
import { Header } from '../Header/Header.js'
import { Footer } from '../Footer/Footer.js'
import { Hero } from '../Hero/Hero.js'
// import { Single } from '../Single/Single.js'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.js'
import { MediaAudio } from '../MediaAudio/MediaAudio.js'

/**
 * Output root.
 *
 * @param {LayoutArgs} args
 * @return {Promise<string>} HTMLHtmlElement
 */
const Layout = (args: LayoutArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    slug,
    contentType,
    content,
    itemData,
    itemContains,
    meta
  } = args

  /* Page data */

  const { baseType, colorFrom } = itemData

  /* Type */

  const isIndex = meta.isIndex
  const isProject = contentType === 'project'
  const isTrack = contentType === 'track'

  /* Assets link */

  const baseLink = getPermalink()
  const fontsLink = `${baseLink}fonts/`
  const faviconLink = `${baseLink}favicon/`

  /* Namespace */

  const ns = config.namespace

  /* Gradient */

  let gradientOutput = ''

  if (isStringStrict(colorFrom?.value)) {
    gradientOutput = getGradient(colorFrom.value, 'page', true)
  }

  /* Header, breadcrumbs, hero and footer */

  const headerOutput = Header(slug, baseType)
  const breadcrumbsOutput = Breadcrumbs(itemData)
  const footerOutput = Footer(slug, baseType)
  const heroOutput = Hero({ ...itemData, meta }, !!breadcrumbsOutput)

  /* Content */

  const contentOutput = content

  if (isProject || isTrack) {
    // contentOutput = await Single(content, itemData)
  }

  /* Seo */

  const seoOutput = Seo(meta, itemData, slug === '/')

  /* Audio */

  const mediaAudioOutput = itemContains?.has('mediaAudio') ? MediaAudio() : ''

  /* Script data */

  const scriptJson = JSON.stringify(scripts.meta)
  const scriptMeta = /* html */`
    <script>
      var namespace = '${ns}';
      var ${ns} = ${scriptJson};
    </script>
  `

  /* Scripts */

  let scriptsOutput = ''

  if (configVars.js.out) {
    scriptsOutput += `<script type="module" src="${baseLink}${configVars.js.out}.js"></script>`
  }

  scriptsOutput += outputScripts(baseLink)

  /* Styles */

  configVars.css.replace =
    `<link rel="stylesheet" href="${baseLink}${configVars.css.out}.css" media="all">` + outputStyles(baseLink)

  let stylesOutput =
    '@media (prefers-reduced-motion:reduce){.no-motion-show{display:block}.no-motion-hide{display:none}}'

  configVars.style.forEach(s => {
    stylesOutput += s
  })

  /* Svg sprites */

  let spritesOutput = ''

  for (const [svgId, svgData] of configVars.svg) {
    const {
      viewBox,
      output
    } = svgData

    spritesOutput += `<symbol id="${svgId}" viewBox="${viewBox}">${output}</symbol>`
  }

  if (spritesOutput) {
    spritesOutput = /* html */`
      <svg xmlns="http://www.w3.org/2000/svg" class="none">
        ${spritesOutput}
      </svg>
    `
  }

  /* Templates */

  let templatesOutput = ''

  for (const [templateId, template] of configVars.template) {
    templatesOutput += /* html */`
      <template id="${templateId}">
        ${template}
      </template>
    `
  }

  /* No script */

  let noscriptOutput = `<link rel="stylesheet" href="${baseLink}css/global/globalNoJs.css" media="all">`

  configVars.noscript.forEach(noscript => {
    noscriptOutput += noscript
  })

  /* Check if local */

  const isLocal = configVars.local

  /* Hot reload */

  let reloadScript = ''

  if (isLocal) {
    reloadScript = /* html */`
      <script>
        const esbuild = new EventSource('/esbuild')
        esbuild.addEventListener('change', () => { location.reload() })
      </script>
    `
  }

  /* Reset */

  seoSchema.clear()
  configVars.style.clear()
  configVars.svg.clear()
  configVars.template.clear()
  configVars.noscript.clear()
  configVars.formId = ''

  /* Output */

  return /* html */`
    <!DOCTYPE html>
    <html lang="en-CA" id="${ns}" class="bg-foreground-base" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preload" href="${fontsLink}americana-bold.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="${fontsLink}questa-sans-light.woff2" as="font" type="font/woff2" crossorigin>
        ${seoOutput}
        ${configVars.css.replace}
        <style>${stylesOutput}</style>
        <noscript>${noscriptOutput}</noscript>
        <link rel="icon" href="${faviconLink}favicon-32x32.png" sizes="32x32">
        <link rel="icon" href="${faviconLink}favicon-192x192.png" sizes="192x192">
        <link rel="icon" href="${faviconLink}favicon-512x512.png" sizes="512x512">
        <link rel="apple-touch-icon" href="${faviconLink}favicon-180x180.png">
      </head>
      <body class="${ns} no-js relative z-1 flex col">
        ${spritesOutput}
        ${gradientOutput}
        ${headerOutput}
        ${breadcrumbsOutput}
        <main id="main">
          ${heroOutput}
          ${isIndex ? '<div id="content"></div>' : ''}
          ${contentOutput}
        </main>
        ${footerOutput}
        ${mediaAudioOutput}
        ${scriptMeta}
        ${templatesOutput}
        ${scriptsOutput}
        ${reloadScript}
      </body>
    </html>
  `
}

/* Exports */

export { Layout }
