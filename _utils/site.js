/**
 * Site data
 */

/* Imports */

const { namespace } = require('./variables')
const { getPermalink } = require('./functions')

/* Variables */

const assets = `${getPermalink()}assets/`
const date = new Date()

/* Data */

const site = {
  title: 'Olivia Korosak',
  meta: {
    description: 'Lorem ipsum sed dolorem quisque',
    image: ''
  },
  theme: {
    foreground: {
      base: '#17181d',
      light: '#232428',
      dark: '#000000',
      tint: '#45464a'
    },
    background: {
      light: '#ffffff'
    },
    negative: '#cf6f74',
    positive: '#509976',

    base: '#17181d',
    tint: '#45464a'
  },
  links: {
    base: `${getPermalink()}`,
    assets
  },
  styles: `${assets}css/${namespace}.css`,
  script: `${assets}js/${namespace}.js`,
  year: date.getFullYear(),
  namespace
}

/* Export */

module.exports = site
