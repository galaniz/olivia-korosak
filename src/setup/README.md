# Setup

## initDevCache  

**<code>initDevCache(filters: Filters): Promise&lt;void&gt;</code>**  

Keyv cache for dev environment.

### Parameters  
- **`filters`** <code>Filters</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## getDevData  

**<code>getDevData(devPaths?: string[]): Promise&lt;RenderAllData&gt;</code>**  

Data based on esbuild dev request paths.

### Parameters  
- **`devPaths`** <code>string[]</code> optional

### Returns  

<code>Promise&lt;RenderAllData&gt;</code>

## setupBuild  

**<code>setupBuild(build: boolean, devPaths?: string[]): Promise&lt;RenderReturn&gt;[]</code>**  

Set up config, filters, actions and fetch/render in build context.

### Parameters  
- **`build`** <code>boolean</code> required  
- **`devPaths`** <code>string[]</code> optional  
Default: `[]`

### Returns  

<code>Promise&lt;RenderReturn&gt;[]</code>