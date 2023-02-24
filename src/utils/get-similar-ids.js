/**
 * Utils - get similar ids
 */

/**
 * Function - fetch contentful ids based on item meta data
 *
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} contentType
 *  @prop {number} display
 *  @prop {function} getContentfulData
 * }
 * @return {array<string>}
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

  /* Curated similar list */

  if (item?.fields?.similar) {
    return item.fields.similar.map((it) => {
      return it.sys.id
    })
  }

  /* Current post id */

  const id = item.sys.id

  /* Key */

  const key = `get_similar_ids_${item.sys.id}_${contentType}_${display}`

  /* Query args */

  const queryArgsBase = {
    content_type: contentType,
    select: 'sys.id'
  }

  const queryArgs = { ...queryArgsBase }

  /* Store ids */

  let ids = []

  /* Can fetch check */

  let getData = false

  /* Track */

  if (contentType === 'track' && item.fields?.genre) {
    const genres = item.fields.genre.map((it) => {
      return it.sys.id
    })

    queryArgs[`fields.genre.sys.id${genres.length > 1 ? '[in]' : ''}`] = genres.join()
    queryArgs['sys.id[ne]'] = id

    getData = true
  }

  /* Project */

  if (contentType === 'project' && item.fields?.projectType) {
    const projectTypes = item.fields.projectType.map((it) => {
      return it.sys.id
    })

    queryArgs[`fields.projectType.sys.id${projectTypes.length > 1 ? '[in]' : ''}`] = projectTypes.join()
    queryArgs['sys.id[ne]'] = id

    getData = true
  }

  /* Get posts */

  if (getData) {
    const p = await getContentfulData(key, queryArgs)

    if (p?.items) {
      ids = p.items.map((it) => {
        return it.sys.id
      })
    }
  }

  /* Fallback if limited or no results */

  if (ids.length < display) {
    const queryArgs = { ...queryArgsBase }

    queryArgs['sys.id[nin]'] = ids.concat([id]).join()
    queryArgs.limit = Math.abs(ids.length - display)

    getData = false

    if (contentType === 'track' && item.fields?.project) {
      const projects = item.fields.project.map((it) => {
        return it.sys.id
      })

      queryArgs[`fields.project.sys.id${projects.length > 1 ? '[in]' : ''}`] = projects.join()

      getData = true
    }

    if (contentType === 'project') {
      getData = true
    }

    if (getData) {
      const pp = await getContentfulData(`${key}_fallback`, queryArgs)
  
      if (pp?.items) {
        ids = ids.concat(
          pp.items.map((it) => {
            return it.sys.id
          }).concat(ids)
        )
      }
    }
  }

  /* Output */

  if (ids.length > display) {
    ids = [...ids].sort(() => 0.5 - Math.random()).slice(0, display)
  }

  return ids
}

/* Exports */

module.exports = getSimilarIds
