/**
 * Components - Media Audio
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { addScript, addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configVars } from '../../config/config.js'
import { Loader } from '../../objects/Loader/Loader.js'
import { CloseSvg } from '../../svg/Close/Close.js'
import { ControlSvg } from '../../svg/Control/Control.js'
import { ErrorSvg } from '../../svg/Error/Error.js'

/**
 * Output media audio player.
 *
 * @return {string} HTMLElement
 */
const MediaAudio = (): string => {
  /* Loader */

  const loaderId = Loader()

  /* Error */

  const errorId = 'tmpl-media-audio-error'

  configVars.template.set(errorId, /* html */`
    <div class="bg-background-light absolute inset-0 flex col justify-center" tabindex="-1">
      <div class="container flex gap-4xs">
        ${ErrorSvg({ width: 'xs', height: 's' })}
        <p class="text-s wt-medium lead-base py-5xs e-line-out">
          Sorry, there is a problem with the service. Download track <a data-rich data-media-link></a>.
        </p>
      </div>
    </div>
  `)

  /* Scripts and styles */

  addStyle('components/MediaAudio/MediaAudio')
  addScript('components/MediaAudio/MediaAudioClient')

  /* Output */

  return /* html */`
    <ok-media-audio
      id="${uuid()}"
      type="audio"
      class="media-audio bg-background-light fixed bottom-0 left-0 right-0 z-1 num-normal e-trans"
      loader="${loaderId}"
      error="${errorId}"
    >
      <audio inert></audio>
      <div class="container px-5xs py-5xs py-3xs-m px-2xs-m flex align-center wrap gap-5xs gap-s-m" inert>
        <div class="flex align-center gap-3xs gap-s-m outline-snug">
          <div class="flex align-center">
            <button
              type="button"
              class="media-audio-control b-radius-full sharp flex"
              aria-label="Previous track"
              data-media-prev
            >
              ${ControlSvg({ type: 'prev', width: 'm', height: 'm' })}
            </button>
            <button
              type="button"
              class="media-audio-control w-l h-l b-radius-full sharp"
              aria-label="Play"
              data-media-control="toggle"
            >
              ${ControlSvg({
                type: 'play',
                width: 'l',
                height: 'l',
                classes: 'media-audio-play'
              })}
              ${ControlSvg({
                type: 'pause',
                width: 'l',
                height: 'l',
                classes: 'media-audio-pause'
              })}
            </button>
            <button
              type="button"
              class="media-audio-control b-radius-full sharp flex"
              aria-label="Next track"
              data-media-next
            >
              ${ControlSvg({ type: 'next', width: 'm', height: 'm' })}
            </button>
          </div>
          <p class="media-audio-text text-s wt-medium clamp-1 outline-tight e-line-in">
            <a class="lead-close" data-rich data-media-link></a>
          </p>
        </div>
        <div class="media-audio-seek flex align-center wrap gap-5xs grow-1 col-12 col-5-m">
          <span
            class="text-xs-flex lead-close sharp order-first-m w-l"
            aria-hidden="true"
            data-media-time
          >
            0:00
          </span>
          <div
            class="media-audio-progress grow-1 order-first relative before b-radius-s"
            tabindex="0"
            role="slider"
            aria-label="Audio timeline"
            aria-valuemin="0"
            aria-valuemax="0"
            aria-valuenow="0"
            aria-valuetext=""
            data-media-progress
          >
            <div class="media-audio-bar absolute top-0 left-0 w-full after"></div>
            <div class="media-audio-scrub absolute left-0 bg-foreground-base w-4xs h-4xs b-radius-full e-trans"></div>
          </div>
          <span
            class="text-xs-flex lead-close ml-auto w-l text-right"
            aria-hidden="true"
            data-media-duration
          >
            0:00
          </span>
        </div>
      </div>
      <button
        type="button"
        class="absolute right-0 top-0 z-1 w-xs h-xs flex align-center justify-center sharp outline-snug"
        aria-label="Close audio player"
        data-media-close
        inert
      >
        ${CloseSvg()}
      </button>
    </ok-media-audio>
  `
}

/* Exports */

export { MediaAudio }
