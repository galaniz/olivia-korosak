# Esbuild

## isWatch  

Watch state.  

**Type:** <code>boolean</code>

## isSite  

Build site.  

**Type:** <code>boolean</code>

## siteFiles  

Site files.  

**Type:** <code>string[]</code>

## siteCopyAssets  

Site copy assets.  

**Type:** <code>Object&lt;string, string&gt;</code>

## siteArgs  

Site context args.  

**Type:** <code>BuildOptions</code>

## esbuildScss  

**<code>esbuildScss(): Plugin</code>**  

Transform SCSS content.

### Returns  

<code>Plugin</code>

## esbuildHtml  

**<code>esbuildHtml(args: EsbuildHtmlArgs): Plugin</code>**  

Create site HTML files.

### Parameters  
- **`args`** <code>EsbuildHtmlArgs</code> required

### Returns  

<code>Plugin</code>

## argExists  

**<code>argExists(a: string): boolean</code>**  

Check if arg exists.

### Parameters  
- **`a`** <code>string</code> required

### Returns  

<code>boolean</code>