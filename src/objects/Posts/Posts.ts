/**
 * Objects - Posts
 */

/* Imports */

import type { PostsItemArgs, PostsProps } from './PostsTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { ConfigContentType, ConfigContentTypeLabel } from '../../config/configTypes.js'
import type { ContentfulDataParams } from '@alanizcreative/formation-static/contentful/contentfulDataTypes.js'
import type { RenderData } from '@alanizcreative/formation-static/render/renderTypes.js'
import { escape } from '@alanizcreative/formation-static/utils/escape/escape.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isNumber } from '@alanizcreative/formation-static/utils/number/number.js'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { getContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { getArchiveLabels } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { Pagination } from '@alanizcreative/formation-static/components/Pagination/Pagination.js'
import { configContentType, configHeadingLevel } from '../../config/configOptions.js'
import { CardColumn, CardContainer } from '../Card/Card.js'
import { CaretSvg } from '../../svg/Caret/Caret.js'
import { Info } from '../Info/Info.js'

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
 * @return {Promise<string>} HTMLElement
 */
const Posts = async (props: PostsProps): Promise<string> => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, itemData, serverlessData, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    display = 12,
    order = 'date',
    headingLevel: headingLevelLabel = 'Heading Three',
    contentTypes: contentTypesLabels = ['Project'],
    filters = [],
    exclude = false
  } = args

  let {
    pagination = false
  } = args

  const headingLevel = configHeadingLevel.get(headingLevelLabel)
  let contentTypes = contentTypesLabels.map(type => {
    return configContentType[type]
  })

  /* Data */

  if (!isObjectStrict(itemData)) {
    return ''
  }

  const {
    id,
    archive,
    contentType,
    taxonomy
  } = itemData

  /* ID required */

  if (!isStringStrict(id)) {
    return ''
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
    return ''
  }

  const multiContentType = contentTypes.length > 1
  const primaryContentType = contentTypes[0] as ConfigContentType

  /* Select fields */

  let select = 'sys.id,fields.title,fields.slug'

  contentTypes.forEach(type => {
    select += `,${postsFields[type]}`
  })

  /* Pagination variables */

  let current = 1
  const paginationFilters: Record<string, string> = {}

  /* Query prep */

  let key = `posts_${id}_${contentTypes.join('_')}_${display}`
  const params: ContentfulDataParams = {
    'sys.contentType.sys.id[in]': contentTypes.join(),
    order: contentType === 'term' ? '-fields.order' : order === 'date' ? '-fields.date' : order,
    select
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
      current = parseInt(escape(queryPage), 10)

      if (isNumber(current) && current > 0) {
        key += `_${current}`
        params.skip = display * (current - 1)
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

    const postsOutput: string[] = []

    posts.forEach(post => {
      const itemArgs: PostsItemArgs = {
        post,
        contentType,
        primaryContentType,
        headingLevel,
        archive,
        parents
      }

      postsOutput.push(CardColumn(itemArgs))
    })

    /* Pagination data and output */

    let pagOutput = ''

    if (pagination) {
      const pagClasses = 'h-s w-s h-m-s w-m-s flex align-center justify-center b-radius-s'
      const pag = Pagination({
        total: Math.ceil(total / display),
        url: itemData.baseUrl,
        filters: paginationFilters,
        current,
        prev: CaretSvg({
          type: 'left',
          width: '2xs',
          height: '2xs',
          classes: 'w-xs-m h-xs-m'
        }),
        next: CaretSvg({
          type: 'right',
          width: '2xs',
          height: '2xs',
          classes: 'w-xs-m h-xs-m'
        }),
        ellipsis: `<span class="${pagClasses} b-all">&hellip;</span>`,
        prevLabel: 'Previous page',
        nextLabel: 'Next page',
        currentLabel: 'Current page',
        pageLabel: 'Page',
        titleTemplate: 'Page %current of %total',
        args: {
          listClass: 'list-none flex justify-center gap-4xs gap-3xs-s num-normal wt-medium text-l',
          listAttr: 'role="list"',
          itemClass: 'relative',
          currentClass: `${pagClasses} bg-faded`,
          prevSpanClass: `${pagClasses} b-all b-dull faded`,
          prevLinkClass: `${pagClasses} b-all e-trans e-border`,
          nextSpanClass: `${pagClasses} b-all b-dull faded`,
          nextLinkClass: `${pagClasses} b-all e-trans e-border`,
          linkClass: `${pagClasses} b-all e-trans e-border`,
          linkAttr: 'data-rich'
        }
      })

      pagOutput = `<nav class="pt-xl pt-2xl-m" aria-label="Pagination">${pag.output}</nav>`
      itemData.pagination = pag.data
    }

    /* Output */

    if (!postsOutput.length) {
      return ''
    }

    const output = postsOutput.join('')

    return CardContainer(output) + pagOutput
  } catch (error) {
    if (pagination) {
      const label = getArchiveLabels(multiContentType ? 'post' : primaryContentType, itemData).plural

      return Info({
        title: `Looks like no ${label.toLowerCase()} were found.`
      })
    }

    print('[OK] Error querying and/or outputting posts', error)

    return ''
  }
}

/* Exports */

export { Posts }
