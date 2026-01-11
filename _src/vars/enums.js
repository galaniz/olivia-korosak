/**
 * Vars - enums
 */

/**
 * Contentful field options
 *
 * @type {object}
 */
const enumOptions = {
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
