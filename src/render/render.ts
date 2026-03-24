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
import { FormOption } from '@alanizcreative/formation-static/objects/Form/FormOption.js'
import { Navigations } from '../components/Navigation/Navigations.js'
import { HttpError } from '../components/HttpError/HttpError.js'
import { Layout } from '../components/Layout/Layout.js'
import { Content } from '../text/Content/Content.js'
import { Testimonial } from '../objects/Testimonial/Testimonial.js'
import { Navigation } from '../objects/Navigation/Navigation.js'
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
    content: Content,
    richText: RichText,
    button: Button,
    image: Image,
    form: Form,
    formField: FormField,
    formOption: FormOption,
    testimonial: Testimonial,
    posts: Posts,
    card: Card,
    navigation: Navigation
  }
}

/* Exports */

export { renderFunctions }
