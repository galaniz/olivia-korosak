/**
 * Window
 */

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, params: {
        sitekey: string
        callback: (token: string) => void
        'error-callback': (error: unknown) => void
      }) => void
      reset: (id: string) => void
      execute: (container: string | HTMLElement, params: {
        callback: (token: string) => void
        'error-callback': (error: unknown) => void
      }) => void
    }
  }
}

export {}
