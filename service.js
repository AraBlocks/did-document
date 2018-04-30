'use strict'

const $type = Symbol('type')
const $serviceEndpoint = Symbol('serviceEndpoint')

class Service {
  static fromJSON(json) {
    return new Service(json.type, json.serviceEndpoint, json)
  }

  constructor(type, endpoint, props) {
    this[$type] = type
    this[$serviceEndpoint] = endpoint

    if (props && 'object' == typeof props) {
      delete props.type
      delete props.serviceEndpoint
      Object.assign(this, props)
    }
  }

  get type() { return this[$type] }
  get serviceEndpoint() { return this[$serviceEndpoint] }

  toJSON() {
    const { type, serviceEndpoint } = this
    return Object.assign({}, this, { type, serviceEndpoint })
  }
}

module.exports = {
  Service
}
