const { build } = require('esbuild')
const httpImport = require('./http-import-plugin')
const htmlPlugin = require('./html-plugin')

async function runBuild() {
  build({
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为一个数组
    entryPoints: ['./index.js'],
    // 入口文件打包后名称格式
    entryNames: '[dir]/[name]-[hash]',
    // 打包产物目录
    outdir: 'dist',
    // chunk名称格式
    chunkNames: '[name]-[hash]',
    // 是否需要打包，一般设为 true
    bundle: true,
    // 模块格式，包括`esm`、`commonjs`和`iife`
    format: 'esm',
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: false,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    loader: {},
    plugins: [httpImport(), htmlPlugin()]
  }).then(() => {
    console.log('Build Finished!')
  })
}

runBuild()
