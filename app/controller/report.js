'use strict'

const Controller = require('egg').Controller

class ReportController extends Controller {
  /**
   * 销售数据html
   */
  async getSalesReport() {
    const { ctx, service } = this
    const data = await service.salesReport.getSalesReport(ctx.query)
    await ctx.render('index.nj', data);
  }
  /**
   * 用于获取销售数据图片
   */
  async getSalesReportImg() {
    const { ctx, service } = this
    const content = await service.salesReport.getSalesReportImg(ctx.query)
    if (content) {
      ctx.body = content
      ctx.response.type = 'image/jpeg'
    } else {
      ctx.status = 400
      ctx.body = '生成图片失败'
    }
  }
}

module.exports = ReportController
