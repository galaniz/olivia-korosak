/**
 * Vars - enums
 */

/**
 * Contentful field options
 *
 * @type {object}
 */

const enumOptions = {
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
