'use strict';

const Service = require('egg').Service;

const LOCAL_HOST = 'http://127.0.0.1:7001';

const urls = {
  getSalesReportHtml: `${LOCAL_HOST}/getReportHtml`
};

class SalesReportService extends Service {
  async getSalesReport(query) {
    try {
      const { ctx } = this;
      // 模拟获取后端数据
      const res = {
        name: 'nunjucks'
      }
      return await ctx.render('index.nj', res);
    } catch (e) {
      console.log('getSalesReportError', e);
    }
  }
  async getSalesReportImg(query) {
    try {
      const {
        ctx,
        app: { browser }
      } = this

      return await browser.getImageByPath(ctx.http.buildURL(urls.getSalesReportHtml, query))
    } catch (e) {
      console.log('getSalesReportImg', e)
      throw e
    }
  }
}

module.exports = SalesReportService;
