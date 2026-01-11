/**
 * Workers - Types
 */

/* Imports */

import type { IncomingRequestCfProperties } from '@cloudflare/workers-types'
import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderServerlessData } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} WorkerRequest
 * @extends {Request}
 * @prop {IncomingRequestCfProperties} [cf]
 */
export type WorkerRequest = Request & {
  cf?: IncomingRequestCfProperties
}

/**
 * @typedef {object} WorkerEnv
 * @extends {Generic}
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface WorkerEnv extends Generic {
  CF_TURNSTILE_KEY?: string
}

/**
 * @typedef {object} WorkerTurnstileResult
 * @prop {boolean} success
 */
export interface WorkerTurnstileResult {
  success: boolean
}

/**
 * @typedef {object} WorkerServerlessReturn
 * @prop {'404'|'reload'} type
 * @prop {RenderServerlessData} [data]
 */
export interface WorkerServerlessReturn {
  type: '404' | 'reload'
  data?: RenderServerlessData
}
