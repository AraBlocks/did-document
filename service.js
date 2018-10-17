'use strict'

const $id = Symbol('id')
const $type = Symbol('type')
const $serviceEndpoint = Symbol('serviceEndpoint')

class Service {
  static fromJSON(json) {
    return new Service(json.type, json.serviceEndpoint, json)
  }

  constructor(id, type, endpoint, props) {
    this[$id] = id
    this[$type] = type
    this[$serviceEndpoint] = endpoint

    if (props && 'object' == typeof props) {
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
    const { id, type, serviceEndpoint } = this
    return Object.assign({}, this, { id, type, serviceEndpoint })
  }
}

module.exports = {
  Service
}
