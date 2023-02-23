/**
 * Render - svg caret
 */

/**
 * Function - output svg for down, left and right caret
 * 
 * @param {string} direction
 * @return {string} HTML - svg
 */

const caretSvg = (direction = 'down') => {
  const paths = {
    down: 'M16.0841 7.61215L10.3435 13.3528C10.2889 13.4073 10.2344 13.4455 10.1799 13.4673C10.1254 13.4891 10.0654 13.5 10 13.5C9.93457 13.5 9.87461 13.4891 9.82009 13.4673C9.76557 13.4455 9.71105 13.4073 9.65654 13.3528L3.91588 7.61215C3.79595 7.49221 3.73598 7.33956 3.73598 7.15421C3.73598 6.96885 3.79595 6.8162 3.91588 6.69626C4.04672 6.56542 4.2021 6.5 4.38201 6.5C4.56191 6.5 4.71729 6.56542 4.84813 6.69626L10 11.8481L15.1519 6.69626C15.2827 6.56542 15.4381 6.50273 15.618 6.50818C15.7979 6.51363 15.9478 6.57632 16.0678 6.69626C16.1986 6.8271 16.264 6.98248 16.264 7.16238C16.264 7.34229 16.204 7.49221 16.0841 7.61215Z',
    left: 'M12.3879 16.0841L6.6472 10.3435C6.59268 10.2889 6.55452 10.2344 6.53271 10.1799C6.5109 10.1254 6.5 10.0654 6.5 10C6.5 9.93457 6.5109 9.87461 6.53271 9.82009C6.55452 9.76557 6.59268 9.71105 6.6472 9.65654L12.3879 3.91588C12.5078 3.79595 12.6604 3.73598 12.8458 3.73598C13.0312 3.73598 13.1838 3.79595 13.3037 3.91588C13.4346 4.04672 13.5 4.2021 13.5 4.38201C13.5 4.56191 13.4346 4.71729 13.3037 4.84813L8.15187 10L13.3037 15.1519C13.4346 15.2827 13.4973 15.4381 13.4918 15.618C13.4864 15.7979 13.4237 15.9478 13.3037 16.0678C13.1729 16.1986 13.0175 16.264 12.8376 16.264C12.6577 16.264 12.5078 16.204 12.3879 16.0841V16.0841Z',
    right: 'M7.61215 3.91589L13.3528 9.65655C13.4073 9.71106 13.4455 9.76558 13.4673 9.8201C13.4891 9.87461 13.5 9.93458 13.5 10C13.5 10.0654 13.4891 10.1254 13.4673 10.1799C13.4455 10.2344 13.4073 10.2889 13.3528 10.3435L7.61215 16.0841C7.49221 16.2041 7.33956 16.264 7.15421 16.264C6.96885 16.264 6.8162 16.2041 6.69626 16.0841C6.56542 15.9533 6.5 15.7979 6.5 15.618C6.5 15.4381 6.56542 15.2827 6.69626 15.1519L11.8481 10L6.69626 4.84813C6.56542 4.71729 6.50273 4.56192 6.50818 4.38201C6.51363 4.20211 6.57632 4.05218 6.69626 3.93225C6.8271 3.80141 6.98248 3.73598 7.16238 3.73598C7.34229 3.73598 7.49221 3.79595 7.61215 3.91589Z'
  }

  /* Output */

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
      <path d="${paths[direction]}" fill="currentcolor"/>
    </svg>
  `
}

/* Exports */

module.exports = caretSvg
