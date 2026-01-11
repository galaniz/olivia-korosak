/**
 * Components - Audio
 */

/* Imports */

import { configVars } from '../../config/config.js'
import { Loader } from '../../objects/Loader/Loader.js'
import { CloseSvg } from '../../svg/Close/Close.js'
import { ControlSvg } from '../../svg/Control/Control.js'
import { ErrorSvg } from '../../svg/Error/Error.js'

/**
 * Output audio player.
 *
 * @return {string} HTMLElement
 */
const Audio = (): string => {
  /* Loader */

  const loaderId = Loader()

  /* Error */

  const errorId = 'tmpl-audio-error'

  configVars.template.set(errorId, /* html */`
    <div class="audio-error m-auto none" tabindex="-1">
      <div class="info-error bg-diagonal flex gap-4xs pl-4xs pr-4xs pt-4xs pb-4xs b-radius-s">
        ${ErrorSvg({ width: 'xs', height: 's' })}
        <p class="text-s wt-medium lead-base valign-middle m-0 pt-5xs pb-5xs e-line-out">
          Sorry, there is a problem with the service. Download track <a href="" data-rich data-media-link></a>.
        </p>
      </div>
    </div>
  `)

  /* Output */

  return /* html */`
    <ok-audio
      type="audio"
      class="audio bg-background-light sticky bottom-0 left-0 right-0 z-1 num-normal e-trans"
      title=""
      url=""
      loader="${loaderId}"
      error="${errorId}"
    >
      <audio></audio>
      <div class="container pl-5xs pr-3xs py-5xs py-3xs-m px-2xs-m m-auto">
        <div class="flex align-center wrap gap-5xs gap-s-m">
          <div class="flex align-center gap-3xs gap-s-m outline-snug">
            <div class="audio-offset flex align-center">
              <button
                type="button"
                class="b-radius-full sharp e-bg-foreground-base-12"
                aria-label="Previous track"
                data-media-prev
              >
                ${ControlSvg({ type: 'prev' })}
              </button>
              <button
                type="button"
                class="play w-l h-l b-radius-full sharp e-bg-foreground-base-12"
                aria-label="Play"
                data-media-control="toggle"
              >
                ${ControlSvg({ type: 'play' })}
                ${ControlSvg({ type: 'pause' })}
              </button>
              <button
                type="button"
                class="b-radius-full sharp e-bg-foreground-base-12"
                aria-label="Next track"
                data-media-next
              >
                ${ControlSvg({ type: 'next' })}
              </button>
            </div>
            <p class="audio-info text-s wt-medium clamp-1 outline-tight e-line-in">
              <a href="" class="audio-update lead-close" data-rich data-media-link></a>
            </p>
          </div>
          <div class="audio-offset-l flex align-center wrap gap-5xs grow-1 col-12 col-5-m">
            <span
              class="text-xs-flex lead-close sharp order-first-m w-l"
              aria-hidden="true"
              data-media-time
            >
              0:00
            </span>
            <div
              class="audio-progress w-full grow-1 order-first relative before b-radius-s"
              tabindex="0"
              role="slider"
              aria-label="Audio timeline"
              aria-valuemin="0"
              aria-valuemax="0"
              aria-valuenow="0"
              aria-valuetext=""
              data-media-progress
            >
              <div class="audio-bar absolute top-0 left-0 w-full h-full bg-foreground-base"></div>
              <div class="audio-scrub absolute left-0 bg-foreground-base w-4xs h-4xs b-radius-full e-trans"></div>
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
      </div>
      <button
        type="button"
        class="audio-close absolute right-0 top-0 z-1 w-xs h-xs flex align-center justify-center sharp outline-snug" aria-label="Close audio player"
        data-media-close
      >
        ${CloseSvg()}
      </button>
    </ok-audio>
  `
}

/* Exports */

export { Audio }
