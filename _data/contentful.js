/**
 * Contentful data
 */

/* Config */

const contentful = require('contentful')

const config = {
  space: process.env.CTFL_SPACE_ID,
  accessToken: process.env.CTFL_CPA_TOKEN,
  host: 'preview.contentful.com'
}

if (process.env.NODE_ENV === 'production') {
  config.accessToken = process.env.CTFL_CDA_TOKEN
  config.host = 'cdn.contentful.com'
}

const client = contentful.createClient({
  space: config.space,
  accessToken: config.accessToken,
  host: config.host
})

/* Meta data */

const meta = {
  page: {
    slugBase: '/'
  },
  project: {
    slugBase: '/projects/'
  },
  track: {
    slugBase: '/tracks/'
  },
  projectType: {
    slugBase: '/projects/types/'
  },
  genre: {
    slugBase: '/tracks/genres/'
  }
}

const navigationItems = {}

const navigations = {
  Main: false,
  Footer: false,
  Social: false
}

const getSlug = (contentType = 'page', slug = '') => {
  const slugBase = meta[contentType].slugBase

  return slugBase + slug
}

const getNavigationItems = (items = []) => {
  if (!items.length) {
    return []
  }

  return items.map(item => {
    return navigationItems[item.fields.entry.sys.id]
  })
}

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

      recurseNavigationItemChildren(fields.children, children)

      props.children = children
    }

    obj[entryId] = props
  })
}

const recurseNavigationItemChildren = (children = [], store = []) => {
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

      recurseNavigationItemChildren(child.fields.children, newStore)

      props.children = newStore
    }

    store.push(props)
  })
}

const setNavigations = (navs = [], obj = {}) => {
  if (!navs.length) {
    return
  }

  navs.forEach(nav => {
    const navFields = Object.assign({
      title: '',
      location: '',
      items: []
    }, nav.fields)

    obj[navFields.location] = {
      title: navFields.title,
      items: getNavigationItems(navFields.items)
    }
  })
}

/* Get content */

module.exports = async () => {
  try {
    const content = {}
    const data = []

    content.page = await client.getEntries({
      content_type: 'page'
    })

    content.project = await client.getEntries({
      content_type: 'project'
    })

    content.track = await client.getEntries({
      content_type: 'track'
    })

    content.projectType = await client.getEntries({
      content_type: 'projectType'
    })

    content.genre = await client.getEntries({
      content_type: 'genre'
    })

    for (const contentType in content) {
      content[contentType].items.forEach(item => {
        const itemFields = Object.assign({
          title: '',
          slug: '',
          featuredMedia: false,
          heroType: 'minimal',
          type: false,
          project: false,
          genre: false,
          audio: false,
          sections: []
        }, item.fields)

        itemFields.slug = getSlug(contentType, itemFields.slug)

        if (itemFields.sections.length) {
          itemFields.sections = itemFields.sections.map(section => {
            return Object.assign({
              internalTitle: '',
              alignment: 'Top',
              justification: 'Left',
              gap: 'None',
              paddingTop: 'None',
              paddingBottom: 'None',
              column: []
            }, section.fields)
          })
        }

        data.push(itemFields)
      })
    }

    const navigationItem = await client.getEntries({
      content_type: 'navigationItem'
    })

    setNavigationItems(navigationItem.items, navigationItems)

    const navigation = await client.getEntries({
      content_type: 'navigation'
    })

    setNavigations(navigation.items, navigations)

    return data
  } catch (error) {
    console.log(error.message)
  }
}
