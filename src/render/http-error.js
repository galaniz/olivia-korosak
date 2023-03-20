/**
 * Render - http error
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

/**
 * Function - output http error page (404 or 500)
 *
 * @param {string} type - 404 or 500
 * @return {string} HTML - html
 */

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
      args: {
        maxWidth: '1300px',
        paddingTop: '80px',
        paddingTopLarge: '100px',
        paddingBottom: '100px',
        paddingBottomLarge: '120px',
        gap: '10px',
        gapLarge: '15px'
      }
    }),
    button: button({
      args: {
        title: 'Back to Homepage',
        type: 'Secondary',
        paddingTop: '20px',
        link: getPermalink()
      }
    })
  }

  /* Output */

  return layout({
    meta: {
      title: text[type].metaTitle,
      noIndex: true
    },
    gradients: gradients({
      from: '#5e2424',
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
