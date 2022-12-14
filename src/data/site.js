/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

const namespace = 'ok'
const assetsLink = `${getPermalink('', true)}/assets/`

/* Data */

module.exports = {
  title: 'Olivia Korosak',
  metaDescription: 'Lorem ipsum sed dolorem quisque',
  theme: {
    base: '#17181d',
    tint: '#45464a'
  },
  assetsLink,
  styles: `${assetsLink}css/${namespace}.css`,
  scripts: {
    main: `${assetsLink}js/${namespace}.js`,
    compat: `${assetsLink}js/${namespace}-compat.js`
  }
}
