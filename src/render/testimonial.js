/**
 * Testimonial output
 *
 * @param {object} args {
 *  @param {string} quote
 *  @param {string} title
 *  @param {string} info
 * }
 */

/* Imports */

const { getFile } = require('../utils/functions')

/* Function */

const testimonial = ({
  quote = '',
  title = '',
  info = ''
}) => {
  /* Quote and title required */

  if (!quote || !title) {
    return ''
  }

  /* Output */

  return `
    <figure class="l-flex l-flex-column l-height-100-pc">
      <div class="l-flex l-width-l l-height-m l-svg t-background-light-20">
        ${getFile('./src/assets/svg/quote.svg')}
      </div>
      <blockquote class="l-padding-top-2xs l-padding-bottom-3xs">
        <p class="t-quote t-background-light">${quote}</p>
      </blockquote>
      <figcaption class="l-margin-top-auto">
        <p class="t t-weight-medium t-line-height-130-pc">${title}</p>
        ${info ? `<p class="t-xs t-line-height-130-pc l-padding-top-5xs t-background-light-60">${info}</p>` : ''}
      </figcaption>
    </figure>
  `
}

/* Exports */

module.exports = testimonial
