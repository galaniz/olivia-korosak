/**
 * Coming soon output
 * 
 * @return {string} HTML - html
 */

/* Imports */

const layout = require('./layout')
const container = require('./container')
const content = require('./content')
const logoSvg = require('./svg/logo')
const site = require('../_utils/site')

/* Function */

const comingSoon = () => {
  const output = {
    container: container({
      tag: 'Div',
      Column: 'Block',
      maxWidth: '650px',
      paddingTop: '80px',
      paddingTopLarge: '120px',
      paddingBottom: '80px',
      paddingBottomLarge: '120px',
      classes: 'l-min-height-100-vh l-flex l-align-center'
    }),
    content: content({
      richTextStyles: true
    })
  }

  return layout({
    content: `
      ${output.container.start}
        ${output.content.start}
          <div class="o-logo l-block l-svg">
            <span class="a11y-visually-hidden">${site.title}</span>
            ${logoSvg()}
          </div>
          <h1 class="l-padding-top-xl l-padding-bottom-s">New site coming soon!</h1>
          <p>
            In the meantime you can reach me at 
            <a href="mailto:hello@oliviakorosak.com" data-inline>hello@oliviakorosak.com</a>
          </p>
        ${output.content.end}
      ${output.container.end}
    `
  })
}

/* Exports */

module.exports = comingSoon
