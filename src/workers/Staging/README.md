# Staging

## exports  

Manage staging site assets and requests.

### Constructor  

**<code>new exports(): exports</code>**

## fetch  

**<code>fetch(request: WorkerRequest): Promise&lt;Response&gt;</code>**  

Route serverless and serve assets.

### Parameters  
- **`request`** <code><a href="/src/workers/README.md#workerrequest">WorkerRequest</a></code> required

### Returns  

<code>Promise&lt;Response&gt;</code>

## render  

**<code>render(serverlessData?: RenderServerlessData, previewData?: RenderPreviewData): Promise&lt;Response&gt;</code>**  

Re-render page with serverless or preview data.

### Parameters  
- **`serverlessData`** <code>RenderServerlessData</code> optional  
- **`previewData`** <code>RenderPreviewData</code> optional

### Returns  

<code>Promise&lt;Response&gt;</code>