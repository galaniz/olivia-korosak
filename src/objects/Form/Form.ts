/**
 * Object - Form
 */

/* Imports */

import type { FormAction, FormProps } from './FormTypes.js'
import { v4 as uuid } from 'uuid'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { config, configVars } from '../../config/config.js'
import { ErrorSvg } from '../../svg/Error/Error.js'
import { Loader } from '../Loader/Loader.js'
import { Info } from '../Info/Info.js'

/**
 * Filter formation form props.
 *
 * @param {FormProps} props
 * @return {FormProps}
 */
const Form = (props: FormProps): FormProps => {
  /* Props and args */

  const { args } = props
  const {
    successTitle,
    successText,
    toEmail,
    senderEmail,
    submitLabel = 'Send'
  } = args

  /* Inline error */

  const errorInlineId = 'tmpl-error-inline'

  configVars.template.set(errorInlineId, /* html */`
    <span class="form-error-inline flex gap-5xs">
      ${ErrorSvg({ width: '2xs', height: '2xs', classes: 'h-xs-m' })}
      <span class="a-hide-vis">Error: </span>
      <span class="text-m-flex wt-medium lead-base" data-form-error-text></span>
    </span>
  `)

  /* Error summary */

  const errorSummaryId = Info({
    title: 'There is a problem',
    template: true,
    type: 'error-summary'
  })

  /* Error */

  const errorId = Info({
    title: 'Sorry, there is a problem with the service.',
    text: 'Try again later.',
    template: true,
    type: 'error'
  })

  /* Success */

  const successId = Info({
    title: 'Thank you for your message!',
    text: 'I will get back to you as soon as possible.',
    template: true,
    type: 'success'
  })

  /* Loader */

  const loaderId = Loader()

  /* ID */

  const formId = uuid()
  configVars.formId = formId

  /* Action */

  const action: FormAction = `contact${config.env.prod ? '' : '-dev'}`

  /* Site key */

  const siteKey = config.env.prod ? '0x4AAAAAADIgHPORVhVHqOBH' : '1x00000000000000000000BB'

  /* Attributes */

  let formAttr =
    ` action="${action}" error-summary="${errorSummaryId}" error-inline="${errorInlineId}" error="${errorId}" success="${successId}" loader="${loaderId}" sitekey="${siteKey}" env="${config.cms.env}"`

  if (isStringStrict(successTitle)) {
    formAttr += ` success-title="${successTitle}"`
  }

  if (isStringStrict(successText)) {
    formAttr += ` success-text="${successText}"`
  }

  /* Meta */

  if (isStringStrict(toEmail) && isStringStrict('senderEmail')) {
    setStoreItem('formMeta', {
      toEmail,
      senderEmail
    }, formId)
  }

  /* Scripts and styles */

  addStyle('objects/Form/Form')
  addScript('objects/Form/FormClient')

  /* Output */

  return {
    ...props,
    args: {
      ...args,
      id: formId,
      formTag: 'ok-form',
      formClasses: 'form',
      formAttr,
      fields: `<div id="ok-turnstile-${formId}" class="none"></div>`,
      fieldsClasses: 'form flex col row-l wrap align-end-l gap-s gap-m-m',
      fieldsAttr: 'novalidate',
      submitFieldClasses: 'relative mt-4xs',
      submitClasses: 'button button-primary button-l b-radius-s e-trans-quad sharp',
      submitLabel,
      honeypotName: 'ok_hp',
      honeypotFieldClasses: 'form-field-hp col-12',
      honeypotFieldAttr: 'data-form-field="url"',
      honeypotLabelClasses: 'form-label',
      honeypotClasses: 'form-input-url',
      honeypotAttr: 'data-form-input'
    }
  }
}

/* Exports */

export { Form }
