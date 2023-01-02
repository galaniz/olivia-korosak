/**
 * Card output
 *
 * @param {object} args {
 *  @param {string} ?
 * }
 */

/* Function */

const card = (args = {}) => {
  return {
    start: '<div class="l-relative e-scale e-overlay e-transition-quad">',
    end: '</div>'
  }
}

/* Exports */

module.exports = card
