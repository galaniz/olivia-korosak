/**
 * Utils - get year
 */

/**
 * Function - get current year as YYYY
 *
 * @return {number}
 */

const getYear = () => {
  const date = new Date()

  return date.getFullYear()
}

/* Exports */

module.exports = getYear
