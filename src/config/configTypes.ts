/**
 * Config - Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} ConfigEnv
 * @extends {Generic}
 * @prop {string} [ENVIRONMENT]
 */
export interface ConfigEnv extends Generic {
  ENVIRONMENT?: string
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
 * @typedef {2|3|4|5|6} ConfigHeadingLevel
 */
export type ConfigHeadingLevel = 2 | 3 | 4 | 5 | 6
