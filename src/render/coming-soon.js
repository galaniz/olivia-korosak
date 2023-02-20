/**
 * Render: coming soon
 *
 * @return {string} HTML - html
 */

/* Imports */

const { enumSite } = require('../vars/enums')
const layout = require('./layout')
const container = require('./container')
const content = require('./content')
const logoSvg = require('./svg/logo')

/* Function */

const comingSoon = () => {
  /* Container and content */

  const output = {
    container: container({
      args: {
        tag: 'Div',
        Column: 'Block',
        maxWidth: '650px',
        paddingTop: '80px',
        paddingTopLarge: '120px',
        paddingBottom: '80px',
        paddingBottomLarge: '120px',
        classes: 'l-min-height-100-vh l-flex l-align-center'
      }
    }),
    content: content({
      args: {
        richTextStyles: true
      }
    })
  }

  /* Output */

  return layout({
    content: `
      ${output.container.start}
        ${output.content.start}
          <div class="o-logo l-block l-svg">
            <span class="a11y-visually-hidden">${enumSite.title}</span>
            ${logoSvg()}
          </div>
          <h1 class="l-padding-top-xl l-padding-bottom-s">New site coming soon!</h1>
          <p>
            In the meantime you can reach me at 
            <a href="mailto:${enumSite.email}" data-inline>${enumSite.email}</a>
          </p>
        ${output.content.end}
      ${output.container.end}
    `
  })
}

/* Exports */

module.exports = comingSoon
