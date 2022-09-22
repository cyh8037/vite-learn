import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */

export default {
  input: ['src/index.js'],
  // input: {
  //   index: 'src/index.js',
  //   util: 'src/util.js'
  // },
  output: {
    // 产物输出目录
    dir: 'dist',
    format: 'esm'
  },
  // output: [
  //   {
  //     dir: 'dist/es',
  //     format: 'esm'
  //   },
  //   {
  //     dir: 'dist/cjs',
  //     format: 'cjs'
  //   }
  // ],
  // 入口模块的输出文件名
  // entryFileNames: `[name].js`,
  // 非入口模块(如动态import)的输出文件名
  // chunkFileNames: 'chunk-[hash].js',
  // 静态资源文件输出文件名
  // assetFileNames: 'assets/[name]-[hash][extname]',
  // 是否生成sourcemap文件
  // sourcemap: true,
  // 如果是打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过name配置变量名
  // name: 'MyBundle',
  // 全局变量声明
  // globals: {
    // 项目中可以直接用`_`代替`lodash`
    // lodash: '_'
  // },
  // 排除依赖打包
  // external: [],
  plugins: [resolve(), commonjs()]
}

// const buildIndexOptions = {
//   input: ['src/index.js'],
//   output: [
//     {
//       dir: 'dist/es',
//       format: 'esm'
//     },
//     {
//       dir: 'dist/cjs',
//       format: 'cjs'
//     }
//   ]
// }
// const buildUtilOptions = {
//   input: ['src/util.js'],
//   output: [
//     {
//       dir: 'dist/es',
//       format: 'esm'
//     },
//     {
//       dir: 'dist/cjs',
//       format: 'cjs'
//     }
//   ]
// }

// export default [buildIndexOptions, buildUtilOptions]