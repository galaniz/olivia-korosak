/**
 * Workers - Staging
 */

/* Imports */

import type { StagingWorkerEnv } from './StagingTypes.js'
import type { WorkerRequest } from '../workerTypes.js'
import type { PostsServerlessProps } from '../../objects/Posts/PostsTypes.js'
import type { RenderServerlessData, RenderPreviewData } from '@alanizcreative/formation-static/render/renderTypes.js'
import { WorkerEntrypoint } from 'cloudflare:workers'
import { getAllContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { renderHttpError } from '@alanizcreative/formation-static/render/render.js'
import { serverlessRender, serverlessPreview } from '@alanizcreative/formation-static/serverless/serverless.js'
import { workerServerlessSetup, workerServerlessFilter, workerServerlessPosts } from '../workerUtils.js'

/**
 * Manage staging site assets and requests.
 */
export default class extends WorkerEntrypoint {
  /**
   * Typed env.
   */
  declare env: StagingWorkerEnv

  /**
   * Route serverless and serve assets.
   * 
   * @param {WorkerRequest} request
   * @return {Promise<Response>}
   */
  override async fetch(request: WorkerRequest): Promise<Response> {
    /* Live preview */

    const previewData = serverlessPreview(request)

    if (previewData) {
      return await this.render(undefined, previewData)
    }

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

    if (type === 'posts') {
      const props = await request.json() as PostsServerlessProps
      return await workerServerlessPosts({ ...props, serverlessData: data }, this.env)
    }

    await workerServerlessSetup(undefined, undefined, this.env, true)

    return new Response(await renderHttpError({ code: 404 }), {
      status: 404,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }

  /**
   * Re-render page with serverless or preview data.
   *
   * @param {RenderServerlessData} [serverlessData]
   * @param {RenderPreviewData} [previewData]
   * @return {Promise<Response>}
   */
  async render (serverlessData?: RenderServerlessData, previewData?: RenderPreviewData): Promise<Response> {
    await workerServerlessSetup(serverlessData, previewData, this.env)
    return serverlessRender(getAllContentfulData, serverlessData, previewData)
  }
}
