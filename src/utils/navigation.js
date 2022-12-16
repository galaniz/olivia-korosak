/**
 * Get and set navigation items and navigations
 */

/* Imports */

const { getSlug, getPermalink } = require('./base')

/* Default output options */

const outputArgs = {}

const outputDefaultArgs = {
  navWrap: true,
  navClass: '',
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
}

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

const setNavigations = (navs = [], obj = {}, itemsObj = {}) => {
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
    const items = _getNavigationItems(navFields.items, itemsObj)
    const output = _getNavigationOutput(title, location, items)

    obj[location] = {
      title,
      items,
      output
    }
  })
}

/* Return navigation items by id */

const _getNavigationItems = (items = [], itemsObj = {}) => {
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

  args = Object.assign(outputDefaultArgs, args)

  const { navWrap, navClass, navAttr } = args

  const output = {
    string: ''
  }

  _recurseNavigationOutput(items, output, -1, args)

  if (navWrap) {
    const navClasses = navClass ? ` class="${navClass}"` : ''
    const navAttrs = navAttr ? ` ${navAttr}` : ''

    output.string = `<nav aria-label="${title}"${navClasses}${navAttrs}>${output.string}</nav>`
  }

  return output.string
}

/* Loop through items to create navigation html */

const _recurseNavigationOutput = (items = [], output = {}, depth = -1, args = {}) => {
  depth += 1

  const listClasses = args.listClass ? ` class="${args.listClass}"` : ''
  const listAttrs = args.listAttr ? ` ${args.listAttr}` : ''

  output.string += `<ul data-depth="${depth}"${listClasses}${listAttrs}>`

  items.forEach(item => {
    const {
      title = '',
      link = '',
      external = false,
      children = []
    } = item

    args.filterBeforeItem(args, output)

    const itemClasses = args.itemClass ? ` class="${args.itemClass}"` : ''
    const itemAttrs = args.itemAttr ? ` ${args.itemAttr}` : ''

    output.string += `<li data-depth="${depth}"${itemClasses}${itemAttrs}>`

    args.filterBeforeLink(args, output)

    const linkClasses = args.linkClass ? ` class="${args.linkClass}"` : ''
    let linkAttrs = args.linkAttr ? ` ${args.linkAttr}` : ''

    if (external) {
      linkAttrs += ' target="_blank" rel="noreferrer"'
    }

    output.string += `<a href="${link}" data-depth="${depth}"${linkClasses}${linkAttrs}>`

    args.filterBeforeLinkText(args, output)

    output.string += title

    args.filterAfterLinkText(args, output)

    output.string += '</a>'

    args.filterAfterLink(args, output)

    if (children.length) {
      _recurseNavigationOutput(children, output, depth, args)
    }

    output.string += '</li>'

    args.filterAfterItem(args, output)
  })

  output.string += '</ul>'
}

/* Exports */

module.exports = {
  outputArgs,
  setNavigationItems,
  setNavigations
}
