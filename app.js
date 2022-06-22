'use strict'

class AppBootHook {
  constructor(app) {
    this.app = app
  }

  async didReady() {
    try {
      // 启动 browser 实例
      await this.app.browser.createBrowser()
    } catch (e) {
      this.app.logger.error(e)
    }
  }
}

module.exports = AppBootHook
