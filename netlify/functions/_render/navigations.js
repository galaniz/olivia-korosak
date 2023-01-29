/**
 * Navigations output
 *
 * @param {object} args {
 *  @param {array} navs
 *  @param {array} items
 *  @param {string} current
 *  @param {array} parents - For breadcrumbs
 *  @param {string} title - For breadcrumbs
 * }
 */

/* Imports */

const Navigation = require('../_utils/navigation')
const { getFile } = require('../_utils/functions')

/* Function */

const navigations = ({
  navs = [],
  items = [],
  current = '',
  parents = [],
  title = ''
}) => {
  /* Navs and items required */

  if (!navs.length && !items.length) {
    return {
      main: '',
      breadcrumbs: '',
      footer: '',
      social: {
        left: '',
        center: ''
      }
    }
  }

  /* Navigation instance */

  const nav = new Navigation({ navs, items })

  /* Output */

  return {
    main: nav.getOutput(
      'main',
      current,
      {
        listClass: 'c-nav__list l-relative l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden l-padding-top-4xs l-padding-bottom-4xs outline-snug',
        listAttr: 'role="list"',
        itemClass: 'c-nav__item',
        itemAttr: 'data-overflow-group="0"',
        linkClass: 'c-nav__link t-m t-line-height-130-pc l-inline-flex l-relative l-after l-padding-top-5xs l-padding-bottom-5xs'
      }
    ),
    breadcrumbs: nav.getBreadcrumbs(
      parents,
      title,
      {
        listClass: 'c-breadcrumbs l-flex t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        itemClass: 'l-flex',
        linkClass: 't-xs t-line-height-130-pc l-inline-flex',
        linkAttr: 'data-inline',
        currentClass: 't-xs t-line-height-130-pc t-weight-medium t-background-light t-clamp',
        a11yClass: 'a11y-visually-hidden',
        filterAfterLink: (output) => {
          output.html += '<span class="t-xs t-line-height-130-pc l-inline-flex l-padding-right-4xs l-padding-left-4xs" aria-hidden="true">&sol;</span>'
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs l-gap-margin-s-l t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't l-inline-flex',
        linkAttr: 'data-inline'
      }
    ),
    social: {
      left: nav.getOutput(
        'social',
        current,
        {
          listClass: 'l-flex l-flex-wrap l-gap-margin-2xs t-list-style-none',
          listAttr: 'role="list"',
          linkClass: 'l-flex l-align-center l-justify-center l-width-l l-height-l b-radius-100-pc b-all e-transition e-b-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="l-flex l-width-2xs l-height-2xs l-svg">
                ${getFile(`../_assets/svg/${t}.svg`)}
              </div>
            `

            output.html += icon
          }
        }
      ),
      center: nav.getOutput(
        'social',
        current,
        {
          listClass: 'l-flex l-flex-wrap l-justify-center l-gap-margin-2xs t-list-style-none',
          listAttr: 'role="list"',
          linkClass: 'l-flex l-align-center l-justify-center l-width-l l-height-l b-radius-100-pc b-all e-transition e-b-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="l-flex l-width-2xs l-height-2xs l-svg">
                ${getFile(`../_assets/svg/${t}.svg`)}
              </div>
            `

            output.html += icon
          }
        }
      )
    }
  }
}

/* Exports */

module.exports = navigations
