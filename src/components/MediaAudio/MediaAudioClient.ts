/**
 * Components - Media Audio Client
 */

/* Imports */

import type { MediaAudioTrack } from './MediaAudioTypes.js'
import { Media } from '@alanizcreative/formation/objects/Media/Media.js'
import { isStringStrict } from '@alanizcreative/formation/utils/string/string.js'
import { isHtmlElement } from '@alanizcreative/formation/utils/html/html.js'
import { getItem } from '@alanizcreative/formation/items/items.js'

/**
 * Handles loading and playing audio tracks.
 */
class MediaAudio extends Media {
  /**
   * Track elements by ID.
   *
   * @type {Map<string, HTMLElement>}
   */
  tracks: Map<string, HTMLElement> = new Map()

  /**
   * Track control elements by ID.
   *
   * @type {Map<string, HTMLButtonElement>}
   */
  toggles: Map<string, HTMLButtonElement> = new Map()

  /**
   * Previous track button element.
   *
   * @type {HTMLButtonElement|null}
   */
  prev: HTMLButtonElement | null = null

  /**
   * Next track button element.
   *
   * @type {HTMLButtonElement|null}
   */
  next: HTMLButtonElement | null = null

  /**
   * Title link element.
   *
   * @type {HTMLAnchorElement|null}
   */
  link: HTMLAnchorElement | null = null

  /**
   * Current track index.
   *
   * @type {number}
   */
  current: number = 0

  /**
   * Initialize success.
   *
   * @type {boolean}
   */
  subInit: boolean = false

  /**
   * Track IDs.
   *
   * @private
   * @type {string[]}
   */
  #ids: string[] = []

  /**
   * Last track index.
   *
   * @private
   * @type {number}
   */
  #lastIndex: number = 0

  /**
   * Bind this to event callbacks.
   *
   * @private
   */
  #toggleHandler = this.#toggle.bind(this) as EventListener
  #prevHandler = this.#prev.bind(this) as EventListener
  #nextHandler = this.#next.bind(this) as EventListener
  #toggledHandler = this.#toggled.bind(this)

  /**
   * Create new instance.
   */
  constructor () { super() } // eslint-disable-line @typescript-eslint/no-useless-constructor

  /**
   * Init after added to DOM.
   */
  override connectedCallback (): void {
    /* Inherit */

    super.connectedCallback()

    /* Initialize */

    this.subInit = this.#initialize()
  }

  /**
   * Clean up after removed from DOM.
   */
  override async disconnectedCallback (): Promise<void> {
    /* Inherit */

    await super.disconnectedCallback()

    /* Wait a tick to let DOM update */

    await Promise.resolve()

    /* Skip if moved */

    if (this.isConnected || !this.subInit) {
      return
    }

    /* Clear event listeners */

    this.toggles.forEach(toggle => {
      toggle.removeEventListener('click', this.#toggleHandler)
    })

    this.prev?.removeEventListener('click', this.#prevHandler)
    this.next?.removeEventListener('click', this.#nextHandler)
    this.removeEventListener('media:toggle', this.#toggledHandler)

    /* Empty props */

    this.tracks.clear()
    this.toggles.clear()
    this.prev = null
    this.next = null
    this.link = null
    this.current = 0
    this.subInit = false
    this.#ids = []
    this.#lastIndex = 0
  }

  /**
   * Init check required items and set props.
   *
   * @private
   * @return {boolean}
   */
  #initialize (): boolean {
    /* Items */

    const link = getItem('[data-media-link]', this)
    const prev = getItem('[data-media-prev]', this)
    const next = getItem('[data-media-next]', this)
    const tracks = window.ok.tracks

    /* Check required items exist */

    if (
      !isHtmlElement(link, HTMLAnchorElement) ||
      !isHtmlElement(prev, HTMLButtonElement) ||
      !isHtmlElement(next, HTMLButtonElement) ||
      !tracks
    ) {
      return false
    }

    /* Tracks */

    const ids: string[] = []

    Object.entries(tracks).forEach(([id, data]) => {
      const { url, title, link } = data
      const track = document.getElementById(`${id}-track`)
      const toggle = document.getElementById(id)

      if (
        !isStringStrict(url) ||
        !isStringStrict(title) ||
        !isStringStrict(link) ||
        !isHtmlElement(track) ||
        !isHtmlElement(toggle, HTMLButtonElement)
      ) {
        return
      }

      toggle.id = id
      toggle.addEventListener('click', this.#toggleHandler)
      ids.push(id)

      this.tracks.set(id, track)
      this.toggles.set(id, toggle)
    })

    if (!this.tracks.size || !this.toggles.size) {
      return false
    }

    /* IDs */

    this.#ids = ids
    this.#lastIndex = ids.length - 1

    /* Title link */

    this.link = link

    /* Previous and next controls */

    this.prev = prev
    this.next = next
    this.prev.addEventListener('click', this.#prevHandler)
    this.next.addEventListener('click', this.#nextHandler)
    this.addEventListener('media:toggle', this.#toggledHandler)

    /* Init successful */

    return true
  }

  /**
   * Update track presentation on toggle.
   *
   * @private
   * @return {void}
   */
  #toggled (): void {
    const id = this.#ids[this.current] as string
    const toggle = this.toggles.get(id)
    const search = this.playing ? 'Play' : 'Pause'
    const replace = this.playing ? 'Pause' : 'Play'

    this.tracks.get(id)?.setAttribute('data-media-track', this.playing ? 'playing' : '')
    toggle?.setAttribute('aria-label', toggle.ariaLabel?.replace(search, replace) || replace)
  }

  /**
   * Update play state and data.
   *
   * @private
   * @param {string} id
   * @param {number} current
   * @return {Promise<void>}
   */
  async #update (id: string, current?: number): Promise<void> {
    /* Current track */

    const currentId = this.#ids[this.current] as string
    const currentPause = id === currentId

    if (currentPause) {
      await this.toggle(false)
      return
    }

    /* New track */

    const { url, title, link } = window.ok.tracks?.[id] as MediaAudioTrack

    this.loaded = false
    this.title = title
    this.url = url

    if (current) {
      this.current = current
    }

    if (isHtmlElement(this.link)) {
      this.link.href = link
      this.link.textContent = this.title
    }

    await this.toggle(true)
  }

  /**
   * Click handler on control element to play or pause track.
   *
   * @private
   * @param {Event} e
   * @return {Promise<void>}
   */
  async #toggle (e: Event): Promise<void> {
    e.preventDefault()

    await this.#update((e.target as HTMLElement).id)
  }

  /**
   * Click handler on previous button element to play previous track.
   *
   * @private
   * @param {Event} e
   * @return {Promise<void>}
   */
  async #prev (e: Event): Promise<void> {
    e.preventDefault()

    let prev = this.current - 1

    if (prev < 0) {
      prev = this.#lastIndex
    }

    await this.#update(this.#ids[prev] as string, prev)
  }

  /**
   * Click handler on next button element to play next track.
   *
   * @private
   * @param {Event} e
   * @return {Promise<void>}
   */
  async #next (e: Event): Promise<void> {
    e.preventDefault()

    let next = this.current + 1

    if (next > this.#lastIndex) {
      next = 0
    }

    await this.#update(this.#ids[next] as string, next)
  }
}

/* Register */

customElements.define('ok-media-audio', MediaAudio)
