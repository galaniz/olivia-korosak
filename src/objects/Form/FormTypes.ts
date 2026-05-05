/**
 * Objects - Form Types
 */

/* Imports */

import type {
  FormArgs as FormationFormArgs,
  FormFieldArgs as FormationFormFieldArgs,
  FormFieldType as FormationFormFieldType
} from '@alanizcreative/formation-static/objects/Form/FormTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { ColumnWidth } from '../../layouts/Column/ColumnTypes.js'
import type { ConfigFieldTypeLabel } from '../../config/configTypes.js'

/**
 * @typedef {'contact'|'contact-dev'} FormAction
 */
export type FormAction = 'contact' | 'contact-dev'

/**
 * @typedef {object} FormArgs
 * @extends {FormationFormArgs}
 * @prop {string} [successTitle]
 * @prop {string} [successText]
 * @prop {string} [senderEmail]
 * @prop {string} [toEmail]
 * @prop {string} [subject]
 */
export interface FormArgs extends FormationFormArgs {
  successTitle?: string
  successText?: string
  senderEmail?: string
  toEmail?: string
  subject?: string
}

/**
 * @typedef {object} FormProps
 * @extends {RenderFunctionArgs}
 * @prop {FormArgs} args
 * @prop {Item} [itemData]
 */
export interface FormProps extends RenderFunctionArgs  {
  args: FormArgs
  itemData?: Item
}

/**
 * @typedef {FormationFormFieldType|ConfigFieldTypeLabel} FormFieldType
 */
export type FormFieldType = FormationFormFieldType | ConfigFieldTypeLabel

/**
 * @typedef {object} FormFieldArgs
 * @extends {FormationFormFieldArgs}
 * @prop {FormFieldType} [type='Text']
 * @prop {ColumnWidth} [width='1/1']
 * @prop {string} [autoComplete]
 * @prop {string} [placeholder]
 * @prop {number} [rows=5]
 */
export interface FormFieldArgs extends FormationFormFieldArgs {
  // type?: FormFieldType | ConfigFieldTypeLabel
  width?: ColumnWidth
  autoComplete?: string
  placeholder?: string
  rows?: number
}

/**
 * @typedef {object} FormFieldProps
 * @extends {RenderFunctionArgs}
 * @prop {FormFieldArgs} args
 * @prop {Item} [itemData]
 */
export interface FormFieldProps extends RenderFunctionArgs {
  args: FormFieldArgs
  itemData?: Item
} 
