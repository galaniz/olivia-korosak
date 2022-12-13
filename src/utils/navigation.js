/**
 * Get and set navigation items and navigations
 */

/* Imports */

const { getSlug, getPermalink } = require('./base')

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
    const items = _getNavigationItems(navFields.items, itemsObj)
    const output = _getNavigationOutput(title, items)

    obj[navFields.location.toLowerCase()] = {
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

const _getNavigationOutput = (title = '', items = []) => {
  if (!title || !items.length) {
    return ''
  }

  const output = []

  _recurseNavigationOutput(items, output)

  return `<nav aria-label="${title}">${output.join('')}</nav>`
}

/* Loop through items to create navigation html */

const _recurseNavigationOutput = (items = [], output = [], depth = -1) => {
  depth += 1

  output.push(`<ul data-depth="${depth}">`)

  items.forEach(item => {
    const {
      title = '',
      link = '',
      external = false,
      children = []
    } = item

    let attr = ''

    if (external) {
      attr = ' target="_blank" rel="noreferrer"'
    }

    output.push(`
      <li data-depth="${depth}">
        <a href="${link}" data-depth="${depth}"${attr}>${title}</a>
    `)

    if (children.length) {
      _recurseNavigationOutput(children, output, depth)
    }

    output.push('</li>')
  })

  output.push('</ul>')
}

/* Exports */

module.exports = {
  setNavigationItems,
  setNavigations
}
