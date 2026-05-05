/**
 * Config
 */

/* Imports */

import type { ConfigVars, ConfigEnv } from './configTypes.js'
import type { Config } from '@alanizcreative/formation-static/config/configTypes.js'
import { setConfig } from '@alanizcreative/formation-static/config/config.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configContentType } from './configOptions.js'
import { normalJsonKeys } from '@alanizcreative/formation-static/contentful/contentfulDataNormal.js'

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
  formId: '',
  stripe: ''
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
    image: 'img/olivia-korosak-meta.jpg'
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
  normalTypes: {
    Project: configContentType.Project,
    Track: configContentType.Track
  },
  renderTypes: {
    button: 'button',
    card: 'card',
    column: 'column',
    section: 'container',
    text: 'content',
    forms: 'form',
    field: 'formField',
    formOption: 'formOption',
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
    normalJsonKeys.add('colorFrom') // JSON fields to skip normalizing

    const isDev = env.ENVIRONMENT === 'development'
    const isProd = env.ENVIRONMENT === 'production'

    let cred = isStringStrict(env.CTFL_PRODUCTION_TOKEN) ? env.CTFL_PRODUCTION_TOKEN : ''
    let host = isStringStrict(env.CTFL_PRODUCTION_HOST) ? env.CTFL_PRODUCTION_HOST : ''

    if (isDev) {
      cred = isStringStrict(env.CTFL_DEVELOPMENT_TOKEN) ? env.CTFL_DEVELOPMENT_TOKEN : ''
      host = isStringStrict(env.CTFL_DEVELOPMENT_HOST) ? env.CTFL_DEVELOPMENT_HOST : ''
    }

    config.env.cache = env.LOCAL_CACHE === 'true'
    config.env.dev = isDev
    config.env.prod = isProd
    config.env.devUrl = ''
    config.env.prodUrl = 'https://oliviakorosak.com'
    config.cms.name = 'contentful'
    config.cms.space = isStringStrict(env.CTFL_SPACE_ID) ? env.CTFL_SPACE_ID : ''
    config.cms.env = isStringStrict(env.CTFL_ENV) ? env.CTFL_ENV : 'master'
    config.cms.devCredential = cred
    config.cms.devHost = host
    config.cms.prodCredential = cred
    config.cms.prodHost = host

    configVars.local = env.LOCAL === 'true'
    configVars.stripe = isStringStrict(env.STRIPE_API_TOKEN) ? env.STRIPE_API_TOKEN : ''

    return config
  }
})

/* Exports */

export {
  config,
  configVars
}
