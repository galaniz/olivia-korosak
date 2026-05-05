# Container  

**<code>Container(props: ContainerProps): ContainerProps</code>**  

Filter formation container props.

## Parameters  
- **`props`** <code><a href="#containerprops">ContainerProps</a></code> required

## Returns  

<code><a href="#containerprops">ContainerProps</a></code>

## Types

### ContainerTag  

**Type:** <code><a href="/src/config/README.md#configtag">ConfigTag</a> | <a href="/src/config/README.md#configtaglabel">ConfigTagLabel</a></code>

### ContainerMaxWidth  

**Type:** <code><a href="/src/config/README.md#configcontainer">ConfigContainer</a> | <a href="/src/config/README.md#configcontainerlabel">ConfigContainerLabel</a></code>

### ContainerArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationContainerArgs</code>

#### Properties  
- **`tag`** <code><a href="#containertag">ContainerTag</a></code> optional  
Default: `'Div'`  
- **`maxWidth`** <code><a href="#containermaxwidth">ContainerMaxWidth</a></code> optional  
- **`layout`** <code>&#39;Block&#39; | &#39;Column&#39; | &#39;Row&#39;</code> optional  
Default: `'Block'`  
- **`paddingTop`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional  
- **`paddingTopLarge`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional  
- **`paddingBottom`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional  
- **`paddingBottomLarge`** <code><a href="/src/config/README.md#configpaddinglabel">ConfigPaddingLabel</a></code> optional  
- **`gap`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`gapLarge`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`justify`** <code><a href="/src/config/README.md#configjustifylabel">ConfigJustifyLabel</a></code> optional  
- **`align`** <code><a href="/src/config/README.md#configalignlabel">ConfigAlignLabel</a></code> optional  
- **`classes`** <code>string</code> optional  
Custom classes. Back end option.

### ContainerProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#containerargs">ContainerArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional