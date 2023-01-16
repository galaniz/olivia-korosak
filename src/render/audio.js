/**
 * Audio player output
 */

/* Imports */

const { getFile } = require('../utils/functions')

/* Function */

const audio = () => {
  return `
    <div class="c-audio l-fixed l-bottom-0 l-left-0 l-right-0 t-dark t-foreground-base-60 t-number-normal bg-background-light e-transition">
      <audio preload="auto">
        <source src="" type="">
        <p class="l-container t-xs e-underline">Your browser does not support HTML5 audio. <a href="" class="c-audio__url" data-inline>Download the track</a>.</p>
      </audio>
      <div class="c-audio__container l-padding-left-5xs l-padding-top-5xs l-padding-bottom-5xs l-padding-right-3xs l-padding-top-3xs-m l-padding-bottom-3xs-m l-margin-auto">
        <div class="l-flex l-align-center l-flex-wrap l-gap-margin-5xs l-gap-margin-s-m">
          <div>
            <div class="l-flex l-align-center l-gap-margin-3xs l-gap-margin-s-m outline-snug">
              <div>
                <div class="c-audio__offset l-flex l-align-center">
                  <button type="button" class="c-audio__prev l-width-r l-height-r l-svg b-radius-100-pc" aria-label="Previous track">
                    ${getFile('./src/assets/svg/play-prev.svg')}
                  </button>
                  <button type="button" class="c-audio__play l-width-l l-height-l l-svg l-relative b-radius-100-pc" data-state="play">
                    <span class="c-audio__state a11y-visually-hidden">Play</span>
                    ${getFile('./src/assets/svg/play.svg')}
                    ${getFile('./src/assets/svg/pause.svg')}
                  </button>
                  <button type="button" class="c-audio__next l-width-r l-height-r l-svg b-radius-100-pc" aria-label="Next track">
                    ${getFile('./src/assets/svg/play-next.svg')}
                  </button>
                </div>
              </div>
              <div>
                <div class="c-audio__text e-underline-reverse">
                  <p class="t-xs t-weight-medium t-clamp">
                    <a href="" class="c-audio__title t-line-height-120-pc" data-inline>The Extra Scandalous Opening</a>
                  </p>
                  <div class="c-audio__show l-none">
                    <p class="t-2xs t-clamp e-underline-thin">
                      <a href="" class="c-audio__project t-current" data-inline>Whose Vagina is it, Really?</a> 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="l-flex-grow-1 l-width-1-1 l-width-2-5-m">
            <div class="c-audio__offset l-flex l-align-center l-flex-wrap l-gap-margin-5xs l-gap-margin-3xs-m" data-offset="l">
              <span class="c-audio__time t-3xs t-line-height-120-pc t-foreground-base l-order-first-m">01:10</span>
              <div class="c-audio__progress l-width-100-pc l-flex-grow-1 l-order-first">
                <div class="c-audio__slider l-relative b-radius-s" tabindex="0" role="slider" aria-label="Seek slider" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0" aria-valuetext="">
                  <div class="c-audio__fill l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc bg-foreground-base"></div>
                  <button class="c-audio__scrub l-absolute l-left-0 bg-foreground-base l-width-4xs l-height-4xs b-radius-100-pc" type="button" aria-label="Move track time position"></button>
                </div>
              </div>
              <span class="c-audio__duration t-3xs t-line-height-120-pc l-margin-left-auto">04:10</span>
            </div>
          </div>
        </div>
      </div>
      <div class="c-audio__error l-container l-none" tabindex="-1">
        <p class="t-xs e-underline">Sorry, there is a problem with the service. <a href="" class="c-audio__url" data-inline="">Download the track</a>.</p>
      </div>
      <button type="button" class="c-audio__close l-absolute l-right-0 l-top-0 l-width-xs l-height-xs l-flex l-align-center l-justify-center" aria-label="Close audio player">
        <span class="l-width-2xs l-height-2xs l-svg">
          ${getFile('./src/assets/svg/close.svg')}
        </span>
      </button>
    </div>
  `
}

/* Exports */

module.exports = audio
