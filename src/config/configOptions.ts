/**
 * Config - Options
 */

/* Imports */

import type {
  ConfigTag,
  ConfigTagLabel,
  ConfigSize,
  ConfigPaddingLabel,
  ConfigGapLabel,
  ConfigJustify,
  ConfigJustifyLabel,
  ConfigAlign,
  ConfigAlignLabel,
  ConfigContainer,
  ConfigContainerLabel,
  ConfigBreakpoint,
  ConfigColumn,
  ConfigColumnLabel
} from './configTypes.js'

/**
 * Tag values.
 *
 * @type {Map<ConfigTagLabel, ConfigTag>}
 */
export const configTag: Map<ConfigTagLabel, ConfigTag> = new Map([
  ['Div', 'div'],
  ['Section', 'section'],
  ['Unordered List', 'ul'],
  ['Ordered List', 'ol'],
  ['List Item', 'li'],
  ['Figure', 'figure'],
  ['Figure Caption', 'figcaption'],
  ['Article', 'article'],
  ['Aside', 'aside'],
  ['Header', 'header'],
  ['Footer', 'footer'],
  ['Address', 'address']
])

/**
 * Justify values.
 *
 * @type {Map<ConfigJustifyLabel, ConfigJustify>}
 */
export const configJustify: Map<ConfigJustifyLabel, ConfigJustify> = new Map([
  ['Start', 'start'],
  ['Center', 'center'],
  ['End', 'end'],
  ['Spread', 'between']
])

/**
 * Align values.
 *
 * @type {Map<ConfigAlignLabel, ConfigAlign>}
 */
export const configAlign: Map<ConfigAlignLabel, ConfigAlign> = new Map([
  ['Start', 'start'],
  ['Center', 'center'],
  ['End', 'end']
])

/**
 * Padding size values.
 *
 * @type {Map<ConfigPaddingLabel, ConfigSize>}
 */
export const configPadding: Map<ConfigPaddingLabel, ConfigSize> = new Map([
  ['5px', '5xs'],
  ['10px', '4xs'],
  ['15px', '3xs'],
  ['20px', '2xs'],
  ['30px', 's'],
  ['40px', 'm'],
  ['60px', 'xl'],
  ['80px', '2xl'],
  ['100px', '3xl'],
  ['120px', '4xl']
])

/**
 * Gap size values.
 *
 * @type {Map<ConfigGapLabel, ConfigSize>}
 */
export const configGap: Map<ConfigGapLabel, ConfigSize> = new Map([
  ['5px', '5xs'],
  ['10px', '4xs'],
  ['15px', '3xs'],
  ['20px', '2xs'],
  ['30px', 's'],
  ['40px', 'm'],
  ['60px', 'xl'],
  ['80px', '2xl']
])

/**
 * Container suffix values.
 *
 * @type {Map<ConfigContainerLabel, ConfigContainer>}
 */
export const configContainer: Map<ConfigContainerLabel, ConfigContainer> = new Map([
  ['1300px', 'default'],
  ['1040px', 'm'],
  ['650px', 's']
])

/**
 * Container numbers.
 *
 * @type {Object<ConfigContainerLabel, number>}
 */
export const configContainerNumbers: Record<ConfigContainerLabel, number> = {
  '1300px': 1300,
  '1040px': 1040,
  '650px': 650
}

/**
 * Breakpoint numbers.
 *
 * @type {ConfigBreakpoint[]}
 */
export const configBreakpointNumbers: ConfigBreakpoint[] = [
  0,
  600,
  900,
  1200
]

/**
 * Column values.
 *
 * @type {Map<ConfigColumnLabel, ConfigColumn>}
 */
export const configColumns: Map<ConfigColumnLabel, ConfigColumn> = new Map([
  ['1/1', '12'],
  ['5/6', '11'],
  ['4/5', '10'],
  ['3/4', '9'],
  ['2/3', '8'],
  ['3/5', '7'],
  ['1/2', '6'],
  ['2/5', '5'],
  ['1/3', '4'],
  ['1/4', '3'],
  ['1/5', '2'],
  ['1/6', '1']
])

/**
 * Column floats.
 *
 * @type {Object<ConfigColumnLabel, number>}
 */
export const configColumnFloats: Record<ConfigColumnLabel, number> = {
  '1/1': 1,
  '5/6': 0.9166,
  '4/5': 0.8333,
  '3/4': 0.75,
  '2/3': 0.6667,
  '3/5': 0.5833,
  '1/2': 0.5,
  '2/5': 0.4167,
  '1/3': 0.3333,
  '1/4': 0.25,
  '1/5': 0.1666,
  '1/6': 0.0833
}
