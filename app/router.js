'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 本地HTML服务
  router.get('/getReportHtml', controller.report.getSalesReport);
  // 获取销售图片
  router.get('/getReportImg', controller.report.getSalesReportImg)
};
