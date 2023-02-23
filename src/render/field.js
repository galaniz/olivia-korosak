/**
 * Render - field
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { enumOptions } = require('../vars/enums')

/**
 * Function - output checkbox and radio inputs from options
 * 
 * @private
 * @param {object} args {
 *  @prop {array<object>} opts
 *  @prop {string} name
 *  @prop {string} classes
 *  @prop {string} attr
 *  @prop {string} type
 * }
 * @return {array<string>}
 */

const _getCheckboxRadioOpts = (args = {}) => {
  const {
    opts = [],
    name = '',
    classes = '',
    attr = '',
    type = ''
  } = args

  return opts.map((opt) => {
    const {
      text = '',
      value = '',
      selected
    } = opt

    const id = uuidv4()

    return `
      <div data-${type}-opt>
        <input type="${type}" name="${name}" id="${id}" class="${classes}" value="${value}"${attr}${selected ? ' checked' : ''}>
        <label for="${id}" class="o-form__label" data-label>
          <span>${text}</span>
        </label>
      </div>
    `
  })
}

/**
 * Function - output form field
 * 
 * @param {object} args {
 *  @prop {string} type
 *  @prop {string} name
 *  @prop {string} label
 *  @prop {string} value
 *  @prop {boolean} required
 *  @prop {string} width
 *  @prop {string} autoCompleteToken
 *  @prop {string} placeholder
 *  @prop {array} options
 *  @prop {number} rows
 *  @prop {string} emptyErrorMessage
 *  @prop {string} invalidErrorMessage
 *  @prop {string} fieldClasses
 *  @prop {string} classes
 *  @prop {boolean} fieldset
 * }
 * @return {string} HTML - div
 */

const field = ({ args = {} }) => {
  let {
    type = 'Text',
    name = '',
    label = '',
    value = '',
    required = false,
    width = '1/1',
    autoCompleteToken = '',
    placeholder = '',
    options = [],
    rows = 5,
    emptyErrorMessage = '',
    invalidErrorMessage = '',
    fieldClasses = '',
    classes = '',
    fieldset = false
  } = args

  /* Name and label required */

  if (!name || !label) {
    return ''
  }

  /* Id */

  const id = uuidv4()

  /* Normalize options */

  type = enumOptions.field.type[type]
  width = enumOptions.width[width]

  /* Classes */

  fieldClasses = `o-form__field l-width-1-1 l-width-${width}-m${fieldClasses ? ` ${fieldClasses}` : ''}`
  classes = `js-input${classes ? ` ${classes}` : ''}`

  /* Checkbox or radio */

  const checkboxRadio = type === 'checkbox' || type === 'radio'

  /* Options */

  let opts = []

  if (options.length) {
    options.forEach((option) => {
      const data = option.split(' : ')

      if (data.length >= 2) {
        opts.push({
          text: data[0],
          value: data[1],
          selected: data.length === 3
        })
      }
    })
  }

  /* Check if fieldset */

  let checkboxRadioOpts = false

  if (opts.length && checkboxRadio) {
    checkboxRadioOpts = true
    fieldset = true
  }

  /* Attributes */

  let attr = []

  if (required) {
    attr.push('aria-required="true"')
  }

  if (value && !checkboxRadioOpts) {
    attr.push(`value="${value}"`)
  }

  if (placeholder) {
    attr.push(`placeholder="${placeholder}"`)
  }

  if (autoCompleteToken) {
    attr.push(`autocomplete="${autoCompleteToken}"`)
  }

  if (emptyErrorMessage) {
    attr.push(`data-empty-message="${emptyErrorMessage}"`)
  }

  if (invalidErrorMessage) {
    attr.push(`data-invalid-message="${invalidErrorMessage}"`)
  }

  if (rows && type === 'textarea') {
    attr.push(`rows="${rows}"`)
  }

  attr = attr.length ? ` ${attr.join(' ')}` : ''

  /* Label */

  let labelBefore = ''
  let labelAfter = ''

  const labelRequired = required ? ' data-required' : ''
  const labelRequiredIcon = required ? '<span data-required-icon aria-hidden="true"></span>' : ''

  if (checkboxRadio) {
    labelAfter = `
      <label for="${id}">
        <span class="o-form__label" data-label>
          <span>${label}</span>
        </span>
        <span data-control data-type="${type}"></span>
      </label>
    `

    if (fieldset) {
      labelBefore = `
        <legend${labelRequired}>
          <span>${label}${required ? '<span class="a11y-visually-hidden"> required</span>' : ''}
            ${labelRequiredIcon}
          </span>
        </legend>
      `
    }
  } else {
    labelBefore = `
      <label for="${id}" class="o-form__label" data-label${labelRequired}>
        <span>
          ${label}
          ${labelRequiredIcon}
        </span>
      </label>
    `
  }

  /* Input */

  let input = ''

  switch (type) {
    case 'text':
    case 'email':
    case 'checkbox':
    case 'radio':
    case 'number':
    case 'tel': {
      if (checkboxRadio) {
        classes += ' a11y-hide-input'
      }

      input = `<input type="${type}" name="${name}" id="${id}" class="${classes}"${attr}>`

      if (checkboxRadioOpts) {
        input = _getCheckboxRadioOpts({
          opts,
          name,
          classes,
          attr,
          type
        })
      }

      break
    }
    case 'textarea': {
      input = `<textarea name="${name}" id="${id}" class="${classes}"${attr}></textarea>`
      break
    }
    case 'select': {
      if (opts.length) {
        opts = opts.map((opt) => {
          const {
            text,
            value,
            selected
          } = opt

          return `<option value="${value}"${selected ? ' selected' : ''}>${text}</option>`
        })

        input = `
          <div data-type="select">
            <select name="${name}" id="${id}" class="${classes}"${attr}>${opts.join('')}</select>
            <div data-select-arrow></div>
          </div>
        `
      }

      break
    }
  }

  if (!input) {
    return ''
  }

  /* Output */

  return `
    <div class="${fieldClasses}" data-type="${type}">
      ${fieldset ? '<fieldset class="o-field__group">' : ''}
      ${labelBefore}
      ${input}
      ${labelAfter}
      ${fieldset ? '</fieldset>' : ''}
    </div>
  `
}

/* Exports */

module.exports = field
