/**
 * Constants
 */

/* Content type by ids */

const contentTypes = {
  button: 'button',
  card: 'card',
  column: 'column',
  section: 'container',
  text: 'content',
  field: 'field',
  forms: 'form',
  genre: 'genre',
  image: 'image',
  navigation: 'navigation',
  navigationItem: 'navigationItem',
  page: 'page',
  posts: 'posts',
  project: 'project',
  projectType: 'projectType',
  testimonial: 'testimonial',
  track: 'track'
}

/* Field options values */

const optionValues = {
  button: {
    type: {
      Main: 'main',
      Secondary: 'secondary',
      Icon: 'icon'
    },
    size: {
      Default: '',
      Large: 'large'
    }
  },
  tag: {
    Div: 'div',
    Section: 'section',
    'Unordered List': 'ul',
    'Ordered List': 'ol',
    'List Item': 'li',
    Figure: 'figure',
    'Figure Caption': 'figcaption',
    Article: 'article',
    Aside: 'aside',
    Header: 'header',
    Footer: 'footer',
    Address: 'address'
  },
  width: {
    None: '',
    Auto: 'auto',
    '1/1': '1-1',
    '5/6': '5-6',
    '4/5': '4-5',
    '3/4': '3-4',
    '2/3': '2-3',
    '3/5': '3-5',
    '1/2': '1-2',
    '2/5': '2-5',
    '1/3': '1-3',
    '1/4': '1-4',
    '1/5': '1-5',
    '1/6': '1-6'
  },
  justify: {
    None: '',
    Start: 'start',
    Center: 'center',
    End: 'end',
    Spread: 'between'
  },
  align: {
    None: '',
    Start: 'start',
    Center: 'center',
    End: 'end'
  },
  layout: {
    Column: 'column',
    Row: 'row'
  },
  maxWidth: {
    None: '',
    '100%': 'width-1-1',
    '1300px': 'container',
    '1040px': 'container-m',
    '650px': 'container-s'
  },
  padding: {
    None: '',
    '5px': '5xs',
    '10px': '4xs',
    '15px': '3xs',
    '20px': '2xs',
    '30px': 's',
    '40px': 'm',
    '60px': 'xl',
    '80px': '2xl',
    '120px': '4xl'
  },
  gap: {
    None: '',
    '10px': '4xs',
    '15px': '3xs',
    '20px': '2xs',
    '30px': 's',
    '40px': 'm',
    '60px': 'xl',
    '80px': '2xl'
  },
  aspectRatio: {
    None: '',
    '1:1': '100',
    '4:5': '80',
    '16:9': '56'
  },
  content: {
    text: {
      Default: 'l',
      Medium: 'm',
      Small: 's',
      'Extra Small': 'xs'
    },
    heading: {
      Default: '',
      'Heading Two': 'h2',
      'Heading Three': 'h3',
      'Heading Four': 'h4',
      'Heading Five': 'h5',
      'Heading Six': 'h6'
    },
    align: {
      Left: 'left',
      Center: 'center'
    }
  },
  posts: {
    type: {
      Project: 'project',
      'Project Type': 'projectType',
      Track: 'track',
      Genre: 'genre'
    },
    headingLevel: {
      'Heading Two': 'h2',
      'Heading Three': 'h3',
      'Heading Four': 'h4',
      'Heading Five': 'h5',
      'Heading Six': 'h6'
    }
  }
}

/* Parent items for slug generation */

const slugParents = {}

/* Content type bases for slug generation */

const slugBases = {
  page: {
    slug: '',
    title: ''
  },
  project: {
    slug: 'projects',
    title: 'Projects'
  },
  track: {
    slug: 'tracks',
    title: 'Tracks'
  },
  projectType: {
    slug: 'types',
    title: 'Types'
  },
  genre: {
    slug: 'genres',
    title: 'Genres'
  }
}

/* Urls for permalink generation */

const urls = {
  local: 'http://localhost:8080/',
  production: 'https://oliviakorosak.netlify.app/',
  staging: 'https://staging--oliviakorosak.netlify.app/'
}

/* Exports */

module.exports = {
  contentTypes,
  optionValues,
  slugParents,
  slugBases,
  urls
}
