'use strict'

const puppeteer = require('puppeteer')

class Browser {
  constructor(app) {
    this.app = app
    this.browser = null
  }
  _log(...args) {
    this.app.logger.info('[Browser]', ...args)
  }
  _error(...args) {
    this.app.logger.error('[Browser]', ...args)
  }
  async createBrowser() {
    this.browser = await puppeteer.launch({
      args: [
        '--disable-gpu', // GPU硬件加速
        '--disable-dev-shm-usage', // 创建临时文件共享内存
        '--disable-setuid-sandbox', // uid沙盒
        '--no-first-run', // 没有设置首页。在启动的时候，就会打开一个空白页面。
        '--no-sandbox', // 沙盒模式
        '--no-zygote',
        '--single-process' // 单进程运行
      ]
    })
  }
  async getNewPage(ctx) {
    const page = await this.browser.newPage()

    page.on('error', error => {
      this._error('Browser Page Error:', error)
      page.close()
    })
    page.on('pageerror', error => {
      this._error('Browser Page Error:', error)
      page.close()
    })
    page.on('console', msg => {
      this._log('Browser Page Log:', msg.text())
    })

    return page
  }
  async addWaterMark(page, waterMark) {
    try {
      const stringOptions = JSON.stringify(waterMark)
      await page.addScriptTag({
        url: 'public/js/waterMark.js'
      })
      await page.addScriptTag({
        content: `WaterMarker(${stringOptions})`
      })
    } catch (e) {
      this._error(e)
    }
  }

  async getImageByPath({ url, ctx, waterMark }) {
    const page = await this.getNewPage(ctx)
    const res = await page.goto(url)
    if (JSON.stringify(res) !== '{}' && res._status !== 200) {
      this._error(res)
      throw new Error(res._status)
    }
    const ele = await page.$('body')
    waterMark && (await this.addWaterMark(page, waterMark))
    const img = await ele.screenshot({
      type: 'jpeg',
      quality: 70
    })
    page.close()
    return img
  }
}

module.exports = Browser
