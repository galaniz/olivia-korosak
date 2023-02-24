/**
 * Render - single content
 */

/* Imports */

const { enumOptions } = require('../vars/enums')
const { slugData } = require('../vars/data')
const { getSimilarIds, getSlug, getPermalink } = require('../utils')
const container = require('./container')
const content = require('./content')
const richText = require('./rich-text')
const posts = require('./posts')
const caretSvg = require('./svg/caret')

/**
 * Function - output additional content for single posts
 *
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} contentType
 *  @prop {function} getContentfulData
 *  @prop {object} contains
 *  @prop {object} output
 * }
 * @return {void|boolean}
 */

const singleContent = async ({
  item,
  contentType = 'project',
  getContentfulData,
  contains,
  output
}) => {
  /* Type and item required */

  if (!contentType || !item) {
    return false
  }

  /* Current post id */

  const id = item.sys.id

  /* Display */

  const display = contentType === 'track' ? 10 : 3

  /* Include in posts */

  let include = []

  if (contentType === 'track') {
    include = ['projects', 'genres']
  }

  if (contentType === 'project') {
    include = ['project-types']
  }

  /* Plural title */

  const plural = slugData.bases[contentType].title

  /* Archive link */

  const allPermalink = getPermalink(
    getSlug({
      id: slugData.bases[contentType].archiveId,
      slug: slugData.bases[contentType].slug
    })
  )

  const allLink = `
    <div class="e-underline l-padding-top-4xs">
      <div class="l-inline-flex l-align-center">
        <span class="l-flex l-width-2xs l-height-2xs l-svg">
          ${caretSvg('left')}
        </span>
        <span>
          <a href="${allPermalink}" class="t t-weight-medium t-line-height-130-pc" data-inline>
            All ${plural}
          </a>
        </span>
      </div>
    </div>
  `

  /* Similar content */

  const similarTitle = `More ${plural}`

  let similar = ''

  const ids = await getSimilarIds({
    item,
    contentType,
    display,
    getContentfulData
  })

  if (enumOptions.posts.contentTypeReverse?.[contentType] && ids.length) {
    similar = await posts({
      args: {
        contentType: enumOptions.posts.contentTypeReverse[contentType],
        filters: [
          `sys.id[in]:${ids.join()}`
        ],
        order: 'rand',
        nothingFoundText: false,
        columns: 3,
        include
      },
      pageData: item,
      getContentfulData
    })
  }

  /* Track */

  if (contentType === 'track') {
    const contain = {
      container: container({
        args: {
          maxWidth: '1300px',
          paddingBottom: '80px',
          paddingBottomLarge: '120px',
          gap: '60px',
          gapLarge: '80px'
        }
      })
    }

    /* Similar tracks */

    if (similar) {
      similar = `
        <div class="l-padding-left-4xl-l l-margin-bottom-2xs-all l-margin-bottom-s-all-m">
          <h2 class="t-h4">${similarTitle}</h2>
          ${similar}
          ${allLink}
        </div>
      `
    }

    /* Output */

    output.html = (
      contain.container.start +
      similar +
      contain.container.end
    )
  }

  /* Project */

  if (contentType === 'project') {
    const contain = {
      container: container({
        args: {
          maxWidth: '650px',
          paddingBottom: '80px',
          paddingBottomLarge: '120px'
        }
      }),
      content: content({
        args: {
          richTextStyles: true
        }
      })
    }

    /* Project tracks */

    let tracks = await posts({
      args: {
        contentType: 'Track',
        filters: [`fields.project.sys.id:${id}`],
        nothingFoundText: false
      },
      pageData: item,
      getContentfulData
    })

    if (tracks) {
      contains.audio = true

      tracks = (
        richText({
          type: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Tracks'
            }
          ]
        }) +
        tracks
      )
    }

    /* Similar projects */

    if (similar) {
      const similarContain = {
        container: container({
          args: {
            maxWidth: '1040px',
            paddingBottom: '80px',
            paddingBottomLarge: '120px',
            gap: '30px'
          }
        })
      }

      similar = (
        similarContain.container.start +
        `<h2>${similarTitle}</h2>` +
        similar +
        allLink +
        similarContain.container.end
      )
    }

    /* Output */

    output.html = (
      contain.container.start +
      contain.content.start +
      output.html +
      tracks +
      contain.content.end +
      contain.container.end +
      similar
    )
  }
}

/* Exports */

module.exports = singleContent
