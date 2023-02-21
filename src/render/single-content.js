/**
 * Render - single content
 */

/* Imports */

const { getSimilarIds } = require('../utils')
const { enumOptions } = require('../vars/enums')
const container = require('./container')
const content = require('./content')
const richText = require('./rich-text')
const posts = require('./posts')

/* Function */

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

  /* Similar projects */

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
        columns: 3
      },
      pageData: item,
      getContentfulData
    })
  }

  /* Project */

  if (contentType === 'project') {
    /* Containers */

    const contain = {
      container: container({
        args: {
          tag: 'Div',
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
        noPostsText: false
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
        '<h2>Similar Projects</h2>' +
        similar +
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
