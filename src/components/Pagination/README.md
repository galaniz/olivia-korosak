# Pagination  

Handles posts pagination.

## Constructor  

**<code>new Pagination(): Pagination</code>**  

Create new instance.

## Methods

### connectedCallback  

**<code>connectedCallback(): </code>**  

Init after added to DOM.

### disconnectedCallback  

**<code>disconnectedCallback(): </code>**  

Clean up after removed from DOM.

### request  

**<code>request(source: PaginationSource): Promise&lt;void&gt;</code>**  

Fetch posts data.

#### Parameters  
- **`source`** <code>PaginationSource</code> required

#### Returns  

<code>Promise&lt;void&gt;</code># Pagination  

**<code>Pagination(args: PaginationArgs, returnType?: PaginationReturnKind): PaginationReturnType</code>**  

Output pagination navigation.

## Parameters  
- **`args`** <code><a href="#paginationargs">PaginationArgs</a></code> required  
- **`returnType`** <code><a href="#paginationreturnkind">PaginationReturnKind</a></code> optional  
Default: `'string'`

## Returns  

<code><a href="#paginationreturntype">PaginationReturnType</a></code>

## Types

### PaginationArgs  

**Type:** <code>object</code>

#### Properties  
- **`output`** <code>string</code> required  
- **`total`** <code>number</code> required  
- **`current`** <code>number</code> required  
- **`archiveType`** <code><a href="/src/config/README.md#configcontenttype">ConfigContentType</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> required  
- **`serverlessData`** <code>RenderServerlessData</code> optional  
- **`filters`** <code>Object&lt;string, string&gt;</code> optional

### PaginationReturnKind  

**Type:** <code>&#39;string&#39; | &#39;data&#39;</code>

### PaginationServerlessData  

**Type:** <code>object</code>

#### Properties  
- **`nav`** <code>string</code> required  
- **`entries`** <code>string</code> required  
- **`title`** <code>string</code> required  
- **`canonical`** <code>string</code> required  
- **`prev`** <code>string</code> required  
- **`next`** <code>string</code> required  
- **`script`** <code>Generic</code> optional

### PaginationReturnType  

**Type:** <code>string | <a href="#paginationserverlessdata">PaginationServerlessData</a></code>