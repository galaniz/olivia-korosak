/**
 * Close svg output
 *
 * @return {string} HTML - svg
 */

/* Function */

const closeSvg = () => {
  return `
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 10.875L5.625 15.25C5.5 15.375 5.35417 15.4375 5.1875 15.4375C5.02083 15.4375 4.875 15.375 4.75 15.25C4.625 15.125 4.5625 14.9792 4.5625 14.8125C4.5625 14.6458 4.625 14.5 4.75 14.375L9.125 10L4.75 5.625C4.625 5.5 4.5625 5.35417 4.5625 5.1875C4.5625 5.02083 4.625 4.875 4.75 4.75C4.875 4.625 5.02083 4.5625 5.1875 4.5625C5.35417 4.5625 5.5 4.625 5.625 4.75L10 9.125L14.375 4.75C14.5 4.625 14.6458 4.5625 14.8125 4.5625C14.9792 4.5625 15.125 4.625 15.25 4.75C15.375 4.875 15.4375 5.02083 15.4375 5.1875C15.4375 5.35417 15.375 5.5 15.25 5.625L10.875 10L15.25 14.375C15.375 14.5 15.4375 14.6458 15.4375 14.8125C15.4375 14.9792 15.375 15.125 15.25 15.25C15.125 15.375 14.9792 15.4375 14.8125 15.4375C14.6458 15.4375 14.5 15.375 14.375 15.25L10 10.875Z" fill="currentcolor"/>
    </svg>
  `
}

/* Exports */

module.exports = closeSvg