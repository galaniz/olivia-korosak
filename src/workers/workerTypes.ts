/**
 * Workers - Types
 */

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
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface WorkerEnv {
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
 * @prop {'404'|'reload'|'posts'} type
 * @prop {RenderServerlessData} [data]
 */
export interface WorkerServerlessReturn {
  type: '404' | 'reload' | 'posts'
  data?: RenderServerlessData
}
