/**
 * Workers - Site
 */

/* Imports */

import type { SiteWorkerEnv } from './SiteTypes.js'
import type { WorkerRequest } from '../workerTypes.js'
import type { RenderServerlessData } from '@alanizcreative/formation-static/render/renderTypes.js'
import { WorkerEntrypoint } from 'cloudflare:workers'
import { getAllContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { renderHttpError } from '@alanizcreative/formation-static/render/render.js'
import { serverlessRender } from '@alanizcreative/formation-static/serverless/serverless.js'
import { workerServerlessSetup, workerServerlessFilter } from '../workerUtils.js'

/**
 * Manage site assets and requests.
 */
export default class extends WorkerEntrypoint {
  /**
   * Typed env.
   */
  declare env: SiteWorkerEnv

  /**
   * Route serverless and serve assets.
   * 
   * @param {WorkerRequest} request
   * @return {Promise<Response>}
   */
  override async fetch(request: WorkerRequest): Promise<Response> {
    /* Check serverless */

    const serverless = await workerServerlessFilter(request)

    /* Serve assets */

    if (!serverless) {
      return await this.env.ASSETS.fetch(request)
    }

    /* Serve filtered assets */

    const { type, data } = serverless

    if (type === 'reload') {
      return await this.render(data)
    }

    await workerServerlessSetup(undefined, undefined, true, this.env)

    return new Response(await renderHttpError({ code: 404 }), {
      status: 404,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }

  /**
   * Re-render page with serverless data.
   *
   * @param {RenderServerlessData} [serverlessData]
   * @return {Promise<Response>}
   */
  async render (serverlessData?: RenderServerlessData): Promise<Response> {
    await workerServerlessSetup(serverlessData, undefined, false, this.env)
    return serverlessRender(getAllContentfulData, serverlessData)
  }
}
