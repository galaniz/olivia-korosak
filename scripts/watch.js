// @ts-check

/**
 * Scripts - Watch
 */

/* Imports */

import { readFile } from 'node:fs/promises'
import esbuild from 'esbuild'
import nodemon from 'nodemon'

/**
 * Current watch paths for dev
 *
 * @type {Set<string>}
 */
const devPaths = new Set()

/**
 * Site context args.
 *
 * @type {esbuild.BuildOptions}
 */
const siteArgs = {
  entryPoints: [
    'site/**/*.html'
  ],
  write: false,
  outdir: 'site',
  logLevel: 'info',
  resolveExtensions: [
    '.html'
  ],
  plugins: [
    {
      name: 'watchHtml',
      setup (build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
          return {
            contents: await readFile(args.path, 'utf8'),
            loader: 'copy'
          }
        })
      }
    }
  ]
}

/**
 * Serve site files.
 */
const siteCtx = await esbuild.context(siteArgs)
await siteCtx.watch()
await siteCtx.serve({
  servedir: './site',
  keyfile: './esbuild.key',
  certfile: './esbuild.cert',
  onRequest ({ path }) {
    if (path.startsWith('/js') || path.startsWith('/css') || path.startsWith('/esbuild')) {
      return
    }

    devPaths.add(path)
    process.env.DEV_PATHS = Array.from(devPaths).join(',')
  }
})

/**
 * Restart process to circumvent stale imports.
 */
nodemon({
  script: 'lib/esbuild/esbuild.js',
  exec: 'node lib/esbuild/esbuild.js --watch --site',
  watch: [
    'lib/**/*.js',
    'src/**/*.scss'
  ],
  ignore: [
    'lib/esbuild/*',
    'lib/**/*Worker.js'
  ],
  ext: 'js,scss',
  delay: 400
})

/**
 * Clean up context on crash or quit.
 */
const siteCtxDispose = () => {
  siteCtx.dispose()
}

nodemon.on('crash', siteCtxDispose)
nodemon.on('quit', siteCtxDispose)
