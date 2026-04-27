/**
 * Components - Media Audio
 */

/* Imports */

import type { MediaAudioTrack, MediaAudioTracksArgs } from './MediaAudioTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { v4 as uuid } from 'uuid'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript, addStyle, scripts } from '@alanizcreative/formation-static/scripts/scripts.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { getDuration, getDurationSeconds } from '../../utils/duration/duration.js'
import { Collapsible } from '../../objects/Collapsible/Collapsible.js'
import { configVars } from '../../config/config.js'
import { Loader } from '../../objects/Loader/Loader.js'
import { CloseSvg } from '../../svg/Close/Close.js'
import { ControlSvg } from '../../svg/Control/Control.js'
import { ErrorSvg } from '../../svg/Error/Error.js'
import { Links } from '../../text/Links/Links.js'

/**
 * @typedef {object} MediaAudioTrackData
 * @prop {string} id
 * @prop {string} title
 * @prop {string} link
 */
interface MediaAudioTrackData {
  id: string
  title: string
  link: string
}

/**
 * Data from item data for display and scripts.
 *
 * @param {Item} item
 * @return {MediaAudioTrackData|undefined}
 */
const getMediaAudioTrackData = (item: Item): MediaAudioTrackData | undefined => {
  /* Data required */

  if (!isObjectStrict(item)) {
    return
  }

  const {
    id,
    title,
    slug,
    audio
  } = item

  /* Title required */

  if (!isStringStrict(title)) {
    return
  }

  /* ID, audio, title and slug required */

  if (
    !isStringStrict(id) ||
    !isStringStrict(title) ||
    !isStringStrict(slug) ||
    !isObjectStrict(audio)
  ) {
    return
  }

  const { url } = audio

  /* URL required */

  if (!isStringStrict(url)) {
    return
  }

  /* Link */

  const link = getLink(item)

  /* Scripts data */

  if (scripts.meta.tracks == null) {
    scripts.meta.tracks = {}
  }

  (scripts.meta.tracks as Record<string, MediaAudioTrack>)[id] = {
    title,
    link,
    url
  }

  /* Result */

  return {
    id,
    title,
    link
  }
}

/**
 * Output media audio player.
 *
 * @return {string} HTMLElement
 */
const MediaAudio = (): string => {
  /* Loader */

  const loaderId = Loader()

  /* Error */

  const errorId = 'tmpl-media-audio-error'

  configVars.template.set(errorId, /* html */`
    <div class="bg-background-light absolute inset-0 flex col justify-center" tabindex="-1">
      <div class="container flex gap-4xs outline-base">
        ${ErrorSvg({ width: 'xs', height: 's' })}
        <p class="text-s wt-medium lead-base py-5xs e-line-out">
          Sorry, there is a problem with the service. Download track <a data-rich data-media-link></a>.
        </p>
      </div>
    </div>
  `)

  /* Scripts and styles */

  addStyle('components/MediaAudio/MediaAudio')
  addScript('components/MediaAudio/MediaAudioClient')

  /* Output */

  return /* html */`
    <ok-media-audio
      id="${uuid()}"
      type="audio"
      class="media-audio bg-background-light outline-base fixed bottom-0 left-0 right-0 z-1 num-normal e-trans"
      loader="${loaderId}"
      error="${errorId}"
    >
      <audio inert></audio>
      <div class="container px-5xs py-5xs py-3xs-m px-2xs-m flex align-center wrap gap-5xs gap-s-m" inert>
        <div class="flex align-center gap-4xs gap-s-m outline-snug">
          <div class="flex align-center">
            <button
              type="button"
              class="media-audio-control b-radius-full sharp flex"
              aria-label="Previous track"
              data-media-prev
            >
              ${ControlSvg({ type: 'prev', width: 'm', height: 'm' })}
            </button>
            <button
              type="button"
              class="media-audio-control w-l h-l b-radius-full sharp"
              aria-label="Play"
              data-media-control="toggle"
            >
              ${ControlSvg({
                type: 'play',
                width: 'l',
                height: 'l',
                classes: 'media-audio-play'
              })}
              ${ControlSvg({
                type: 'pause',
                width: 'l',
                height: 'l',
                classes: 'media-audio-pause'
              })}
            </button>
            <button
              type="button"
              class="media-audio-control b-radius-full sharp flex"
              aria-label="Next track"
              data-media-next
            >
              ${ControlSvg({ type: 'next', width: 'm', height: 'm' })}
            </button>
          </div>
          <p class="media-audio-text text-s wt-medium clamp-1 outline-tight e-line-in">
            <a class="lead-close" data-rich data-media-link></a>
          </p>
        </div>
        <div class="media-audio-seek flex align-center wrap gap-5xs grow-1 col-12 col-5-m">
          <span
            class="text-xs-flex lead-close sharp order-first-m w-l"
            aria-hidden="true"
            data-media-time
          >
            0:00
          </span>
          <div
            class="media-audio-progress grow-1 order-first relative before b-radius-s"
            tabindex="0"
            role="slider"
            aria-label="Audio timeline"
            aria-valuemin="0"
            aria-valuemax="0"
            aria-valuenow="0"
            aria-valuetext=""
            data-media-progress
          >
            <div class="media-audio-bar absolute top-0 left-0 w-full after"></div>
            <div class="media-audio-scrub absolute left-0 bg-foreground-base w-4xs h-4xs b-radius-full e-trans"></div>
          </div>
          <span
            class="text-xs-flex lead-close ml-auto w-l text-right"
            aria-hidden="true"
            data-media-duration
          >
            0:00
          </span>
        </div>
      </div>
      <button
        type="button"
        class="absolute right-0 top-0 z-1 w-xs h-xs flex align-center justify-center sharp outline-snug"
        aria-label="Close audio player"
        data-media-close
        inert
      >
        ${CloseSvg()}
      </button>
    </ok-media-audio>
  `
}

