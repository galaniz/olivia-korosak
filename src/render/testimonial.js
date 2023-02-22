/**
 * Render: testimonial
 *
 * @param {object} args {
 *  @param {string} quote
 *  @param {string} title
 *  @param {string} info
 * }
 * @return {string} HTML - figure
 */

/* Imports */

const quoteSvg = require('./svg/quote')

/* Function */

const testimonial = ({ args = {} }) => {
  const {
    quote = '',
    title = '',
    info = ''
  } = args

  /* Quote and title required */

  if (!quote || !title) {
    return ''
  }

  /* Output */

  return `
    <figure class="l-flex l-flex-column l-height-100-pc">
      <div class="l-flex l-width-l l-height-m l-svg t-background-light-20">
        ${quoteSvg()}
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
