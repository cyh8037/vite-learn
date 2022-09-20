/**
 * 支持通过 HTTP 从 CDN 服务上拉取对应的第三方依赖资源
 */
module.exports = () => ({
  name: 'http',
  setup(build) {
    const https = require('https')
    const http = require('http')

    // 拦截CDN请求
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: 'http-url'
    }))

    // 拦截间接依赖的路径，并重写路径
    build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: 'http-url'
    }))

    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
      const contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          const post = url.startsWith('https') ? https : http
          const req = post
            .get(url, (res) => {
              // 重定向场景
              if ([301, 302, 307].includes(res.statusCode)) {
                // 重新发起请求
                fetch(new URL(res.headers.location, url).toString())
                // 中断之前请求
                req.close()
              } else if (res.statusCode === 200) {
                const chunks = []
                // 监听数据获取
                res.on('data', (chunk) => chunks.push(chunk))
                res.on('end', () => resolve(Buffer.concat(chunks)))
              } else {
                reject(new Error(`GET ${url} failed: status ${res.statusCode}`))
              }
            })
            .on('error', reject)
        }
        fetch(args.path)
      })
      return { contents }
    })
  }
})
