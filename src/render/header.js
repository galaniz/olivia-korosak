/**
 * Render - header
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { getPermalink } = require('../utils')
const { enumSite } = require('../vars/enums')
const logoSvg = require('./svg/logo')

/**
 * Function - output header
 *
 * @param {object} navigations
 * @return {string} HTML - header
 */

const header = (navigations = {}) => {
  /* Id */

  const id = `n-${uuidv4()}`

  /* Main and/or social navs */

  let nav = ''

  if (navigations?.main) {
    const navSocial = navigations?.social?.left ? `<div class="l-padding-top-m">${navigations.social.left}</div>` : ''

    nav = `
      <nav class="c-nav l-relative l-container l-padding-top-2xs l-padding-bottom-2xs l-padding-top-s-m l-padding-bottom-s-m" aria-label="Main" data-overflow="false" data-overflow-all="false" data-open="false">
        <div class="c-nav__overlay l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc e-transition"></div>
        <div class="l-flex l-justify-between l-align-center">
          <a class="c-nav__logo o-logo l-block l-svg js-pt-link" href="${getPermalink()}">
            <span class="a11y-visually-hidden">${enumSite.title} home</span>
            ${logoSvg()}
          </a>
          ${navigations.main}
          <div class="c-nav__hide l-height-l l-width-m">
            <button class="c-nav__button c-nav__open l-height-l l-width-m l-relative l-padding-top-5xs" type="button" aria-haspopup="dialog" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative e-transition" data-num="1">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-line-height-100-pc l-padding-top-4xs l-block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav-overflow l-fixed l-right-0 l-bottom-0 l-z-index-1 l-height-100-pc bg-background-light t-dark t-link-current e-transition l-width-4-5" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav-overflow__main e-transition l-height-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-padding-right-s l-padding-left-s l-padding-top-3xl l-padding-bottom-xs">
              <ul class="c-nav-overflow__list l-flex l-flex-column l-gap-margin-2xs t-list-style-none" role="list"></ul>
              ${navSocial}
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close l-height-l l-width-m l-fixed l-padding-top-5xs" type="button" aria-label="Close menu" data-visible="false">
                <span class="c-nav-icon l-block l-relative e-transition" data-num="1">
                  <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                  <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                  <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
                </span>
                <span class="c-nav-icon-label t-xs t-line-height-100-pc l-padding-top-4xs l-block e-transition" aria-hidden="true">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      <a href="#main" class="c-skip-link t-l t-weight-medium bg-background-light t-dark l-block l-absolute l-left-0 l-right-0 l-top-0 l-padding-right-2xs l-padding-left-2xs l-padding-top-3xs l-padding-bottom-3xs t-align-center outline-inset">
        Skip to main content
      </a>
      ${nav}
    </header>
  `
}

/* Exports */

module.exports = header
