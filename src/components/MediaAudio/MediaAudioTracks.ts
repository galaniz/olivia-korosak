/**
 * Components - Media Audio Tracks
 */

/* Imports */

import type { MediaAudioTracks, MediaAudioTracksArgs } from './MediaAudioTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
import { getPermalink, getSlug } from '@alanizcreative/formation-static/utils/link/link.js'
import { getDuration, getDurationSeconds } from '../../utils/duration/duration.js'
import { Collapsible } from '../../objects/Collapsible/Collapsible.js'
import { ControlSvg } from '../../svg/Control/Control.js'
import { Links } from '../../text/Links/Links.js'

/**
 * Output media audio tracks content.
 *
 * @param {MediaAudioTracksArgs} args
 * @return {string} HTMLElement
 */
const MediaAudioTracks = (args: MediaAudioTracksArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    items,
    contentType = 'page',
    parents
  } = args

  /* Types */

  const isFullWidth = !parents?.some(parent => parent.renderType === 'column')
  const hasProjects = contentType === 'page'
  const hasGenres = hasProjects && isFullWidth
  const hasDetails = contentType !== 'track'

  /* Items required */

  if (!isArrayStrict(items)) {
    return ''
  }

  /* Scripta data */

  if (scripts.meta.tracks == null) {
    scripts.meta.tracks = {} as MediaAudioTracks
  }

  /* Header cells */

  const headCells = [{
    text: 'Title',
    id: 'title'
  }]

  if (hasProjects) {
    headCells.push({
      text: 'Projects',
      id: 'projects'
    })
  }

  if (hasGenres) {
    headCells.push({
      text: 'Genres',
      id: 'genres'
    })
  }

  headCells.push({
    text: 'Duration',
    id: 'duration'
  })

  const headLastIndex = headCells.length - 1
  const head = headCells.map((cell, i) => {
    const { text, id } = cell
    const isLast = i === headLastIndex
  
    let classes = 'text-m-flex sharp pb-3xs pb-2xs-m'
    let textOutput = text

    if (isLast) {
      classes += ' text-right'
    } else {
      classes += ' text-left pr-2xs pr-m-m'
    }

    if (i > 0) {
      classes = `media-audio-wide ${classes}`
    }

    if (i === 0 && hasDetails) {
      textOutput = /* html */`
        <div class="flex justify-between gap-2xs gap-m-m">
          ${text}
          <span class="media-audio-compact" aria-hidden="true">Details</span>
        </div>
      `
    }

    return /* html */`
      <th class="${classes}" id="${id}">
        ${textOutput}
      </th>
    `
  })

  /* Body rows from items */

  const rows: string[] = []

  items.forEach(item => {
    const {
      id,
      title,
      slug,
      audio,
      audioDuration,
      project,
      genre
    } = item

    /* ID, audio, title and slug required */

    if (
      !isStringStrict(id) ||
      !isStringStrict(title) ||
      !isStringStrict(slug) ||
      !isObjectStrict(audio) ||
      !isStringStrict(audioDuration)
    ) {
      return
    }

    const { url } = audio

    /* URL required */

    if (!isStringStrict(url)) {
      return
    }

    /* Link */

    const trackLink = getPermalink(
      getSlug({
        id,
        contentType,
        slug
      })
    )

    /* Duration */

    const seconds = getDurationSeconds(audioDuration)
    const duration = `
      <span class="a-hide-vis">${getDuration(seconds, true)}</span>
      <span aria-hidden="true">${getDuration(seconds)}</span>
    `

    /* Cells */

    const cells = [{
      size: 's',
      headers: 'duration',
      output: `<p class="text-m-flex num-normal text-right muted relative">${duration}</p>`
    }]

    /* Details */

    const details = [{
      title: 'Duration',
      desc: duration
    }]

    /* Genres */

    if (hasGenres) {
      const genres = isArrayStrict(genre) ? Links(genre) : ''

      cells.unshift({
        size: 'm',
        headers: 'genres',
        output: /* html */`
          <span class="text-m-flex muted lead-base clamp-2 relative e-line-in e-line-thin outline-tight">
            ${genres}
          </span>
        `
      })

      if (genres) {
        details.unshift({
          title: 'Genres',
          desc: genres
        })
      }
    }

    /* Projects */

    if (hasProjects) {
      const projects = isArrayStrict(project) ? Links(project) : ''

      cells.unshift({
        size: 'm',
        headers: 'projects',
        output: /* html */`
          <span class="text-m-flex muted lead-base clamp-2 relative e-line-in e-line-thin outline-tight">
            ${projects}
          </span>
        `
      })

      if (projects) {
        details.unshift({
          title: 'Projects',
          desc: projects
        })
      }
    }

    /* Title */

    details.unshift({
      title: 'Full Title',
      desc: `<a href="${trackLink}" class="current" data-rich>${title}</a>`
    })

    let detailsOutput = ''

    if (hasDetails) {
      detailsOutput = Collapsible({
        label: `${title} details`,
        classes: '',
        content: /* html */`
          <dl class="text-m-flex num-normal muted lead-base e-line-in m-0-last pb-2xs pb-s-m">
            ${details.map(detail => {
              const { title: detailTitle, desc: detailDesc } = detail

              return /* html */`
                <dt class="sharp mb-5xs">${detailTitle}</dt>
                <dd class="mb-2xs">${detailDesc}</dd>
              `
            }).join('')}
          </dl>
        `
      })
    }

    cells.unshift({
      size: 'l',
      headers: 'title',
      output: /* html */`
        <div class="flex gap-2xs gap-s-m align-center relative">
          <button
            type="button"
            id="${id}"
            class="w-m h-m sharp bg-background-light b-radius-full"
            aria-label="Play ${title}"
          >
            ${ControlSvg({
              type: 'play',
              width: 'm',
              height: 'm',
              classes: 'media-audio-play'
            })}
            ${ControlSvg({
              type: 'pause',
              width: 'm',
              height: 'm',
              classes: 'media-audio-pause'
            })}
          </button>
          <div class="text-l wt-medium clamp-1 e-line-in outline-tight">
            <a href="${trackLink}" class="lead-base" data-rich>${title}</a>
          </div>
        </div>
        ${detailsOutput}
      `
    });

    /* Data */

    (scripts.meta.tracks as MediaAudioTracks)[id] = {
      title,
      link: trackLink,
      url
    }

    /* Row */

    const cellsLastIndex = cells.length - 1

    rows.push(/* html */`
      <tr class="media-audio-track b-top" id="${id}-track" data-media-track>
        ${cells.map((cell, i) => {
          const {
            headers: cellHeaders,
            output: cellOutput,
            size: cellSize
          } = cell

          const isLast = i === cellsLastIndex
          let classes = `media-audio-track-cell-${cellSize}`

          if (i > 0) {
            classes += ' media-audio-wide'
          }

          if (!isLast) {
            classes += ' pr-2xs pr-m-m'
          }

          return /* html */`
            <td headers="${cellHeaders}" class="${classes}">
              ${i === 0 ? '<div class="media-audio-track-bg relative before pr-2xs pr-m-m">' : ''}
                ${cellOutput}
              ${i === 0 ? '</div>' : ''}
            </td>
          `
        }).join('')}
      </tr>
    `)
  })

  /* Output */

  return /* html */`
    <thead>
      <tr>
        ${head.join('')}
      </tr>
    </thead>
    <tbody>
      ${rows.join('')}
    </tbody>
  `
}

/**
 * Output media audio tracks table.
 *
 * @param {string} output
 * @param {boolean} [pagination=false]
 * @return {string} HTMLTableElement
 */
const MediaAudioTracksContainer = (output: string, pagination?: boolean): string => {
  return /* html */`
    <table class="b-dull" aria-label="Tracks"${pagination ? ' data-pag-slot="entry"' : ''}>
      ${output}
    </table>
  `
}

/* Exports */

export {
  MediaAudioTracks,
  MediaAudioTracksContainer
}
