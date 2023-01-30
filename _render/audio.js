/**
 * Audio player output
 */

/* Imports */

const controlSvg = require('./svg/control')
const closeSvg = require('./svg/close')

/* Function */

const audio = () => {
  return `
    <div class="c-audio l-fixed l-bottom-0 l-left-0 l-right-0 l-z-index-1 t-dark t-foreground-base-60 t-number-normal bg-background-light e-transition">
      <audio preload="auto">
        <source src="" type="">
        <div class="l-container l-absolute l-top-0 l-left-0 l-right-0 l-bottom-0 l-z-index-1 l-flex l-align-center bg-background-light">
          <p class="t-xs t-line-height-130-pc e-underline">Your browser does not support HTML5 audio. Download track <a href="" class="c-audio__update" data-update="textContent:title,href:url" data-inline></a>.</p>
        </div>
      </audio>
      <div class="c-audio__container l-padding-left-5xs l-padding-top-5xs l-padding-bottom-5xs l-padding-right-3xs l-padding-top-3xs-m l-padding-bottom-3xs-m l-margin-auto">
        <div class="l-flex l-align-center l-flex-wrap l-gap-margin-5xs l-gap-margin-s-m">
          <div>
            <div class="l-flex l-align-center l-gap-margin-3xs l-gap-margin-s-m outline-snug">
              <div>
                <div class="c-audio__offset l-flex l-align-center">
                  <button type="button" class="c-audio__prev l-width-r l-height-r l-svg b-radius-100-pc e-bg-foreground-base-12" aria-label="Previous track">
                    ${controlSvg('playPrev')}
                  </button>
                  <button type="button" class="c-audio__play o-play l-width-l l-height-l l-svg b-radius-100-pc e-bg-foreground-base-12" aria-label="Play" data-state="play">
                    ${controlSvg('play')}
                    ${controlSvg('pause')}
                  </button>
                  <button type="button" class="c-audio__next l-width-r l-height-r l-svg b-radius-100-pc e-bg-foreground-base-12" aria-label="Next track">
                    ${controlSvg('playNext')}
                  </button>
                </div>
              </div>
              <div>
                <div class="c-audio__info e-underline-reverse">
                  <p class="t-xs t-weight-medium t-clamp outline-tight">
                    <a href="" class="c-audio__update t-line-height-120-pc" data-update="textContent:title,href:permalink" data-inline></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="l-flex-grow-1 l-width-1-1 l-width-2-5-m">
            <div class="c-audio__offset l-flex l-align-center l-flex-wrap l-gap-margin-5xs" data-offset="l">
              <span class="t-3xs t-line-height-120-pc t-foreground-base l-order-first-m">
                <span class="c-audio__time l-block l-width-l">0:00</span>
              </span>
              <div class="c-audio__progress l-width-100-pc l-flex-grow-1 l-order-first">
                <div class="c-audio__slider l-relative l-before b-radius-s" tabindex="0" role="slider" aria-label="Seek slider" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" aria-valuetext="">
                  <div class="c-audio__length l-relative">
                    <div class="c-audio__bar l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc bg-foreground-base"></div>
                    <div class="c-audio__scrub l-absolute l-left-0 bg-foreground-base l-width-4xs l-height-4xs b-radius-100-pc e-transition"></div>
                  </div>
                </div>
              </div>
              <span class="t-3xs t-line-height-120-pc l-margin-left-auto">
                <span class="c-audio__duration l-block l-width-l t-align-right">0:00</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="c-audio__error l-container l-none" tabindex="-1">
        <p class="t-xs e-underline">Sorry, there is a problem with the service. Download track <a href="" class="c-audio__update" data-update="textContent:title,href:url" data-inline></a>.</p>
      </div>
      <button type="button" class="c-audio__close l-absolute l-right-0 l-top-0 l-z-index-1 l-width-xs l-height-xs l-flex l-align-center l-justify-center outline-snug" aria-label="Close audio player">
        <span class="l-width-2xs l-height-2xs l-svg">
          ${closeSvg}
        </span>
      </button>
    </div>
  `
}

/* Exports */

module.exports = audio
