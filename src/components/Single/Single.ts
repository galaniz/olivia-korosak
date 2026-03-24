/**
 * Components - Single
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ContentfulDataParams } from '@alanizcreative/formation-static/contentful/contentfulDataTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { getArchiveLink } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { getContentfulData } from '@alanizcreative/formation-static/contentful/contentfulData.js'
import { getDuration, getDurationSeconds } from '../../utils/duration/duration.js'
import { configContentTypeLabel } from '../../config/configOptions.js'
import { Posts } from '../../objects/Posts/Posts.js'
import { CaretSvg } from '../../svg/Caret/Caret.js'
import { Content } from '../../text/Content/Content.js'
import { Links } from '../../text/Links/Links.js'

/**
 * Output singular project or track content.
 *
 * @param {string} content
 * @param {Item} itemData
 * @prop {Set<string>} [itemContains]
 * @return {Promise<string>} HTMLElement
 */
const Single = async (content: string, itemData: Item, itemContains?: Set<string>): Promise<string> => {
  /* Data required */

  if (!isObjectStrict(itemData)) {
    return ''
  }

  const {
    id,
    contentType,
    audio,
    audioDuration,
    project,
    projectType,
    genre,
    similar
  } = itemData

  /* ID required */

  if (!isStringStrict(id)) {
    return content
  }

  /* Project or track type required */

  const isProject = contentType === 'project'
  const isTrack = contentType === 'track'

  if (!isProject && !isTrack) {
    return content
  }

  const hasGenres = isTrack && isArrayStrict(genre)
  const hasProjects = isTrack && isArrayStrict(project) 
  const hasProjectTypes = isProject && isArrayStrict(projectType)

  /* Archive */

  const {
    title: archiveTitle,
    link: archiveLink
  } = getArchiveLink(contentType, itemData)

  let archiveOutput = ''

  if (archiveLink && archiveTitle) {
    archiveOutput = /* html */`
      <div class="e-line-out pt-4xs inline-flex align-center">
        ${CaretSvg({ type: 'left' })}
        <a href="${archiveLink}" class="text-m wt-medium lead-base" data-rich>
          All ${archiveTitle}
        </a>
      </div>
    `
  }

  /* Similar entries */

  const similarTitle = `More ${archiveTitle}`
  const similarDisplay = isTrack ? 10 : 3
  const similarKey = `similar_${id}_${contentType}`
  const similarParams: ContentfulDataParams = {
    content_type: contentType,
    select: 'sys.id'
  }

  let similarIds: string[] = []
  let similarOutput = ''

  if (isArrayStrict(similar)) {
    similarIds = similar.map(({ id }) => id as string)
  } else { // Fallback to entries matching genres, projects or project types
    const params = { ...similarParams }

    if (hasGenres) {
      const genreIds = genre.map(({ id }) => id as string)

      params[`fields.genre.sys.id${genreIds.length > 1 ? '[in]' : ''}`] = genreIds.join()
      params['sys.id[ne]'] = id
    }

    if (!hasGenres && hasProjects) {
      const projects = project.map(({ id }) => id as string)

      params[`fields.project.sys.id${projects.length > 1 ? '[in]' : ''}`] = projects.join()
      params['sys.id[ne]'] = id
    }

    if (hasProjectTypes) {
      const projectTypes = projectType.map(({ id }) => id as string)

      params[`fields.projectType.sys.id${projectTypes.length > 1 ? '[in]' : ''}`] = projectTypes.join()
      params['sys.id[ne]'] = id
    }

    const data = await getContentfulData(similarKey, params)
    const items = data.items

    if (isArrayStrict(items)) {
      similarIds = items.map(({ id }) => id as string)
    }
  }

  if (similarIds.length > similarDisplay) {
    similarIds = [...similarIds].slice(0, similarDisplay)
  }

  similarOutput = await Posts({
    args: {
      contentTypes: [configContentTypeLabel[contentType]],
      filters: [
        `sys.id[in]:${similarIds.join()}`
      ]
    },
    itemData,
    itemContains,
    parents: [
      {
        renderType: 'container',
        args: {
          maxWidth: isProject ? '1040px' : '1300px'
        }
      }
    ]
  })

  const hasSimilar = !!similarOutput

  /* Track */

  if (isTrack) {
    /* Audio required */

    if (!isObjectStrict(audio) || !isStringStrict(audioDuration)) {
      return ''
    }

    /* Details */

    const details: [string, string][] = []

    /* Projects */

    if (hasProjects) {
      details.push(['Projects', Links(project)])
    }

    /* Genres */

    if (hasGenres) {
      details.push(['Genres', Links(genre)])
    }

    /* Duration */

    details.push(['Duration', getDuration(getDurationSeconds(audioDuration), true)])

    /* Output */

    return /* html */`
      <section class="container flex col gap-xl gap-2xl-m pb-2xl pb-4xl-m">
        <div class="pl-4xl-l mb-2xs-all mb-s-all-m">
          <h2 class="heading-m">Track Details</h2>
          <dl class="flex col row-s wrap gap-s gap-l-m text-l muted num-normal lead-base e-line-in">
            ${details.map(detail => {
              const [title, desc] = detail

              return /* html */`
                <div>
                  <dt class="lead-base mb-5xs mb-4xs-m sharp">${title}</dt>
                  <dd>${desc}</dd>
                </div>
              `
            }).join('')}
          </dl>
        </div>
        <div class="pl-4xl-l mb-2xs-all mb-s-all-m">
          ${hasSimilar ? `<h2 class="heading-m">${similarTitle}</h2>${similarOutput}` : ''}
          ${archiveOutput}
        </div>
      </section>
    `
  }

  /* Project */

  const [contentStart, contentEnd] = Content({
    args: {
      richTextStyles: true
    }
  })

  const tracksOutput = await Posts({
    args: {
      contentTypes: ['Track'],
      filters: [`fields.project.sys.id:${id}`]
    },
    itemData,
    itemContains
  })

  const hasTracks = !!tracksOutput

  return /* html */`
    <section class="container-s pb-2xl pb-4xl-m">
      ${contentStart}
      ${content}
      ${hasTracks ? `<h2 id="tracks" data-rich>Tracks</h2>${tracksOutput}` : ''}
      ${contentEnd}
    </section>
    <section class="container-m flex col gap-s pb-2xl pb-4xl-m">
      ${hasSimilar ? `<h2>${similarTitle}</h2>${similarOutput}` : ''}
      ${archiveOutput}
    </section>
  `
}

/* Exports */

export { Single }
