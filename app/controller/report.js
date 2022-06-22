'use strict'

const Controller = require('egg').Controller

class ReportController extends Controller {
  /**
   * 销售数据html
   */
  async getSalesReport() {
    const { ctx, service } = this
    await service.salesReport.getSalesReport(ctx.query)
  }
}

module.exports = ReportController
