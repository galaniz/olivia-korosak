# Button  

**<code>Button(props: ButtonProps): string</code>**  

Output link button.

## Parameters  
- **`props`** <code><a href="#buttonprops">ButtonProps</a></code> required

## Returns  

<code>string</code> HTMLAnchorElement|HTMLDivElement

## Types

### ButtonArgs  

**Type:** <code>object</code>

#### Properties  
- **`title`** <code>string</code> optional  
- **`internalLink`** <code>InternalLink</code> optional  
- **`externalLink`** <code>string</code> optional  
- **`link`** <code>string</code> optional  
- **`type`** <code>&#39;Primary&#39; | &#39;Secondary&#39; | &#39;Icon&#39;</code> optional  
Default: `'Primary'`  
- **`size`** <code>&#39;Large&#39;</code> optional  
- **`justify`** <code><a href="/src/config/README.md#configjustifylabel">ConfigJustifyLabel</a></code> optional  
- **`paddingTop`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional  
- **`paddingBottom`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional

### ButtonProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#buttonargs">ButtonArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional