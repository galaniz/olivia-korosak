# postsCache  

Cache posts data.  

**Type:** <code>Map&lt;string, RenderData&gt;</code># postsFields  

Additional fields by content type.  

**Type:** <code>Object&lt;<a href="/src/config/README.md#configcontenttype">ConfigContentType</a>, string&gt;</code># postsTermFields  

Term fields by content type.  

**Type:** <code>Object&lt;<a href="/src/config/README.md#configcontenttype">ConfigContentType</a>, string&gt;</code># Posts  

**<code>Posts(props: PostsProps, returnType?: PostsReturnKind): Promise&lt;PostsReturnType&gt;</code>**  

Output posts.

## Parameters  
- **`props`** <code><a href="#postsprops">PostsProps</a></code> required  
- **`returnType`** <code><a href="#postsreturnkind">PostsReturnKind</a></code> optional  
Default: `'string'`

## Returns  

<code>Promise&lt;<a href="#postsreturntype">PostsReturnType</a>&gt;</code>

## Types

### PostsArgs  

**Type:** <code>object</code>

#### Properties  
- **`contentTypes`** <code><a href="/src/config/README.md#configcontenttypelabel">ConfigContentTypeLabel</a>[]</code> optional  
Default: `['Project']`  
- **`display`** <code>number</code> optional  
Default: `12`  
- **`headingLevel`** <code><a href="/src/config/README.md#configheadinglabel">ConfigHeadingLabel</a></code> optional  
Default: `'Heading Three'`  
- **`pagination`** <code>boolean</code> optional  
Default: `false`  
- **`filters`** <code>string[]</code> optional  
- **`exclude`** <code>boolean</code> optional  
Default: `false`

### PostsProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#postsargs">PostsArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional

### PostsReturnKind  

**Type:** <code>&#39;string&#39; | &#39;data&#39;</code>

### PostsReturnType  

**Type:** <code>string | <a href="/src/components/Pagination/README.md#paginationserverlessdata">PaginationServerlessData</a></code>