/**
 * Site data
 */

/* Imports */

const { namespace } = require('../utils/variables')
const { getPermalink } = require('../utils/functions')

/* Variables */

const assets = `${getPermalink()}assets/`
const date = new Date()

/* Data */

module.exports = {
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
  scripts: {
    main: `${assets}js/${namespace}.js`,
    compat: `${assets}js/${namespace}-compat.js`
  },
  context: process.env.CONTEXT,
  year: date.getFullYear(),
  namespace
}
