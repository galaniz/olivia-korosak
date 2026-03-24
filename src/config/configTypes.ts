/**
 * Config - Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} ConfigEnv
 * @extends {Generic}
 * @prop {string} [ENVIRONMENT]
 * @prop {string} [CTFL_SPACE_ID]
 * @prop {string} [CTFL_PRODUCTION_TOKEN]
 * @prop {string} [CTFL_PRODUCTION_HOST]
 * @prop {string} [CTFL_DEVELOPMENT_TOKEN]
 * @prop {string} [CTFL_DEVELOPMENT_HOST]
 * @prop {string} [STRIPE_API_TOKEN]
 * @prop {string} [LOCAL_CACHE]
 * @prop {string} [LOCAL]
 */
export interface ConfigEnv extends Generic {
  ENVIRONMENT?: string
  CTFL_SPACE_ID?: string
  CTFL_PRODUCTION_TOKEN?: string
  CTFL_PRODUCTION_HOST?: string
  CTFL_DEVELOPMENT_TOKEN?: string
  CTFL_DEVELOPMENT_HOST?: string
  STRIPE_API_TOKEN?: string
  LOCAL_CACHE?: string
  LOCAL?: string
}

/**
 * @typedef {object} ConfigVarsSvg
 * @prop {string} viewBox
 * @prop {string} output
 */
export interface ConfigVarsSvg {
  viewBox: string
  output: string
}

/**
 * @typedef {object} ConfigVarsCss
 * @prop {string} in
 * @prop {string} out
 * @prop {string} replace
 * @prop {Map<string, string>} cache
 * @prop {string[]} safelist
 */
export interface ConfigVarsCss {
  in: string
  out: string
  replace: string
  cache: Map<string, string>
  safelist: string[]
}

/**
 * @typedef {object} ConfigVarsJs
 * @prop {string} in
 * @prop {string} out
 */
export interface ConfigVarsJs {
  in: string
  out: string
}

/**
 * @typedef {object} ConfigVars
 * @prop {boolean} local
 * @prop {Map<string, ConfigVarsSvg>} svg
 * @prop {Map<string, string>} template
 * @prop {Set<string>} style
 * @prop {Set<string>} noscript
 * @prop {ConfigVarsCss} css
 * @prop {ConfigVarsJs} js
 * @prop {string} formId
 */
export interface ConfigVars {
  local: boolean
  svg: Map<string, ConfigVarsSvg>
  template: Map<string, string>
  style: Set<string>
  noscript: Set<string>
  css: ConfigVarsCss
  js: ConfigVarsJs
  formId: string
}

/**
 * @typedef {'project'|'track'|'term'} ConfigContentType
 */
export type ConfigContentType = 'project' | 'track' | 'term'

/**
 * @typedef {'Project'|'Track'|'Term'} ConfigContentTypeLabel
 */
export type ConfigContentTypeLabel = 'Project' | 'Track' | 'Term'

/**
 * @typedef {'foreground-base'|'foreground-light'|'foreground-dark'|'background-light'} ConfigBackgroundColor
 */
export type ConfigBackgroundColor = 'foreground-base' | 'foreground-light' | 'foreground-dark' | 'background-light'

/**
 * @typedef {'div'|'section'|'ul'|'ol' |'li'|'figure'|'figcaption'|'article'|'aside'|'header'|'footer'|'address'} ConfigTag
 */
export type ConfigTag =
  'div' |
  'section' |
  'ul' |
  'ol' |
  'li' |
  'figure' |
  'figcaption' |
  'article' |
  'aside' |
  'header' |
  'footer' |
  'address'

/**
 * @typedef {'Div'|'Section'|'Unordered List'|'Ordered List'|'List Item'|'Figure'|'Figure Caption'|'Article'|'Aside'|'Header|'Footer'|'Address'} ConfigTagLabel
 */
export type ConfigTagLabel =
  'Div' |
  'Section' |
  'Unordered List' |
  'Ordered List' |
  'List Item' |
  'Figure' |
  'Figure Caption' |
  'Article' |
  'Aside' |
  'Header' |
  'Footer' |
  'Address'

/**
 * @typedef {'5xs'|'4xs'|'3xs'|'2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl'} ConfigSize
 */
export type ConfigSize =
  '5xs' |
  '4xs' |
  '3xs' |
  '2xs' |
  'xs' |
  's' |
  'm' |
  'l' |
  'xl' |
  '2xl' |
  '3xl' |
  '4xl'

/**
 * @typedef {'5px'|'10px'|'15px'|'20px'|'30px'|'40px'|'60px'|'80px'|'100px'|'120px'} ConfigPaddingLabel
 */
