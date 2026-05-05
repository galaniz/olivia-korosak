/**
 * Components - Skip Link
 */

/**
 * Output link to main landmark.
 *
 * @return {string} HTMLAnchorElement
 */
const SkipLink = (): string => {
  return /* html */`
    <a
      href="#main"
      class="skip-link text-xl wt-medium bg-background-light outline-base block absolute left-0 right-0 top-0 px-2xs py-3xs text-center outline-inset"
    >
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLink }
