/**
 * Social svg output
 *
 * @param {string} type
 * @return {string} HTML - svg
 */

/* Function */

const socialSvg = (type = 'instagram') => {
  /* Paths by type */

  const paths = {
    instagram: 'M13.3325 10C13.3325 8.16417 11.835 6.66668 9.99917 6.66668C8.16334 6.66668 6.66584 8.16417 6.66584 10C6.66584 11.8358 8.16334 13.3333 9.99917 13.3333C11.835 13.3333 13.3325 11.8358 13.3325 10ZM15.1292 10C15.1292 12.8383 12.8375 15.13 9.99917 15.13C7.16084 15.13 4.86918 12.8383 4.86918 10C4.86918 7.16167 7.16084 4.87001 9.99917 4.87001C12.8375 4.87001 15.1292 7.16167 15.1292 10ZM16.5358 4.66168C16.5358 5.32585 16.0016 5.85918 15.3383 5.85918C14.675 5.85918 14.1408 5.32501 14.1408 4.66168C14.1408 3.99835 14.675 3.46418 15.3383 3.46418C16.0016 3.46418 16.5358 3.99835 16.5358 4.66168ZM9.99917 1.79669C8.54084 1.79669 5.41585 1.67919 4.10085 2.20002C3.64502 2.38252 3.30668 2.60335 2.95502 2.95502C2.60335 3.30668 2.38169 3.64502 2.20002 4.10085C1.67919 5.41585 1.79669 8.54084 1.79669 9.99917C1.79669 11.4575 1.67919 14.5825 2.20002 15.8975C2.38252 16.3533 2.60335 16.6916 2.95502 17.0433C3.30668 17.395 3.64502 17.6166 4.10085 17.7983C5.41585 18.3191 8.54084 18.2016 9.99917 18.2016C11.4575 18.2016 14.5825 18.3191 15.8975 17.7983C16.3533 17.6158 16.6916 17.395 17.0433 17.0433C17.395 16.6916 17.6166 16.3533 17.7983 15.8975C18.3191 14.5825 18.2016 11.4575 18.2016 9.99917C18.2016 8.54084 18.3191 5.41585 17.7983 4.10085C17.6158 3.64502 17.395 3.30668 17.0433 2.95502C16.6916 2.60335 16.3533 2.38169 15.8975 2.20002C14.5825 1.67919 11.4575 1.79669 9.99917 1.79669ZM19.9991 10C19.9991 11.38 20.0125 12.7475 19.9341 14.1275C19.8558 15.7292 19.4916 17.1483 18.32 18.32C17.1483 19.4916 15.7292 19.8566 14.1275 19.9341C12.7475 20.0125 11.38 19.9991 10 19.9991C8.62 19.9991 7.25251 20.0125 5.87251 19.9341C4.27085 19.8558 2.85169 19.4916 1.68002 18.32C0.508359 17.1483 0.14336 15.7292 0.0658598 14.1275C-0.0124733 12.7475 0.000859996 11.38 0.000859996 10C0.000859996 8.62 -0.0124733 7.25251 0.0658598 5.87251C0.144193 4.27085 0.508359 2.85169 1.68002 1.68002C2.85169 0.508358 4.27085 0.14336 5.87251 0.0658599C7.25251 -0.0124733 8.62 0.000859986 10 0.000859986C11.38 0.000859986 12.7475 -0.0124733 14.1275 0.0658599C15.7292 0.144193 17.1483 0.508358 18.32 1.68002C19.4916 2.85169 19.8566 4.27085 19.9341 5.87251C20.0125 7.25251 19.9991 8.62 19.9991 10Z',
    youtube: 'M7.93531 12.5892L13.3369 9.79913L7.93531 6.97549V12.5892ZM10.0004 2.96825C14.2083 2.96825 16.9984 3.16897 16.9984 3.16897C17.3891 3.21397 18.2484 3.21397 19.007 4.01756C19.007 4.01756 19.6206 4.62043 19.7992 6.00404C20.0113 7.62265 19.9999 9.24055 19.9999 9.24055V10.7584C19.9999 10.7584 20.0113 12.3771 19.7992 13.9949C19.6206 15.3678 19.007 15.9814 19.007 15.9814C18.2484 16.7736 17.3884 16.7736 16.9984 16.8186C16.9984 16.8186 14.2083 17.0307 10.0004 17.0307C4.79951 16.9857 3.20304 16.83 3.20304 16.83C2.75661 16.7522 1.75229 16.7743 0.99299 15.9814C0.99299 15.9814 0.379403 15.3678 0.200827 13.9949C-0.0113207 12.3763 0.000108121 10.7584 0.000108121 10.7584V9.24055C0.000108121 9.24055 -0.0113207 7.62193 0.200827 6.00404C0.379403 4.62043 0.99299 4.01756 0.99299 4.01756C1.75158 3.21397 2.6116 3.21397 3.00161 3.16897C3.00161 3.16897 5.79168 2.96825 9.99964 2.96825H10.0004Z',
    facebook: 'M14.997 0.143844V3.31688H13.1101C11.6317 3.31688 11.3555 4.02611 11.3555 5.04763V7.31915H14.877L14.4086 10.8768H11.3555V19.999H7.67786V10.8768H4.61328V7.31915H7.67786V4.69918C7.67786 1.65844 9.54092 0 12.257 0C13.5547 0 14.6724 0.0961527 14.997 0.143844Z'
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

module.exports = socialSvg
