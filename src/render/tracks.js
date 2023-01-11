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

const { getSlug, getPermalink, getFile } = require('../utils/functions')

/* Get audio duration as hh:mm:ss */

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

  if (seconds) {
    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    output.push(seconds)
  }

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

  return `<span class="t-s t-background-light-60 e-underline-reverse e-underline-thin">${links.join(', ')}</span>`
}

/* Function */

const tracks = ({
  items = [],
  a11yLabel = '',
  contentType = 'track',
  includeProjects = true,
  includeGenres = true
}) => {
  if (!items.length) {
    return ''
  }

  /* Header cells */

  let head = ['Title']

  if (includeProjects) {
    head.push('Projects')
  }

  if (includeGenres) {
    head.push('Genres')
  }

  head.push('Duration')

  head = head.map((h, i) => {
    let classes = 't-s t-background-light l-padding-bottom-3xs l-padding-bottom-2xs-m '

    if (i === head.length - 1) {
      classes += 't-align-right'
    } else {
      classes += 't-align-left'
    }

    return `<th scope="col" class="${classes}">${h}</th>`
  })

  /* Body rows from items */

  const rows = items.map((item, i) => {
    const {
      title = '',
      slug = '',
      audio = false,
      project = [],
      genre = []
    } = item.fields

    /* Link */

    const permalink = getPermalink(
      getSlug({
        contentType,
        slug
      })
    )

    /* Cells */

    const cells = [
      `
        <div class="l-flex l-gap-margin-2xs l-gap-margin-s-m l-align-center">
          <div>
            <button type="button" class="l-width-m l-height-m bg-background-light b-radius-100-pc" aria-label="Play ${title}" tabindex="-1">
              <span class="l-flex l-width-m l-height-m l-svg t-foreground-base">
                ${getFile('./src/assets/svg/play.svg')}
              </span>
            </button>
          </div>
          <div class="e-underline-reverse">
            <a href="${permalink}" class="t-m t-weight-medium" tabindex="-1" data-inline>${title}</a>
          </div>
        </div>
      `
    ]

    /* Projects */

    if (includeProjects) {
      cells.push(_getCommaLinks(project, 'project'))
    }

    /* Genres */

    if (includeGenres) {
      cells.push(_getCommaLinks(genre, 'genre'))
    }

    /* Duration */

    let duration = ''

    if (audio) {
      duration = _getAudioDuration(audio.fields.file.details.size, 128)

      if (duration) {
        cells.push(`<p class="t-s t-number-normal t-align-right">${duration}</p>`)
      }
    }

    /* Output */

    return `
      <tr role="row" class="l-relative b-top">
        ${cells.map(c => {
          return `
            <td class="l-padding-top-2xs l-padding-bottom-2xs l-padding-top-s-m l-padding-bottom-s-m" tabindex="-1">
              ${c}
            </td>
          `
        }).join('')}
      </tr>
    `
  })

  /* Output */

  return `
    <table role="grid" class="b-separator" aria-label="${a11yLabel}">
      <thead>
        <tr>
          ${head.join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.join('')}
      </tbody>
    </table>
  `
}

/* Exports */

module.exports = tracks
