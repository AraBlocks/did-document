'use strict'

const $id = Symbol('id')
const $type = Symbol('type')
const $serviceEndpoint = Symbol('serviceEndpoint')

class Service {
  static fromJSON(json) {
    return new Service(json.id, json.type, json.serviceEndpoint, json)
  }

  constructor(id, type, serviceEndpoint, props) {
    this[$id] = id
    this[$type] = type
    this[$serviceEndpoint] = serviceEndpoint

    if (props && 'object' == typeof props) {
      delete props.id
      delete props.type
      delete props.serviceEndpoint
      Object.assign(this, props)
    }
  }

  get id() { return this[$id] }
  get type() { return this[$type] }
  get serviceEndpoint() { return this[$serviceEndpoint] }

  [require('util').inspect.custom]() {
    return Object.assign(new class DIDService {}, this.toJSON())
  }

  toJSON() {
    const { id, type, serviceEndpoint, props } = this
    return Object.assign({}, this, { id, type, serviceEndpoint, props })
  }
}

module.exports = {
  Service
}
