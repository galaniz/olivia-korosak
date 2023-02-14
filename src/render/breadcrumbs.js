/**
 * Render: breadcrumbs
 *
 * @param {object} navigations
 * @return {string} HTML - nav
 */

/* Function */

const breadcrumbs = (navigations = {}) => {
  /* Breadcrumsb output required */

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
