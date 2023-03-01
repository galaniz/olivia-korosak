/**
 * Render - navigation
 */

/* Imports */

const { getSlug, getPermalink, getLink } = require('../utils')

/**
 * Class - recursively generate navigation output
 */

class Navigation {
  /**
   * Set public properties and initialize
   *
   * @param {object} args {
   *  @prop {array<object>} navs
   *  @prop {array<object>} items
   * }
   * @return {void|boolean} - False if init errors
   */

  constructor (args) {
    const {
      navs = [],
      items = []
    } = args

    this.navs = navs
    this.items = items

    /**
     * Store items by od
     *
     * @private
     * @type {object}
     */

    this._itemsById = {}

    /**
     * Store navs by location
     *
     * @private
     * @type {object}
     */

    this._navsByLocation = {}

    /* Initialize */

    const init = this._initialize()

    if (!init) {
      return false
    } else {
      return true
    }
  }

  /**
   * Initialize - check required props and set internal props
   *
   * @private
   * @return {boolean}
   */

  _initialize () {
    /* Check that required items exist */

    if (!this.navs || !this.items) {
      return false
    }

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
   * Normalize navigation item props
   *
   * @private
   * @param {object} item
   * @return {object}
   */

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

  /**
   * Loop through items to check and set children
   *
   * @private
   * @param {array<object>} children
   * @param {array<object>} store
   * @return {void}
   */

  _recurseItemChildren (children = [], store = []) {
    children.forEach(child => {
      const info = this._getItemInfo(child)

      store.push(info.props)
    })
  }

  /**
   * Return navigation items by id
   *
   * @private
   * @param {array<object>} items
   * @param {string} current
   * @return {array<object>}
   */

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

  /**
   * Loop through items to create html
   *
   * @private
   * @param {array<object>} items
   * @param {object} output
   * @param {number} depth
   * @param {object} args
   * @return {void}
   */

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

      /* Item start */

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

      /* Link start */

      args.filterBeforeLink(args, item, output)

      let linkClasses = []

      if (args.linkClass) {
        linkClasses.push(args.linkClass)
      }

      if (!external && args.internalLinkClass) {
        linkClasses.push(args.internalLinkClass)
      }

      linkClasses = linkClasses.length ? ` class="${linkClasses.join(' ')}"` : ''

      let linkAttrs = args.linkAttr ? ` ${args.linkAttr}` : ''

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

      /* Link end */

      output.html += '</a>'

      args.filterAfterLink(args, item, output)

      /* Nested content */

      if (children.length) {
        this._recurseOutput(children, output, depth, args)
      }

      /* Item end */

      output.html += '</li>'

      args.filterAfterItem(args, item, output)
    })

    output.html += '</ul>'
  }

  /**
   * Return navigation html output
   *
   * @param {string} location
   * @param {string} current
   * @param {object} args
   * @return {string} HTML - ul
   */

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
      internalLinkClass: '',
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

  /**
   * Return breadcrumbs html output
   *
   * @param {array<object>} items
   * @param {string} current
   * @param {object} args
   * @return {string} HTML - ol
   */

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
      internalLinkClass: '',
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

      let linkClasses = []

      if (args.linkClass) {
        linkClasses.push(args.linkClass)
      }

      if (args.internalLinkClass) {
        linkClasses.push(args.internalLinkClass)
      }

      linkClasses = linkClasses.length ? ` class="${linkClasses.join(' ')}"` : ''

      const linkAttrs = args.linkAttr ? ` ${args.linkAttr}` : ''

      const permalink = getPermalink(
        getSlug({
          id: item.id,
          slug: item.slug,
          contentType: item.contentType
        })
      )

      output.html += `<a${linkClasses} href="${permalink}"${linkAttrs}>${item.title}</a>`

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
}

/* Exports */

module.exports = Navigation
