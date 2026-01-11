/**
 * Render - testimonial
 */

/* Imports */

const quoteSvg = require('./svg/quote')

/**
 * Function - output testimonial
 *
 * @param {object} args {
 *  @prop {string} quote
 *  @prop {string} title
 *  @prop {string} info
 * }
 * @return {string} HTML - figure
 */

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
    <figure class="flex col h-full">
      <div class="flex w-l h-m dull">
        ${quoteSvg()}
      </div>
      <blockquote class="pt-2xs pb-3xs">
        <p class="text-quote sharp">${quote}</p>
      </blockquote>
      <figcaption class="mt-auto">
        <p class="text-m wt-medium lead-base">${title}</p>
        ${info ? `<p class="text-s lead-base pt-5xs muted">${info}</p>` : ''}
      </figcaption>
    </figure>
  `
}

/* Exports */

module.exports = testimonial