/**
 * Output track hero section.
 *
 * @param {Item} itemData
 * @return {string} HTMLSectionElement
 */
const MediaAudioHero = (itemData: Item): string => {
  /* Data required */

  const data = getMediaAudioTrackData(itemData)

  if (!data) {
    return ''
  }

  const { id, title } = data

  /* Output */

  return /* html */`
    <section class="media-audio-track container pt-xl pb-xl pt-2xl-m" id="${id}-track">
      <div class="flex col row-l gap-s gap-m-l">
        <button
          type="button"
          id="${id}"
          class="w-xl h-xl w-2xl-m h-2xl-m sharp bg-background-light b-radius-full"
          aria-label="Play ${title}"
        >
          ${ControlSvg({
            type: 'play',
            width: 'full',
            height: 'full',
            classes: 'media-audio-play'
          })}
          ${ControlSvg({
            type: 'pause',
            width: 'full',
            height: 'full',
            classes: 'media-audio-pause'
          })}
        </button>
        <h1 class="m-0">${title}</h1>
      </div>
    </section>
  `
}

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
    pagination = false,
    parents
  } = args

  /* Reset tracks */

  if (pagination) {
    scripts.meta.tracks = {}
  }

  /* Types */

  const isTerm = contentType === 'term'
  const isFullWidth = !parents?.some(parent => parent.renderType === 'column')
  const hasProjects = contentType === 'page' || contentType === 'track' || isTerm
  const hasGenres = hasProjects && isFullWidth && !isTerm

  /* Items required */

  if (!isArrayStrict(items)) {
    return ''
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
  
    let classes = `${isLast ? 'text-right' : 'media-audio-track-head text-left'} text-m-flex sharp pb-3xs pb-2xs-m`
    let textOutput = text

    if (i > 0) {
      classes += ' media-audio-track-wide'
    }

    if (isFirst) {
      textOutput = /* html */`
        <div class="flex justify-between gap-3xs gap-s-m">
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
      audioDuration,
      project,
      genre
    } = item

    /* Data required */

    const data = getMediaAudioTrackData(item)

    if (!data) {
      return
    }

    const { id, title, link } = data

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
      const genres = isArrayStrict(genre) ? Links(genre, 'lead-base') : ''

      cells.unshift({
        size: 'm',
        headers: 'genres',
        output: /* html */`
          <span class="text-m-flex muted clamp-2 relative e-line-in e-line-thin outline-tight">
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
      const projects = isArrayStrict(project) ? Links(project, 'lead-base') : ''

      cells.unshift({
        size: 'm',
        headers: 'projects',
        output: /* html */`
          <span class="text-m-flex muted clamp-2 relative e-line-in e-line-thin outline-tight">
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
      desc: `<a href="${link}" class="current" data-rich>${title}</a>`
    })

    const detailsLastIndex = details.length - 1
    const detailsOutput = Collapsible({
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

    cells.unshift({
      size: 'l',
      headers: 'title',
      output: /* html */`
        <div class="media-audio-track-item before flex gap-3xs gap-s-m align-center isolate">
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
            <a href="${link}" class="lead-base" data-rich>${title}</a>
          </div>
        </div>
        ${detailsOutput}
      `
    })

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
 * @param {boolean} [pagination]
 * @param {string} [contentType]
 * @return {string} HTMLTableElement
 */
const MediaAudioTracksContainer = (output: string, pagination?: boolean, contentType?: string): string => {
  return /* html */`
    <div class="media-audio-tracks${contentType === 'project' ? '-compact' : ''} block b-dull">
      <table aria-label="Tracks"${pagination ? ' data-pag-slot="entry"' : ''}>
        ${output}
      </table>
    </div>
  `
}

/* Exports */

export {
  MediaAudio,
  MediaAudioHero,
  MediaAudioTracks,
  MediaAudioTracksContainer
}
