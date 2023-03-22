/**
 * Theme js
 */

/* Imports */

import { setElements, usingMouse } from '@alanizcreative/formation/src/utils'
import { pageTransition } from '@alanizcreative/formation/src/effects/page-transition'
import Nav from '@alanizcreative/formation/src/components/nav'
import Audio from '@alanizcreative/formation/src/components/audio'
import Table from '@alanizcreative/formation/src/objects/table'
import Collapsible from '@alanizcreative/formation/src/objects/collapsible'
import SendForm from '@alanizcreative/formation/src/objects/form/send'
import Modal from '@alanizcreative/formation/src/objects/modal'
import OverflowIndicator from '@alanizcreative/formation/src/objects/overflow-indicator'

/**
 * Performance object
 *
 * @type {object}
 */

const perf = window.PerformanceNavigationTiming ? performance.getEntriesByType('navigation')[0] : performance.timing

/**
 * Namespace
 *
 * @type {string}
 */

const ns = window.namespace

/**
 * Namespace object - back end info
 *
 * @type {object}
 */

const n = window[ns]

/**
 * Store DOM elements from setElements
 *
 * @type {object}
 */

const el = {}

/**
 * Props and selectors for setElements
 *
 * @type {array<object>}
 */

const meta = [
  {
    prop: 'pageTransition',
    selector: '#js-pt'
  },
  {
    prop: 'pageTransitionLinks',
    selector: '.js-pt-link',
    all: true,
    array: true
  },
  {
    prop: 'nav',
    selector: '.c-nav',
    items: [
      {
        prop: 'navLogo',
        selector: '.c-nav__logo'
      },
      {
        prop: 'navList',
        selector: '.c-nav__list'
      },
      {
        prop: 'navOverflow',
        selector: '.c-nav-overflow'
      },
      {
        prop: 'navOverflowList',
        selector: '.c-nav-overflow__list'
      },
      {
        prop: 'navItems',
        selector: '.c-nav__item[data-depth="0"]',
        all: true
      },
      {
        prop: 'navLinks',
        selector: '.c-nav__link',
        all: true
      },
      {
        prop: 'navOpen',
        selector: '.c-nav__open'
      },
      {
        prop: 'navClose',
        selector: '.c-nav__close'
      },
      {
        prop: 'navOverlay',
        selector: '.c-nav__overlay'
      }
    ]
  },
  {
    prop: 'tables',
    selector: '.o-table',
    all: true,
    array: true
  },
  {
    prop: 'collapsibles',
    selector: '.o-collapsible',
    all: true,
    array: true
  },
  {
    prop: 'overflow',
    selector: '.o-overflow',
    all: true,
    array: true
  },
  {
    prop: 'modalTriggers',
    selector: '.js-modal-trigger',
    all: true,
    array: true
  },
  {
    prop: 'forms',
    selector: '.js-send-form',
    all: true,
    array: true
  },
  {
    prop: 'audio',
    selector: '.c-audio',
    items: [
      {
        prop: 'audioItem',
        selector: 'audio'
      },
      {
        prop: 'audioSource',
        selector: 'source'
      },
      {
        prop: 'audioLoader',
        selector: '.o-loader'
      },
      {
        prop: 'audioError',
        selector: '.c-audio__error'
      },
      {
        prop: 'audioPlay',
        selector: '.c-audio__play'
      },
      {
        prop: 'audioPrev',
        selector: '.c-audio__prev'
      },
      {
        prop: 'audioNext',
        selector: '.c-audio__next'
      },
      {
        prop: 'audioTime',
        selector: '.c-audio__time'
      },
      {
        prop: 'audioDuration',
        selector: '.c-audio__duration'
      },
      {
        prop: 'audioUpdate',
        selector: '.c-audio__update',
        all: true,
        array: true
      },
      {
        prop: 'audioSlider',
        selector: '.c-audio__slider'
      },
      {
        prop: 'audioBar',
        selector: '.c-audio__bar'
      },
      {
        prop: 'audioScrub',
        selector: '.c-audio__scrub'
      },
      {
        prop: 'audioClose',
        selector: '.c-audio__close'
      }
    ]
  }
]

/**
 * Function - initialize functions and classes
 *
 * @return {void}
 */

