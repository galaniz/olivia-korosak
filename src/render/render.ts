/**
 * Render
 */

/* Imports */

import type { RenderFunctionsArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import { Container } from '@alanizcreative/formation-static/layouts/Container/Container.js'
import { Column } from '@alanizcreative/formation-static/layouts/Column/Column.js'
import { RichText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import { Form } from '@alanizcreative/formation-static/objects/Form/Form.js'
import { FormField } from '@alanizcreative/formation-static/objects/Form/FormField.js'
import { Navigations } from '../components/Navigation/Navigations.js'
import { HttpError } from '../components/HttpError/HttpError.js'
import { Layout } from '../components/Layout/Layout.js'
import { Button } from '../objects/Button/Button.js'
import { Image } from '../objects/Image/Image.js'
import { Posts } from '../objects/Posts/Posts.js'
import { Card } from '../objects/Card/Card.js'

/* Render functions */

const renderFunctions: RenderFunctionsArgs = {
  layout: Layout,
  navigation: Navigations,
  httpError: HttpError,
  functions: {
    container: Container,
    column: Column,
    richText: RichText,
    button: Button,
    image: Image,
    form: Form,
    formField: FormField,
    posts: Posts,
    card: Card
  }
}

/* Exports */

export { renderFunctions }
