const fs = require('fs');
const {promisify} = require('util');
const writeFileAsync = promisify(fs.writeFile)

async function fullPageScreenshot({ DOM, Emulation, Network, Page, Runtime }, { filenamePrefix = 'desktop' } = {}) {
  const screenWidth = 1440

  await (async () => {
    const { root: { nodeId: documentNodeId } } = await DOM.getDocument()
    const { nodeId: bodyNodeId } = await DOM.querySelector({
      selector: "body",
      nodeId: documentNodeId,
    })

    const { model: { height: fullHeight } } = await DOM.getBoxModel({
      nodeId: bodyNodeId,
    })

    await Emulation.setVisibleSize({ width: screenWidth, height: fullHeight })
    await Emulation.setDeviceMetricsOverride({
      width: screenWidth,
      height: fullHeight,
      screenWidth: screenWidth,
      screenHeight: fullHeight,
      deviceScaleFactor: 1,
      fitWindow: false,
      mobile: false,
    })
    await Emulation.setPageScaleFactor({ pageScaleFactor: 1 })
  })()

  await (async function() {
    const screenshot = await Page.captureScreenshot({
      format: 'png',
      fromSurface: true,
    })

    const filename = `${filenamePrefix}_${Date.now()}.png`
    const buffer = new Buffer(screenshot.data, 'base64')

    await writeFileAsync(filename, buffer, 'base64')
    console.log(`Wrote screenshot: ${filename}`)
  })()
}

const chromelessExtensions = {
  async waitAll() {
    await this.queue.waitAll()
  },

  async getClient() {
    const { client } = await this.chrome.runtimeClientPromise

    return client
  }
}

module.exports = { chromelessExtensions, fullPageScreenshot }
