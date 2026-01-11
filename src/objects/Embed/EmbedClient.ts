/**
 * Objects - Embed Client
 */

/* Imports */

import type { EmbedTemplate } from './EmbedTypes.js'
import { getItem, getTemplateItem, cloneItem } from '@alanizcreative/formation/utils/item/item.js'
import { isHtmlElement } from '@alanizcreative/formation/utils/html/html.js'
import { isStringStrict } from '@alanizcreative/formation/utils/string/string.js'
import { setDisplay } from '@alanizcreative/formation/utils/display/display.js'

/**
 * Handles loading iframe with provided URL.
 */
class Embed extends HTMLElement {
  /**
   * Button element triggers loading.
   *
   * @type {HTMLButtonElement|null}
   */
  loads: HTMLButtonElement | null = null

  /**
   * Templates for loader and error.
   *
   * @type {Map<EmbedTemplate, HTMLElement>}
   */
  templates: Map<EmbedTemplate, HTMLElement> = new Map()

  /**
   * Initialize success.
   *
   * @type {boolean}
   */
  init: boolean = false

  /**
   * URL to load.
   *
   * @type {string}
   */
  #url: string = ''

  /**
   * Title for iframe.
   *
   * @type {string}
   */
  #title: string = ''

  /**
   * ID for focus timeout.
   *
   * @private
   * @type {number}
   */
  #delayId: number = 0

  /**
   * ID for loader timeout.
   *
   * @private
   * @type {number}
   */
  #loaderDelayId: number = 0

  /**
   * Bind this to event callbacks.
   *
   * @private
   */
  #loadHandler = this.#load.bind(this)

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

    /* Empty props */

    this.#clean()
    this.templates.clear()
    this.init = false

    /* Clear timeouts */

    clearTimeout(this.#delayId)
    clearTimeout(this.#loaderDelayId)
  }

  /**
   * Init check required items and set properties.
   *
   * @private
   * @return {boolean}
   */
  #initialize (): boolean {
    /* Items */

    const loads = getItem('[data-embed-load]', this)
    const loader = getTemplateItem(this.getAttribute('loader') || '')
    const error = getTemplateItem(this.getAttribute('error') || '')
    const url = this.getAttribute('url')
    const title = this.getAttribute('title')

    /* Check required items exist */

    if (!isHtmlElement(loads, HTMLButtonElement) || !isHtmlElement(loader) || !isHtmlElement(error) || !isStringStrict(url) || !isStringStrict(title)) {
      return false
    }

    /* Props */

    this.loads = loads
    this.templates.set('loader', loader)
    this.templates.set('error', error)
    this.#url = url
    this.#title = title

    /* Event listeners */

    this.loads.addEventListener('click', this.#loadHandler)

    /* Init successful */

    return true
  }

  /**
   * Clean up button.
   *
   * @private
   * @param {boolean} [remove=false]
   * @return {void}
   */
  #clean (remove: boolean = false): void {
    this.loads?.removeEventListener('click', this.#loadHandler)

    if (remove) {
      this.loads?.remove()
    }
    
    this.loads = null
  }

  /**
   * Click handler on button element to load iframe.
   *
   * @private
   * @param {Event} e
   * @return {void}
   */
  #load (e: Event): void {
    e.preventDefault()

    /* Loader required */
 
    const loader = cloneItem(this.templates.get('loader'))

    if (!loader) {
      return
    }

    this.append(loader)
    this.#loaderDelayId = setDisplay(loader, 'focus', 'loader')

    /* Clean up button */

    this.#clean(true)

    /* Create iframe */

    const iframe = document.createElement('iframe')

    iframe.src = this.#url
    iframe.title = this.#title
    iframe.allow = 'autoplay; fullscreen'
    iframe.allowFullscreen = true
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.classList.add('embed-iframe')

    /* Iframe error (after 8 seconds) */

    const errorId = window.setTimeout(() => {
      const error = cloneItem(this.templates.get('error'))

      if (!error) {
        return
      }

      this.append(error)

      this.#delayId = window.setTimeout(() => {
        loader.remove()
        error.focus()
      }, 100)
    }, 8000)

    /* Iframe loaded  */

    iframe.onload = () => {
      clearTimeout(errorId)
      setDisplay(loader, 'hide', 'loader')

      this.#delayId = window.setTimeout(() => {
        loader.remove()
        iframe.focus()
      }, 200) // Wait for transition
    }

    /* Add iframe */

    loader.insertAdjacentElement('beforebegin', iframe)
  }
}

/* Register */

customElements.define('ok-embed', Embed)
