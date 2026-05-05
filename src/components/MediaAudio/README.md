# Media Audio

## MediaAudio  

Handles loading and playing audio tracks.

### Constructor  

**<code>new MediaAudio(): MediaAudio</code>**  

Create new instance.

### Properties

#### tracks  

Track elements by ID.  

**Type:** <code>Map&lt;string, HTMLElement&gt;</code>

#### toggles  

Track control elements by ID.  

**Type:** <code>Map&lt;string, HTMLButtonElement&gt;</code>

#### prev  

Previous track button element.  

**Type:** <code>HTMLButtonElement | null</code>

#### next  

Next track button element.  

**Type:** <code>HTMLButtonElement | null</code>

#### close  

Close player button element.  

**Type:** <code>HTMLButtonElement | null</code>

#### link  

Title link element.  

**Type:** <code>HTMLAnchorElement | null</code>

#### current  

Current track index.  

**Type:** <code>number</code>

#### open  

Open state of player.  

**Type:** <code>boolean</code>

#### subInit  

Initialize success.  

**Type:** <code>boolean</code>

### Methods

#### connectedCallback  

**<code>connectedCallback(): </code>**  

Init after added to DOM.

#### disconnectedCallback  

**<code>disconnectedCallback(): </code>**  

Clean up after removed from DOM.

## getMediaAudioTrackData  

**<code>getMediaAudioTrackData(item: Item): MediaAudioTrackData | undefined</code>**  

Data from item data for display and scripts.

### Parameters  
- **`item`** <code><a href="/src/global/README.md#item">Item</a></code> required

### Returns  

<code>MediaAudioTrackData | undefined</code>

## MediaAudio  

**<code>MediaAudio(): string</code>**  

Output media audio player.

### Returns  

<code>string</code> HTMLElement

## MediaAudioHero  

**<code>MediaAudioHero(itemData: Item): string</code>**  

Output track hero section.

### Parameters  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> required

### Returns  

<code>string</code> HTMLSectionElement

## MediaAudioTracks  

**<code>MediaAudioTracks(args: MediaAudioTracksArgs): string</code>**  

Output media audio tracks content.

### Parameters  
- **`args`** <code><a href="#mediaaudiotracksargs">MediaAudioTracksArgs</a></code> required

### Returns  

<code>string</code> HTMLElement

## MediaAudioTracksContainer  

**<code>MediaAudioTracksContainer(output: string, pagination?: boolean, contentType?: string): string</code>**  

Output media audio tracks table.

### Parameters  
- **`output`** <code>string</code> required  
- **`pagination`** <code>boolean</code> optional  
- **`contentType`** <code>string</code> optional

### Returns  

<code>string</code> HTMLTableElement

## Types

### MediaAudioTracksArgs  

**Type:** <code>object</code>

#### Properties  
- **`items`** <code><a href="/src/global/README.md#item">Item</a>[]</code> required  
- **`itemContains`** <code>Set&lt;string&gt;</code> optional  
- **`contentType`** <code>string</code> optional  
Default: `'page'`  
- **`pagination`** <code>boolean</code> optional  
Default: `false`  
- **`parents`** <code>Parent[]</code> optional