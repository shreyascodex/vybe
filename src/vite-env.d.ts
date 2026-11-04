/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL that accepts a JSON POST with { email, source }. See README. */
  readonly VITE_EARLY_ACCESS_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
