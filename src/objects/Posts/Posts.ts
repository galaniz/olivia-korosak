/**
 * Objects - Posts
 */

/* Imports */

import type { PostsItemArgs, PostsProps, PostsReturnKind, PostsReturnType } from './PostsTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { ConfigContentType, ConfigContentTypeLabel } from '../../config/configTypes.js'
import type { ContentfulDataParams } from '@alanizcreative/formation-static/contentful/contentfulDataTypes.js'
import type { RenderData } from '@alanizcreative/formation-static/render/renderTypes.js'
import { escape } from '@alanizcreative/formation-static/utils/escape/escape.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isNumber } from '@alanizcreative/formation-static/utils/number/number.js'
import { scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { getContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { configContentType, configHeadingLevel } from '../../config/configOptions.js'
import { MediaAudioTracks, MediaAudioTracksContainer } from '../../components/MediaAudio/MediaAudioTracks.js'
import { Pagination } from '../../components/Pagination/Pagination.js'
import { CardColumn, CardContainer } from '../Card/Card.js'

/**
 * Cache posts data.
 *
 * @type {Map<string, RenderData>}
 */
const postsCache: Map<string, RenderData> = new Map()

/**
 * Additional fields by content type.
 *
 * @type {Object<ConfigContentType, string>}
 */
const postsFields: Record<ConfigContentType, string> = {
  project: 'fields.heroImage,fields.projectType',
  track: 'fields.audio,fields.audioDuration,fields.project,fields.genre'
}

/**
 * Term fields by content type.
 *
 * @type {Object<ConfigContentType, string>}
 */
const postsTermFields: Record<ConfigContentType, string> = {
  project: 'fields.projectType',
  track: 'fields.genre'
}

/**
 * Output posts.
 *
 * @param {PostsProps} props
 * @param {PostsReturnKind} [returnType='string']
 * @return {Promise<PostsReturnType>}
 */
const Posts = async <R extends PostsReturnKind = 'string'>(
  props: PostsProps,
  returnType: R = 'string' as R
): Promise<PostsReturnType<R>> => {
  /* Return types */

  const isData = returnType === 'data'

  /* Fallback */

  const fallback = isData ? {} : ''

  /* Props and args required */

  if (!isObjectStrict(props)) {
    return fallback as PostsReturnType<R>
  }

  const { args, itemData, itemContains, serverlessData, parents } = props

  if (!isObjectStrict(args)) {
    return fallback as PostsReturnType<R>
  }

  /* Args */

  const {
    display = 12,
    order = 'date',
    headingLevel: headingLevelLabel = 'Heading Three',
    contentTypes: contentTypesLabels,
    filters = [],
    exclude = false
  } = args

  let {
    pagination = false
  } = args

  const headingLevel = configHeadingLevel.get(headingLevelLabel)
  let contentTypes = contentTypesLabels?.map(type => {
    return configContentType[type]
  })

  /* Data */

  if (!isObjectStrict(itemData)) {
    return fallback as PostsReturnType<R>
  }

  const {
    id,
    slug,
    title,
    archive,
    contentType,
    taxonomy,
    baseUrl,
    meta
  } = itemData

  /* ID required */

  if (!isStringStrict(id)) {
    return fallback as PostsReturnType<R>
  }

  /* Term */

  if (contentType === 'term') {
    pagination = true
    contentTypes = taxonomy?.contentTypes.map(contentType => {
      const type = configContentType[contentType as ConfigContentTypeLabel]
      const field = postsTermFields[type]

      filters.push(`${field}.sys.id:${id}`)

      return type
    }) || []
  }

  /* Content types required */

  if (!isArrayStrict(contentTypes)) {
    return fallback as PostsReturnType<R>
  }



  const multiContentType = contentTypes.length > 1
  const primaryContentType = contentTypes[0] as ConfigContentType

  /* Layout */

  const isTrack = primaryContentType === 'track'

  /* Select fields */

  let select = 'sys.id,fields.title,fields.slug'

  contentTypes.forEach(type => {
    select += `,${postsFields[type]}`
  })

  /* Pagination variables */

  let paginationCurrent = 1
  const paginationFilters: Record<string, string> = {}

  /* Query prep */

  let key = `posts_${id}_${contentTypes.join('_')}_${display}`
  const params: ContentfulDataParams = {
    order: contentType === 'term' ? '-fields.order' : order === 'date' ? '-fields.date' : order,
    select
  }

  if (multiContentType) {
    params['sys.contentType.sys.id[in]'] = contentTypes.join()
  } else {
    params['content_type'] = primaryContentType
  }

  if (isNumber(display)) {
    params.limit = display
  }

  if (exclude) {
    params['sys.id[ne]'] = id
  }

  filters.forEach(filter => {
    const [key, value] = filter.split(':')

    if (!key || !value) {
      return
    }

    params[key] = value
  })

  if (isObjectStrict(serverlessData) && isObjectStrict(serverlessData.query)) {
    const queryPage = serverlessData.query.page

    if (isStringStrict(queryPage)) {
      paginationCurrent = parseInt(escape(queryPage), 10)

      if (isNumber(paginationCurrent) && paginationCurrent > 0) {
        key += `_${paginationCurrent}`
        params.skip = display * (paginationCurrent - 1)
      }
    }
  }

  for (const [, v] of Object.entries(params)) {
    key += `_${v}`
  }

  /* Query and output */

  try {
    let posts: Item[] | undefined
    let total: number = 0

    const cacheData = postsCache.get(key)

    if (cacheData) {
      posts = cacheData.items
      total = cacheData.total || 0
    } else {
      const newData = await getContentfulData(key, params)

      posts = newData.items
      total = newData.total || 0

      postsCache.set(key, newData)
    }

    if (!isArrayStrict(posts)) {
      throw new Error('No posts found')
    }

    /* Posts */

    let postsOutput = ''

    if (isTrack) {
      postsOutput = MediaAudioTracks({
        items: posts,
        itemContains,
        contentType,
        parents
      })
    } else {
      posts.forEach(post => {
        const itemArgs: PostsItemArgs = {
          post,
          contentType,
          primaryContentType,
          headingLevel,
          archive,
          parents
        }

        postsOutput += CardColumn(itemArgs)
      })
    }

    /* Output */

    if (!postsOutput) {
      return fallback as PostsReturnType<R>
    }

    let output = postsOutput

    if (isTrack) {
      output = MediaAudioTracksContainer(output, pagination)
    } else {
      output = CardContainer(output, pagination)
    }

    if (pagination) {
      if (returnType === 'string') {
        const postsItemData: Item = {
          id,
          slug,
          title,
          contentType,
          archive,
          baseUrl
        }

        if (taxonomy) {
          postsItemData.taxonomy = taxonomy
        }

        if (meta) {
          postsItemData.meta = {
            title: meta.title,
            canonical: meta.canonical,
            index: meta.index
          }
        }

        scripts.meta.posts = {
          args,
          itemData: postsItemData
        }
      }

      return Pagination({
        output: isData ? postsOutput : output,
        total: Math.ceil(total / display),
        itemData,
        serverlessData,
        current: paginationCurrent,
        archiveType: primaryContentType,
        filters: paginationFilters
      }, isData ? 'data' : 'string') as PostsReturnType<R>
    }

    return output as PostsReturnType<R>
  } catch (error) {
    if (pagination) {
      return Pagination({
        output: '',
        total: 0,
        itemData,
        serverlessData,
        current: paginationCurrent,
        archiveType: primaryContentType,
        filters: paginationFilters
      }, isData ? 'data' : 'string') as PostsReturnType<R>
    }

    print('[OK] Error querying and/or outputting posts', error)

    return fallback as PostsReturnType<R>
  }
}

/* Exports */

export { Posts }
