/**
 * Set data for output
 */

/* Imports */

const layout = require('../_render/layout')
const header = require('../_render/header')
const breadcrumbs = require('../_render/breadcrumbs')
const footer = require('../_render/footer')
const button = require('../_render/button')
const card = require('../_render/card')
const column = require('../_render/column')
const container = require('../_render/container')
const content = require('../_render/content')
const richText = require('../_render/rich-text')
const field = require('../_render/field')
const form = require('../_render/form')
const image = require('../_render/image')
const posts = require('../_render/posts')
const testimonial = require('../_render/testimonial')
const navigations = require('../_render/navigations')
const hero = require('../_render/hero')
const gradients = require('../_render/gradients')
const audio = require('../_render/audio')
const slugParentsJson = require('../_json/slug-parents.json')
const archiveIdsJson = require('../_json/archive-ids.json')
const { writeFile } = require('fs')
const { getSlug, getPermalink } = require('./functions')
const {
  contentTypes,
  slugParents,
  slugBases,
  optionValues,
  archiveIds,
  archiveCounts,
  termData,
  namespace,
  scriptData
} = require('./variables')

/* Navigations params */

const _nav = {
  navs: [],
  items: []
}

/* Store slug data for json */

const slugs = {}

/* Store audio durations for json */

const durations = {}

/* Store serverless object */

let _serverlessData = false

/* Get audio duration in seconds */

const _getAudioDuration = async (url) => {
  try {
    const ffprobe = require('ffprobe')
    const ffprobeStatic = require('ffprobe-static')
    const util = require('node:util')

    const ffprobePromise = util.promisify(ffprobe)
    const duration = await ffprobePromise(`https:${url}`, { path: ffprobeStatic.path })
    const seconds = Math.round(duration.streams[0].duration)

    return seconds
  } catch (error) {
    console.log('Error getting audio duration: ', error)

    return 0
  }
}

/* Recurse and render nested content */

const _getContent = async ({
  contentData = [],
  output = {},
  parents = [],
  pageData = {},
  contains = {},
  serverlessData,
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
          renderObj = form(fields, parents, c.sys.id)
          break
        case 'field':
          renderObj.start = field(fields, parents)
          break
        case 'image':
          renderObj.start = image(fields, parents)
          break
        case 'posts': {
          if (fields?.contentType === 'Track') {
            contains.audio = true
          }

          renderObj.start = await posts(fields, parents, pageData, serverlessData)
          break
        }
        case 'testimonial':
          renderObj.start = testimonial(fields, parents)
          break
        case 'button':
          renderObj.start = button(fields, parents)
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

        await _getContent({
          contentData: children,
          output,
          parents: parentsCopy,
          pageData,
          contains,
          serverlessData,
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

/* Set content item fields */

const _setItem = async ({ item = {}, contentType = 'page' }) => {
  /* Serverless render check */

  let serverlessRender = false

  /* Item id */

  const id = item.sys.id

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
    colorTo: '',
    metaTitle: '',
    metaDescription: '',
    metaImage: false,
    audio: false
  }, item.fields)

  /* Add posts for terms - project type and genre */

  if (contentType === 'projectType' || contentType === 'genre') {
    const postsContent = [
      {
        sys: {
          contentType: {
            sys: {
              id: 'section'
            }
          }
        },
        fields: {
          tag: 'Div',
          layout: 'Column',
          maxWidth: '1300px',
          paddingBottom: '80px',
          paddingBottomLarge: '120px',
          content: [
            {
              sys: {
                contentType: {
                  sys: {
                    id: 'posts'
                  }
                }
              },
              fields: {
                archiveType: fields.slug,
                contentType: termData[contentType].contentType,
                display: termData[contentType].display,
                headingLevel: 'Heading Two',
                pagination: true,
                filters: [
                  `fields.${termData[contentType].field}.sys.id:${item.sys.id}`
                ],
                include: termData[contentType].include
              }
            }
          ]
        }
      }
    ]

    item.fields.content = postsContent
    fields.content = postsContent
  }

  /* Get durations for audio */

  if (contentType === 'track' && audio && !_serverlessData) {
    const duration = await _getAudioDuration(fields.audio.fields.file.url)

    durations[fields.audio.sys.id] = duration
  }

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

  slugs[slug ? `/${slug}/` : '/'] = {
    contentType,
    id
  }

  /* Navigations */

  const navs = navigations({
    navs: _nav.navs,
    items: _nav.items,
    current: permalink,
    title: title,
    parents: s.parents
  })

  /* Content */

  let content = ''

  /* Hero */

  content += hero({
    title: fields.heroTitle || fields.title,
    text: fields.heroText,
    image: fields.heroImage ? fields.heroImage : false,
    index: fields.slug !== '',
    breadcrumbs: navs.breadcrumbs || false
  })

  /* Content */

  const contentOutput = { html: '' }
  const contains = {}

  let contentData = fields.content

  if (contentData?.nodeType) {
    contentData = contentData.content
  }

  let serverlessData = false

  if (_serverlessData) {
    if (_serverlessData?.path && _serverlessData?.query) {
      if (_serverlessData.path === (slug ? `/${slug}/` : '/')) {
        serverlessData = _serverlessData
      } else { // Avoid re-rendering non dynamic pages
        return {
          serverlessRender: false,
          data: false
        }
      }
    }
  }

  if (Array.isArray(contentData) && contentData.length) {
    await _getContent({
      contentData,
      output: contentOutput,
      parents: [],
      pageData: item,
      contains,
      serverlessData,
      navs
    })
  }

  content += contentOutput.html

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
        var namespace = '${namespace}';
        var ${namespace} = ${scriptJSON};
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
          from: fields.colorFrom ? fields.colorFrom.value : '',
          to: fields.colorTo ? fields.colorTo.value : ''
        }),
        content: `
          ${header(navs)}
          ${breadcrumbs(navs)}
          <main id="main">${content}</main>
          ${footer(navs)}
          ${contains?.audio ? audio() : ''}
        `,
        script
      })
    }
  }
}

