'use strict'

const $type = Symbol('type')

class Authentication {
  static fromJSON(json) {
    return new Authentication(json.type, json)
  }

  constructor(type, props) {
    this[$type] = type
    if (props && 'object' == typeof props) {
      delete props.type
      Object.assign(this, props)
    }
  }

  get type() { return this[$type] }

  toJSON() {
    const { type } = this
    return Object.assign({}, this, { type })
  }
}

module.exports = {
  Authentication
}
