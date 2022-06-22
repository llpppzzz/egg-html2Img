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
  /**
   * 用于获取销售数据图片
   */
  async getSalesReportImg() {
    const { ctx, service } = this
    ctx.body = await service.salesReport.getSalesReportImg(ctx.query)
    ctx.response.type = 'image/jpeg'
  }
}

module.exports = ReportController
