# Image  

**<code>Image(props: ImageProps): string</code>**  

Output image.

## Parameters  
- **`props`** <code><a href="#imageprops">ImageProps</a></code> required

## Returns  

<code>string</code> HTMLDivElement|HTMLElement

## Types

### ImageArgs  

**Type:** <code>object</code>

#### Properties  
- **`image`** <code>RenderFile</code> optional  
- **`aspectRatio`** <code><a href="/src/config/README.md#configaspectratiolabel">ConfigAspectRatioLabel</a></code> optional  
- **`maxWidth`** <code>number</code> optional  
- **`viewportWidth`** <code>number</code> optional  
Default: `80`  
- **`sizes`** <code>string</code> optional  
- **`caption`** <code>RenderRichText[]</code> optional  
- **`lazy`** <code>boolean</code> optional  
Default: `true`  
- **`classes`** <code>string</code> optional

### ImageProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#imageargs">ImageArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional