/**
 * Set data for output
 */

/* Imports */

const button = require('../render/button')
const card = require('../render/card')
const column = require('../render/column')
const container = require('../render/container')
const content = require('../render/content')
const richText = require('../render/rich-text')
const field = require('../render/field')
const form = require('../render/form')
const image = require('../render/image')
const posts = require('../render/posts')
const testimonial = require('../render/testimonial')
const navigations = require('../render/navigations')
const hero = require('../render/hero')
const gradients = require('../render/gradients')
const { getSlug, getPermalink } = require('./functions')
const { contentTypes, slugParents } = require('./constants')

/* Navigations params */

const _nav = {
  navs: [],
  items: []
}

/* Store pagination page data */

let _paginationPages = []

/* Recurse and render nested content */

const _getContent = async (cc = [], output = {}, parents = [], pageData = {}) => {
  if (Array.isArray(cc) && cc.length) {
    for (let i = 0; i < cc.length; i++) {
      let c = cc[i]

      /* Check for embedded entries and rich text */

      const richTextNode = c?.nodeType || false

      if (richTextNode) {
        if (c.nodeType === 'embedded-entry-block') {
          c = c.data.target
        } else {
          output.html += richText(richTextNode, c.content, parents)
        }
      }

      /* Check for nested content */

      let children = c?.fields?.content || []
      let recurse = false

      if (children) {
        if (Array.isArray(children)) {
          if (children.length) {
            recurse = true
          }
        } else {
          if (children?.nodeType) {
            children = children.content

            if (children.length) {
              recurse = true
            }
          }
        }
      }

      /* Render and recursion */

      const fields = c?.fields || {}
      const type = c?.sys?.contentType?.sys?.id || ''
      const renderType = type ? contentTypes[type] : ''

      let renderObj = {
        start: '',
        end: ''
      }

      switch (renderType) {
        case 'card':
          renderObj = card(fields, parents)
          break
        case 'column':
          renderObj = column(fields, parents)
          break
        case 'container':
          renderObj = container(fields, parents)
          break
        case 'content':
          renderObj = content(fields, parents)
          break
        case 'form':
          renderObj = form(fields, parents)
          break
        case 'field':
          renderObj.start = field(fields, parents)
          break
        case 'image':
          renderObj.start = image(fields, parents)
          break
        case 'posts': {
          const p = await posts(fields, parents, pageData)

          renderObj.start = p.output

          if (p.pages) {
            _paginationPages = _paginationPages.concat(p.pages)
          }

          break
        }
        case 'testimonial':
          renderObj.start = testimonial(fields, parents)
          break
        case 'button':
          renderObj.start = button(fields, parents)
          break
      }

      const start = renderObj.start
      const end = renderObj.end

      output.html += start

      if (children && recurse) {
        const parentsCopy = [...parents]

        parentsCopy.unshift({
          type: renderType,
          fields
        })

        await _getContent(
          children,
          output,
          parentsCopy,
          pageData
        )
      }

      output.html += end

      /* Clear parents */

      if (renderType && renderType !== 'content' && end) {
        parents = []
      }
    }
  }
}

/* Set content item fields */

const _setItem = async (item = {}, contentType = 'page') => {
  /* Item data */

  const data = {}

  /* Item fields */

  const fields = Object.assign({
    title: '',
    slug: '',
    pagination: false,
    parent: false,
    heroTitle: '',
    heroImage: false,
    heroText: '',
    content: [],
    colorFrom: '',
    colorTo: '',
    metaTitle: '',
    metaDescription: '',
    metaImage: false
  }, item.fields)

  /* Meta */

  data.title = fields.title
  data.parent = fields.parent

  data.meta = {
    title: fields.metaTitle || data.title,
    description: fields.metaDescription,
    image: fields.metaImage
  }

  /* Gradient colors */

  data.gradients = gradients({
    from: fields.colorFrom ? fields.colorFrom.value : '',
    to: fields.colorTo ? fields.colorTo.value : ''
  })

  /* Permalink */

  const slugArgs = {
    contentType,
    slug: fields.slug,
    returnParents: true
  }

  if (fields.pagination) {
    slugArgs.page = fields.pagination.current > 1 ? fields.pagination.current : 0
  }

  const s = getSlug(slugArgs)

  data.slug = s.slug
  data.permalink = getPermalink(s.slug)

  item.fields.basePermalink = getPermalink(
    getSlug({
      contentType,
      slug: fields.slug
    })
  )

  /* Navigations */

  data.navigations = navigations({
    navs: _nav.navs,
    items: _nav.items,
    current: data.permalink,
    title: data.title,
    parents: s.parents
  })

  /* Content */

  data.content = ''

  /* Hero */

  data.content += hero({
    title: fields.heroTitle || fields.title,
    text: fields.heroText,
    image: fields.heroImage ? fields.heroImage.fields.file : false,
    index: fields.slug !== '',
    breadcrumbs: data.navigations.breadcrumbs || false
  })

  /* Content */

  const contentOutput = { html: '' }

  let contentData = fields.content

  if (contentData?.nodeType) {
    contentData = contentData.content
  }

  if (Array.isArray(contentData) && contentData.length) {
    await _getContent(
      contentData,
      contentOutput,
      [],
      item
    )
  }

  data.content += contentOutput.html

  /* Prev next pagination - end for pagination update from posts */

  if (item?.fields?.pagination) {
    const pagination = item.fields.pagination

    if (pagination?.prev) {
      slugArgs.page = pagination.prev > 1 ? pagination.prev : 0

      const p = getSlug(slugArgs)

      data.prev = getPermalink(p.slug)
    }

    if (pagination?.next) {
      if (pagination.next > 1) {
        slugArgs.page = pagination.next

        const n = getSlug(slugArgs)

        data.next = getPermalink(n.slug)
      }
    }
  }

  /* Output */

  return data
}

/* Set content and navigation output */

const setData = async ({ content = {}, navs = [], navItems = [] }) => {
  /* Store navigations and items */

  _nav.navs = navs
  _nav.items = navItems

  /* Store content data */

  const data = []

  /* Loop through pages first to set parent slugs */

  content.page.forEach(item => {
    const {
      slug = '',
      parent = false
    } = item.fields

    if (parent) {
      slugParents[slug] = {
        slug: parent.fields.slug,
        title: parent.fields.title
      }
    }
  })

  /* Loop through all content types */

  for (const contentType in content) {
    for (let i = 0; i < content[contentType].length; i++) {
      const item = content[contentType][i]

      data.push(await _setItem(item, contentType))
    }
  }

  /* Pagination pages */

  if (_paginationPages.length) {
    for (let i = 0; i < _paginationPages.length; i++) {
      data.push(await _setItem(_paginationPages[i]))
    }
  }

  /* Output */

  return data
}

/* Exports */

module.exports = setData
