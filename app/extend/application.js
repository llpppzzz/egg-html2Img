'use strict';

const Browser = require('../lib/browser');
const BROWSER = Symbol('Application#browser');

module.exports = {
  get browser() {
    if (!this[BROWSER]) {
      this[BROWSER] = new Browser(this);
    }
    return this[BROWSER];
  }
};
