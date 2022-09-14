import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入path包注意两点:
// 1. 为避免类型报错，你需要通过`pnpm i @types/node -D`安装类型
// 2. tsconfig.node.json中设置`allowSyntheticDefaultImports: true`,以允许下面的default导入方式
import path from 'path'
import autoprefixer from 'autoprefixer'
import viteEslint from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 全局scss文件的路径
// 用normalizePath解决window下的路径问题
const variablePath = normalizePath(path.resolve(path.join(__dirname, 'src/variable.scss')))
// 是否为生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 域名地址
const CDN_URL = 'https://www.baidu.com'

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.join(__dirname, 'src'),
  base: isProduction ? CDN_URL : '/',
  resolve: {
    alias: {
      '@public': path.join(__dirname, 'public'),
      '@assets': path.join(__dirname, 'src/assets'),
      '@components': path.join(__dirname, 'src/components')
    }
  },
  build: {
    // 静态资源体积 >= 8KB，则提取成单独的文件
    // 静态资源体积 < 8KB，则作为 base64 格式的字符串内联
    // svg格式不受影响，始终会打包成单独的文件
    assetsInlineLimit: 8 * 1024
  },
  plugins: [
    vue(),
    svgLoader({
      defaultImport: 'url'
    }),
    // 在开发阶段进行eslint扫描，以命令行的方式展示
    viteEslint(),
    // 压缩图片
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    // 雪碧图
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets')]
    })
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
