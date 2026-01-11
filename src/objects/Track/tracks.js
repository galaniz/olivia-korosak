/**
 * Render - tracks
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { getSlug, getPermalink, getDuration, getDurationReverse, getCommaLinks } = require('../utils')
const { scriptData } = require('../vars/data')
const controlSvg = require('./svg/control')
const caretSvg = require('./svg/caret')

/**
 * Function - output testimonial
 *
 * @param {object} args {
 *  @prop {array<object>} items
 *  @prop {string} a11yLabel
 *  @prop {string} contentType
 *  @prop {boolean} includeProjects
 *  @prop {boolean} includeGenres
 * }
 * @return {string} HTML - div
 */

const tracks = async ({
  items = [],
  a11yLabel = '',
  contentType = 'track',
  includeProjects = false,
  includeGenres = false
}) => {
  if (!items.length) {
    return ''
  }

  /* Store script data */

  const tracksData = []

  /* Accordion id */

  const accordionId = `a-${uuidv4()}`

  /* Header cells */

  let head = [{
    text: 'Title',
    id: 'title'
  }]

  if (includeProjects) {
    head.push({
      text: 'Projects',
      id: 'projects'
    })
  }

  if (includeGenres) {
    head.push({
      text: 'Genres',
      id: 'genres'
    })
  }

  head.push({
    text: 'Duration',
    id: 'duration'
  })

  head.push({
    text: 'Details',
    id: 'details'
  })

  head = head.map((h, i) => {
    const lastIndex = i === head.length - 1
    const secondLastIndex = i === head.length - 2

    let classes = 'text-m-flex sharp pb-3xs pb-2xs-m'

    if (lastIndex || secondLastIndex) {
      classes += ' text-right'
    } else {
      classes += ' text-left'

      if (!secondLastIndex) {
        classes += ' pr-2xs pr-m-m'
      }
    }

    let attr = `${i !== 0 && !lastIndex ? ' data-desktop' : ''}`

    if (lastIndex) {
      attr = ' data-mobile'
    }

    return `
      <th class="${classes}" id="${h.id}" data-${attr}>
        ${h.text}
      </th>
    `
  })

  /* Body rows from items */

  const rows = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]

    const {
      title = '',
      slug = '',
      audio = false,
      audioDuration = '',
      project = [],
      genre = []
    } = item.fields

    /* Audio, title and slug required */

    if (!title || !slug || !audio || !audioDuration) {
      continue
    }

    /* Audio info */

    const { file } = audio.fields
    const { url, contentType: fileType } = file

    /* Ids */

    const id = item.sys.id
    const detailsId = `d-${id}`
    const triggerId = `t-${id}`
    const collapsibleId = `c-${id}`

    /* Link */

    const permalink = getPermalink(
      getSlug({
        id,
        contentType,
        slug
      })
    )

    /* Description items for details */

    const detailsItems = [{
      title: 'Full Title',
      desc: `<a href="${permalink}" class="current" data-rich>${title}</a>`
    }]

    /* Cells */

    const cells = [{
      size: 'l',
      headers: 'title',
      output: `
        <div class="flex gap-2xs gap-s-m align-center relative">
          <div>
            <button type="button" id="b-${id}" class="play w-m h-m sharp bg-background-light b-radius-full" aria-label="Play ${title}" data-state="play">
              ${controlSvg('play')}
              ${controlSvg('pause')}
            </button>
          </div>
          <div class="text-l wt-medium clamp-1 e-line-in outline-tight">
            <a href="${permalink}" class="lead-base" data-rich>${title}</a>
          </div>
        </div>
      `
    }]

    /* Projects */

    if (includeProjects) {
      const projects = getCommaLinks(project, 'project')

      cells.push({
        size: 'm',
        headers: 'projects',
        output: `
          <span class="text-m-flex muted lead-base clamp-2 relative e-line-in e-line-thin outline-tight">
            ${projects}
          </span>
        `
      })

      if (projects) {
        detailsItems.push({
          title: 'Projects',
          desc: projects
        })
      }
    }

    /* Genres */

    if (includeGenres) {
      const genres = getCommaLinks(genre, 'genre')

      cells.push({
        size: 'm',
        headers: 'genres',
        output: `
          <span class="text-m-flex muted lead-base clamp-2 relative e-line-in e-line-thin outline-tight">
            ${genres}
          </span>
        `
      })

      if (genres) {
        detailsItems.push({
          title: 'Genres',
          desc: genres
        })
      }
    }

    /* Duration */

    const seconds = getDurationReverse(audioDuration)

    const duration = {
      seconds,
      a11yOutput: getDuration(seconds, true),
      output: getDuration(seconds)
    }

    const durationOutput = `
      <span class="a-hide-vis">${duration.a11yOutput}</span>
      <span aria-hidden="true">${duration.output}</span>
    `

    cells.push({
      size: 's',
      headers: 'duration',
      output: `<p class="text-m-flex num-normal text-right muted relative">${durationOutput}</p>`
    })

    detailsItems.push({
      title: 'Duration',
      desc: durationOutput
    })

    /* Details */

    cells.push({
      size: 'xs',
      headers: 'details',
      output: `
        <button class="w-s h-s flex align-center justify-center ml-auto relative" type="button" aria-label="Toggle ${title} details" id="${triggerId}" aria-controls="${detailsId}" aria-expanded="false">
          <span class="flex w-xs h-xs sharp o-collapsible-icon e-trans">
            ${caretSvg('down')}
          </span>
        </button>
      `
    })

    /* Front end data */

    tracksData.push({
      id,
      title,
      permalink,
      item: null,
      button: null,
      url: `https:${url}`,
      type: fileType,
      duration: seconds
    })

    /* Output */

    rows.push(`
      <tr class="o-track b-top" id=${id}>
        ${cells.map((c, i) => {
          const lastIndex = i === cells.length - 1
          const secondLastIndex = i === cells.length - 2

          let attr = `${i !== 0 && !lastIndex ? ' data-desktop' : ''}`

          if (lastIndex) {
            attr = ' data-mobile'
          }

          let classes = []

          if (!lastIndex && !secondLastIndex) {
            classes.push('pr-2xs pr-m-m')
          }

          if (!lastIndex) {
            classes.push('o-track__cell')
          }

          classes = classes.join(' ')

          return `
            <td headers="${c.headers}"${classes ? ` class="${classes}"` : ''} data-size="${c.size}"${attr}>
              ${i === 0 ? '<div class="o-track-bg relative before pr-2xs pr-m-m">' : ''}
                ${c.output}
              ${i === 0 ? '</div>' : ''}
            </td>
          `
        }).join('')}
      </tr>
      <tr data-mobile>
        <td headers="details" colspan="2">
          <div class="o-track-bg-b relative before">
            <div class="o-collapsible relative z-1" id="${detailsId}" data-trigger="${triggerId}" data-accordion="${accordionId}">
              <div id="${collapsibleId}" class="o-collapsible__main e-trans outline-tight">
                <dl class="text-m-flex num-normal muted lead-base e-line-in m-0-last pb-2xs pb-s-m">
                  ${detailsItems.map(d => {
                    return `
                      <dt class="sharp mb-5xs">${d.title}</dt>
                      <dd class="mb-2xs">${d.desc}</dd>
                    `
                  }).join('')}
                </dl>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `)
  }

  /* Add to script data */

  if (!scriptData?.tracks) {
    scriptData.tracks = []
  }

  scriptData.tracks = scriptData.tracks.concat(tracksData)

  /* Output */

  return `
    <div data-table>
      <table class="o-table b-dull" aria-label="${a11yLabel}" data-collapse="false">
        <thead>
          <tr>
            ${head.join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.join('')}
        </tbody>
      </table>
    </div>
  `
}

/* Exports */

module.exports = tracks
