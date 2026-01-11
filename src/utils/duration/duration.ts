/**
 * Utils - Duration
 */

/* Imports */

import { isNumber } from '@alanizcreative/formation-static/utils/number/number.js'

/**
 * Convert seconds to text (time or words).
 *
 * @param {number} [seconds=0]
 * @param {boolean} [words=false]
 * @return {string}
 */
const getDuration = (seconds: number = 0, words: boolean = false): string => {
  /* Hours and min for formatting */

  if (!isNumber(seconds)) {
    seconds = 0
  }

  const hours = Math.floor(seconds / 3600)
  const min = Math.floor((seconds - (hours * 3600)) / 60)

  seconds = seconds - (hours * 3600) - (min * 60)

  /* Output */

  let t = ''

  /* Time format */

  if (!words) {
    if (hours > 0) {
      t += `${hours < 10 && hours > 0 ? '0' : ''}${hours}:`
    }

    t += `${hours > 0 && min < 10 ? '0' : ''}${min}:`
    t += `${seconds < 10 ? '0' : ''}${seconds}`

    return t
  }

  /* Words format */

  if (hours > 0) {
    t += `${hours} ${hours > 1 ? 'hours' : 'hour'}${min > 0 ? ' ' : ''}`
  }

  if (min > 0) {
    t += `${min} ${min > 1 ? 'minutes' : 'minute'}${seconds > 0 ? ' ' : ''}`
  }

  if (seconds > 0) {
    t += `${seconds} ${seconds > 1 ? 'seconds' : 'second'}`
  }

  return t
}

/**
 * Number of seconds from time (hh:mm:ss).
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

export {
  getDuration,
  getDurationSeconds
}
