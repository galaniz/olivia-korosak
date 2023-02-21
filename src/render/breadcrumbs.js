/**
 * Render - breadcrumbs
 */

/**
 * Function - 
 *
 * @param {object} navigations
 * @return {string} HTML - nav
 */

const breadcrumbs = (navigations = {}) => {
  /* Breadcrumbs output required */

  if (!navigations?.breadcrumbs) {
    return ''
  }

  /* Output */

  return `
    <nav aria-label="Breadcrumb">
      <div class="l-container">
        ${navigations.breadcrumbs}
      </div>
    </nav>
  `
}

/* Exports */

module.exports = breadcrumbs
