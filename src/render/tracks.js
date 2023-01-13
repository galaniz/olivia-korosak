/**
 * Tracks output
 *
 * @param {object} args {
 *  @param {array} items
 *  @param {string} a11yLabel
 *  @param {string} contentType
 *  @param {bool} includeProjects
 *  @param {bool} includeGenres
 * }
 */

/* Imports */

const { randomUUID } = require('crypto')
const { getSlug, getPermalink, getFile } = require('../utils/functions')

/*
  Get audio duration as hh:mm:ss
  Source: https://www.colincrawley.com/audio-duration-calculator/
*/

const _getAudioDuration = (bytes = 0, bitRate = 0) => {
  if (!bytes || !bitRate) {
    return ''
  }

  const ratePerSecond = bitRate * 1000 / 8
  const ratePerMillisecond = ratePerSecond / 1000
  const duration = bytes / ratePerMillisecond

  const hours = Math.floor(duration / 3600000)
  let minutes = Math.floor(duration % 3600000 / 60000)
  let seconds = Math.floor(duration % 3600000 % 60000 / 1000)

  const output = []

  if (hours) {
    output.push(hours)
  }

  if (minutes) {
    output.push(minutes)

    if (hours && minutes < 10) {
      minutes = `0${minutes}`
    }
  } else {
    output.push('0')
  }

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  output.push(seconds)

  return output.join(':')
}

/* Comma separated links */

const _getCommaLinks = (items = [], contentType = '') => {
  const links = []

  if (items.length) {
    items.forEach(item => {
      const {
        title = '',
        slug = ''
      } = item.fields

      const permalink = getPermalink(
        getSlug({
          contentType,
          slug
        })
      )

      links.push(`<a href="${permalink}" class="t-current" data-inline>${title}</a>`)
    })
  } else {
    return ''
  }

  return links.join(', ')
}

/* Function */

const tracks = ({
  items = [],
  a11yLabel = '',
  contentType = 'track',
  includeProjects = false,
  includeGenres = false
}) => {
  if (!items.length) {
    return ''
  }

  /* Accordion id */

  const accordionId = `a-${randomUUID()}`

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

  const rows = items.map((item) => {
    const {
      title = '',
      slug = '',
      audio = false,
      project = [],
      genre = []
    } = item.fields

    /* Ids */

    const id = randomUUID()
    const detailsId = `d-${id}`
    const triggerId = `t-${id}`
    const collapsibleId = `c-${id}`

    /* Link */

    const permalink = getPermalink(
      getSlug({
        contentType,
        slug
      })
    )

    /* Description items for details */

    const detailsItems = [{
      title: 'Full Title',
      desc: `<a href="${permalink}" class="t-current" data-inline>${title}</a>`
    }]

    /* Cells */

    const cells = [{
      size: 'l',
      headers: 'title',
      output: `
        <div class="l-flex l-gap-margin-2xs l-gap-margin-s-m l-align-center">
          <div>
            <button type="button" class="l-width-m l-height-m bg-background-light b-radius-100-pc" aria-label="Play ${title}">
              <span class="l-flex l-width-m l-height-m l-svg t-foreground-base">
                ${getFile('./src/assets/svg/play.svg')}
              </span>
            </button>
          </div>
          <div class="e-underline-reverse">
            <a href="${permalink}" class="t-m t-weight-medium t-line-height-130-pc t-clamp" data-inline>${title}</a>
          </div>
        </div>
      `
    }]

    /* Projects */

    if (includeProjects) {
      const projects = _getCommaLinks(project, 'project')

      cells.push({
        size: 'm',
        headers: 'projects',
        output: `
          <span class="t-s t-background-light-60 e-underline-reverse e-underline-thin t-line-height-140-pc">
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
      const genres = _getCommaLinks(genre, 'genre')

      cells.push({
        size: 'm',
        headers: 'genres',
        output: `
          <span class="t-s t-background-light-60 e-underline-reverse e-underline-thin t-line-height-140-pc">
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

    let duration = ''

    if (audio) {
      duration = _getAudioDuration(audio.fields.file.details.size, 128)

      if (duration) {
        cells.push({
          size: 's',
          headers: 'duration',
          output: `<p class="t-s t-number-normal t-align-right">${duration}</p>`
        })

        detailsItems.push({
          title: 'Duration',
          desc: duration
        })
      }
    }

    /* Details */

    cells.push({
      size: 'xs',
      headers: 'details',
      output: `
        <button class="l-width-s l-height-s l-flex l-align-center l-justify-center l-margin-left-auto" type="button" aria-label="Toggle ${title} details" id="${triggerId}" aria-controls="${detailsId}" aria-expanded="false">
          <span class="l-flex l-width-xs l-height-xs l-svg t-background-light o-collapsible-icon e-transition">
            ${getFile('./src/assets/svg/arrow-down.svg')}
          </span>
        </button>
      `
    })

    /* Output */

    return `
      <tr class="l-relative b-top">
        ${cells.map((c, i) => {
          const lastIndex = i === cells.length - 1
          const secondLastIndex = i === cells.length - 2

          let attr = `${i !== 0 && !lastIndex ? ' data-desktop' : ''}`

          if (lastIndex) {
            attr = ' data-mobile'
          }

          let classes = 'l-padding-top-2xs l-padding-bottom-2xs l-padding-top-s-m l-padding-bottom-s-m'

          if (!lastIndex && !secondLastIndex) {
            classes += ' l-padding-right-2xs l-padding-right-m-m'
          }

          return `
            <td headers="${c.headers}" class="${classes}" data-size="${c.size}"${attr}>
              ${c.output}
            </td>
          `
        }).join('')}
      </tr>
      <tr data-mobile>
        <td headers="details" class="o-collapsible" id="${detailsId}" data-trigger="${triggerId}" data-accordion="${accordionId}" colspan="2">
          <div id="${collapsibleId}" class="o-collapsible__main e-transition">
            <dl class="t-s t-number-normal t-background-light-60 t-line-height-130-pc e-underline-reverse l-margin-0-last l-padding-bottom-2xs l-padding-bottom-s-m">
              ${detailsItems.map(d => {
                return `
                  <dt class="t-background-light l-margin-bottom-5xs">${d.title}</dt>
                  <dd class="l-margin-bottom-2xs">${d.desc}</dd>
                `
              }).join('')}
            </dl>
          </div>
        </td>
      </tr>
    `
  })

  /* Output */

  return `
    <div data-table>
      <table role="grid" class="o-table b-separator" aria-label="${a11yLabel}" data-collapse="false">
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
