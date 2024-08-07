/**
 * Render
 */

/* Imports */

const { enumNamespace, enumOptions, enumContentTypes } = require('../vars/enums')
const { getAllContentfulData, getSlug, getPermalink, getDurationReverse, getCommaLinks } = require('../utils')
const { slugData, envData, navData, archiveData, scriptData, jsonFileData } = require('../vars/data')
const slugParentsJson = require('../json/slug-parents.json')
const archiveIdsJson = require('../json/archive-ids.json')
const navDataJson = require('../json/nav-data.json')
const singleContent = require('./single-content')
const termContent = require('./term-content')
const layout = require('./layout')
const header = require('./header')
const breadcrumbs = require('./breadcrumbs')
const footer = require('./footer')
const button = require('./button')
const column = require('./column')
const container = require('./container')
const content = require('./content')
const richText = require('./rich-text')
const field = require('./field')
const form = require('./form')
const image = require('./image')
const posts = require('./posts')
const testimonial = require('./testimonial')
const navigations = require('./navigations')
const hero = require('./hero')
const gradients = require('./gradients')
const audio = require('./audio')
const httpError = require('./http-error')
const { card } = require('./cards')

/**
 * Store slug data for json
 *
 * @type {object}
 */

const _slugs = {}

/**
 * Function - recurse and output nested content
 *
 * @private
 * @param {object} args {
 *  @prop {array<object>} contentData
 *  @prop {object} output
 *  @prop {array<object>} parents
 *  @prop {object} pageData
 *  @prop {object} contains
 *  @prop {object} serverlessData
 *  @prop {function} getContentfulData
 *  @prop {object} navs
 * }
 * @return {void}
 */

