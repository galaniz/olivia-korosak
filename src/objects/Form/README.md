# Form

## FormFieldEmail  

Handles email validation.

### Constructor  

**<code>new FormFieldEmail(): FormFieldEmail</code>**  

Create new instance.

### Properties

#### formId  

Form ID for filters.  

**Type:** <code>string</code>

#### inputName  

Name of input field to filter.  

**Type:** <code>string</code>

#### init  

Initialize success.  

**Type:** <code>boolean</code>

### Methods

#### connectedCallback  

**<code>connectedCallback(): </code>**  

Init after added to DOM.

#### disconnectedCallback  

**<code>disconnectedCallback(): </code>**  

Clean up after removed from DOM.

## Form  

Handles form submissions.

### Constructor  

**<code>new Form(): Form</code>**  

Create new instance.

### Properties

#### submits  

Submit button.  

**Type:** <code>HTMLButtonElement | null</code>

#### action  

Serverless action.  

**Type:** <code><a href="#formaction">FormAction</a></code>

#### env  

CMS environment.  

**Type:** <code>string</code>

#### successTitle  

Success title.  

**Type:** <code>string</code>

#### successText  

Success text.  

**Type:** <code>string</code>

#### siteKey  

Turnstile site key.  

**Type:** <code>string</code>

### Methods

#### connectedCallback  

**<code>connectedCallback(): </code>**  

Init after added to DOM.

#### disconnectedCallback  

**<code>disconnectedCallback(): </code>**  

Clean up after removed from DOM.

#### submit  

**<code>submit(e: SubmitEvent): Promise&lt;void&gt;</code>**  

Submit handler on form element sends data to worker if valid.

##### Parameters  
- **`e`** <code>SubmitEvent</code> required

##### Returns  

<code>Promise&lt;void&gt;</code>

## FormField  

**<code>FormField(props: FormFieldProps): FormFieldProps</code>**  

Filter formation form field props.

### Parameters  
- **`props`** <code><a href="#formfieldprops">FormFieldProps</a></code> required

### Returns  

<code><a href="#formfieldprops">FormFieldProps</a></code>

## Form  

**<code>Form(props: FormProps): FormProps</code>**  

Filter formation form props.

### Parameters  
- **`props`** <code><a href="#formprops">FormProps</a></code> required

### Returns  

<code><a href="#formprops">FormProps</a></code>

## Types

### FormFieldType  

**Type:** <code>FormationFormFieldType | <a href="/src/config/README.md#configfieldtypelabel">ConfigFieldTypeLabel</a></code>

### FormFieldArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationFormFieldArgs</code>

#### Properties  
- **`type`** <code><a href="#formfieldtype">FormFieldType</a></code> optional  
Default: `'Text'`  
- **`width`** <code><a href="/src/layouts/Column/README.md#columnwidth">ColumnWidth</a></code> optional  
Default: `'1/1'`  
- **`autoComplete`** <code>string</code> optional  
- **`placeholder`** <code>string</code> optional  
- **`rows`** <code>number</code> optional  
Default: `5`

### FormFieldProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#formfieldargs">FormFieldArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional

### FormAction  

**Type:** <code>&#39;contact&#39; | &#39;contact-dev&#39;</code>

### FormArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationFormArgs</code>

#### Properties  
- **`successTitle`** <code>string</code> optional  
- **`successText`** <code>string</code> optional  
- **`senderEmail`** <code>string</code> optional  
- **`toEmail`** <code>string</code> optional  
- **`subject`** <code>string</code> optional

### FormProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#formargs">FormArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional