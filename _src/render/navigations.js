/**
 * Render - navigations
 */

/* Imports */

const Navigation = require('./navigation')
const socialSvg = require('./svg/social')

/**
 * Function - output navigations
 *
 * @param {object} args {
 *  @prop {array<object>} navs
 *  @prop {array<object>} items
 *  @prop {string} current
 *  @prop {array<object>} parents - For breadcrumbs
 *  @prop {string} title - For breadcrumbs
 * }
 */

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
        listClass: 'nav-list relative flex align-center gap-m list-none overflow-x-auto overflow-y-hidden pt-4xs pb-4xs outline-snug',
        listAttr: 'role="list"',
        itemClass: 'nav-item',
        itemAttr: 'data-overflow-group="0"',
        linkClass: 'nav-link text-l lead-base inline-flex relative after pt-5xs pb-5xs'
      }
    ),
    breadcrumbs: nav.getBreadcrumbs(
      parents,
      title,
      {
        listClass: 'breadcrumbs flex list-none e-underline-reverse e-underline-thin',
        listAttr: 'role="list"',
        itemClass: 'flex',
        linkClass: 'text-s lead-base',
        linkAttr: 'data-rich',
        currentClass: 'text-s lead-base wt-medium clamp-1',
        a11yClass: 'a11y-visually-hidden',
        filterAfterLink: (output) => {
          output.html += '<span class="text-s lead-base pr-4xs pl-4xs" aria-hidden="true">&sol;</span>'
        }
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'flex wrap justify-center gap-2xs gap-s-l list-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't',
        linkAttr: 'data-rich'
      }
    ),
    social: {
      left: nav.getOutput(
        'social',
        current,
        {
          listClass: 'flex wrap gap-2xs list-none',
          listAttr: 'role="list"',
          linkClass: 'flex align-center justify-center w-l h-l b-radius-100-pc b-all e-transition e-border-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="flex w-2xs h-2xs l-svg">
                ${socialSvg(t)}
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
          listClass: 'flex wrap justify-center gap-2xs list-none',
          listAttr: 'role="list"',
          linkClass: 'flex align-center justify-center w-l h-l b-radius-100-pc b-all e-transition e-border-solid',
          filterBeforeLinkText: (args, item, output) => {
            output.html += '<span class="a11y-visually-hidden">'
          },
          filterAfterLinkText: (args, item, output) => {
            const { title = '' } = item
            const t = title.toLowerCase()

            output.html += '</span>'

            const icon = `
              <div class="flex w-2xs h-2xs l-svg">
                ${socialSvg(t)}
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