const _renderContent = async ({
  contentData = [],
  output = {},
  parents = [],
  pageData = {},
  contains = {},
  serverlessData,
  getContentfulData,
  navs
}) => {
  if (Array.isArray(contentData) && contentData.length) {
    for (let i = 0; i < contentData.length; i++) {
      let c = contentData[i]

      /* Check for embedded entries and rich text */

      const richTextNode = c?.nodeType || false

      if (richTextNode) {
        if (c.nodeType === 'embedded-entry-block') {
          c = c.data.target
        } else {
          output.html += richText({
            type: richTextNode,
            content: c.content,
            parents
          })
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
      const renderType = type ? enumContentTypes[type] : ''

      let renderObj = {
        start: '',
        end: ''
      }

      switch (renderType) {
        case 'card':
          renderObj = card({ args: fields, parents })
          break
        case 'column':
          renderObj = column({ args: fields, parents })
          break
        case 'container':
          renderObj = container({ args: fields, parents })
          break
        case 'content':
          renderObj = content({ args: fields, parents })
          break
        case 'form':
          renderObj = form({ args: fields, parents, id: c.sys.id })
          break
        case 'field':
          renderObj.start = field({ args: fields, parents })
          break
        case 'image':
          renderObj.start = image({ args: fields, parents })
          break
        case 'posts': {
          if (fields?.contentType === 'Track') {
            contains.audio = true
          }

          renderObj.start = await posts({
            args: fields,
            parents,
            pageData,
            serverlessData,
            getContentfulData
          })

          break
        }
        case 'testimonial':
          renderObj.start = testimonial({ args: fields, parents })
          break
        case 'button':
          renderObj.start = button({ args: fields, parents })
          break
        case 'navigation': {
          const loc = fields.location.toLowerCase().replace(/ /g, '')

          let nav = navs?.[loc] ? navs[loc] : ''

          if (loc === 'social') {
            nav = nav.left
          }

          renderObj.start = `<nav aria-label="${fields.title}">${nav}</nav>`
          break
        }
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

        await _renderContent({
          contentData: children,
          output,
          parents: parentsCopy,
          pageData,
          contains,
          serverlessData,
          getContentfulData,
          navs
        })
      }

      output.html += end

      /* Clear parents */

      if (renderType && renderType !== 'content' && end) {
        parents = []
      }
    }
  }
}

/**
 * Function - output single post or page
 *
 * @private
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} contentType
 *  @prop {object} serverlessData
 *  @prop {function} getContentfulData
 * }
 * @return {object}
 */

const _renderItem = async ({
  item = {},
  contentType = 'page',
  serverlessData,
  getContentfulData
}) => {
  /* Serverless render check */

  let serverlessRender = false

  /* Item id */

  const id = item.sys.id

  /* Add posts for terms - project type and genre */

  termContent({ item, contentType })

  /* Item fields */

  const fields = Object.assign({
    title: '',
    slug: '',
    pagination: false,
    heroTitle: '',
    heroImage: false,
    heroText: '',
    content: [],
    colorFrom: '',
    metaTitle: '',
    metaDescription: '',
    metaImage: false,
    audio: false,
    audioDuration: ''
  }, item.fields)

  /* Store if contains components like audio  */

  const contains = {}

  /* Meta */

  const title = fields.title

  const meta = {
    title: fields.metaTitle || title,
    description: fields.metaDescription,
    image: fields.metaImage
  }

  /* Permalink */

  const slugArgs = {
    id,
    contentType,
    slug: fields.slug,
    returnParents: true
  }

  const s = getSlug(slugArgs)

  const slug = s.slug
  const permalink = getPermalink(s.slug)

  meta.canonical = permalink

  item.fields.basePermalink = getPermalink(
    getSlug({
      id,
      contentType,
      slug: fields.slug
    })
  )

  /* Add to data by slugs store */

  _slugs[slug ? `/${slug}/` : '/'] = {
    contentType,
    id
  }

  /* Check if index */

  const index = fields.slug === 'index'

  meta.isIndex = index

  /* Gradient from and to */

  let gradientFrom = fields.colorFrom ? fields.colorFrom.value : ''

  /* Set single track data for front end */

  if (contentType === 'track' && fields.audio && fields.audioDuration && !serverlessData) {
    contains.audio = true

    if (fields?.project) {
      const trackProject = fields.project[0]

      if (trackProject?.fields?.colorFrom?.value) {
        gradientFrom = trackProject.fields.colorFrom.value
      }
    }

    if (!scriptData?.tracks) {
      scriptData.tracks = []
    }

    if (fields.audio?.fields?.file) {
      scriptData.tracks.push({
        id,
        title,
        permalink,
        item: null,
        button: null,
        url: `https:${fields.audio.fields.file.url}`,
        type: fields.audio.fields.file.contentType,
        duration: getDurationReverse(fields.audioDuration)
      })
    }
  }

  /* Navigations */

  const navs = navigations({
    navs: navData.navs,
    items: navData.items,
    current: permalink,
    title,
    parents: s.parents
  })

  /* Hero */

  const heroProjectTypes = item?.fields?.projectType ? item.fields.projectType : []

  const heroOutput = hero({
    id,
    contentType,
    index,
    title: fields.heroTitle || fields.title,
    text: contentType === 'project' ? getCommaLinks(heroProjectTypes, 'projectType') : fields.heroText,
    image: fields.heroImage ? fields.heroImage : false,
    breadcrumbs: navs.breadcrumbs || false
  })

  /* Main output */

  let output = ''

  /* Content loop */

  const contentOutput = { html: '' }

  let contentData = fields.content

  if (contentData?.nodeType) {
    contentData = contentData.content
  }

  let itemServerlessData = false

  if (serverlessData) {
    if (serverlessData?.path && serverlessData?.query) {
      if (serverlessData.path === (slug ? `/${slug}/` : '/')) {
        itemServerlessData = serverlessData
      } else { // Avoid re-rendering non dynamic pages
        return {
          serverlessRender: false,
          data: false
        }
      }
    }
  }

  if (Array.isArray(contentData) && contentData.length) {
    await _renderContent({
      contentData,
      serverlessData: itemServerlessData,
      getContentfulData,
      output: contentOutput,
      parents: [],
      pageData: item,
      contains,
      navs
    })
  }

  await singleContent({
    item,
    contentType,
    getContentfulData,
    output: contentOutput,
    contains
  })

  output += contentOutput.html

  /* Prev next pagination - end for pagination update from posts */

  if (item?.fields?.pagination) {
    serverlessRender = true

    const pagination = item.fields.pagination

    slugArgs.page = pagination.current > 1 ? pagination.current : 0

    const c = getSlug(slugArgs)

    meta.canonical = getPermalink(c.slug, pagination.current === 1) + pagination.currentFilters

    if (pagination?.prev) {
      slugArgs.page = pagination.prev > 1 ? pagination.prev : 0

      const p = getSlug(slugArgs)

      meta.prev = getPermalink(p.slug, pagination.prev === 1) + pagination.prevFilters
    }

    if (pagination?.next) {
      if (pagination.next > 1) {
        slugArgs.page = pagination.next

        const n = getSlug(slugArgs)

        meta.next = getPermalink(n.slug, false) + pagination.nextFilters
      }
    }

    meta.title = item.fields.metaTitle
  }

  /* Script data */

  let script = ''

  if (Object.keys(scriptData).length) {
    const scriptJSON = JSON.stringify(scriptData, null, null)

    script = `
      <script>
        var namespace = '${enumNamespace}';
        var ${enumNamespace} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  Object.keys(scriptData).forEach(k => delete scriptData[k])

  /* Output */

  return {
    serverlessRender,
    data: {
      slug: slug ? `/${slug}/` : '/',
      output: layout({
        meta,
        gradients: gradients({
          from: gradientFrom
        }),
        content: `
          ${header(navs)}
          ${breadcrumbs(navs)}
          <main id="main">
            ${heroOutput}
            ${index ? '<div id="main-content">' : ''}
            ${output}
            ${index ? '</div>' : ''}
          </main>
          ${footer(navs)}
          ${contains?.audio ? audio() : ''}
        `,
        script
      })
    }
  }
}

/**
 * Function - loop through all content types to output pages and posts
 *
 * @param {object} args {
 *  @prop {object} serverlessData
 *  @prop {object} previewData
 *  @prop {object} env
 *  @prop {function} onRenderEnd
 *  @prop {function} getContentfulData
 * }
 * @return {array|object}
 */

const render = async ({
  serverlessData,
  previewData,
  env,
  onRenderEnd,
  getContentfulData
}) => {
  /* Serverless data */

  serverlessData = serverlessData?.query && serverlessData?.path ? serverlessData : false

  if (env) {
    envData.dev = env.dev
    envData.prod = env.prod
    envData.ctfl = env.ctfl
  }

  /* Contentful data */

  const contentfulData = await getAllContentfulData(serverlessData, previewData, getContentfulData)

  if (!contentfulData) {
    return [{
      slug: '',
      output: ''
    }]
  }

  const {
    content = {},
    navs = [],
    navItems = [],
    redirects = []
  } = contentfulData

  /* Store navigations and items */

  navData.navs = navs
  navData.items = navItems

  /* Store content data */

  const data = []

  /* Store routes for render end */

  const serverlessRoutes = []

  /* Loop through pages first to set parent slugs and tracks for durations */

  if (!serverlessData) {
    content.page.forEach(item => {
      let {
        parent = false,
        archive = 'None'
      } = item.fields

      archive = enumOptions.posts.contentType[archive]

      if (archive) {
        archiveData.ids[archive] = item.sys.id

        if (slugData.bases?.[archive]) {
          slugData.bases[archive].archiveId = item.sys.id
        }
      }

      if (parent) {
        if (parent.fields?.slug && parent.fields?.title) {
          slugData.parents[item.sys.id] = {
            id: parent.sys.id,
            slug: parent.fields.slug,
            title: parent.fields.title,
            contentType: 'page'
          }
        }
      }
    })
  } else {
    if (slugParentsJson) {
      Object.keys(slugParentsJson).forEach((s) => {
        slugData.parents[s] = slugParentsJson[s]
      })
    }

    if (archiveIdsJson) {
      Object.keys(archiveIdsJson).forEach((a) => {
        if (slugData.bases?.[a]) {
          slugData.bases[a].archiveId = archiveIdsJson[a]
        }
      })
    }

    if (navDataJson) {
      navData.navs = navDataJson.navs
      navData.items = navDataJson.items
    }
  }

  /* 404 page */

  if (!serverlessData && !previewData) {
    data.push({
      slug: '404.html',
      output: httpError('404')
    })
  }

  /* Loop through all content types */

  const contentTypes = Object.keys(content)

  for (let c = 0; c < contentTypes.length; c++) {
    const contentType = contentTypes[c]

    for (let i = 0; i < content[contentType].length; i++) {
      const item = await _renderItem({
        item: content[contentType][i],
        contentType,
        serverlessData,
        getContentfulData
      })

      const {
        serverlessRender = false,
        data: itemData
      } = item

      if (itemData) {
        data.push(itemData)

        if (serverlessRender && !serverlessData) {
          serverlessRoutes.push(itemData.slug)
        }
      }
    }
  }

  /* Render end callback */

  if (onRenderEnd) {
    let jsonData = false

    if (!serverlessData) {
      jsonFileData.slugs.data = _slugs
      jsonFileData.slugParents.data = slugData.parents
      jsonFileData.archiveIds.data = archiveData.ids
      jsonFileData.archiveCounts.data = archiveData.counts
      jsonFileData.navData.data = navData

      jsonData = jsonFileData
    }

    onRenderEnd({
      jsonData,
      serverlessRoutes,
      redirects
    })
  }

  /* Output */

  if (serverlessData || previewData) {
    return data[0]
  }

  return data
}

/* Exports */

module.exports = render
