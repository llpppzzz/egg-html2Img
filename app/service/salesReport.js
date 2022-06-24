'use strict';

const Service = require('egg').Service;

const LOCAL_HOST = 'http://127.0.0.1:7001';

const urls = {
  getSalesReportHtml: `${LOCAL_HOST}/getReportHtml`
};

class SalesReportService extends Service {
  async getSalesReport(query) {
    // 模拟获取后端数据
    const res = {
      name: query.name || 'nunjucks'
    }
    return res
  }
  async getSalesReportImg(query) {
    try {
      const {
        ctx,
        app: { browser }
      } = this

      return await browser.getImageByPath({
        url: ctx.http.buildURL(urls.getSalesReportHtml, query),
        waterMark: {
          text: `禁止外传：${123}`,
          size: '30px',
          color: '#DDDDDD',
          position: {
            top: 0
          }
        }
      })
    } catch (e) {
      return null
    }
  }
}

module.exports = SalesReportService;
