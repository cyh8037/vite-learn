const fs = require('fs/promises')
const path = require('path')
const { createLink, createScript, generateHTML } = require('./util')

module.exports = () => ({
  name: 'html',
  setup(build) {
    build.onEnd(async (buildResult) => {
      if (buildResult.errors.length) return

      const { metafile } = buildResult
      const scripts = []
      const links = []

      if (metafile) {
        const { outputs } = metafile
        const assets = Object.keys(outputs)

        assets.forEach((asset) => {
          if (asset.endsWith('.js')) {
            scripts.push(createScript(asset))
          } else if (asset.endsWith('.css')) {
            scripts.push(createLink(asset))
          }
        })
        const templatePath = path.join(process.cwd(), 'index.html')
        const templateContent = generateHTML(scripts, links)
        await fs.writeFile(templatePath, templateContent)
      }
    })
  }
})
