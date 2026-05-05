# Global

## Types

### Locale  

**Type:** <code>&#39;en-CA&#39;</code>

### Color  

**Type:** <code>object</code>

#### Properties  
- **`value`** <code>string</code> required

### Item  

**Type:** <code>object</code>  

**Augments:** <code>RenderItem</code>

#### Properties  
- **`locale`** <code><a href="#locale">Locale</a></code> optional  
- **`heroTitle`** <code>string</code> optional  
- **`heroText`** <code>string</code> optional  
- **`heroImage`** <code>RenderFile</code> optional  
- **`date`** <code>string</code> optional  
- **`createdAt`** <code>string</code> optional  
- **`updatedAt`** <code>string</code> optional  
- **`order`** <code>number</code> optional  
- **`colorFrom`** <code><a href="#color">Color</a></code> optional  
- **`audio`** <code>RenderFile</code> optional  
- **`audioDuration`** <code>string</code> optional  
- **`similar`** <code><a href="#item">Item</a>[]</code> optional  
- **`project`** <code><a href="#item">Item</a>[]</code> optional  
- **`projectType`** <code>InternalLink[]</code> optional  
- **`genre`** <code>InternalLink[]</code> optional  
- **`code`** <code>number</code> optional