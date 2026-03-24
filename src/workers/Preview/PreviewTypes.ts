/**
 * Workers - Preview Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {function} PreviewWorkerFetch
 * @param {Request} request
 * @return {Promise<Response>}
 */
export type PreviewWorkerFetch = (request: Request) => Promise<Response>

/**
 * @typedef {object} PreviewWorkerEnv
 * @extends {Generic}
 * @prop {object} ASSETS
 * @prop {PreviewWorkerFetch} ASSETS.fetch
 */
export interface PreviewWorkerEnv extends Generic {
  ASSETS: {
    fetch: PreviewWorkerFetch
  }
}
