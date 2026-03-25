/**
 * Worker - Utils
 */

/* Imports */

import type { WorkerRequest, WorkerServerlessReturn } from './workerTypes.js'
import type { PostsServerlessProps } from '../objects/Posts/PostsTypes.js'
import type { StoreExtra } from '../store/storeTypes.js'
import type { Store, StoreServerless } from '@alanizcreative/formation-static/store/storeTypes.js'
import type { RenderServerlessData, RenderPreviewData } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import { setConfig, setConfigFilter } from '@alanizcreative/formation-static/config/config.js'
import { setActions } from '@alanizcreative/formation-static/actions/actions.js'
import { setFilters } from '@alanizcreative/formation-static/filters/filters.js'
import { setRenderFunctions } from '@alanizcreative/formation-static/render/render.js'
import { setStore, setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { serverlessReload } from '@alanizcreative/formation-static/serverless/serverless.js'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { storeArgs } from '../store/store.js'
import { config } from '../config/config.js'
import { filters } from '../filters/filters.js'
import { actions } from '../actions/actions.js'
import { renderFunctions } from '../render/render.js'
import { Posts } from '../objects/Posts/Posts.js'

/**
 * Set up config, filters, actions and store in serverless context.
 *
 * @param {RenderServerlessData} [serverlessData]
 * @param {RenderPreviewData} [previewData]
 * @param {Generic} [env]
 * @param {boolean} [error=false]
 */
const workerServerlessSetup = async (
  serverlessData?: RenderServerlessData,
  previewData?: RenderPreviewData,
  env?: Generic,
  error: boolean = false
) => {
  const isPreview = !!previewData
  const isReload = !!serverlessData

  setStore(storeArgs)

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: parents } = await import('../../lib/store/parents.json') as unknown as { default: Store['parents'] }
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: archiveMeta } = await import('../../lib/store/archiveMeta.json') as { default: Store['archiveMeta'] }

  if (isReload || isPreview) {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore - may not exist in build context
    const { default: slugs } = await import('../../lib/store/slugs.json') as unknown as { default: Store['slugs'] }

    setStoreItem('slugs', slugs)
  }

  if (isReload || error) {
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore - may not exist in build context
    const { default: navigations } = await import('../../lib/store/navigations.json') as { default: Store['navigations'] }
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore - may not exist in build context
    const { default: navigationItems } = await import('../../lib/store/navigationItems.json') as { default: Store['navigationItems'] }
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore - may not exist in build context
    const { default: counts } = await import('../../lib/store/counts.json') as { default: StoreExtra['counts'] }

    setStoreItem('navigations', navigations)
    setStoreItem('navigationItems', navigationItems)
    setStoreItem('counts', counts)
  }

  setStoreItem('parents', parents)
  setStoreItem('archiveMeta', archiveMeta)
  setConfig(config)
  setConfigFilter(env || {})
  setFilters(filters)
  setActions(actions)
  setRenderFunctions(renderFunctions)
}

/**
 * Filter worker responses for password protection.
 *
 * @param {WorkerRequest} request
 * @return {Promise<WorkerServerlessReturn|undefined>}
 */
const workerServerlessFilter = async (request: WorkerRequest): Promise<WorkerServerlessReturn | undefined> => {
  const { url, method } = request
  const { pathname } = new URL(url)

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: serverless } = await import('../../lib/store/serverless.json') as { default: StoreServerless<string[]> | undefined }

  const serverlessData = serverless?.[pathname]

  if (!serverlessData) {
    return
  }

  const [type] = serverlessData

  /* Archive reload */

  if (type === 'reload') {
    const reloadData = serverlessReload(request, ['page'])

    if (method === 'POST') {
      return {
        type: 'posts',
        data: reloadData
      }
    }

    if (reloadData) {
      return {
        type: 'reload',
        data: reloadData
      }
    }
  }
}

/**
 * Posts and pagination as JSON data.
 *
 * @param {PostsServerlessProps} props
 * @param {Generic} [env]
 * @return {Promise<Response>}
 */
const workerServerlessPosts = async (props: PostsServerlessProps, env?: Generic): Promise<Response> => {
  try {
    setStore(storeArgs)

    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore - may not exist in build context
    const { default: counts } = await import('../../lib/store/counts.json') as { default: StoreExtra['counts'] }

    setStoreItem('counts', counts)
    setConfig(config)
    setConfigFilter(env || {})
    setFilters(filters)

    const data = await Posts(props, 'data')

    if (!data.entries) {
      throw new Error('No entries found')
    }

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const { message } = error as Error

    print('[OK] Error on serverless posts and pagination', error)

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

/* Exports */

export {
  workerServerlessSetup,
  workerServerlessFilter,
  workerServerlessPosts
}