/* Set content and navigation output */

const setData = async ({
  content = {},
  navs = [],
  navItems = [],
  serverlessData
}) => {
  /* Store serverless data */

  _serverlessData = serverlessData

  /* Store navigations and items */

  _nav.navs = navs
  _nav.items = navItems

  /* Store content data */

  const data = []

  /* Store toml file contents */

  let toml = 
`[functions]
node_bundler = "esbuild"
external_node_modules = ["@11ty/eleventy-fetch"]
`

  /* Loop through pages first to set parent slugs */

  if (!serverlessData) {
    content.page.forEach(item => {
      let {
        parent = false,
        archive = 'None'
      } = item.fields

      archive = optionValues.posts.contentType[archive]

      if (archive) {
        archiveIds[archive] = item.sys.id

        if (slugBases?.[archive]) {
          slugBases[archive].archiveId = item.sys.id
        }
      }

      if (parent) {
        if (parent.fields?.slug && parent.fields?.title) {
          slugParents[item.sys.id] = {
            id: parent.sys.id,
            slug: parent.fields.slug,
            title: parent.fields.title
          }
        }
      }
    })
  } else {
    if (slugParentsJson) {
      Object.keys(slugParentsJson).forEach((s) => {
        slugParents[s] = slugParentsJson[s]
      })
    }

    if (archiveIdsJson) {
      Object.keys(archiveIdsJson).forEach((a) => {
        if (slugBases?.[a]) {
          slugBases[a].archiveId = archiveIdsJson[a]
        }
      })
    }
  }

  /* Loop through all content types */

  const contentTypes = Object.keys(content);

  for (let c = 0; c < contentTypes.length; c++) {
    const contentType = contentTypes[c]

    for (let i = 0; i < content[contentType].length; i++) {
      const item = await _setItem({
        item: content[contentType][i],
        contentType
      })

      const {
        serverlessRender = false,
        data: itemData
      } = item

      if (itemData) {
        data.push(itemData)

        if (serverlessRender && !serverlessData) {
          toml += `
[[redirects]]
from = "${itemData.slug}"
to = "/.netlify/functions/serverless"
status = 200
force = true
`
        }
      }
    }
  }

  /* Write data to json file and toml */

  if (!serverlessData) {
    const jsonFiles = [
      {
        data: slugs,
        name: 'slugs.json'
      },
      {
        data: slugParents,
        name: 'slug-parents.json'
      },
      {
        data: archiveIds,
        name: 'archive-ids.json'
      },
      {
        data: archiveCounts,
        name: 'archive-counts.json'
      },
      {
        data: durations,
        name: 'durations.json'
      }
    ]

    for (let i = 0; i < jsonFiles.length; i++) {
      const jsonFile = jsonFiles[i]

      writeFile(`./_json/${jsonFile.name}`, JSON.stringify(jsonFile.data, null, 2), (error) => {
        if (error) {
          console.log(`An error has occurred writing ${jsonFile.name} `, error)
          return
        }

        console.log(`${jsonFile.name} written successfully to disk`)
      })
    }

    writeFile(`./netlify.toml`, toml, (error) => {
      if (error) {
        console.log('An error has occurred writing netlify.toml ', error)
        return
      }

      console.log('netlify.toml written successfully to disk')
    })
  }

  /* Output */

  return data
}

/* Exports */

module.exports = setData
