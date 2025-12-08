/**
 * Render - term content
 */

/* Imports */

const { termData } = require('../vars/data')

/**
 * Function - output content for term pages
 *
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} contentType
 * }
 * @return {void|boolean}
 */

const termContent = ({
  item = {},
  contentType = ''
}) => {
  /* Only project type and genre */

  if (contentType !== 'projectType' && contentType !== 'genre') {
    return false
  }

  /* Posts content */

  item.fields.content = [
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
              archiveType: item.fields.slug,
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
}

/* Exports */

module.exports = termContent
