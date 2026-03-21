/**
 * Components - Media Audio Client
 */

/* Imports */

import type { ActionResizeArgs } from '@alanizcreative/formation/actions/actionsTypes.js'
import { onResize, removeResize } from '@alanizcreative/formation/actions/actionResize.js'

/**
 * Handles audio track width to state styles.
 */
class MediaAudioTracks extends HTMLElement {
  /**
   * Bind this to event callbacks.
   *
   * @private
   */
  #resizeHandler = this.#resize.bind(this)

  /**
   * Create new instance.
   */
  constructor () { super() } // eslint-disable-line @typescript-eslint/no-useless-constructor

  /**
   * Init after added to DOM.
   */
  connectedCallback (): void {
    onResize(this.#resizeHandler)
    this.#set()
  }

  /**
   * Clean up after removed from DOM.
   */
  async disconnectedCallback (): Promise<void> {
    /* Wait a tick to let DOM update */

    await Promise.resolve()

    /* Skip if moved */

    if (this.isConnected) {
      return
    }

    removeResize(this.#resizeHandler)
  }

  /**
   * Width for hover and active state.
   *
   * @private
   * @return {void}
   */
  #set (): void {
    this.style.setProperty('--med-row-width', `${this.clientWidth}px`)
  }

  /**
   * Resize action callback.
   *
   * @private
   * @param {ActionResizeArgs} args
   * @return {void}
   */
  #resize (args: ActionResizeArgs): void {
    const [oldViewportWidth, newViewportWidth] = args

    if (oldViewportWidth === newViewportWidth) {
      return
    }

    this.#set()
  }
}

/* Register */

customElements.define('ok-media-audio-tracks', MediaAudioTracks)
