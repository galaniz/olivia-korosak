/**
 * Theme js
 */

/* Imports */

import { setElements, usingMouse } from 'Formation/utils'

/* Classes */

import Nav from 'Formation/components/nav'

/* Variables */

const el = {}
const meta = [
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
  }
]

/* Init */

const initialize = () => {
  /* Set elements object */

  setElements(document, meta, el)

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
}

initialize()
