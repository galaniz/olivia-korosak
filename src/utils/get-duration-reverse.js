/**
 * Utils - get duration reverse
 */

/**
 * Function - get seconds from string hh:mm:ss
 *
 * @param {string} time
 * @return {number}
 */

const getDurationReverse = (time = '00:00') => {
  let hours = 0
  let minutes = 0
  let seconds = 0

  const t = time.split(':')

  if (t.length === 3) {
    hours = parseInt(t[0])
    minutes = parseInt(t[1])
    seconds = parseInt(t[2])
  }

  if (t.length === 2) {
    minutes = parseInt(t[0])
    seconds = parseInt(t[1])
  }

  if (t.length === 1) {
    seconds = parseInt(t[0])
  }

  let s = 0

  if (hours) {
    s += hours * 3600
  }

  if (minutes) {
    s += minutes * 60
  }

  if (seconds) {
    s += seconds
  }

  return s
}

/* Exports */

module.exports = getDurationReverse
