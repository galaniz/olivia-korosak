/**
 * Components - Hero
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { Image } from '../../objects/Image/Image.js'
import { ArrowSvg } from '../../svg/Arrow/Arrow.js'
import { Links } from '../../text/Links/Links.js'
import { MediaAudioHero } from '../MediaAudio/MediaAudio.js'

/**
 * Output hero section.
 *
 * @param {Item} itemData
 * @param {boolean} [condensed=false]
 * @return {string} HTMLSectionElement
 */
const Hero = (itemData: Item, condensed: boolean = false): string => {
  /* Data required */

  if (!isObjectStrict(itemData)) {
    return ''
  }

  const {
    code,
    contentType = 'page',
    heroTitle,
    heroImage,
    projectType,
    meta
  } = itemData

  let {
    title,
    heroText
  } = itemData

  if (heroTitle) {
    title = heroTitle
  }

  /* Skip HTTP error */

  if (code) {
    return ''
  }

  /* Title required */

  if (!isStringStrict(title)) {
    return ''
  }

  /* Type */

  const isIndex = meta?.isIndex
  const isProject = contentType === 'project'
  const isTrack = contentType === 'track'

  /* Image */

  let imageOutput = ''

  if (heroImage) {
    let sizes =
      `(min-width: ${1040 / 16}rem) ${386 / 16}rem, (min-width: ${900 / 16}rem) 33.333vw, (min-width: ${600 / 16}rem) 40vw, (min-width: ${450 / 16}rem) ${450 / 16}rem, 80vw`

    if (isIndex) {
      sizes =
        `(min-width: ${1300 / 16}rem) ${610 / 16}rem, (min-width: ${900 / 16}rem) 40vw, (min-width: ${650 / 16}rem) ${650 / 16}rem, 80vw`
    }

    imageOutput = Image({
      args: {
        image: heroImage,
        lazy: false,
        aspectRatio: '1:1',
        maxWidth: isIndex ? 1200 : 800,
        classes: `hero-max-${isIndex ? 's' : 'xs'} m-auto`,
        sizes
      }
    })
  }

  const hasImage = !!imageOutput
  const isMedium = !isIndex && hasImage

  /* Classes */

  let classes = 'pt-xl pb-2xl pt-2xl-m pb-3xl-m'

  if (condensed) {
    classes = 'pt-2xl pb-2xl'
  }

  if (hasImage) {
    classes = `pt-xl pb-2xl pt-2xl-m${isIndex ? ' pb-4xl-m' : ''}`
  }

  /* Text */

  let textOutput = `<h1 class="m-0">${title}</h1>`
  let textClasses = 'text-l m-0 pt-4xs pt-3xs-m'

  if (isProject) {
    textClasses = 'text-m wt-medium relative m-0 pt-3xs pt-2xs-m e-line-in'

    if (isArrayStrict(projectType)) {
      heroText = `<span class="a-hide-vis">Types: </span>${Links(projectType)}`
    }
  }

  if (isStringStrict(heroText)) {
    textOutput += `<p class="${textClasses}">${heroText}</p>`
  }

  /* Arrow */

  let arrowOutput = ''

  if (isIndex && hasImage) {
    const arrowIcon = ArrowSvg({ width: 'm', height: 'm' })

    arrowOutput = /* html */`
      <a href="#content" class="none-m w-m h-m" aria-label="Skip to content">
        ${arrowIcon}
      </a>
    `

    textOutput = /* html */`
      <div class="my-auto pt-2xl-m">
        ${textOutput}
      </div>
      <a href="#content" class="none block-m w-m h-m mt-m" aria-label="Skip to content">
        ${arrowIcon}
      </a>
    `
  }

  const hasArrow = !!arrowOutput

  /* Track */
  
  if (isTrack) {
    return MediaAudioHero(itemData)
  }

  /* Output */

  let output = ''

  if (hasImage) {
    classes += ' flex wrap gap-m gap-2xl-l align-center'
    output = /* html */`
      <div class="col-12 ${isMedium ? 'col-6-s col-7-m' : 'col-6-m'}${hasArrow ? ' flex col' : ''}">
        ${textOutput}
      </div>
      <div class="col-12 ${isMedium ? 'col-6-s col-5-m order-first-s' : 'col-6-m order-first-m'}">
        ${imageOutput}
      </div>
    `
  } else {
    output = `<div class="col-12 col-8-m">${textOutput}</div>`
  }

  return /* html */`
    <section class="container${isMedium ? '-m' : ''} ${classes}">
      ${output}
      ${arrowOutput}
    </section>
  `
}

/* Exports */

export { Hero }
