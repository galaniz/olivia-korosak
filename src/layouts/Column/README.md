# Column  

**<code>Column(props: ColumnProps): ColumnProps</code>**  

Filter formation column props.

## Parameters  
- **`props`** <code><a href="#columnprops">ColumnProps</a></code> required

## Returns  

<code><a href="#columnprops">ColumnProps</a></code>

## Types

### ColumnTag  

**Type:** <code><a href="/src/config/README.md#configtag">ConfigTag</a> | <a href="/src/config/README.md#configtaglabel">ConfigTagLabel</a></code>

### ColumnWidth  

**Type:** <code><a href="/src/config/README.md#configcolumn">ConfigColumn</a> | <a href="/src/config/README.md#configcolumnlabel">ConfigColumnLabel</a></code>

### ColumnArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationColumnArgs</code>

#### Properties  
- **`id`** <code>string</code> optional  
- **`field`** <code>string</code> optional  
- **`tag`** <code><a href="#columntag">ColumnTag</a></code> optional  
Default: `'Div'`  
- **`width`** <code><a href="#columnwidth">ColumnWidth</a></code> optional  
Default: `'1/1'`  
- **`widthSmall`** <code><a href="#columnwidth">ColumnWidth</a></code> optional  
- **`widthMedium`** <code><a href="#columnwidth">ColumnWidth</a></code> optional  
- **`widthLarge`** <code><a href="#columnwidth">ColumnWidth</a></code> optional  
- **`justify`** <code><a href="/src/config/README.md#configjustifylabel">ConfigJustifyLabel</a></code> optional  
- **`align`** <code><a href="/src/config/README.md#configalignlabel">ConfigAlignLabel</a></code> optional  
- **`classes`** <code>string</code> optional  
Custom classes. Back end option.

### ColumnProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#columnargs">ColumnArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional