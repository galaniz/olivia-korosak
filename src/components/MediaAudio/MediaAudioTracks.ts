/**
 * Components - Media Audio Tracks
 */

/* Imports */

import type { MediaAudioTracks, MediaAudioTracksArgs } from './MediaAudioTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript, addStyle, scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
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
    itemContains,
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
    const isFirst = i === 0
  
    let classes = 'text-m-flex sharp pb-3xs pb-2xs-m'
    let textOutput = text

    if (isLast) {
      classes += ' text-right'
    } else {
      classes += ' text-left' + (!isFirst ? ' pr-2xs pr-m-m' : '')
    }

    if (i > 0) {
      classes = `media-audio-track-wide ${classes}`
    }

    if (isFirst && hasDetails) {
      textOutput = /* html */`
        <div class="flex justify-between gap-2xs gap-m-m">
          ${text}
          <span class="media-audio-track-compact" aria-hidden="true">Details</span>
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
        contentType: 'track',
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
      const detailsLastIndex = details.length - 1

      detailsOutput = Collapsible({
        label: `${title} details`,
        classes: 'media-audio-track-compact isolate',
        content: /* html */`
          <dl class="text-m-flex num-normal muted lead-base e-line-in m-0-last pb-2xs pb-s-m">
            ${details.map((detail, i) => {
              const { title: detailTitle, desc: detailDesc } = detail

              return `
                <dt class="sharp mb-5xs">${detailTitle}</dt>
                <dd${i === detailsLastIndex ? '' : ' class="mb-2xs"'}>${detailDesc}</dd>
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
        <div class="media-audio-track-item before flex gap-2xs gap-s-m align-center isolate">
          <button
            type="button"
            id="${id}"
            class="media-audio-track-control w-m h-m sharp bg-background-light b-radius-full"
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
      <tr class="media-audio-track" id="${id}-track" data-media-track>
        ${cells.map((cell, i) => {
          const {
            headers: cellHeaders,
            output: cellOutput,
            size: cellSize
          } = cell

          const isLast = i === cellsLastIndex
          const isFirst = i === 0

          let classes = `media-audio-track-cell-${cellSize} b-top`

          if (i > 0) {
            classes += ' media-audio-track-wide'
          }

          if (!isLast && !isFirst) {
            classes += ' pr-2xs pr-m-m'
          }

          return /* html */`
            <td headers="${cellHeaders}" class="${classes}">
              ${isFirst ? '<div class="relative flex col justify-center">' : ''}
                ${cellOutput}
              ${isFirst ? '</div>' : ''}
            </td>
          `
        }).join('')}
      </tr>
    `)
  })

  /* Output */

  itemContains?.add('mediaAudio')

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
  addStyle('components/MediaAudio/MediaAudioTracks')
  addScript('components/MediaAudio/MediaAudioTracksClient')

  return /* html */`
    <ok-media-audio-tracks class="media-audio-tracks block">
      <table class="b-dull" aria-label="Tracks"${pagination ? ' data-pag-slot="entry"' : ''}>
        ${output}
      </table>
    </ok-media-audio-tracks>
  `
}

/* Exports */

export {
  MediaAudioTracks,
  MediaAudioTracksContainer
}
