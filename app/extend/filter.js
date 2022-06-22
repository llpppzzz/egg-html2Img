'use strict'

module.exports = {
  nullHolder(value, holder = '--') {
    return (value == null || value === '') ? holder : value
  }
}
