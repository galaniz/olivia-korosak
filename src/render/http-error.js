/**
 * Render: http error (404, 500...)
 *
 * @param {string} type - 404 or 500
 * @return {string} HTML - html
 */

/* Imports */

const layout = require('./layout')
const container = require('./container')
const button = require('./button')
const gradients = require('./gradients')
const header = require('./header')
const footer = require('./footer')
const navigations = require('./navigations')
const { getPermalink } = require('../utils')
const { navData } = require('../vars/data')

/* Function */

const httpError = (type = '404') => {
  /* Text by type */

  const text = {
    404: {
      metaTitle: 'Page Not Found',
      heroText: 'Looks like nothing was found in this location.'
    },
    500: {
      metaTitle: 'Internal Server Error',
      heroText: 'Looks like we\'re experiencing an internal server problem.'
    }
  }

  /* Navigations */

  const navs = navigations({
    navs: navData.navs,
    items: navData.items,
    current: getPermalink(type)
  })

  /* Container and button */

  const output = {
    container: container({
      tag: 'Div',
      Column: 'Block',
      maxWidth: '1300px',
      paddingTop: '80px',
      paddingTopLarge: '100px',
      paddingBottom: '100px',
      paddingBottomLarge: '120px',
      gap: '10px',
      gapLarge: '15px'
    }),
    button: button({
      title: 'Back to Homepage',
      type: 'Secondary',
      paddingTop: '20px',
      link: getPermalink()
    })
  }

  /* Output */

  return layout({
    meta: {
      title: text[type].metaTitle,
      noIndex: true
    },
    gradients: gradients({
      from: '#4d2d2d',
      to: '#4c2d3c',
      bottom: false
    }),
    content: `
      ${header(navs)}
      <main id="main">
        ${output.container.start}
          <h1>${type}</h1>
          <p class="t-m">${text[type].heroText}</p>
          ${output.button}
        ${output.container.end}
      </main>
      ${footer(navs)}
    `
  })
}

/* Exports */

module.exports = httpError
