/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 自定义环境变量
  readonly VITE_CUSTOM_VARIABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
