/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655879070391_2092';

  // add your middleware config here
  config.middleware = [];

  // nunjucks config
  config.view = {
    // 模板文件的根目录
    root: path.join(appInfo.baseDir, 'app/view'),
    // 默认后缀
    defaultExtension: 'nj',
    // 默认引擎
    defaultViewEngine: 'nunjucks',
    // 文件后缀映射模板引擎
    mapping: {
      '.nj': 'nunjucks'
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
