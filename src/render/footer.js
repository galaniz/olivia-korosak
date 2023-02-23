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
        <div class="l-flex l-flex-wrap l-align-center l-justify-center l-gap-margin-s">
          ${navFooter}
          ${navSocial}
        </div>
      </div>
    `
  }

  /* Output */

  return `
    <footer class="l-margin-top-auto">
      <hr>
      <div class="l-container l-padding-top-2xl l-padding-bottom-xl l-padding-bottom-2xl-m">
        <div class="l-flex l-flex-column l-align-center l-justify-center l-gap-margin-m">
          <div>
            <a class="o-logo-s l-block l-svg" href="${getPermalink()}">
              <span class="a11y-visually-hidden">${enumSite.title} home</span>
              ${logoSvg()}
            </a>
          </div>
          ${navs}
          <div class="t-align-center">
            <span class="t-xs">&copy; ${getYear()} ${enumSite.title}. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

module.exports = footer
