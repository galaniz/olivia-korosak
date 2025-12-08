/**
 * Workers - Site Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {function} SiteWorkerFetch
 * @param {Request} request
 * @return {Promise<Response>}
 */
export type SiteWorkerFetch = (request: Request) => Promise<Response>

/**
 * @typedef {object} SiteWorkerEnv
 * @extends {Generic}
 * @prop {object} ASSETS
 * @prop {SiteWorkerFetch} ASSETS.fetch
 */
export interface SiteWorkerEnv extends Generic {
  ASSETS: {
    fetch: SiteWorkerFetch
  }
}
