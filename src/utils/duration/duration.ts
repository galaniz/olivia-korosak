/**
 * Utils - Duration
 */

/**
 * Seconds from time (hh:mm:ss).
 *
 * @param {string} time
 * @return {number}
 */
const getDurationSeconds = (time: string = '00:00'): number => {
  let hours = 0
  let minutes = 0
  let seconds = 0

  const parts = time.split(':')
  const count = parts.length
  const [one, two, three] = parts

  if (count === 3 && one && two && three) {
    hours = parseInt(one)
    minutes = parseInt(two)
    seconds = parseInt(three)
  }

  if (count === 2 && one && two) {
    minutes = parseInt(one)
    seconds = parseInt(two)
  }

  if (count === 1 && one) {
    seconds = parseInt(one)
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

export { getDurationSeconds }
