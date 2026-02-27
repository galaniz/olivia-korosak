/**
 * Object - Form Field
 */

/* Imports */

import type { FormFieldProps } from './FormTypes.js'
import type { ConfigColumnLabel, ConfigFieldTypeLabel } from '../../config/configTypes.js'
import type { FormFieldType } from '@alanizcreative/formation-static/objects/Form/FormTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configColumns, configFieldType } from '../../config/configOptions.js'
import { configVars } from '../../config/config.js'

/**
 * Filter formation form field props.
 *
 * @param {FormFieldProps} props
 * @return {FormFieldProps}
 */
const FormField = (props: FormFieldProps): FormFieldProps => {
  /* Props and args */

  const { args } = props
  const {
    name,
    type = 'Text',
    width = '1/1',
    autoComplete,
    placeholder,
    rows = 5
  } = args

  /* Type */

  const newType = configFieldType.get(type as ConfigFieldTypeLabel) || type as FormFieldType

  /* Classes */

  let fieldClasses = 'form-field col-12'
  let classes = `form-input-${newType}`

  if (isStringStrict(width)) {
    fieldClasses += ` col-${configColumns.get(width as ConfigColumnLabel) || width}-m`
  }

  if (newType === 'checkbox' || newType === 'radio') {
    classes += ' a-hide-vis'
  }

  /* Attributes */

  let fieldAttr = 'data-form-field'
  const attr: string[] = []

  if (isStringStrict(placeholder)) {
    attr.push(`placeholder : ${placeholder}`)
  }

  if (isStringStrict(autoComplete)) {
    attr.push(`autocomplete : ${autoComplete}`)
  }

  if (newType === 'textarea') {
    attr.push(`rows : ${rows}`)
  }

  /* Email */

  if (newType === 'email') {
    args.fieldTag = 'ok-form-field-email'

    fieldAttr += ` form-id="${configVars.formId}" input-name="${name}"`

    addScript('objects/Form/FormFieldEmailClient')
  }

  /* Output */

  return {
    ...props,
    args: {
      ...args,
      type: newType,
      fieldClasses,
      fieldAttr,
      labelClasses: 'form-label',
      classes,
      attr: attr.join('\n'),
      requiredIcon: '<span class="form-required-icon" aria-hidden="true">*</span>'
    }
  }
}

/* Exports */

export { FormField }
