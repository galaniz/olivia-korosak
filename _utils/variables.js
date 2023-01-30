/**
 * Variables
 */

/* Namespace */

const namespace = 'ok'

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
    Default: '',
    '5px': '5xs',
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
    contentType: {
      Project: 'project',
      'Project Type': 'projectType',
      Track: 'track',
      Genre: 'genre',
      None: ''
    },
    headingLevel: {
      'Heading Two': 'heading-2',
      'Heading Three': 'heading-3',
      'Heading Four': 'heading-4',
      'Heading Five': 'heading-5',
      'Heading Six': 'heading-6'
    },
    layout: {
      project: 'card',
      projectType: 'card',
      track: 'tracks',
      genre: 'card'
    }
  },
  field: {
    type: {
      Text: 'text',
      Email: 'email',
      Tel: 'tel',
      Checkbox: 'checkbox',
      Radio: 'radio',
      Number: 'number',
      Textarea: 'textarea',
      Select: 'select'
    }
  }
}

/* Parent items for slug generation */

const slugParents = {}

/* Content type bases for slug generation */

const slugBases = {
  page: {
    slug: '',
    title: '',
    singular: ''
  },
  project: {
    slug: 'projects',
    title: 'Projects',
    singular: 'Project',
    archiveId: ''
  },
  track: {
    slug: 'tracks',
    title: 'Tracks',
    singular: 'Track',
    archiveId: ''
  },
  projectType: {
    slug: 'types',
    title: 'Types',
    singular: 'Type',
    archiveId: ''
  },
  genre: {
    slug: 'genres',
    title: 'Genres',
    singular: 'Genre',
    archiveId: ''
  }
}

/* Terms data */

const termData = {
  projectType: {
    field: 'projectType',
    contentType: 'Project',
    display: 16,
    include: [],
    count: {
      title: 'Projects',
      singular: 'Project'
    }
  },
  genre: {
    field: 'genre',
    contentType: 'Track',
    display: 10,
    include: ['projects'],
    count: {
      title: 'Tracks',
      singular: 'Track'
    }
  }
}

/* Urls for permalink generation */

const urls = {
  local: 'http://localhost:8080/',
  production: 'https://oliviakorosak.netlify.app/',
  staging: 'https://staging--oliviakorosak.netlify.app/'
}

/* Store page archive ids by content type */

const archiveIds = {}

/* Store posts archive counts */

const archiveCounts = {}

/* Store script data for front end */

const scriptData = {}

/* Exports */

module.exports = {
  namespace,
  archiveIds,
  archiveCounts,
  termData,
  scriptData,
  contentTypes,
  optionValues,
  slugParents,
  slugBases,
  urls
}
