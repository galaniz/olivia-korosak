# Embed  

Handles loading iframe with provided URL.

## Constructor  

**<code>new Embed(): Embed</code>**  

Create new instance.

## Properties

### loads  

Button element triggers loading.  

**Type:** <code>HTMLButtonElement | null</code>

### templates  

Templates for loader and error.  

**Type:** <code>Map&lt;<a href="#embedtemplate">EmbedTemplate</a>, HTMLElement&gt;</code>

### init  

Initialize success.  

**Type:** <code>boolean</code>

## Methods

### connectedCallback  

**<code>connectedCallback(): </code>**  

Init after added to DOM.

### disconnectedCallback  

**<code>disconnectedCallback(): </code>**  

Clean up after removed from DOM.# Embed  

**<code>Embed(props: EmbedProps): string</code>**  

Output YouTube or Vimeo embed.

## Parameters  
- **`props`** <code><a href="#embedprops">EmbedProps</a></code> required

## Returns  

<code>string</code> HTMLElement

## Types

### EmbedTemplate  

**Type:** <code>&#39;loader&#39; | &#39;error&#39;</code>

### EmbedArgs  

**Type:** <code>object</code>

#### Properties  
- **`link`** <code>string</code> optional  
- **`title`** <code>string</code> optional  
- **`text`** <code>RenderRichText[]</code> optional

### EmbedProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#embedargs">EmbedArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional  
- **`children`** <code><a href="/src/global/README.md#item">Item</a>[]</code> optional