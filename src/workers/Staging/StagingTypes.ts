/**
 * Workers - Staging Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {function} StagingWorkerFetch
 * @param {Request} request
 * @return {Promise<Response>}
 */
export type StagingWorkerFetch = (request: Request) => Promise<Response>

/**
 * @typedef {object} StagingWorkerEnv
 * @extends {Generic}
 * @prop {object} ASSETS
 * @prop {StagingWorkerFetch} ASSETS.fetch
 */
export interface StagingWorkerEnv extends Generic {
  ASSETS: {
    fetch: StagingWorkerFetch
  }
}
