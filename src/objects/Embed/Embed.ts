/**
 * Objects - Embed
 */

/* Imports */

import type { EmbedProps } from './EmbedTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { RichText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import { ControlSvg } from '../../svg/Control/Control.js'
import { Loader } from '../Loader/Loader.js'
import { Info } from '../Info/Info.js'
import { Image } from '../Image/Image.js'
import { ImageArgs } from '../Image/ImageTypes.js'

/**
 * Output YouTube or Vimeo embed.
 *
 * @param {EmbedProps} props
 * @return {string} HTMLDivElement
 */
const Embed = (props: EmbedProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, children, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    link,
    title,
    text
  } = args

  /* Link, title and children required */

  if (!isStringStrict(link) || !isStringStrict(title) || !isArrayStrict(children)) {
    return ''
  }

  /* Thumbnail */

  let thumbOutput = ''

  children.forEach(child => {
    if (child.renderType !== 'image') {
      return
    }

    thumbOutput = Image({
      args: {
        ...(child as ImageArgs),
        aspectRatio: '16-9'
      },
      parents
    })
  })

  /* Styles */

  addStyle('objects/Embed/Embed')
  addScript('objects/Embed/EmbedClient')

  /* Caption */

  const captionOutput = RichText({
    args: {
      tag: 'figcaption',
      content: text,
      classes: 'pt-3xs pt-2xs-m'
    }
  })

  /* Loader */

  const loaderId = Loader()

  /* Error */

  const errorId = Info({
    title: 'Sorry, there was a problem loading the file.',
    text: 'Try again later.',
    template: true,
    type: 'error'
  })

  /* Output */

  const output = /* html */`
    <ok-embed
      class="embed bg-foreground-light block relative overflow-hidden outline-inset"
      url="${link}&autoplay=1&rel=0"
      title="${title}"
      loader="${loaderId}"
      error="${errorId}"
    >
      ${thumbOutput}
      <button
        type="button"
        aria-label="Play ${title}"
        class="absolute inset-0 flex justify-center align-center"
        data-embed-load
      >
        <span class="embed-play ar-1-1 b-radius-full b-all bg-background-light sharp relative e-trans">
          ${ControlSvg({
            classes: 'absolute inset-0',
            width: 'full',
            height: 'full'
          })}
        </span>
      </button>
    </ok-embed>
  `

  return /* html */`
    <figure>
      ${output}
      ${isStringStrict(captionOutput) ? captionOutput : ''}
    </figure>
  `
}

/* Exports */

export { Embed }
