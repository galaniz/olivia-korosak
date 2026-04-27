/**
 * Components - Media Audio Client
 */

/* Imports */

import type { MediaAudioTrack } from './MediaAudioTypes.js'
import type { ActionResizeArgs } from '@alanizcreative/formation/actions/actionsTypes.js'
import { Media } from '@alanizcreative/formation/objects/Media/Media.js'
import { isStringStrict } from '@alanizcreative/formation/utils/string/string.js'
import { isHtmlElement } from '@alanizcreative/formation/utils/html/html.js'
import { addFilter, removeFilter } from '@alanizcreative/formation/filters/filters.js'
import { addAction, removeAction } from '@alanizcreative/formation/actions/actions.js'
import { onResize, removeResize } from '@alanizcreative/formation/actions/actionResize.js'
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
   * Close player button element.
   *
   * @type {HTMLButtonElement|null}
   */
  close: HTMLButtonElement | null = null

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
   * Open state of player.
   *
   * @type {boolean}
   */
  open: boolean = false

  /**
   * Initialize success.
   *
   * @type {boolean}
   */
  subInit: boolean = false

  /**
   * Track row to target for width.
   *
   * @type {HTMLButtonElement|null}
   */
  #row: HTMLElement | null = null

  /**
   * Track IDs.
   *
   * @private
   * @type {string[]}
   */
  #ids: string[] = []

  /**
   * Track index by ID.
   *
   * @private
   * @type {Map<string, number>}
   */
  #indexById: Map<string, number> = new Map()

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
  #closeHandler = this.#close.bind(this) as EventListener
  #resizeHandler = this.#resize.bind(this)
  #toggledHandler = this.#toggled.bind(this)
  #activeHandler = this.#active.bind(this)
  #resetTracksHandler = this.#resetTracks.bind(this)

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

    /* Clean up tracks */

    this.#clearTracks()

    /* Clear event listeners */

    this.prev?.removeEventListener('click', this.#prevHandler)
    this.next?.removeEventListener('click', this.#nextHandler)
    this.close?.removeEventListener('click', this.#closeHandler)
    this.removeEventListener('media:toggle', this.#toggledHandler)
    removeResize(this.#resizeHandler)

    /* Remove filters and actions */

    removeFilter(`media:active:${this.id}`, this.#activeHandler)
    removeAction('pag:update', this.#resetTracksHandler)

    /* Empty props */

    this.prev = null
    this.next = null
    this.link = null
    this.subInit = false
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
    const close = getItem('[data-media-close]', this)

    /* Check required items exist */

    if (
      !isHtmlElement(link, HTMLAnchorElement) ||
      !isHtmlElement(prev, HTMLButtonElement) ||
      !isHtmlElement(next, HTMLButtonElement) ||
      !isHtmlElement(close, HTMLButtonElement)
    ) {
      return false
    }

    /* Tracks */

    const set = this.#setTracks()

    if (!set) {
      return false
    }

    /* Props */

    this.link = link
    this.prev = prev
    this.next = next
    this.close = close

    /* Event listeners */

    this.prev.addEventListener('click', this.#prevHandler)
    this.next.addEventListener('click', this.#nextHandler)
    this.close.addEventListener('click', this.#closeHandler)
    this.addEventListener('media:toggle', this.#toggledHandler)
    onResize(this.#resizeHandler)

    /* Filters and actions */

    addFilter(`media:active:${this.id}`, this.#activeHandler)
    addAction('pag:update', this.#resetTracksHandler)

    /* Row width */

    this.#setWidth()

    /* Init successful */

    return true
  }

  /**
   * Active state for key listeners.
   *
   * @return {boolean}
   */
  #active (): boolean {
    return this.open
  }

  /**
   * Open and close player.
   *
   * @param {boolean} open
   * @return {void}
   */
  #open (open: boolean): void {
    this.open = open

    for (const child of this.children) {
      (child as HTMLElement).inert = !open // Inert on children as container possibly inert from modal
    }

    if (open) {
      this.setAttribute('open', '')
    } else {
      this.removeAttribute('open')
    }
  }

  /**
   * Row width for hover and active state.
   *
   * @private
   * @return {void}
   */
  #setWidth (): void {
    document.documentElement.style.setProperty('--med-row-width', `${this.#row?.clientWidth}px`)
  }

  /**
   * Track listeners and info from global data.
   *
   * @private
   * @return {boolean}
   */
  #setTracks (): boolean {
    const tracks = window.ok.tracks

    if (!tracks) {
      return false
    }

    const ids: string[] = []
    let counter = 0

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

      if (track.tagName === 'TR' && !this.#row) {
        this.#row = track
      }

      toggle.id = id
      toggle.addEventListener('click', this.#toggleHandler)
      ids.push(id)

      this.tracks.set(id, track)
      this.toggles.set(id, toggle)
      this.#indexById.set(id, counter)

      counter += 1
    })

    if (!this.tracks.size || !this.toggles.size) {
      return false
    }

    this.#ids = ids
    this.#lastIndex = counter - 1

    return true
  }

  /**
   * Clear track listeners and props. 
   *
   * @private
   * @return {void}
   */
  #clearTracks (): void {
    this.toggles.forEach(toggle => {
      toggle.removeEventListener('click', this.#toggleHandler)
    })

    this.tracks.clear()
    this.toggles.clear()
    this.current = 0
    this.#ids = []
    this.#lastIndex = 0
    this.#indexById.clear()
    this.#row = null
  }

  /**
   * Clear and reinitialize tracks.
   * 
   * @private
   * @return {void}
   */
  #resetTracks (): void {
    this.#clearTracks()

    if (this.playing) {
      this.current = -1
    }

    this.#setTracks()
  }

  /**
   * Update track presentation.
   *
   * @private
   * @param {string} [id]
   * @return {void}
   */
  #updateTrack (id?: string): void {
    let isDynamic = false

    if (!id) {
      id = this.#ids[this.current] as string // eslint-disable-line @typescript-eslint/no-unnecessary-type-assertion
      isDynamic = true
    }

    const toggle = this.toggles.get(id)

    if (!toggle) { // Might not exist eg. current is -1
      return
    }

    const search = isDynamic && this.playing ? 'Play' : 'Pause'
    const replace = isDynamic && this.playing ? 'Pause' : 'Play'

    this.tracks.get(id)?.setAttribute('data-media-track', isDynamic && this.playing ? 'playing' : '')
    toggle.setAttribute('aria-label', toggle.ariaLabel?.replace(search, replace) || replace)
  }

  /**
   * Update play state and data.
   *
   * @private
   * @param {string} id
   * @param {number} current
   * @return {Promise<void>}
   */
  async #update (id: string, current: number): Promise<void> {
    /* Current track */

    const currentId = this.#ids[this.current] as string
    const currentPause = this.open && this.playing && id === currentId

    if (currentPause) {
      await this.toggle(false)
      return
    }

    this.#updateTrack(currentId)

    /* New track */

    const { url, title, link } = window.ok.tracks?.[id] as MediaAudioTrack

    this.loaded = false
    this.title = title
    this.url = url
    this.current = current

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

    if (!this.open) {
      this.#open(true)
    }

    const id = (e.currentTarget as HTMLElement).id

    await this.#update(id, this.#indexById.get(id) as number)
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

  /**
   * Click handler on close button to close player.
   *
   * @private
   * @return {Promise<void>}
   */
  async #close (): Promise<void> {
    this.#open(false)

    await this.toggle(false)
  }

  /**
   * Handler on media toggle to update track.
   *
   * @private
   * @return {void}
   */
  #toggled (): void {
    this.#updateTrack()
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

    this.#setWidth()
  }
}

/* Register */

customElements.define('ok-media-audio', MediaAudio)
