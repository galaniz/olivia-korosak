/**
 * Site data
 */

/* Imports */

const { getPermalink } = require('../utils/base')

/* Data */

module.exports = {
  title: 'Olivia Korosak',
  metaDescription: 'Lorem ipsum sed dolorem quisque',
  themeColor: '#17181d',
  styles: `${getPermalink('', true)}/assets/css/mp.css`
}
