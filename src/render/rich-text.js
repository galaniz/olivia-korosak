/**
 * Render: rich text
 *
 * @param {string} type
 * @param {array} content
 * @param {array} parents
 * @return {string}
 */

/* Imports */

const { enumOptions } = require('../vars/enums')
const { getLink } = require('../utils')

/* Get inline start and end tags */

const _getInlineTag = (marks) => {
  if (!marks.length) {
    return {
      start: '',
      end: ''
    }
  }

  marks = marks.map(m => {
    let tag = ''

    switch (m.type) {
      case 'bold':
        tag = 'b'
        break
      case 'italic':
        tag = 'i'
        break
    }

    return tag
  })

  return {
    start: marks.map(m => m ? `<${m}>` : ''),
    end: marks.map(m => m ? `</${m}>` : '')
  }
}

/* Link markup */

const _getLink = (obj) => {
  const {
    data,
    content = []
  } = obj

  const link = data.uri || ''

  if (!link || !content.length) {
    return ''
  }

  const text = content.map(c => {
    const {
      marks = [],
      value = ''
    } = c

    const markTag = _getInlineTag(marks)

    return `${markTag.start}${value}${markTag.end}`
  })

  return `<a href="${link}" data-inline>${text.join('')}</a>`
}

/* Function */

const richText = ({
  type = 'paragraph',
  content = [],
  parents = [],
  classes = ''
}) => {
  if (type === 'hr') {
    return '<hr>'
  }

  /* Check if heading */

  const heading = type.includes('heading')

  /* Check content and card parent */

  let args = {}

  let cardLink = ''
  let card = false

  if (parents.length) {
    if (parents[0].type === 'content') {
      args = parents[0].fields
    }

    if (parents[1].type === 'card') {
      card = true
    }

    if (card && heading) {
      const {
        internalLink = false,
        externalLink = ''
      } = parents[1].fields

      cardLink = getLink(internalLink, externalLink)
    }
  }

  /* Normalize args */

  let {
    textStyle = 'Default', // enumOptions.content.text
    headingStyle = 'Default' // enumOptions.content.heading
  } = args

  textStyle = enumOptions.content.text[textStyle]
  headingStyle = enumOptions.content.heading[headingStyle]

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

  classes = [classes]

  if (card && tag === 'p') {
    classes.push('t-link-current t-background-light-60')
  }

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
        let linkText = value

        if (cardLink && value) {
          const textArray = linkText.split(' ')

          linkText = textArray.map((l, i) => {
            if (i === textArray.length - 1) {
              return `<span data-title>${l}</span>`
            }

            return l
          }).join(' ')

          linkText = `<span role="text">${linkText}</span>`
        }

        output += cardLink ? `<a class="l-before" href="${cardLink}" data-inline>${linkText}</a>` : value
      }

      /* Link */

      if (nodeType === 'hyperlink') {
        output += _getLink(c)
      }
    })
  }

  return output ? `<${tag}${classes ? ` class="${classes}"` : ''}>${output}</${tag}>` : ''
}

/* Exports */

module.exports = richText
