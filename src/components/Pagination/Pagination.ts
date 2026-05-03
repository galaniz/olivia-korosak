/**
 * Components - Pagination
 */

/* Imports */

import type { PaginationArgs, PaginationReturnKind, PaginationReturnType } from './PaginationTypes.js'
import { Pagination as PaginationBase } from '@alanizcreative/formation-static/components/Pagination/Pagination.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { minify } from '@alanizcreative/formation-static/utils/minify/minify.js'
import { getArchiveLink } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { renderMeta } from '@alanizcreative/formation-static/render/render.js'
import { scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
import { CaretSvg } from '../../svg/Caret/Caret.js'
import { Loader } from '../../objects/Loader/Loader.js'
import { Info } from '../../objects/Info/Info.js'

/**
 * Output pagination navigation.
 *
 * @param {PaginationArgs} args
 * @param {PaginationReturnKind} [returnType='string']
 * @return {PaginationReturnType}
 */
const Pagination = <R extends PaginationReturnKind = 'string'>(
  args: PaginationArgs,
  returnType: R = 'string' as R
): PaginationReturnType<R> => {
  /* Return types */

  const isData = returnType === 'data'

  /* Args required */

  if (!isObjectStrict(args)) {
    return (isData ? {} : '') as PaginationReturnType<R>
  }

  const {
    output,
    total,
    archiveType,
    current,
    itemData,
    filters
  } = args

  const { baseUrl } = itemData

  /* Output check  */

  const hasOutput = !!output

  /* Error */

  const {
    link: archiveLink,
    title: archiveTitle
  } = getArchiveLink(archiveType, itemData)

  const archiveLabel = archiveTitle.toLowerCase()
  const errorId = 'tmpl-pag-error'
  const errorOutput = Info({
    template: hasOutput ? errorId : false,
    title: `
      Looks like no ${archiveLabel} were found. <a href="${archiveLink}">All ${archiveLabel}</a>
    `
  })

  if (!hasOutput) {
    return errorOutput as PaginationReturnType<R>
  }

  /* Pagination data and output */

  const pagClasses = 'h-s w-s h-m-s w-m-s flex align-center justify-center b-radius-s'
  const pagination = PaginationBase({
    total,
    display: 5,
    current,
    filters,
    url: baseUrl,
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
      itemsWrap: false,
      itemClass: 'relative',
      currentClass: `${pagClasses} sharp bg-faded`,
      prevSpanClass: `${pagClasses} b-all b-dull faded`,
      prevLinkClass: `${pagClasses} b-all e-trans e-border`,
      nextSpanClass: `${pagClasses} b-all b-dull faded`,
      nextLinkClass: `${pagClasses} b-all e-trans e-border`,
      linkClass: `${pagClasses} b-all e-trans e-border`,
      linkAttr: 'data-rich'
    }
  })

  const { data, output: paginationOutput } = pagination

  itemData.pagination = data

  /* Data */

  if (isData) {
    const {
      title,
      canonical,
      prev,
      next
    } = renderMeta(itemData)

    return {
      nav: minify(paginationOutput),
      entries: minify(output),
      script: scripts.meta,
      title,
      canonical,
      prev,
      next
    } as PaginationReturnType<R>
  }

  /* Scripts */

  addStyle('components/Pagination/Pagination')
  addScript('components/Pagination/PaginationClient')

  /* Templates */

  const loaderId = Loader()

  /* Output */

  return /* html */`
    <ok-pagination
      class="pagination block"
      loader="${loaderId}"
      error="${errorId}"
    >
      ${output}
      <nav aria-label="Pagination">
        <ol
          class="pagination-nav list-none deco-none pt-xl pt-2xl-m flex wrap justify-center gap-4xs gap-3xs-s num-normal wt-medium text-l"
          data-pag-slot="nav"
          role="list"
        >${paginationOutput}</ol>
      </nav>
    </ok-pagination>
  ` as PaginationReturnType<R>
}

/* Exports */

export { Pagination }
