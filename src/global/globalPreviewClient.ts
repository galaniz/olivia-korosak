/**
 * Global - Preview Client
 */

import { ContentfulLivePreview } from '@contentful/live-preview'

const previewInit = async () => {
  await ContentfulLivePreview.init({ locale: 'en-CA' })

  const isContentfulPreview = window.self !== window.top

  if (isContentfulPreview) {
    document.documentElement.dataset.preview = 'contentful'
  }
}

await previewInit()