export type ConfigPaddingLabel =
  '5px' |
  '10px' |
  '15px' |
  '20px' |
  '30px' |
  '40px' |
  '60px' |
  '80px' |
  '100px' |
  '120px'

/**
 * @typedef {'5px'|'10px'|'15px'|'20px'|'30px'|'40px'|'60px'|'80px'} ConfigGapLabel
 */
export type ConfigGapLabel =
  '5px' |
  '10px' |
  '15px' |
  '20px' |
  '30px' |
  '40px' |
  '60px' |
  '80px'

/**
 * @typedef {'start'|'center'|'end'|'between'} ConfigJustify
 */
export type ConfigJustify = 'start' | 'center' | 'end' | 'between'

/**
 * @typedef {'Start'|'Center'|'End'|'Spread'} ConfigJustifyLabel
 */
export type ConfigJustifyLabel = 'Start' | 'Center' | 'End' | 'Spread'

/**
 * @typedef {'start'|'center'|'end'} ConfigAlign
 */
export type ConfigAlign = 'start' | 'center' | 'end'

/**
 * @typedef {'Start'|'Center'|'End'} ConfigAlignLabel
 */
export type ConfigAlignLabel = 'Start' | 'Center' | 'End'

/**
 * @typedef {'1-1'|'5-4'|'16-9'} ConfigAspectRatio
 */
export type ConfigAspectRatio = '1-1' | '5-4' | '16-9'

/**
 * @typedef {'1:1'|'5:4'|'16:9'} ConfigAspectRatioLabel
 */
export type ConfigAspectRatioLabel = '1:1' | '5:4' | '16:9'

/**
 * @typedef {0|600|900|1200} ConfigBreakpoint
 */
export type ConfigBreakpoint = 0 | 600 | 900 | 1200

/**
 * @typedef {'default'|'m'|'s'} ConfigContainer
 */
export type ConfigContainer = 'default' | 'm' | 's'

/**
 * @typedef {'1300px'|'1040px'|'650px'} ConfigContainerLabel
 */
export type ConfigContainerLabel = '1300px' | '1040px' | '650px'

/**
 * @typedef {'12'|'11'|'10'|'9'|'8'|'7'|'6'|'5'|'4'|'3'|'2'|'1'} ConfigColumn
 */
export type ConfigColumn =
  '12' |
  '11' |
  '10' |
  '9' |
  '8' |
  '7' |
  '6' |
  '5' |
  '4' |
  '3' |
  '2' |
  '1'

/**
 * @typedef {'1/1'|'5/6'|'4/5'|'3/4'|'2/3'|'3/5'|'1/2'|'2/5'|'1/3'|'1/4'|'1/5'|'1/6'} ConfigColumnLabel
 */
export type ConfigColumnLabel = 
  '1/1' |
  '5/6' |
  '4/5' |
  '3/4' |
  '2/3' |
  '3/5' |
  '1/2' |
  '2/5' |
  '1/3' |
  '1/4' |
  '1/5' |
  '1/6'

/**
 * @typedef {'xl'|'l'|'m'|'s'|'xs'} ConfigHeading
 */
export type ConfigHeading = 'xl' | 'l' | 'm' | 's' | 'xs'

/**
 * @typedef {'h2'|'h3'|'h4'|'h5'|'h6'} ConfigHeadingLevel
 */
export type ConfigHeadingLevel = 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * @typedef {'Heading Two'|'Heading Three'|'Heading Four'|'Heading Five'|'Heading Six'} ConfigHeadingLabel
 */
export type ConfigHeadingLabel =
  'Heading Two' |
  'Heading Three' |
  'Heading Four' |
  'Heading Five' |
  'Heading Six'

/**
 * @typedef {'xl'|'l'|'m-flex'|'s'} ConfigText
 */
export type ConfigText = 'xl' | 'l' | 'm-flex' | 's'

/**
 * @typedef {'Extra Large'|'Large'|'Medium'|'Small'} ConfigTextLabel
 */
export type ConfigTextLabel =
  'Extra Large' |
  'Large' |
  'Medium' |
  'Small'

/**
 * @typedef {'left'|'center'} ConfigTextAlign
 */
export type ConfigTextAlign = 'left' | 'center'

/**
 * @typedef {'Left'|'Center'} ConfigTextAlignLabel
 */
export type ConfigTextAlignLabel = 'Left' | 'Center'

/**
 * @typedef {'Text'|'Email'|'Tel'|'Checkbox'|'Radio'|'Number'|'Textarea'|'Select'} ConfigFieldTypeLabel
 */
export type ConfigFieldTypeLabel =
  'Text' |
  'Email' |
  'Tel' |
  'Checkbox' |
  'Radio' |
  'Number' |
  'Textarea' |
  'Select'
