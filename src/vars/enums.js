/**
 * Vars - enums
 */

/**
 * Namespace
 *
 * @type {string}
 */

const enumNamespace = 'ok'

/**
 * Site info
 *
 * @type {object}
 */

const enumSite = {
  title: 'Olivia Korosak',
  email: 'hello@oliviakorosak.com',
  meta: {
    description: 'Lorem ipsum sed dolorem quisque',
    image: 'img/olivia-korosak-meta.jpg'
  }
}

/**
 * Colors
 *
 * @type {object}
 */

const enumColors = {
  foreground: {
    base: '#17181d',
    light: '#232428',
    dark: '#000000',
    tint: '#45464a'
  },
  background: {
    light: '#ffffff'
  },
  negative: '#cf6f74',
  positive: '#509976',
  base: '#17181d',
  tint: '#45464a'
}

/**
 * Contentful content type by ids
 *
 * @type {object}
 */

const enumContentTypes = {
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

/**
 * Contentful field options
 *
 * @type {object}
 */

const enumOptions = {
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
    '100px': '3xl', // Back end option
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
    contentTypeReverse: {
      project: 'Project',
      projectType: 'Project Type',
      track: 'Track',
      genre: 'Genre'
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

/* Export */

module.exports = {
  enumNamespace,
  enumSite,
  enumColors,
  enumContentTypes,
  enumOptions
}
