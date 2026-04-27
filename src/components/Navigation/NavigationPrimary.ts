/**
 * Components - Navigation Primary
 */

/* Imports */

import type { NavigationPrimaryArgs } from './NavigationTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { navigationsInstance } from './Navigations.js'
import { configVars } from '../../config/config.js'
import { Logo } from '../../objects/Logo/Logo.js'
import { Social } from '../../objects/Social/Social.js'

/**
 * Output primary navigation.
 *
 * @param {NavigationPrimaryArgs} args
 * @return {string} HTMLElement
 */
const NavigationPrimary = (args: NavigationPrimaryArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    currentLink,
    currentType
  } = args

  /* List */
  
  const listClass = 'nav-list list-none'
  const listAttr = 'role="list"'
  const linkClass = 'nav-link'
  const itemClass = 'nav-item'
  const listOutput = navigationsInstance?.getOutput('Main', {
    currentLink,
    currentType,
    listClass,
    listAttr,
    linkClass,
    itemClass,
    depthAttr: true,
    filterBeforeList ({ args, depth }) {
      let listAttrs = listAttr
      let listClasses = listClass

      if (depth === 0) {
        listAttrs += ' data-nav-slot'
        listClasses += ' flex align-center gap-m overflow-x-auto overflow-y-hidden outline-tight'
      }

      args.listAttr = listAttrs
      args.listClass = listClasses
    },
    filterBeforeItem ({ args, depth }) {
      let itemAttrs = ''

      if (depth === 0) {
        itemAttrs = 'data-nav-item'
      }

      args.itemAttr = itemAttrs
    },
    filterBeforeLink: ({ depth, args }) => {
      let linkClasses = linkClass

      if (depth === 0) {
        linkClasses += ' text-l lead-base inline-flex relative after py-5xs'
      }

      args.linkClass = linkClasses
    }
  }, 1) ?? ''

  /* Social */

  const socialOutput = Social('pt-m')

  /* Modal */

  let modalOutput = ''

  if (listOutput) {
    modalOutput = /* html */`
      <button
        class="nav-open pt-5xs h-l w-m flex nav-hide no-js-none"
        aria-label="Open menu"
        data-nav-open
      >
        <span class="nav-icon block relative e-trans" data-nav-icon="1">
          <span class="nav-icon-top bg-current block e-trans"></span>
          <span class="nav-icon-middle bg-current block e-trans"></span>
          <span class="nav-icon-bottom bg-current block e-trans"></span>
        </span>
        <span class="nav-icon-text text-s pt-4xs block" aria-hidden="true">Menu</span>
      </button>
      <div
        class="nav-modal fixed inset-0 w-full h-full z-1"
        role="dialog"
        aria-modal="true"
        aria-label="Primary menu"
        data-nav-modal
      >
        <div class="nav-modal-scroll overflow-y-auto overscroll-none overflow-x-hidden col-10 bg-background-light outline-base h-full ml-auto px-s pt-3xl pb-xs e-trans">
          <ul class="nav-modal-list flex col gap-2xs list-none" role="list" data-nav-modal-slot></ul>
          ${socialOutput}
          <button
            class="nav-close h-l w-m fixed"
            aria-label="Close menu"
            data-nav-close
          ></button>
        </div>
        <div
          class="nav-overlay fixed inset-0 z--1 w-full h-full e-trans"
          data-nav-close
        ></div>
      </div>
    `
  }

  /* Scripts and styles */

  addStyle('components/Navigation/NavigationPrimary')
  addScript('components/Navigation/NavigationPrimaryClient')

  /* Breakpoint */

  const breakpoint = 600
  const breakpointRem = (breakpoint + 1) / 16

  /* Inline styles */

  configVars.style.add(`@media screen and (min-width:${breakpointRem}rem){.nav{--nav-slot-opacity:1;--nav-hide:none}}`)
  configVars.noscript.add('<style>.nav{--nav-slot-opacity:1}</style>')

  /* Output */

  return /* html */`
    <ok-navigation-primary
      class="nav relative container py-2xs py-m-m flex justify-between align-center deco-none"
      breakpoints="${breakpoint}"
      role="navigation"
      aria-label="Primary"
    >
      ${Logo({ classes: 'mr-2xs' })}
      ${listOutput}
      ${modalOutput}
    </ok-navigation-primary>
  `
}

/* Exports */

export { NavigationPrimary }
