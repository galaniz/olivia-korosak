/**
 * Rich text output
 *
 * @param {string} type
 * @param {array} content
 * @param {array} parents
 */

/* Imports */

const { optionValues } = require('../utils/constants')
const { getLink } = require('../utils/functions')

/* Function */

const richText = (type = 'paragraph', content = [], parents = []) => {
  if (type === 'hr') {
    return '<hr>'
  }

  /* Check if heading */

  const heading = type.includes('heading')

  /* Check content and card parent */

  let args = {}

  let cardLink = ''

  if (parents.length) {
    if (parents[0].type === 'content') {
      args = parents[0].fields
    }

    if (parents[1].type === 'card' && heading) {
      const {
        internalLink = false,
        externalLink = ''
      } = parents[1].fields

      cardLink = getLink(internalLink, externalLink)
    }
  }

  /* Normalize args */

  let {
    textStyle = 'Default', // optionValues.content.text
    headingStyle = 'Default' // optionValues.content.heading
  } = args

  textStyle = optionValues.content.text[textStyle]
  headingStyle = optionValues.content.heading[headingStyle]

  /* Tag */

  let tag = 'p'

  switch (type) {
    case 'heading-2':
      tag = 'h2'
      break
    case 'heading-3':
      tag = 'h3'
      break
    case 'heading-4':
      tag = 'h4'
      break
    case 'heading-5':
      tag = 'h5'
      break
    case 'heading-6':
      tag = 'h6'
      break
  }

  /* Classes */

  let classes = []

  if (textStyle && (tag === 'p' || tag === 'li')) {
    classes.push(`t-${textStyle}`)
  }

  if (headingStyle && heading) {
    classes.push(`t-${headingStyle}`)
  }

  classes = classes.join(' ')

  /* Output */

  let output = ''

  if (content.length) {
    content.forEach(c => {
      const {
        nodeType = 'text',
        value = ''
      } = c

      /* Text */

      if (nodeType === 'text' && value) {
        output += cardLink ? `<a class="l-before" href="${cardLink}">${value}</a>` : value
      }

      /* Link */

      if (nodeType === 'hyperlink') {
        const link = c.data.uri
        const linkText = c.content.map(cc => cc.value).join('')

        output += `<a href="${link}">${linkText}</a>`
      }
    })
  }

  return output ? `<${tag}${classes ? ` class="${classes}"` : ''}>${output}</${tag}>` : ''
}

/* Exports */

module.exports = richText
