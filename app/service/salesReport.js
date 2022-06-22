'use strict';

const Service = require('egg').Service;

const LOCAL_HOST = 'http://127.0.0.1:7001';

const urls = {
  getSalesReportHtml: `${LOCAL_HOST}/getSalesReport`
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
}

module.exports = SalesReportService;
