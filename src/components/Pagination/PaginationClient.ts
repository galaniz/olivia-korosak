/**
 * Components - Pagination Client
 */

/* Imports */

import type { PaginationServerlessData } from './PaginationTypes.js'
import type { PaginationSource } from '@alanizcreative/formation/components/Pagination/PaginationTypes.js'
import { Pagination as PaginationBase } from '@alanizcreative/formation/components/Pagination/Pagination.js'
import { isHtmlElement } from '@alanizcreative/formation/utils/html/html.js'
import { getItem } from '@alanizcreative/formation/items/items.js'
import { doActions } from '@alanizcreative/formation/actions/actions.js'

/**
 * Handles posts pagination.
 */
class Pagination extends PaginationBase {
  /**
   * Canonical link element.
   *
   * @type {HTMLLinkElement|null}
   */
  #canonical: HTMLLinkElement | null = null

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

    /* Items */

    const canonical = getItem('link[rel="canonical"]')

    if (isHtmlElement(canonical, HTMLLinkElement)) {
      this.#canonical = canonical
    }
  }

  /**
   * Clean up after removed from DOM.
   */
  override async disconnectedCallback (): Promise<void> {
    /* Inherit */

    await super.disconnectedCallback()

    /* Empty items */

    this.#canonical = null
  }

  /**
   * Fetch posts data.
   *
   * @param {PaginationSource} source
   * @return {Promise<void>}
   */
  override async request (source: PaginationSource): Promise<void> {
    try {
      /* Request */

      const url = new URL(this.url)
      url.searchParams.set('page', this.page.toString())

      const resp = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(window.ok.posts)
      })

      if (!resp.ok) {
        throw new Error('Pagination request failed')
      }

      /* Data */

      const data = await resp.json() as PaginationServerlessData
      const {
        nav,
        entries,
        script,
        title,
        canonical: canonicalUrl,
        prev: prevUrl,
        next: nextUrl
      } = data

      /* Nav and entries */

      this.update('success', source, nav, entries)

      /* Update script meta */

      if (script) {
        window.ok = JSON.parse(script) // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      }

      /* Update subscribers */

      doActions('pag:update', 'success')

      /* Title and canonical */

      this.#canonical?.setAttribute('href', canonicalUrl)
      document.title = title

      /* Prev and next */

      getItem('link[rel="prev"]')?.remove()
      getItem('link[rel="next"]')?.remove()

      const head = document.head

      if (prevUrl) {
        const prev = document.createElement('link')
        prev.setAttribute('rel', 'prev')
        prev.setAttribute('href', prevUrl)
        head.append(prev)
      }

      if (nextUrl) {
        const next = document.createElement('link')
        next.setAttribute('rel', 'next')
        next.setAttribute('href', nextUrl)
        head.append(next)
      }
    } catch {
      this.update('error', source)

      doActions('pag:update', 'error')
    }
  }
}

/* Register */

customElements.define('ok-pagination', Pagination)
