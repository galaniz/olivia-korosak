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

  /* Only track or project types */

  if (contentType !== 'project' && contentType !== 'track') {
    return false
  }

  /* Current post id */

  const id = item.sys.id

  /* Key */

  const key = `get_similar_ids_${item.sys.id}_${contentType}_${display}`

  /* Query args */

  const queryArgsBase = {
    content_type: contentType,
    select: 'sys.id',
    'sys.id[ne]': id
  }

  let queryArgs = {...queryArgsBase}

  /* Store ids */

  let ids = []

  /* Track */

  if (contentType === 'track' && item.fields?.genre) {
    if (item.fields?.genre) {
      const genres = item.fields.genre.map((item) => {
        return item.sys.id
      })

      queryArgs[`fields.genre.sys.id${genres.length > 1 ? '[in]' : ''}`] = genres.join()
    }
  }

  /* Project */

  if (contentType === 'project' && item.fields?.projectType) {
    const projectTypes = item.fields.projectType.map((item) => {
      return item.sys.id
    })

    queryArgs[`fields.projectType.sys.id${projectTypes.length > 1 ? '[in]' : ''}`] = projectTypes.join()
  }

  /* Get posts */

  const p = await getContentfulData(key, queryArgs)

  if (p?.items) {
    ids = p.items.map((item) => {
      return item.sys.id
    })
  }

  /* Track project fallback */

  if (contentType === 'track' && item.fields?.project && ids.length < display) {
    let queryArgs = {...queryArgsBase}

    const projects = item.fields.project.map((item) => {
      return item.sys.id
    })

    queryArgs[`fields.project.sys.id${projects.length > 1 ? '[in]' : ''}`] = projects.join()
    queryArgs.limit = Math.abs(ids.length - display)

    const pp = await getContentfulData(key, queryArgs)

    if (pp?.items) {
      ids = ids.concat(
        pp.items.map((item) => {
          return item.sys.id
        })
      )
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
