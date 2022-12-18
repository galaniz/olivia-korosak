/**
 * Get and set navigation items and navigations
 */

/* Imports */

const { getSlug, getPermalink } = require('./base')

/* Output options */

const outputArgs = {}

/* Normalize navigation item props */

const _getItemInfo = (item) => {
  const fields = item.fields

  const {
    title = '',
    internalLink = '',
    externalLink = '',
    children = false
  } = fields

  let id = ''
  let link = ''
  let external = false

  if (externalLink) {
    id = externalLink
    link = externalLink
    external = true
  } else {
    id = internalLink.sys.id

    const contentType = internalLink.sys.contentType.sys.id
    const internalFields = Object.assign({ slug: '' }, internalLink.fields)

    link = getPermalink(getSlug(contentType, internalFields.slug))
  }

  const props = {
    id,
    title,
    link,
    external
  }

  if (children) {
    const c = []

    _recurseNavigationItemChildren(children, c)

    props.children = c
  }

  return {
    id,
    props
  }
}

/* Set object with navigation items */

const setNavigationItems = (items = [], obj = {}) => {
  if (!items.length) {
    return
  }

  items.forEach(item => {
    const info = _getItemInfo(item)

    obj[info.id] = info.props
  })
}

/* Set object with navigations including output */

const setNavigations = (navs = [], obj = {}, itemsObj = {}, current = '') => {
  if (!navs.length) {
    return
  }

  navs.forEach(nav => {
    const navFields = Object.assign({
      title: '',
      location: '',
      items: []
    }, nav.fields)

    const title = navFields.title
    const location = navFields.location.toLowerCase().replace(/ /g, '')
    const items = _getNavigationItems(navFields.items, itemsObj, current)
    const output = _getNavigationOutput(title, location, items)

    obj[location] = {
      title,
      items,
      output
    }
  })
}

/* Return navigation items by id */

const _getNavigationItems = (items = [], itemsObj = {}, current = '') => {
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

    const obj = itemsObj[f]

    obj.current = externalLink ? false : obj.link === current

    return itemsObj[f]
  })
}

/* Loop through navigation items to check and set children */

const _recurseNavigationItemChildren = (children = [], store = []) => {
  children.forEach(child => {
    const info = _getItemInfo(child)

    store.push(info.props)
  })
}

/* Return navigation html output */

const _getNavigationOutput = (title = '', location = '', items = []) => {
  if (!title || !items.length) {
    return ''
  }

  let args = {}

  if (Object.getOwnPropertyDescriptor(outputArgs, location)) {
    args = outputArgs[location]
  }

  args = Object.assign({
    navWrap: true,
    navClass: '',
    navLabel: '',
    navAttr: '',
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

  const { navWrap, navClass, navLabel, navAttr } = args

  const output = {
    html: ''
  }

  _recurseNavigationOutput(items, output, -1, args)

  if (navWrap) {
    const navClasses = navClass ? ` class="${navClass}"` : ''
    const navAttrs = navAttr ? ` ${navAttr}` : ''

    output.html = `<nav aria-label="${navLabel || title}"${navClasses}${navAttrs}>${output.html}</nav>`
  }

  return output.html
}

/* Loop through items to create navigation html */

const _recurseNavigationOutput = (items = [], output = {}, depth = -1, args = {}) => {
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
      current = false
    } = item

    args.filterBeforeItem(args, item, output)

    const itemClasses = args.itemClass ? ` class="${args.itemClass}"` : ''
    let itemAttrs = args.itemAttr ? ` ${args.itemAttr}` : ''

    if (current) {
      itemAttrs += ' data-current="true"'
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

    output.html += `<a href="${link}" data-depth="${depth}"${linkClasses}${linkAttrs}>`

    args.filterBeforeLinkText(args, item, output)

    output.html += title

    args.filterAfterLinkText(args, item, output)

    output.html += '</a>'

    args.filterAfterLink(args, item, output)

    if (children.length) {
      _recurseNavigationOutput(children, output, depth, args)
    }

    output.html += '</li>'

    args.filterAfterItem(args, item, output)
  })

  output.html += '</ul>'
}

/* Exports */

module.exports = {
  outputArgs,
  setNavigationItems,
  setNavigations
}
