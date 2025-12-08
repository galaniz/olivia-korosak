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
    const navSocial = navigations?.social?.left ? `<div class="pt-m">${navigations.social.left}</div>` : ''

    nav = `
      <nav class="nav relative container pt-2xs pb-2xs pt-s-m pb-s-m" aria-label="Main" data-overflow="false" data-overflow-all="false" data-open="false">
        <div class="nav-overlay fixed top-0 left-0 z-index-1 w-full h-full e-transition"></div>
        <div class="flex justify-between align-center">
          <a class="nav-logo o-logo block l-svg" href="${getPermalink()}">
            <span class="a11y-visually-hidden">${enumSite.title} home</span>
            ${logoSvg()}
          </a>
          ${navigations.main}
          <div class="nav-hide h-l w-m">
            <button class="nav-button nav-open h-l w-m relative pt-5xs" type="button" aria-haspopup="dialog" aria-controls="${id}" aria-label="Open menu">
              <span class="nav-icon block relative e-transition" data-num="1">
                <span class="nav-icon__top bg-current block e-transition"></span>
                <span class="nav-icon__middle bg-current block e-transition"></span>
                <span class="nav-icon__bottom bg-current block e-transition"></span>
              </span>
              <span class="nav-icon-label text-s lead-tight pt-4xs block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="nav-overflow fixed right-0 bottom-0 z-index-1 h-full bg-background-light e-transition col-10" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="nav-overflow__main e-transition h-full overflow-y-auto overscroll-none overflow-x-hidden pr-s pl-s pt-3xl pb-xs">
              <ul class="nav-overflow__list flex col gap-2xs list-none" role="list"></ul>
              ${navSocial}
            </div>
            <div class="nav-hide">
              <button class="nav-button nav-close h-l w-m fixed pt-5xs" type="button" aria-label="Close menu" data-visible="false">
                <span class="nav-icon block relative e-transition" data-num="1">
                  <span class="nav-icon__top bg-current block e-transition"></span>
                  <span class="nav-icon__middle bg-current block e-transition"></span>
                  <span class="nav-icon__bottom bg-current block e-transition"></span>
                </span>
                <span class="nav-icon-label text-s lead-tight pt-4xs block e-transition" aria-hidden="true">Menu</span>
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
      <a href="#main" class="c-skip-link text-xl wt-medium bg-background-light block absolute left-0 right-0 top-0 pr-2xs pl-2xs pt-3xs pb-3xs text-center outline-inset">
        Skip to main content
      </a>
      ${nav}
    </header>
  `
}

/* Exports */

module.exports = header
