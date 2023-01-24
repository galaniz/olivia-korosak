/**
 * Form output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Imports */

const { randomUUID } = require('crypto')
const { namespace } = require('../utils/variables')
const loader = require('./loader')

/* Function */

const form = (args = {}, parents, id) => {
  const {
    subject = '',
    submitLabel = 'Send',
    successTitle = '',
    successText = ''
  } = args

  /* Id */

  if (!id) {
    id = randomUUID()
  }

  /* Subject */

  let subjectInput = ''

  if (subject) {
    subjectInput = `<input type="hidden" name="subject" value="${subject}">`
  }

  /* Output */

  const start = `
    <form name="${namespace}-contact" id="${id}" class="o-form" method="post" data-netlify="true" novalidate>
      ${subjectInput}
      <div class="l-flex l-flex-column l-flex-row-l l-flex-wrap l-align-end-l l-gap-margin-s l-gap-margin-m-m">
  `

  const end = `
        <div data-type="submit">
          <button class="o-button b-radius-s e-transition-quad bg-background-light t-foreground-base o-button-large js-submit" type="submit">
            ${loader()}
            <span>${submitLabel}</span>
          </button>
        </div>
      </div>
    </form>
  `

  return {
    start,
    end
  }
}

/* Exports */

module.exports = form
