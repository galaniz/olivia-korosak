# Content  

**<code>Content(props: ContentProps): string[]</code>**  

Output content wrapper.

## Parameters  
- **`props`** <code><a href="#contentprops">ContentProps</a></code> required

## Returns  

<code>string[]</code> HTMLDivElement

## Types

### ContentArgs  

**Type:** <code>object</code>

#### Properties  
- **`textStyle`** <code><a href="/src/config/README.md#configtextlabel">ConfigTextLabel</a></code> optional  
Default: `'Extra Large'`  
- **`headingStyle`** <code><a href="/src/config/README.md#configheadinglabel">ConfigHeadingLabel</a></code> optional  
- **`align`** <code><a href="/src/config/README.md#configtextalignlabel">ConfigTextAlignLabel</a></code> optional  
Default: `'Left'`  
- **`gap`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`gapLarge`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`richTextStyles`** <code>boolean</code> optional  
Default: `true`  
- **`classes`** <code>string</code> optional  
Custom classes. Back end option.

### ContentProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#contentargs">ContentArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional