/**
 * Render - form
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { enumNamespace } = require('../vars/enums')
const { scriptData } = require('../vars/data')
const errorSvg = require('./svg/error')
const checkSvg = require('./svg/check')
const loader = require('./loader')

/**
 * Function - output form wrapper
 *
 * @param {object} args {
 *  @prop {string} subject
 *  @prop {string} submitLabel
 *  @prop {string} successTitle
 *  @prop {string} successText
 * }
 * @param {string} id
 * @return {object}
 */

const form = ({ args = {}, id }) => {
  const {
    submitLabel = 'Send',
    successTitle = '',
    successText = ''
  } = args

  /* Id required */

  if (!id) {
    return {
      start: '',
      end: ''
    }
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

  scriptData.sendUrl = '/ajax/'

  /* Honeypot */

  const honeypotId = uuidv4()
  const honeypotName = `${enumNamespace}_asi`
  const honeypot = `
    <div class="o-form__field l-width-1-1" data-asi>
      <label class="o-form__label" for="${honeypotId}">Website</label>
      <input type="url" name="${honeypotName}" id="${honeypotId}" autocomplete="off" class="js-input">
    </div>
  `

  /* Output */

  const start = `
    <form id="${id}" class="o-form js-send-form" method="post" novalidate>
      <div class="l-flex l-flex-column l-flex-row-l l-flex-wrap l-align-end-l l-gap-margin-s l-gap-margin-m-m">
        <div class="o-form-error__summary l-width-100-pc l-none outline-none" tabindex="-1">
          <div class="o-info-negative bg-gradient-135 l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${errorSvg()}
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
        ${honeypot}
        <div class="o-form-result__negative l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
          <div class="o-info-negative bg-gradient-135 l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${errorSvg()}
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
        <div class="o-form-result__positive l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
          <div class="o-info-positive bg-gradient-135 l-padding-left-3xs l-padding-right-3xs l-padding-top-3xs l-padding-bottom-3xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                <div class="l-width-s l-height-m l-width-m-m l-svg">
                  ${checkSvg()}
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
