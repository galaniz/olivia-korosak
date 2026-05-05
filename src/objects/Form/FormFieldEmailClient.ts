/**
 * Objects - Form Field Email Client
 */

/* Imports */

import type {
  FormValidateFilterArgs,
  FormValidateResult
} from '@alanizcreative/formation/objects/Form/FormTypes.js'
import { isStringStrict } from '@alanizcreative/formation/utils/string/string.js'
import { addFilter, removeFilter } from '@alanizcreative/formation/filters/filters.js'
import isEmail from 'validator/es/lib/isEmail.js'

/**
 * Handles email validation.
 */
class FormFieldEmail extends HTMLElement {
  /**
   * Form ID for filters.
   *
   * @type {string}
   */
  formId: string = ''

  /**
   * Name of input field to filter.
   *
   * @type {string}
   */
  inputName: string = ''

  /**
   * Initialize success.
   *
   * @type {boolean}
   */
  init: boolean = false

  /**
   * Bind this to filter callbacks.
   *
   * @private
   */
  #validateHandler = this.#validate.bind(this)

  /**
   * Create new instance.
   */
  constructor () { super() } // eslint-disable-line @typescript-eslint/no-useless-constructor

  /**
   * Init after added to DOM.
   */
  connectedCallback (): void {
    if (this.init) {
      return
    }

    this.init = this.#initialize()
  }

  /**
   * Clean up after removed from DOM.
   */
  async disconnectedCallback (): Promise<void> {
    /* Wait a tick to let DOM update */

    await Promise.resolve()

    /* Skip if moved */

    if (this.isConnected || !this.init) {
      return
    }

    /* Remove filters */

    removeFilter(`form:validate:${this.formId}`, this.#validateHandler)

    /* Empty props */
  
    this.init = false
  }

  /**
   * Init check required attributes and add form filters.
   *
   * @private
   * @return {boolean}
   */
  #initialize (): boolean {
    /* Form ID required */
  
    const formId = this.getAttribute('form-id')

    if (!isStringStrict(formId)) {
      return false
    }

    /* Input name required */

    const inputName = this.getAttribute('input-name')

    if (!isStringStrict(inputName)) {
      return false
    }

    /* Props */

    this.formId = formId
    this.inputName = inputName
  
    /* Filters */

    addFilter(`form:validate:${formId}`, this.#validateHandler)

    /* Init successful */

    return true
  }

  /**
   * Validate email address.
   *
   * @param {FormValidateResult} result
   * @param {FormValidateFilterArgs} args
   * @return {FormValidateResult}
   */
  #validate (result: FormValidateResult<string[]>, args: FormValidateFilterArgs): FormValidateResult<string[]> {
    const { name, groups } = args

    if (name !== this.inputName) {
      return result
    }

    const { values, valid } = result
    const [email] = values

    if (!email && !valid) { // Empty required email
      return {
        ...result, // Assume empty message present
        ariaInvalid: [0]
      }
    }

    if (email && !isEmail(email)) {
      return {
        ...result,
        valid: false,
        message: groups.get(name)?.invalidMessage || '', // Assume invalid message present
        ariaInvalid: [0]
      }
    }

    return result
  }
}

/* Register */

customElements.define('ok-form-field-email', FormFieldEmail)
