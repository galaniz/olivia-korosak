/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

const namespace = 'ok'
const assetsLink = `${getPermalink('', true)}/assets/`
const date = new Date()

/* Data */

module.exports = {
  title: 'Olivia Korosak',
  metaDescription: 'Lorem ipsum sed dolorem quisque',
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
  baseLink: `${getPermalink()}/`,
  assetsLink,
  styles: `${assetsLink}css/${namespace}.css`,
  scripts: {
    main: `${assetsLink}js/${namespace}.js`,
    compat: `${assetsLink}js/${namespace}-compat.js`
  },
  context: process.env.CONTEXT,
  year: date.getFullYear()
}
