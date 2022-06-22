'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 本地HTML服务
  router.get('/getReportHtml', controller.report.getSalesReport);
};
