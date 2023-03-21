/**
 * Render - rich text
 */

/* Imports */

const { enumOptions } = require('../vars/enums')
const { getLink } = require('../utils')

/**
 * Function - get html tag from type
 *
 * @private
 * @param {string} type
 * @return {string}
 */

const _getTag = (type) => {
  let tag = ''

  switch (type) {
    case 'paragraph':
      tag = 'p'
      break
    case 'blockquote':
      tag = 'blockquote'
      break
    case 'bold':
      tag = 'b'
      break
    case 'italic':
      tag = 'i'
      break
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
    case 'list-item':
      tag = 'li'
      break
    case 'unordered-list':
      tag = 'ul'
      break
    case 'ordered-list':
      tag = 'ol'
      break
    case 'table':
      tag = 'table'
      break
    case 'table-row':
      tag = 'tr'
      break
    case 'table-cell':
      tag = 'td'
      break
    case 'table-header-cell':
      tag = 'th'
      break
  }

  return tag
}

/**
 * Function - get inline start and end tags
 *
 * @private
 * @param {array<object>} marks
 * @return {object}
 */

const _getInlineTag = (marks) => {
  if (!marks.length) {
    return {
      start: '',
      end: ''
    }
  }

  marks = marks.map(m => {
    return _getTag(m.type)
  })

  return {
    start: marks.map(m => m ? `<${m}>` : ''),
    end: marks.map(m => m ? `</${m}>` : '')
  }
}

/**
 * Function - output link
 *
 * @private
 * @param {object} obj {
 *  @prop {object} data
 *  @prop {array<object>} content
 * }
 * @return {string} HTML - a
 */

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

/**
 * Function - recursively output content
 * 
 * @private
 * @param {object} args {
 *  @prop {array} content
 *  @prop {string} cardLink
 *  @prop {string} outerTag
 * }
 * @return {string}
 */

const _getContent = ({
  content = [],
  cardLink = '',
  outerTag = '',
  _output = ''
}) => {
  content.forEach(c => {
    const {
      nodeType = 'text',
      value = '',
      marks,
      content: con,
    } = c

    /* Text */

    if (nodeType === 'text' && value) {
      let linkText = value
      let val = value

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

      if (marks) {
        const markTag = _getInlineTag(marks)

        val = `${markTag.start}${value}${markTag.end}`
      }

      _output += cardLink ? `<a class="l-before" href="${cardLink}" data-inline>${linkText}</a>` : val
    }

    /* Nested content */

    if (Array.isArray(con)) {
      const tag = _getTag(nodeType)
      const inner = _getContent({
        content: con,
        cardLink,
        outerTag
      })

      if (tag && inner) {
        if ((outerTag === 'ul' || outerTag === 'ol' || outerTag === 'table') && tag === 'p') {
          _output += inner
        } else {
          const attr = []

          if (tag === 'ul' || tag === 'ol' || tag === 'li' || tag === 'blockquote' || tag === 'p') {
            attr.push('data-inline')
          }

          if (tag === 'th') {
            attr.push('scope="col"')
          }

          _output += `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>${inner}</${tag}>`
        }
      }
    }

    /* Link */

    if (nodeType === 'hyperlink') {
      _output += _getLink(c)
    }
  })

  return _output
}

/**
 * Function - output rich text
 *
 * @param {object} args {
 *  @prop {string} type
 *  @prop {array<object>} content
 *  @prop {array<object>} parents
 *  @prop {string} classes
 *  @prop {string} textStyle
 *  @prop {string} headingStyle
 * }
 * @return {string}
 */

const richText = (args = {}) => {
  let {
    type = 'paragraph',
    content = [],
    parents = [],
    classes = ''
  } = args

  /* Hr */

  if (type === 'hr') {
    return '<hr>'
  }

  /* Check if heading */

  const heading = type.includes('heading')

  /* Check content and card parent */

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
        externalLink = '',
        embed
      } = parents[1].fields

      if (!embed) {
        cardLink = getLink(internalLink, externalLink)
      }
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

  const tag = _getTag(type)

  /* Classes */

  classes = classes ? [classes] : []

  if (card && tag === 'p') {
    classes.push('t-link-current t-background-light-60')
  }

  if (textStyle && (tag === 'p' || tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'table')) {
    classes.push(`t-${textStyle}`)
  }

  if (headingStyle && heading) {
    classes.push(`t-${headingStyle}`)
  }

  if (tag === 'ol') {
    classes.push('t-number-normal')
  }

  classes = classes.join(' ')

  /* Generate output */

  let output = ''

  if (content.length) {
    output = _getContent({
      content,
      cardLink,
      outerTag: tag
    })
  }

  /* Attributes */

  const attr = []

  if (type.includes('heading-')) {
    attr.push(`id="${output.replace(/[\s,:;"'“”‘’]/g, '-').toLowerCase()}"`)
  }

  if (tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'p') {
    attr.push('data-inline')
  }

  if (classes) {
    attr.push(`class="${classes}"`)
  }

  /* Output */

  output = tag && output ? `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>${output}</${tag}>` : ''

  if (tag === 'table') {
    output = `
      <div class="l-overflow-hidden" data-inline-table>
        <div class="l-overflow-x-auto l-width-100-pc b-all o-overflow">
          ${output}
        </div>
      </div>
    `
  }

  return output
}

/* Exports */

module.exports = richText
