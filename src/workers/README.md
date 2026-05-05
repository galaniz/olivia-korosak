# Workers

## workerServerlessSetup  

**<code>workerServerlessSetup(serverlessData?: RenderServerlessData, previewData?: RenderPreviewData, env?: Generic, error?: boolean): </code>**  

Set up config, filters, actions and store in serverless context.

### Parameters  
- **`serverlessData`** <code>RenderServerlessData</code> optional  
- **`previewData`** <code>RenderPreviewData</code> optional  
- **`env`** <code>Generic</code> optional  
- **`error`** <code>boolean</code> optional  
Default: `false`

## workerServerlessFilter  

**<code>workerServerlessFilter(request: WorkerRequest): Promise&lt;(WorkerServerlessReturn|undefined)&gt;</code>**  

Filter worker responses.

### Parameters  
- **`request`** <code><a href="#workerrequest">WorkerRequest</a></code> required

### Returns  

<code>Promise&lt;(<a href="#workerserverlessreturn">WorkerServerlessReturn</a>|undefined)&gt;</code>

## workerServerlessPosts  

**<code>workerServerlessPosts(props: PostsServerlessProps, env?: Generic): Promise&lt;Response&gt;</code>**  

Posts and pagination as JSON data.

### Parameters  
- **`props`** <code><a href="/src/objects/Posts/README.md#postsserverlessprops">PostsServerlessProps</a></code> required  
- **`env`** <code>Generic</code> optional

### Returns  

<code>Promise&lt;Response&gt;</code>

## workerServerlessTurnstile  

**<code>workerServerlessTurnstile(data: ServerlessActionData, request: Request, env: WorkerEnv): Promise&lt;void&gt;</code>**  

Verify Turnstile token.

### Parameters  
- **`data`** <code>ServerlessActionData</code> required  
- **`request`** <code>Request</code> required  
- **`env`** <code><a href="#workerenv">WorkerEnv</a></code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## Types

### WorkerRequest  

**Type:** <code>object</code>  

**Augments:** <code>Request</code>

#### Properties  
- **`cf`** <code>IncomingRequestCfProperties</code> optional

### WorkerServerlessReturn  

**Type:** <code>object</code>

#### Properties  
- **`type`** <code>&#39;404&#39; | &#39;reload&#39; | &#39;posts&#39;</code> required  
- **`data`** <code>RenderServerlessData</code> optional

### WorkerEnv  

**Type:** <code>object</code>  

**Augments:** <code>Generic</code>

#### Properties  
- **`CF_TURNSTILE_KEY`** <code>string</code> optional