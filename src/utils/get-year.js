/**
 * Utils: get current year as YYYY
 * 
 * @return {integer}
 */

/* Function */

const getYear = () => {
  const date = new Date()

  return date.getFullYear()
}

/* Exports */

module.exports = getYear