const initialize = () => {
  /* JavaScript enabled add js body class */

  const body = document.body

  body.classList.remove('no-js')
  body.classList.add('js')

  /* Set elements object */

  setElements(document, meta, el)

  /* Page transition off and transition links */

  if (el.pageTransition) {
    const transDuration = 150
    const animDelay = 750

    document.addEventListener('DOMContentLoaded', () => {
      const pageLoadTime = perf.domInteractive - perf.fetchStart
      const animDone = pageLoadTime >= animDelay

      if (animDone) {
        el.pageTransition.style.setProperty('transition', 'none')
      }

      el.pageTransition.setAttribute('data-show', false)

      if (animDone) {
        setTimeout(() => {
          el.pageTransition.style.setProperty('transition', '')
        }, transDuration)
      }
    })

    if (el.pageTransitionLinks.length) {
      pageTransition({
        links: el.pageTransitionLinks,
        transitionElement: el.pageTransition,
        delay: transDuration
      })
    }
  }

  /* Check if using mouse */

  usingMouse()

  /* Navigation */

  if (el.nav) {
    const nav = () => {
      const itemSelector = '.c-nav__item[data-depth="0"]'

      return new Nav({
        nav: el.nav,
        list: el.navList,
        overflow: el.navOverflow,
        overflowList: el.navOverflowList,
        items: el.navItems,
        itemSelector,
        links: el.navLinks,
        open: el.navOpen,
        close: el.navClose,
        overlay: el.navOverlay,
        filterFocusableItem (item) {
          return el.navLogo !== item
        }
      })
    }

    nav()
  }

  /* Data tables */

  if (el.tables.length) {
    const table = (args) => {
      return new Table(args)
    }

    el.tables.forEach(t => {
      table({
        table: t,
        equalWidthTo: t.parentElement
      })
    })
  }

  /* Collapsibles */

  if (el.collapsibles.length) {
    const collapsible = (args) => {
      return new Collapsible(args)
    }

    el.collapsibles.forEach(c => {
      const meta = [
        {
          prop: 'collapsible',
          selector: '.o-collapsible__main'
        },
        {
          prop: 'trigger',
          selector: '.o-collapsible__toggle'
        }
      ]

      const cc = {}

      setElements(c, meta, cc)

      const args = {
        container: c,
        collapsible: cc.collapsible,
        accordionId: c.getAttribute('data-accordion'),
        trigger: cc.trigger || document.getElementById(c.getAttribute('data-trigger'))
      }

      collapsible(args)
    })
  }

  /* Overflow containers */

  if (el.overflow.length) {
    const overflowIndicator = (args) => {
      return new OverflowIndicator(args)
    }

    el.overflow.forEach(o => {
      overflowIndicator({
        indicator: o.parentElement,
        scroll: o,
        y: false
      })
    })
  }

  /* Modal triggers and modals */

  if (el.modalTriggers.length) {
    const modal = (args) => {
      return new Modal(args)
    }

    el.modalTriggers.forEach((m) => {
      /* Get elements */

      const meta = [
        {
          prop: 'modal',
          selector: `#${m.getAttribute('aria-controls')}`,
          items: [
            {
              prop: 'window',
              selector: '.o-modal__window'
            },
            {
              prop: 'overlay',
              selector: '.o-modal__overlay'
            },
            {
              prop: 'close',
              selector: '.o-modal__close'
            },
            {
              prop: 'iframe',
              selector: 'iframe'
            }
          ]
        }
      ]

      const args = {}

      setElements(document, meta, args)

      args.trigger = m

      /* Iframe player */

      const { iframe } = args

      let iframeLink = ''
      let player = false

      if (iframe) {
        iframeLink = iframe.getAttribute('data-src')
      }

      args.onToggle = (open) => {
        if (iframeLink && open && !player) {
          iframe.src = `${iframeLink}?autoplay=1&enablejsapi=1`

          /* Load Iframe Player API code */

          if (!document.getElementById('yt-iframe-api')) {
            const script = document.createElement('script')
            script.id = 'yt-iframe-api'
            script.src = 'https://www.youtube.com/iframe_api'

            document.head.appendChild(script)

            window.onYouTubeIframeAPIReady = () => {
              player = new window.YT.Player(iframe.id, {
                events: {
                  onReady(event) {
                    iframe.focus()
  
                    event.target.playVideo()
                  }
                }
              })
            }
          } else {
            player = new window.YT.Player(iframe.id, {
              events: {
                onReady(event) {
                  iframe.focus()
  
                  event.target.playVideo()
                }
              }
            })
          }
        }

        if (player && typeof player.getPlayerState === 'function') {
          if (!open) {
            if (player.getPlayerState() === 1 || player.getPlayerState() === 3) {
              setTimeout(() => {
                player.stopVideo()
              }, 300)
            }
          } else {
            if (player.getPlayerState() !== 1) {
              setTimeout(() => {
                player.playVideo()
              }, 300)
            }
          }
        }
      }

      /* Init */

      modal(args)
    })
  }

  /* Forms */

  if (n && el.forms.length) {
    /* Default result messages */

    const getDefaultMessages = (id) => {
      const messages = {
        error: {
          primary: 'Sorry, there is a problem with the service.',
          secondary: 'Try again later.'
        },
        success: {
          primary: 'Success!',
          secondary: ''
        }
      }

      if (Object.getOwnPropertyDescriptor(n, `form-${id}`)) {
        const ff = n[`form-${id}`]

        if (Object.getOwnPropertyDescriptor(ff, 'successMessage')) {
          if (ff.successMessage.primary) {
            messages.success.primary = ff.successMessage.primary
          }

          if (ff.successMessage.secondary) {
            messages.success.secondary = ff.successMessage.secondary
          }
        }

        if (Object.getOwnPropertyDescriptor(ff, 'errorMessage')) {
          if (ff.errorMessage.primary) {
            messages.error.primary = ff.errorMessage.primary
          }

          if (ff.errorMessage.secondary) {
            messages.error.secondary = ff.errorMessage.secondary
          }
        }
      }

      return messages
    }

    /* Form instantiation */

    const sendForm = (form) => {
      /* Store instance */

      let instance = null

      /* Get elements */

      const meta = [
        {
          prop: 'inputs',
          selector: '.js-input',
          all: true
        },
        {
          prop: 'submit',
          selector: '.js-submit'
        },
        {
          prop: 'loaders',
          selector: '.o-loader',
          all: true
        },
        {
          prop: 'errorSummary',
          selector: '.o-form-error__summary',
          items: [
            {
              prop: 'errorSummaryList',
              selector: 'ul'
            }
          ]
        },
        {
          prop: 'error',
          selector: '.o-form-result_negative',
          items: [
            {
              prop: 'errorPrimary',
              selector: '.o-form-result__primary'
            },
            {
              prop: 'errorSecondary',
              selector: '.o-form-result__secondary'
            }
          ]
        },
        {
          prop: 'success',
          selector: '.o-form-result__positive',
          items: [
            {
              prop: 'successPrimary',
              selector: '.o-form-result__primary'
            },
            {
              prop: 'successSecondary',
              selector: '.o-form-result__secondary'
            }
          ]
        }
      ]

      const f = {}

      setElements(form, meta, f)

      /* Variables */

      const id = form.id

      /* Messages */

      const messages = getDefaultMessages(id)

      /* Args */

      const args = {
        id,
        form,
        url: n.sendUrl,
        inputs: f.inputs,
        submit: f.submit,
        loaders: f.loaders,
        groupClass: 'o-form__group',
        fieldClass: 'o-form__field',
        labelClass: 'o-form__label',
        data: {
          action: 'sendForm'
        },
        errorTemplate: `
          <span class='o-form__error l-flex l-gap-margin-5xs l-padding-top-5xs l-padding-top-4xs-m' id='%id'>
            <span class='t-line-height-0'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="l-width-2xs l-height-2xs l-height-xs-m" aria-label="Error" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M10.0833 10.9792C10.25 10.9792 10.3924 10.9201 10.5104 10.8021C10.6285 10.684 10.6875 10.5347 10.6875 10.3542V6.3125C10.6875 6.14584 10.625 6.00348 10.5 5.88542C10.375 5.76737 10.2292 5.70834 10.0625 5.70834C9.88194 5.70834 9.73264 5.76737 9.61458 5.88542C9.49653 6.00348 9.4375 6.15278 9.4375 6.33334V10.375C9.4375 10.5417 9.5 10.684 9.625 10.8021C9.75 10.9201 9.90278 10.9792 10.0833 10.9792V10.9792ZM10 14.1667C10.1944 14.1667 10.3576 14.1007 10.4896 13.9688C10.6215 13.8368 10.6875 13.6736 10.6875 13.4792C10.6875 13.2847 10.6215 13.1215 10.4896 12.9896C10.3576 12.8576 10.1944 12.7917 10 12.7917C9.80556 12.7917 9.64236 12.8576 9.51042 12.9896C9.37847 13.1215 9.3125 13.2847 9.3125 13.4792C9.3125 13.6736 9.37847 13.8368 9.51042 13.9688C9.64236 14.1007 9.80556 14.1667 10 14.1667ZM10 18.3333C8.81944 18.3333 7.72222 18.1215 6.70833 17.6979C5.69444 17.2743 4.8125 16.6875 4.0625 15.9375C3.3125 15.1875 2.72569 14.3056 2.30208 13.2917C1.87847 12.2778 1.66667 11.1806 1.66667 10C1.66667 8.83334 1.87847 7.74306 2.30208 6.72917C2.72569 5.71528 3.3125 4.83334 4.0625 4.08334C4.8125 3.33334 5.69444 2.74306 6.70833 2.31251C7.72222 1.88195 8.81944 1.66667 10 1.66667C11.1667 1.66667 12.2569 1.88195 13.2708 2.31251C14.2847 2.74306 15.1667 3.33334 15.9167 4.08334C16.6667 4.83334 17.2569 5.71528 17.6875 6.72917C18.1181 7.74306 18.3333 8.83334 18.3333 10C18.3333 11.1806 18.1181 12.2778 17.6875 13.2917C17.2569 14.3056 16.6667 15.1875 15.9167 15.9375C15.1667 16.6875 14.2847 17.2743 13.2708 17.6979C12.2569 18.1215 11.1667 18.3333 10 18.3333ZM10 17.0833C11.9444 17.0833 13.6111 16.3889 15 15C16.3889 13.6111 17.0833 11.9444 17.0833 10C17.0833 8.05556 16.3889 6.38889 15 5.00001C13.6111 3.61112 11.9444 2.91667 10 2.91667C8.05556 2.91667 6.38889 3.61112 5 5.00001C3.61111 6.38889 2.91667 8.05556 2.91667 10C2.91667 11.9444 3.61111 13.6111 5 15C6.38889 16.3889 8.05556 17.0833 10 17.0833Z" fill="currentcolor"/></svg>
            </span>
            <span class='t-line-height-0'>
              <span class='t-s t-weight-medium t-line-height-130-pc t-valign-middle' id='%id-text'>%message</span>
            </span>
          </span>
        `,
        result: {
          error: {
            summary: {
              container: f.errorSummary,
              list: f.errorSummaryList
            },
            container: f.error,
            primary: f.errorPrimary,
            secondary: f.errorSecondary,
            message: messages.error
          },
          success: {
            container: f.success,
            primary: f.successPrimary,
            secondary: f.successSecondary,
            message: messages.success
          }
        }
      }

      instance = new SendForm(args)

      return instance
    }

    el.forms.forEach((form) => {
      sendForm(form)
    })
  }

  /* Audio player */

  if (n && el.audio) {
    const audio = (args) => {
      return new Audio(args)
    }

    let tracks = n.tracks || false

    if (tracks) {
      tracks = tracks.filter(track => {
        const { id } = track

        const item = document.getElementById(id)
        const button = document.getElementById(`b-${id}`)

        if (!item || !button) {
          return false
        }

        track.item = item
        track.button = button

        return track
      })

      const update = []

      if (el.audioUpdate.length) {
        el.audioUpdate.forEach(u => {
          let updateAttr = u.getAttribute('data-update')

          if (!updateAttr) {
            return
          }

          updateAttr = updateAttr.split(',')

          const attr = {}

          updateAttr.forEach(a => {
            const aa = a.split(':')

            attr[aa[0]] = aa[1]
          })

          update.push({
            item: u,
            attr
          })
        })
      }

      if (tracks.length) {
        audio({
          tracks,
          update,
          container: el.audio,
          audio: el.audioItem,
          source: el.audioSource,
          loader: el.audioLoader,
          error: el.audioError,
          play: el.audioPlay,
          prev: el.audioPrev,
          next: el.audioNext,
          time: el.audioTime,
          close: el.audioClose,
          duration: el.audioDuration,
          progress: {
            slider: el.audioSlider,
            bar: el.audioBar,
            scrub: el.audioScrub
          }
        })
      }
    }
  }
}

initialize()
