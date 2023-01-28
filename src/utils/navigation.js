/**
 * Navigation output
 *
 * @param {object} args {
 *  @param {array} navs
 *  @param {array} items
 * }
 */

/* Imports */

const { getSlug, getPermalink, getLink } = require('./functions')

/* Class */

class Navigation {
  /**
   * Constructor
   */

  constructor (args) {
    /**
     * Public variables
     */

    const {
      navs = [],
      items = []
    } = args

    this.navs = navs
    this.items = items

    /**
     * Internal
     */

    this._itemsById = {}
    this._navsByLocation = {}

    /**
     * Initialize
     */

    const init = this._initialize()

    if (!init) {
      return false
    } else {
      return true
    }
  }

  /**
   * Initialize
   */

  _initialize () {
    /* Check that required items exist */

    if (!this.navs || !this.items) { return false }

    /* Items by id */

    this.items.forEach(item => {
      const info = this._getItemInfo(item)

      this._itemsById[info.id] = info.props
    })

    /* Navs by location */

    this.navs.forEach(nav => {
      const navFields = Object.assign({
        title: '',
        location: '',
        items: []
      }, nav.fields)

      const { title, location, items } = navFields

      this._navsByLocation[location.toLowerCase().replace(/ /g, '')] = {
        title,
        items
      }
    })

    /* Init successful */

    return true
  }

  /**
   * Helpers
   */

  /* Normalize navigation item props */

  _getItemInfo (item) {
    const fields = item.fields

    const {
      title = '',
      internalLink = false,
      externalLink = '',
      children = false
    } = fields

    let id = ''
    let external = false

    const link = getLink(internalLink, externalLink)

    if (externalLink) {
      id = externalLink
      external = true
    } else {
      id = internalLink.sys.id
    }

    const props = {
      id,
      title,
      link,
      external
    }

    if (children) {
      const c = []

      this._recurseItemChildren(children, c)

      props.children = c
    }

    return {
      id,
      props
    }
  }

  /* Loop through items to check and set children */

  _recurseItemChildren (children = [], store = []) {
    children.forEach(child => {
      const info = this._getItemInfo(child)

      store.push(info.props)
    })
  }

  /* Return navigation items by id */

  _getItems (items = [], current = '') {
    if (!items.length) {
      return []
    }

    return items.map(item => {
      const { fields } = item
      const { externalLink = '' } = fields

      let f = {}

      if (externalLink) {
        f = item.fields.externalLink
      } else {
        f = item.fields.internalLink.sys.id
      }

      const obj = this._itemsById[f]

      obj.current = externalLink ? false : obj.link === current
      obj.descendentCurrent = current.includes(obj.link)

      return this._itemsById[f]
    })
  }

  /* Loop through items to create html */

  _recurseOutput = (items = [], output = {}, depth = -1, args = {}) => {
    depth += 1

    const listClasses = args.listClass ? ` class="${args.listClass}"` : ''
    const listAttrs = args.listAttr ? ` ${args.listAttr}` : ''

    output.html += `<ul data-depth="${depth}"${listClasses}${listAttrs}>`

    items.forEach(item => {
      const {
        title = '',
        link = '',
        external = false,
        children = [],
        current = false,
        descendentCurrent = false
      } = item

      args.filterBeforeItem(args, item, output)

      const itemClasses = args.itemClass ? ` class="${args.itemClass}"` : ''
      let itemAttrs = args.itemAttr ? ` ${args.itemAttr}` : ''

      if (current) {
        itemAttrs += ' data-current="true"'
      }

      if (descendentCurrent) {
        itemAttrs += ' data-descendent-current="true"'
      }

      output.html += `<li data-depth="${depth}"${itemClasses}${itemAttrs}>`

      args.filterBeforeLink(args, item, output)

      const linkClasses = args.linkClass ? ` class="${args.linkClass}"` : ''
      let linkAttrs = args.linkAttr ? ` ${args.linkAttr}` : ''

      if (external) {
        linkAttrs += ' target="_blank" rel="noreferrer"'
      }

      if (current) {
        linkAttrs += ' aria-current="page" data-current="true"'
      }

      if (descendentCurrent) {
        linkAttrs += ' data-descendent-current="true"'
      }

      output.html += `<a href="${link}" data-depth="${depth}"${linkClasses}${linkAttrs}>`

      args.filterBeforeLinkText(args, item, output)

      output.html += title

      args.filterAfterLinkText(args, item, output)

      output.html += '</a>'

      args.filterAfterLink(args, item, output)

      if (children.length) {
        this._recurseOutput(children, output, depth, args)
      }

      output.html += '</li>'

      args.filterAfterItem(args, item, output)
    })

    output.html += '</ul>'
  }

  /**
   * Public methods
   */

  /* Return navigation html output */

  getOutput (location = '', current = '', args = {}) {
    if (!this._navsByLocation?.[location]) {
      return ''
    }

    const items = this._navsByLocation[location].items
    const normalizedItems = this._getItems(items, current)

    args = Object.assign({
      listClass: '',
      listAttr: '',
      itemClass: '',
      itemAttr: '',
      linkClass: '',
      linkAttr: '',
      filterBeforeItem: () => {},
      filterAfterItem: () => {},
      filterBeforeLink: () => {},
      filterAfterLink: () => {},
      filterBeforeLinkText: () => {},
      filterAfterLinkText: () => {}
    }, args)

    const output = {
      html: ''
    }

    this._recurseOutput(normalizedItems, output, -1, args)

    return output.html
  }

  /* Return breadcrumbs html output */

  getBreadcrumbs (items = [], current = '', args = {}) {
    /* Items required */

    if (!items.length) {
      return ''
    }

    /* Args defaults */

    args = Object.assign({
      listClass: '',
      listAttr: '',
      itemClass: '',
      itemAttr: '',
      linkClass: '',
      linkAttr: '',
      currentClass: '',
      a11yClass: 'a11y-visually-hidden',
      filterBeforeLink: () => {},
      filterAfterLink: () => {}
    }, args)

    /* List attributes */

    const listClasses = args.listClass ? ` class="${args.listClass}"` : ''
    const listAttrs = args.listAttr ? ` ${args.listAttr}` : ''

    /* Loop through items */

    const itemClasses = args.itemClass ? ` class="${args.itemClass}"` : ''
    const itemAttrs = args.itemAttr ? ` ${args.itemAttr}` : ''
    const lastItemIndex = items.length - 1

    items = items.map((item, index) => {
      const output = { html: '' }
      const isLastLevel = lastItemIndex === index

      /* Item */

      output.html += `<li${itemClasses}${itemAttrs} data-last-level="${isLastLevel.toString()}">`

      /* Link */

      args.filterBeforeLink(output, isLastLevel)

      const linkClasses = args.linkClass ? ` class="${args.linkClass}"` : ''
      const linkAttrs = args.linkAttr ? ` ${args.linkAttr}` : ''

      output.html += `<a${linkClasses} href="${getPermalink(getSlug({ slug: item.slug }))}"${linkAttrs}>${item.title}</a>`

      args.filterAfterLink(output, isLastLevel)

      /* Close item */

      output.html += '</li>'

      return output.html
    })

    /* Output */

    const currentClasses = args.currentClass ? ` class="${args.currentClass}"` : ''

    return `
      <ol${listClasses}${listAttrs}>
        ${items.join('')}
        <li${itemClasses}${itemAttrs} data-current="true">
          <span${currentClasses}>${current}<span class="${args.a11yClass}"> (current page)</span></span>
        </li>
      </ol>
    `
  }
} // End Navigation

/* Exports */

module.exports = Navigation
