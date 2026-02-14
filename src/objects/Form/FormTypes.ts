/**
 * Objects - Form Types
 */

/* Imports */

import type {
  FormArgs as FormationFormArgs,
  FormFieldArgs as FormationFormFieldArgs
} from '@alanizcreative/formation-static/objects/Form/FormTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { ConfigColumn } from '../../config/configTypes.js'

/**
 * @typedef {'contact'|'password'} FormType
 */
export type FormType = 'contact' | 'password'

/**
 * @typedef {'contact'|'contact-dev'|'password'|'password-dev'} FormAction
 */
export type FormAction = 'contact' | 'contact-dev' | 'password' | 'password-dev'

/**
 * @typedef {object} FormArgs
 * @extends {FormationFormArgs}
 * @prop {FormType} [type='contact']
 * @prop {string} [successTitle]
 * @prop {string} [successText]
 * @prop {string} [toEmail]
 * @prop {string} [senderEmail]
 */
export interface FormArgs extends FormationFormArgs {
  type?: FormType
  successTitle?: string
  successText?: string
  toEmail?: string
  senderEmail?: string
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
 * @typedef {object} FormFieldArgs
 * @extends {FormationFormFieldArgs}
 * @prop {ConfigColumn} [width='12']
 * @prop {ConfigColumn} [widthSmall]
 * @prop {ConfigColumn} [widthMedium]
 * @prop {ConfigColumn} [widthLarge]
 * @prop {string} [autoComplete]
 * @prop {string} [placeholder]
 * @prop {number} [rows=5]
 * @prop {boolean} [grow=false]
 */
export interface FormFieldArgs extends FormationFormFieldArgs {
  width?: ConfigColumn
  widthSmall?: ConfigColumn
  widthMedium?: ConfigColumn
  widthLarge?: ConfigColumn
  autoComplete?: string
  placeholder?: string
  rows?: number
  grow?: boolean
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
