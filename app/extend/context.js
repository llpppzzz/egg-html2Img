'use strict';

const ContextHttp = require('../lib/http');
const HTTP = Symbol('Context#http');

module.exports = {
  get http() {
    if (!this[HTTP]) {
      this[HTTP] = new ContextHttp(this);
    }
    return this[HTTP];
  }
};
