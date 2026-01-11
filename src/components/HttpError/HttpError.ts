/**
 * Components - Http Error
 */

/* Imports */

import type { RenderHttpError } from '@alanizcreative/formation-static/render/renderTypes.js'
import { renderInlineItem } from '@alanizcreative/formation-static/render/renderInline.js'
import { getStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { navigationsInstance, Navigations } from '../Navigation/Navigations.js'
import { Button } from '../../objects/Button/Button.js'

/**
 * Output HTTP error.
 *
 * @type {RenderHttpError}
 */
const HttpError: RenderHttpError = async (args) => {
  const { code } = args

  let title = 'Page Not Found'
  let text = 'Looks like nothing was found in this location.'

  if (code === 500) {
    title = 'Internal Server Error'
    text = "Looks like we're experiencing an internal server problem."
  }

  const contentType = 'page'
  const slug = `${code}${code === 404 ? '.html' : ''}`
  const id = `http-error-${code}`

  if (!navigationsInstance) {
    await Navigations({
      navigations: getStoreItem('navigations'),
      items: getStoreItem('navigationItems')
    })
  }

  return await renderInlineItem({
    id,
    slug,
    contentType,
    title,
    colorFrom: {
      value: '#5e2424'
    },
    content: /* html */`
      <section class="container flex col gap-4xs gap-3xs-m pt-2xl pt-3xl-m pb-3xl pb-4xl-m">
        <h1>${code}</h1>
        <p class="text-l">${text}</p>
        ${Button({
          args: {
            title: 'Back to Homepage',
            type: 'Secondary',
            paddingTop: '20px',
            link: getPermalink()
          }
        })}
      </section>
    `
  })
}

/* Exports */

export { HttpError }
