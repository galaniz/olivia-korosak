/**
 * Render - audio
 */

/* Imports */

const controlSvg = require('./svg/control')
const closeSvg = require('./svg/close')
const errorSvg = require('./svg/error')
const loader = require('./loader')

/**
 * Function - output audio player
 *
 * @return {string} HTML - div
 */

const audio = () => {
  return `
    <div class="audio bg-background-light fixed bottom-0 left-0 right-0 z-index-1 num-normal bg-background-light e-transition">
      <audio preload="auto">
        <source src="" type="">
        <div class="container absolute top-0 left-0 right-0 bottom-0 z-index-1 flex align-center bg-background-light">
          <p class="text-s lead-base e-underline">Your browser does not support HTML5 audio. Download track <a href="" class="audio-update" data-update="textContent:title,href:url" data-rich></a>.</p>
        </div>
      </audio>
      <div class="audio-container pl-5xs pt-5xs pb-5xs pr-3xs pt-3xs-m pb-3xs-m m-auto">
        <div class="flex align-center wrap gap-5xs gap-s-m">
          <div>
            <div class="flex align-center gap-3xs gap-s-m outline-snug">
              <div>
                <div class="audio-offset flex align-center">
                  <button type="button" class="audio-prev l-svg b-radius-100-pc sharp e-bg-foreground-base-12" aria-label="Previous track">
                    ${controlSvg('playPrev')}
                  </button>
                  <button type="button" class="audio-play o-play w-l h-l l-svg b-radius-100-pc sharp e-bg-foreground-base-12" aria-label="Play" data-state="play">
                    ${controlSvg('play')}
                    ${controlSvg('pause')}
                  </button>
                  <button type="button" class="audio-next l-svg b-radius-100-pc sharp e-bg-foreground-base-12" aria-label="Next track">
                    ${controlSvg('playNext')}
                  </button>
                </div>
              </div>
              <div>
                <div class="audio-info e-underline-reverse">
                  <p class="text-s wt-medium clamp-1 outline-tight">
                    <a href="" class="audio-update lead-close" data-update="textContent:title,href:permalink" data-rich></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="grow-1 col-12 col-5-m">
            <div class="audio-offset flex align-center wrap gap-5xs" data-offset="l">
              <span class="text-xs-flex lead-close sharp order-first-m" aria-hidden="true">
                <span class="audio-time block w-l">0:00</span>
              </span>
              <div class="audio-progress w-full grow-1 order-first">
                <div class="audio-slider relative before b-radius-s" tabindex="0" role="slider" aria-label="Audio timeline" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" aria-valuetext="">
                  <div class="audio-length relative">
                    <div class="audio-bar absolute top-0 left-0 w-full h-full bg-foreground-base"></div>
                    <div class="audio-scrub absolute left-0 bg-foreground-base w-4xs h-4xs b-radius-100-pc e-transition"></div>
                  </div>
                </div>
              </div>
              <span class="text-xs-flex lead-close ml-auto" aria-hidden="true">
                <span class="audio-duration block w-l text-right">0:00</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="audio-error m-auto none" tabindex="-1">
        <div class="info-negative bg-diagonal pl-4xs pr-4xs pt-4xs pb-4xs b-radius-s">
          <div class="flex gap-4xs">
            <div>
              <div class="w-xs h-s l-svg">
                ${errorSvg()}
              </div>
            </div>
            <div>
              <p class="text-s wt-medium lead-base valign-middle m-0 pt-5xs pb-5xs e-underline">Sorry, there is a problem with the service. Download track <a href="" class="audio-update" data-update="textContent:title,href:url" data-rich></a>.</p>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="audio-close absolute right-0 top-0 z-index-1 w-xs h-xs flex align-center justify-center sharp outline-snug" aria-label="Close audio player">
        <span class="w-2xs h-2xs l-svg">
          ${closeSvg()}
        </span>
      </button>
      ${loader({ classes: 'sharp' })}
    </div>
  `
}

/* Exports */

module.exports = audio
