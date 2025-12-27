/// <reference types="vite/client" />

/**
 * https://vite.dev/guide/env-and-mode#intellisense-for-typescript
*/
interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string | undefined;
}
