// Authentication is now handled externally at https://panel.craftuary.com
// Minimal type definitions to maintain compatibility

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      safeGetSession: () => Promise<{
        session: null
        user: null
        amr: null
      }>
      session: null
      user: null
    }
    interface PageData {
      session: null
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {}
