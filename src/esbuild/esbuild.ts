/**
 * Esbuild
 */

/* Imports */

import type { BuildOptions } from 'esbuild'
import dotenv from 'dotenv'
import esbuild from 'esbuild'
import { glob } from 'node:fs/promises'
import { esbuildHtml } from './esbuildHtml.js'
dotenv.config()

/**
 * Check if arg exists.
 *
 * @param {string} a
 * @return {boolean}
 */
const argExists = (a: string): boolean => process.argv.includes(`--${a}`)

/**
 * Watch state.
 *
 * @type {boolean}
 */
const isWatch: boolean = argExists('watch')

/**
 * Build site.
 *
 * @type {boolean}
 */
const isSite: boolean = argExists('site')

/**
 * Site files.
 *
 * @type {string[]}
 */
const siteFiles: string[] = []

for await (const file of glob('lib/**/*.js')) {
  siteFiles.push(file)
}

/**
 * Site copy assets.
 *
 * @type {Object<string, string>}
 */
const siteCopyAssets: Record<string, string> = {
  'static/favicon': 'site/favicon',
  'static/fonts': 'site/fonts'
}

siteCopyAssets[
  process.env.ENVIRONMENT === 'production' ? 'static/robots-prod.txt' : 'static/robots-dev.txt'
] = 'site/robots.txt'

/**
 * Site context args.
 *
 * @type {BuildOptions}
 */
const siteArgs: BuildOptions = {
  entryPoints: siteFiles,
  write: false,
  logLevel: 'debug',
  outdir: 'site',
  platform: 'node',
  plugins: [
    esbuildHtml({
      watch: isWatch,
      outDir: 'site',
      copy: siteCopyAssets
    })
  ]
}

/**
 * Build site files.
 */
if (isSite) {
  await esbuild.build(siteArgs)
}
