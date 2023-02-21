/**
 * Utils - get similar ids
 */

/**
 * Function - 
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {integer} display
 *  @prop {string} headingLevel
 *  @prop {boolean} pagination
 *  @prop {array} filters
 *  @prop {array} include
 *  @prop {string} archiveType
 *  @prop {boolean} nothingFoundText
 *  @prop {number} columns
 *  @prop {string} order
 * }
 * @param {object} pageData
 * @param {function} getContentfulData
 * @return {array}
 */

const getSimilarIds = async ({
  item,
  contentType = 'project',
  display = 3,
  getContentfulData
}) => {
  /* Type and item required */

  if (!contentType || !item) {
    return false
  }

  /* Current post id */

  const id = item.sys.id

  /* Key */

  const key = `get_similar_ids_${item.sys.id}_${contentType}_${display}`

  /* Query args */

  const queryArgs = {
    content_type: contentType,
    select: 'sys.id'
  }

  /* Store ids */

  let ids = []

  /* Project */

  if (item.fields?.projectType) {
    let projectTypes = item.fields.projectType.map((item) => {
      return item.sys.id
    })

    queryArgs[`fields.projectType.sys.id${projectTypes.length > 1 ? '[in]' : ''}`] = projectTypes.join()
    queryArgs[`sys.id[ne]`] = id

    const posts = await getContentfulData(key, queryArgs)

    if (posts?.items) {
      ids = posts.items.map((item) => {
        return item.sys.id
      })
    }
  }

  /* Output */

  if (ids.length > display) {
    ids = [...ids].sort(() => 0.5 - Math.random()).slice(0, display);
  }

  return ids
}

/* Exports */

module.exports = getSimilarIds
