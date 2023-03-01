/**
 * Render - single content
 */

/* Imports */

const { enumOptions } = require('../vars/enums')
const { slugData } = require('../vars/data')
const { getSimilarIds, getSlug, getPermalink, getDuration, getDurationReverse, getCommaLinks } = require('../utils')
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
          <a href="${allPermalink}" class="t t-weight-medium t-line-height-130-pc js-pt-link" data-inline>
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

    /* Track details */

    let details = ''

    if (item?.fields?.audio && item?.fields?.audioDuration) {
      /* Store details */

      const detailsItems = []

      /* Projects */

      if (item?.fields?.project) {
        detailsItems.push({
          title: 'Projects',
          desc: getCommaLinks(item.fields.project, 'project')
        })
      }

      /* Genres */

      if (item?.fields?.genre) {
        detailsItems.push({
          title: 'Genres',
          desc: getCommaLinks(item.fields.genre, 'genre')
        })
      }

      /* Duration */

      detailsItems.push({
        title: 'Duration',
        desc: getDuration(
          getDurationReverse(
            item.fields.audioDuration
          ),
          true
        )
      })

      /* Details output */

      details = `
        <div class="l-padding-left-4xl-l l-margin-bottom-2xs-all l-margin-bottom-s-all-m">
          <h2 class="t-h4">Track Details</h2>
          <dl class="l-flex l-flex-column l-flex-row-s l-flex-wrap l-gap-margin-s l-gap-margin-l-m t-m t-background-light-60 t-number-normal t-line-height-130-pc e-underline-reverse">
            ${detailsItems.map(d => {
              return `
                <div>
                  <dt class="t-background-light t-line-height-130-pc l-margin-bottom-5xs l-margin-bottom-4xs-m">${d.title}</dt>
                  <dd>${d.desc}</dd>
                </div>
              `
            }).join('')}
          </dl>
        </div>
      `
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
      details +
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
