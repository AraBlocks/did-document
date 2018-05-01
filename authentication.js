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

  [require('util').inspect.custom]() {
    return Object.assign(new class DIDAuthentication {}, this.toJSON())
  }

  toJSON() {
    const json = {}
    for (const k of Object.keys(this)) {
      json[k] = this[k]
    }
    return json
  }
}

module.exports = {
  Authentication
}
