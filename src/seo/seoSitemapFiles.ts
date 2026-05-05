/**
 * Seo - Sitemap Files
 */

/* Imports */

import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { config } from '../config/config.js'
import { seoSitemap } from './seoSitemap.js'

/**
 * Create sitemap files from map items.
 *
 * @return {Promise<void>}
 */
const createSeoSitemapFiles = async (): Promise<void> => {
  /* Prod only */

  if (!config.env.prod) {
    return
  }

  /* Site directory required */

  const siteDir = resolve('site')

  await mkdir(siteDir, { recursive: true })

  /* Index sitemap */

  const index: string[] = []
  const indexPath = `${siteDir}/sitemap.xml`

  /* Paths of files created */

  const paths: string[] = []

  /* Files by type */

  for (const [contentType, urls] of seoSitemap) {
    if (!urls.length) {
      continue
    }

    const urlFile = `${contentType}-sitemap.xml`
    const urlPath = `${siteDir}/${urlFile}`
    const urlLastMod: number[] = []

    let urlOutput = ''

    urls.forEach(url => {
      const { loc, lastMod, imageLoc } = url

      let imageOutput = ''

      if (isStringStrict(imageLoc)) {
        imageOutput = `<image:image><image:loc>${imageLoc}</image:loc></image:image>`
      }

      urlLastMod.push(new Date(lastMod).getTime())

      urlOutput += `<url><loc>${loc}</loc><lastmod>${lastMod}</lastmod>${imageOutput}</url>`
    })

    await writeFile(urlPath, `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlOutput}</urlset>`)

    const urlLastModIndex = urlLastMod.indexOf(Math.max(...urlLastMod))
    const urlLastModDate = urls[urlLastModIndex]?.lastMod || new Date().toISOString()

    index.push(`<sitemap><loc>${getPermalink(urlFile, false)}</loc><lastmod>${urlLastModDate}</lastmod></sitemap>`)
    paths.push(urlPath)
  }

  /* Index file */

  if (!index.length) {
    return
  }

  await writeFile(indexPath, `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${index.join('')}</sitemapindex>`)

  paths.push(indexPath)

  /* Success */

  print('[OK] Successfully wrote', paths.join('\n'), 'success')
} 

/* Exports */

export { createSeoSitemapFiles }
