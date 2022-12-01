/**
 * Get and set navigation items and navigations
 */

/* Imports */

const { getSlug, getPermalink } = require('./base')

/* Set object with navigation items */

const setNavigationItems = (items = [], obj = {}) => {
  if (!items.length) {
    return
  }

  items.forEach(item => {
    let fields = item.fields

    fields = Object.assign({
      title: '',
      entry: false,
      children: false
    }, fields)

    if (!fields.entry) {
      return
    }

    const entry = fields.entry
    const entryId = entry.sys.id
    const entryContentType = entry.sys.contentType.sys.id
    const entryFields = Object.assign({ slug: '' }, entry.fields)

    const props = {
      id: entryId,
      title: fields.title,
      slug: getSlug(entryContentType, entryFields.slug)
    }

    if (fields.children) {
      const children = []

      _recurseNavigationItemChildren(fields.children, children)

      props.children = children
    }

    obj[entryId] = props
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
    return itemsObj[item.fields.entry.sys.id]
  })
}

/* Loop through navigation items to check and set children */

const _recurseNavigationItemChildren = (children = [], store = []) => {
  children.forEach(child => {
    const childEntry = child.fields.entry
    const childEntryContentType = childEntry.sys.contentType.sys.id
    const childEntryFields = Object.assign({ slug: '' }, childEntry.fields)

    const props = {
      id: childEntry.sys.id,
      title: child.fields.title,
      slug: getSlug(childEntryContentType, childEntryFields.slug)
    }

    if (Object.getOwnPropertyDescriptor(child.fields, 'children')) {
      const newStore = []

      _recurseNavigationItemChildren(child.fields.children, newStore)

      props.children = newStore
    }

    store.push(props)
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
      slug = '',
      children = []
    } = item

    output.push(`
      <li data-depth="${depth}">
        <a href="${getPermalink(slug)}" data-depth="${depth}">${title}</a>
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
