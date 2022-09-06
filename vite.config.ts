import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入path包注意两点:
// 1. 为避免类型报错，你需要通过`pnpm i @types/node -D`安装类型
// 2. tsconfig.node.json中设置`allowSyntheticDefaultImports: true`,以允许下面的default导入方式
import path from 'path'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'

// 全局scss文件的路径
// 用normalizePath解决window下的路径问题
const variablePath = normalizePath(path.resolve(path.join(__dirname, 'src/variable.scss')))

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.join(__dirname, 'src'),
  plugins: [
    vue(),
    // 在开发阶段进行eslint扫描，以命令行的方式展示
    viteEslint()
  ],
  css: {
    // postcss配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    },
    modules: {
      // 通过generateScopedName属性对生成的类名进行自定义
      // name: 文件名 local: 类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        // additionalData的内容会在每个scss文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
