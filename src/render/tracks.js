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

    let classes = 't-s t-background-light l-padding-bottom-3xs l-padding-bottom-2xs-m'

    if (lastIndex || secondLastIndex) {
      classes += ' t-align-right'
    } else {
      classes += ' t-align-left'

      if (!secondLastIndex) {
        classes += ' l-padding-right-2xs l-padding-right-m-m'
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
      desc: `<a href="${permalink}" class="t-current js-pt-link" data-inline>${title}</a>`
    }]

    /* Cells */

    const cells = [{
      size: 'l',
      headers: 'title',
      output: `
        <div class="l-flex l-gap-margin-2xs l-gap-margin-s-m l-align-center l-relative">
          <div class="t-line-height-0">
            <button type="button" id="b-${id}" class="o-play l-width-m l-height-m l-svg t-foreground-base bg-background-light b-radius-100-pc" aria-label="Play ${title}" data-state="play">
              ${controlSvg('play')}
              ${controlSvg('pause')}
            </button>
          </div>
          <div class="t-m t-weight-medium t-clamp-1 e-underline-reverse outline-tight">
            <a href="${permalink}" class="t-line-height-130-pc js-pt-link" data-inline>${title}</a>
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
          <span class="t-s t-background-light-60 t-line-height-130-pc t-clamp-2 l-relative e-underline-reverse e-underline-thin outline-tight">
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
          <span class="t-s t-background-light-60 t-line-height-130-pc t-clamp-2 l-relative e-underline-reverse e-underline-thin outline-tight">
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
      <span class="a11y-visually-hidden">${duration.a11yOutput}</span>
      <span aria-hidden="true">${duration.output}</span>
    `

    cells.push({
      size: 's',
      headers: 'duration',
      output: `<p class="t-s t-number-normal t-align-right t-background-light-60 l-relative">${durationOutput}</p>`
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
        <button class="l-width-s l-height-s l-flex l-align-center l-justify-center l-margin-left-auto l-relative" type="button" aria-label="Toggle ${title} details" id="${triggerId}" aria-controls="${detailsId}" aria-expanded="false">
          <span class="l-flex l-width-xs l-height-xs l-svg t-background-light o-collapsible-icon e-transition">
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
            classes.push('l-padding-right-2xs l-padding-right-m-m')
          }

          if (!lastIndex) {
            classes.push('o-track__cell')
          }

          classes = classes.join(' ')

          return `
            <td headers="${c.headers}"${classes ? ` class="${classes}"` : ''} data-size="${c.size}"${attr}>
              ${i === 0 ? '<div class="o-track-bg l-relative l-before l-padding-right-2xs l-padding-right-m-m">' : ''}
                ${c.output}
              ${i === 0 ? '</div>' : ''}
            </td>
          `
        }).join('')}
      </tr>
      <tr data-mobile>
        <td headers="details" colspan="2">
          <div class="o-track-bg-b l-relative l-before">
            <div class="o-collapsible l-relative l-z-index-1" id="${detailsId}" data-trigger="${triggerId}" data-accordion="${accordionId}">
              <div id="${collapsibleId}" class="o-collapsible__main e-transition outline-tight">
                <dl class="t-s t-number-normal t-background-light-60 t-line-height-130-pc e-underline-reverse l-margin-0-last l-padding-bottom-2xs l-padding-bottom-s-m">
                  ${detailsItems.map(d => {
                    return `
                      <dt class="t-background-light l-margin-bottom-5xs">${d.title}</dt>
                      <dd class="l-margin-bottom-2xs">${d.desc}</dd>
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
      <table class="o-table b-separator" aria-label="${a11yLabel}" data-collapse="false">
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
