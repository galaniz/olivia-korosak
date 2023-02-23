/**
 * Render - svg control
 */

/**
 * Function - output svg for play, pause, play next and play previous icons
 * 
 * @param {string} type
 * @return {string} HTML - svg
 */

const controlSvg = (type = 'play') => {
  const paths = {
    play: 'M8.1 14.1333C7.93333 14.2444 7.76389 14.25 7.59167 14.15C7.41944 14.05 7.33333 13.9 7.33333 13.7V6.2C7.33333 6 7.41944 5.85 7.59167 5.75C7.76389 5.65 7.93333 5.65556 8.1 5.76667L14 9.53333C14.1556 9.63333 14.2333 9.77222 14.2333 9.95C14.2333 10.1278 14.1556 10.2667 14 10.3667L8.1 14.1333Z',
    pause: 'm8.525,13.858c-.094.094-.214.142-.358.142s-.264-.047-.358-.142c-.094-.094-.142-.208-.142-.342v-7.017c0-.144.047-.264.142-.358.094-.094.214-.142.358-.142s.264.047.358.142c.094.094.142.208.142.342v7.017c0,.144-.047.264-.142.358Zm4,0c-.094.094-.214.142-.358.142s-.264-.047-.358-.142-.142-.208-.142-.342v-7.017c0-.144.047-.264.142-.358.094-.094.214-.142.358-.142s.264.047.358.142c.094.094.142.208.142.342v7.017c0,.144-.047.264-.142.358Z',
    playNext: 'M13.8333 14C13.6889 14 13.5694 13.9528 13.475 13.8583C13.3806 13.7639 13.3333 13.6444 13.3333 13.5V6.5C13.3333 6.35556 13.3806 6.23611 13.475 6.14167C13.5694 6.04722 13.6889 6 13.8333 6C13.9778 6 14.0972 6.04722 14.1917 6.14167C14.2861 6.23611 14.3333 6.35556 14.3333 6.5V13.5C14.3333 13.6444 14.2861 13.7639 14.1917 13.8583C14.0972 13.9528 13.9778 14 13.8333 14ZM6.45001 13.45C6.28334 13.5722 6.11112 13.5833 5.93334 13.4833C5.75556 13.3833 5.66667 13.2389 5.66667 13.05V6.95C5.66667 6.75 5.75556 6.60278 5.93334 6.50833C6.11112 6.41389 6.28334 6.42778 6.45001 6.55L10.8333 9.58333C10.9889 9.68333 11.0667 9.82222 11.0667 10C11.0667 10.1778 10.9889 10.3167 10.8333 10.4167L6.45001 13.45Z',
    playPrev: 'M6.16666 14C6.02222 14 5.90278 13.9528 5.80833 13.8583C5.71389 13.7639 5.66666 13.6444 5.66666 13.5V6.5C5.66666 6.35556 5.71389 6.23611 5.80833 6.14167C5.90278 6.04722 6.02222 6 6.16666 6C6.31111 6 6.43055 6.04722 6.525 6.14167C6.61944 6.23611 6.66666 6.35556 6.66666 6.5V13.5C6.66666 13.6444 6.61944 13.7639 6.525 13.8583C6.43055 13.9528 6.31111 14 6.16666 14ZM13.55 13.45L9.16666 10.4167C9.01111 10.3167 8.93333 10.1778 8.93333 10C8.93333 9.82222 9.01111 9.68333 9.16666 9.58333L13.55 6.55C13.7167 6.42778 13.8889 6.41389 14.0667 6.50833C14.2444 6.60278 14.3333 6.75 14.3333 6.95V13.05C14.3333 13.2389 14.2444 13.3833 14.0667 13.4833C13.8889 13.5833 13.7167 13.5722 13.55 13.45V13.45Z'
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
      <path d="${paths[type]}" fill="currentcolor"/>
    </svg>
  `
}

/* Exports */

module.exports = controlSvg
