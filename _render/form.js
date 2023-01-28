/**
 * Form output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Imports */

const { randomUUID } = require('crypto')
const { namespace, scriptData } = require('../_utils/variables')
const { getFile } = require('../_utils/functions')
const loader = require('./loader')

/* Function */

const form = (args = {}, parents, id) => {
  let {
    subject = '',
    submitLabel = 'Send',
    successTitle = '',
    successText = '',
    name = ''
  } = args

  /* Id */

  if (!id) {
    id = randomUUID()
  }

  /* Name */

  if (!name) {
    name = `${namespace}-contact`
  }

  /* Subject */

  let subjectInput = ''

  if (subject) {
    subjectInput = `<input type="hidden" name="subject" value="${subject}">`
  }

  /* Add to script data */

  if (!scriptData?.id && successTitle) {
    scriptData[`form-${id}`] = {
      successMessage: {
        primary: successTitle,
        secondary: successText
      }
    }
  }

  scriptData.sendUrl = '/'

  /* Output */

  const start = `
    <form name="${name}" id="${id}" class="o-form js-send-form" method="post" data-netlify="true" novalidate>
      ${subjectInput}
      <div class="l-flex l-flex-column l-flex-row-l l-flex-wrap l-align-end-l l-gap-margin-s l-gap-margin-m-m">
        <div class="o-form-error__summary l-width-100-pc l-none" tabindex="-1">
          <div class="o-form__negative l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${getFile('./assets/svg/info.svg')}
                </div>
              </div>
              <div>
                <h2 class="t-m t-weight-medium l-margin-0 l-padding-top-5xs l-padding-bottom-5xs">There is a problem</h2>
                <ul class="o-form-error__list l-flex l-flex-column l-padding-bottom-4xs l-margin-bottom-4xs-all l-margin-0-last t-s t-line-height-130-pc t-list-style-none e-underline-all" role="list"></ul>
              </div>
            </div>
          </div>
        </div>
  `

  const end = `
        <div class="o-form-result__negative l-width-100-pc l-none" role="alert" tabindex="-1">
          <div class="o-form__negative l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${getFile('./assets/svg/info.svg')}
                </div>
              </div>
              <div>
                <h2 class="o-form-result__primary t-m t-weight-medium l-margin-0 l-padding-top-5xs"></h2>
                <p class="o-form-result__secondary t-s l-padding-bottom-5xs e-underline-all"></p>
              </div>
            </div>
          </div>
        </div>
        <div data-type="submit">
          <div class="l-padding-top-4xs">
            <button class="o-button b-radius-s e-transition-quad bg-background-light t-foreground-base o-button-large js-submit" type="submit">
              ${loader()}
              <span>${submitLabel}</span>
            </button>
          </div>
        </div>
        <div class="o-form-result__positive l-width-100-pc l-none" role="alert" tabindex="-1">
          <div class="o-form__positive l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${getFile('./assets/svg/check.svg')}
                </div>
              </div>
              <div>
                <h2 class="o-form-result__primary t-m t-weight-medium l-margin-0 l-padding-top-5xs"></h2>
                <p class="o-form-result__secondary t-s l-padding-bottom-5xs e-underline-all"></p>
              </div>
            </div>
          </div>
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