/**
 * Render - footer
 */

/* Imports */

const { enumSite } = require('../vars/enums')
const { getPermalink, getYear } = require('../utils')
const logoSvg = require('./svg/logo')

/**
 * Function - output footer
 *
 * @param {object} navigations
 * @return {string} HTML - footer
 */

const footer = (navigations = {}) => {
  /* Footer and/or social navs */

  let navs = ''

  if (navigations?.footer || navigations?.social?.center) {
    const navFooter = navigations?.footer ? `<nav aria-label="Main">${navigations.footer}</nav>` : ''
    const navSocial = navigations?.social?.center ? `<nav aria-label="Social">${navigations.social.center}</nav>` : ''

    navs = `
      <div>
        <div class="flex wrap align-center justify-center gap-s">
          ${navFooter}
          ${navSocial}
        </div>
      </div>
    `
  }

  /* Output */

  return `
    <footer class="mt-auto">
      <hr>
      <div class="container pt-2xl pb-xl pb-2xl-m">
        <div class="flex col align-center justify-center gap-m">
          <div>
            <a class="o-logo-s block l-svg" href="${getPermalink()}">
              <span class="a11y-visually-hidden">${enumSite.title} home</span>
              ${logoSvg()}
            </a>
          </div>
          ${navs}
          <div class="text-center">
            <span class="text-s">&copy; ${getYear()} ${enumSite.title}. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

module.exports = footer
