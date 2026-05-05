/**
 * Objects - Image
 */

/* Imports */

import type { ImageProps } from './ImageTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getImage, getImageSizes } from '@alanizcreative/formation-static/utils/image/image.js'
import { RichText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import {
  configBreakpointNumbers,
  configColumnFloats,
  configContainerNumbers,
  configAspectRatio
} from '../../config/configOptions.js'

/**
 * Output image.
 *
 * @param {ImageProps} props
 * @return {string} HTMLDivElement|HTMLElement
 */
const Image = (props: ImageProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, itemData, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    image,
    aspectRatio = '1:1',
    viewportWidth = 80,
    caption,
    lazy = true,
    classes
  } = args

  let {
    maxWidth,
    sizes
  } = args

  /* Project content */

  const newParents = [...(parents || [])]

  if (
    itemData?.contentType === 'project' &&
    lazy &&
    !newParents.some(parent => parent.renderType === 'container' && parent.args.maxWidth)
  ) {
    newParents.push({
      renderType: 'container',
      args: {
        maxWidth: '650px'
      }
    })
  }

  /* Types */

  const hasAspectRatio = isStringStrict(aspectRatio)
  const isCard = newParents[0]?.renderType === 'card'

  /* Classes */

  let imageClasses = 'absolute top-0 left-0 w-full h-full object-cover'
  let containerClasses = `relative overflow-hidden bg-frost ar-${hasAspectRatio ? configAspectRatio.get(aspectRatio) : '1-1'}`

  if (isCard) {
    imageClasses += ' e-trans'
    containerClasses += ' z--1 after e-overlay-item order-first'
  }

  if (isStringStrict(classes)) {
    containerClasses += ` ${classes}`
  }

  /* Params */

  const params = { w: '%width' }

  /* Max width and sizes */

  if (newParents.length) {
    const sizesRes = getImageSizes({
      parents: newParents,
      source: 'remote',
      widths: configColumnFloats,
      maxWidths: configContainerNumbers,
      breakpoints: configBreakpointNumbers,
      viewportWidth,
      maxWidth
    })

    maxWidth = sizesRes.maxWidth
    sizes = sizesRes.sizes
  }

  if (!maxWidth) {
    maxWidth = 1600
  }

  /* Details */

  const imageDetails = getImage({
    data: image,
    classes: imageClasses,
    maxWidth,
    viewportWidth,
    sizes,
    source: 'cms',
    params,
    lazy
  }, true)

  const imageOutput = imageDetails.output
  const imageAspectRatio = imageDetails.aspectRatio

  if (!imageOutput) {
    return ''
  }

  /* Output */

  const containerAttr =
    imageAspectRatio && !hasAspectRatio ? ` style="--ok-aspect-ratio:1 / ${imageAspectRatio}"` : ''

  let output = /* html */`
    <div class="${containerClasses}"${containerAttr}>
      ${imageOutput}
    </div>
  `

  /* Caption */

  const captionOutput = RichText({
    args: {
      tag: 'figcaption',
      content: caption,
      classes: 'pt-3xs pt-2xs-m'
    }
  })

  if (isStringStrict(captionOutput)) {
    output = /* html */`
      <figure>
        ${output}
        ${captionOutput}
      </figure>
    `
  }

  /* Output */

  return output
}

/* Exports */

export { Image }
