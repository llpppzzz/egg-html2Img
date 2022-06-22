'use strict';

const querystring = require('querystring');

class Http {
  constructor(app) {
    this.app = app;
  }

  /**
   * 钩子函数，请求发送前处理
   * @param {Object} options 请求 options
   * @return {Object} 处理后的请求 options
   * @private
   */
  async _beforeRequest(options) {
    return options;
  }

  /**
   * 钩子函数，请求响应后处理
   * @param {Response} response 响应实体
   * @param {Object} options 请求 options
   * @param {Object} option 配置
   * @return {*} 处理后返回值
   * @private
   */
  // eslint-disable-next-line no-unused-vars
  async _afterResponse(response, options, option) {
    return response;
  }

  /**
   * 统一构建请求参数，发送请求，调用钩子函数处理
   * @param {string} method 请求方法
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {Object} headers 请求头
   * @param {Object} option 配置
   * @return {*} 处理后返回值
   * @private
   */
  async _createRequest(method, url, data, headers = {}, option) {
    const options = await this._beforeRequest({
      method,
      url,
      data,
      headers,
      contentType: 'json',
      dataType: 'json'
    });
    const start = Date.now();
    let response = null;
    try {
      response = await this.app.curl(options.url, options);
    } catch (error) {
      response = error;
    }
    response.responseTime = Math.ceil(Date.now() - start);
    return this._afterResponse(response, options, option);
  }

  /**
   * URL 格式化，将 URL 中的 {key} 替换成对应变量
   * @param {string} url 请求地址
   * @param {Object} map { key: value } 形式
   * @return {string} 处理完后完整的请求地址
   */
  format(url, map = {}) {
    return url.replace(/{(\w+)}/g, (match, key) => {
      const value = map[key];
      return typeof value !== 'undefined' ? encodeURIComponent(value + '') : match;
    });
  }

  /**
   * URL 格式化，数据对象序列化成 query string
   * @param {string} url 请求地址
   * @param {Object} params 需要序列化的参数
   * @return {string} 序列完后的 URL
   */
  buildURL(url, params = {}) {
    return url + (url.includes('?') ? '&' : '?') + querystring.stringify(params);
  }

  /**
   * GET 请求
   * @param {string} url 请求地址
   * @param {Object} params 请求参数
   * @param {Object} headers 请求头部
   * @param {Object} option 配置
   * @return {*} 请求结果
   */
  get(url, params, headers, option) {
    return this._createRequest('GET', url, params, headers, option);
  }

  /**
   * POST 请求
   * @param {string} url 请求地址
   * @param {Object} params 请求参数
   * @param {Object} headers 请求头部
   * @param {Object} option 配置
   * @return {*} 请求结果
   */
  post(url, params, headers, option) {
    return this._createRequest('POST', url, params, headers, option);
  }

  /**
   * PUT 请求
   * @param {string} url 请求地址
   * @param {Object} params 请求参数
   * @param {Object} headers 请求头部
   * @param {Object} option 配置
   * @return {*} 请求结果
   */
  put(url, params, headers, option) {
    return this._createRequest('PUT', url, params, headers, option);
  }

  /**
   * DELETE 请求
   * @param {string} url 请求地址
   * @param {Object} params 请求参数
   * @param {Object} headers 请求头部
   * @param {Object} option 配置
   * @return {*} 请求结果
   */
  delete(url, params, headers, option) {
    return this._createRequest('DELETE', url, params, headers, option);
  }
}

module.exports = Http;
