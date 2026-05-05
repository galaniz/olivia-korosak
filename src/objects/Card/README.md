# Card

## Card  

**<code>Card(props: CardProps): string | string[]</code>**  

Output card.

### Parameters  
- **`props`** <code><a href="#cardprops">CardProps</a></code> required

### Returns  

<code>string | string[]</code> HTMLDivElement

## CardColumn  

**<code>CardColumn(args: PostsItemArgs): string</code>**  

Output card list item.

### Parameters  
- **`args`** <code><a href="/src/objects/Posts/README.md#postsitemargs">PostsItemArgs</a></code> required

### Returns  

<code>string</code> HTMLLIElement

## CardContainer  

**<code>CardContainer(output: string, pagination?: boolean): string</code>**  

Output card list.

### Parameters  
- **`output`** <code>string</code> required  
- **`pagination`** <code>boolean</code> optional  
Default: `false`

### Returns  

<code>string</code> HTMLUListElement

## Types

### CardArgs  

**Type:** <code>object</code>

#### Properties  
- **`internalLink`** <code>InternalLink</code> optional  
- **`externalLink`** <code>string</code> optional  
- **`gap`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`gapLarge`** <code><a href="/src/config/README.md#configgaplabel">ConfigGapLabel</a></code> optional  
- **`overlay`** <code>boolean</code> optional  
Default: `false`  
- **`embed`** <code>boolean</code> optional  
Default: `false`  
- **`embedTitle`** <code>string</code> optional  
- **`embedText`** <code>RenderRichText[]</code> optional  
- **`colorFrom`** <code><a href="/src/global/README.md#color">Color</a></code> optional  
Background gradient. Back end option.

### CardProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#cardargs">CardArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional