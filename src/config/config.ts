/**
 * Config
 */

/* Imports */

import type { ConfigVars, ConfigEnv } from './configTypes.js'
import type { Config } from '@alanizcreative/formation-static/config/configTypes.js'
import { setConfig } from '@alanizcreative/formation-static/config/config.js'

/**
 * Style, script, svg and template options.
 *
 * @type {ConfigVars}
 */
const configVars: ConfigVars = {
  local: false,
  svg: new Map(),
  template: new Map(),
  style: new Set(),
  noscript: new Set(),
  css: {
    in: 'src/global/global',
    out: 'css/global/global',
    replace: '',
    cache: new Map(),
    safelist: []
  },
  js: {
    in: 'lib/global/globalClient',
    out: 'js/global/globalClient'
  },
  formId: ''
}

/**
 * Base, content and render type options.
 *
 * @type {Config}
 */
const config: Config = setConfig({
  namespace: 'ok',
  source: 'cms',
  title: 'Olivia Korosak',
  meta: {
    description: 'Olivia Korosak is a Canadian composer and performer. Classically trained, she is a Royal Conservatory of Music and McMaster University Alum. Currently, she composes for a variety of media from short films to live theatre.',
    image: 'static/img/olivia-korosak-meta.jpg'
  },
  wholeTypes: [
    'page',
    'project',
    'track',
    'taxonomy',
    'term'
  ],
  partialTypes: [
    'navigationItem',
    'navigation'
  ],
  hierarchicalTypes: [
    'page'
  ],
  typeInSlug: {
    project: 'projects',
    track: 'tracks'
  },
  taxonomyInSlug: {
    types: 'types',
    genres: 'genres'
  },
  renderTypes: {
    button: 'button',
    card: 'card',
    column: 'column',
    section: 'container',
    text: 'content',
    forms: 'form',
    genre: 'genre',
    image: 'image',
    navigation: 'navigation',
    navigationItem: 'navigationItem',
    page: 'page',
    posts: 'posts',
    project: 'project',
    projectType: 'projectType',
    testimonial: 'testimonial',
    track: 'track'
  },
  filter: (config, env: ConfigEnv) => {
    config.env.dev = env.ENVIRONMENT === 'development'
    config.env.prod = env.ENVIRONMENT === 'production'
    config.env.devUrl = ''
    config.env.prodUrl = 'https://oliviakorosak.com'
    configVars.local = env.LOCAL === 'true'

    return config
  }
})

/* Exports */

export {
  config,
  configVars
}
