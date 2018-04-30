'use strict'

const { Authentication } = require('./authentication')
const { PublicKey } = require('./public-key')
const { Service } = require('./service')
const { DID } = require('did-uri')

const $id = Symbol('id')
const $context = Symbol('context')
const $service = Symbol('service')
const $publicKey = Symbol('publicKey')
const $authentication = Symbol('authentication')

const kDIDDocumentContext = 'https://w3id.org/did/v1'

// 4. https://w3c-ccg.github.io/did-spec/#did-documents
class DIDDocument {
  constructor(opts, context) {
    if (!opts || 'object' != typeof opts) {
      opts = {}
    }

    // 4.1 DID Context
    // - https://w3c-ccg.github.io/did-spec/#context
    // JSON objects in JSON-LD format must include
    // a JSON-LD context statement
    this[$context] = kDIDDocumentContext
    if (context && 'string' == typeof context || Array.isArray(context)) {
      this[$context] = context
    }

    // 4.2 DID Subject
    // - https://w3c-ccg.github.io/did-spec/#did-subject
    // The DID subject is the identifier that the DID
    // Document is about, i.e., it is the DID described
    // by DID Document.
    this[$id] = new DID(opts.id)

    // 4.3 Public Keys
    // - https://w3c-ccg.github.io/did-spec/#public-keys
    // Public keys are used for digital signatures,
    // encryption and other cryptographic operations,
    // which in turn are the basis for purposes such as
    // authentication (see Section 4.4 Authentication) or
    // establishing secure communication with service
    // endpoints (see Section 4.6 Service Endpoints).
    this[$publicKey] = []

    // 4.4 Authentication
    // - https://w3c-ccg.github.io/did-spec/#authentication
    // Authentication is the mechanism by which an entity
    // can cryptographically prove that they are associated
    // with a DID and DID Description
    this[$authentication] = []

    // 4.6 Service Endpoints
    // - https://w3c-ccg.github.io/did-spec/#service-endpoints
    // In addition to publication of authentication and authorization
    // mechanisms, the other primary purpose of a DID Document is to
    // enable discovery of service endpoints for the entity. A service
    // endpoint may represent any type of service the entity wishes to
    // advertise, including decentralized identity management services
    // for further discovery, authentication, authorization, or interaction.
    this[$service] = []
  }

  get context() { return this[$context] }
  get id() { return this[$id] }
  get publicKey() { return this[$publicKey] }
  get authentication() { return this[$authentication] }
  get service() { return this[$service] }

  addPublicKey(pk) {
    if (null == pk || 'object' != typeof pk) {
      throw new TypeError("DIDDocument#addPublicKey: Expecting object.")
    } else if (false == pk instanceof PublicKey) {
      pk = PublicKey.fromJSON(pk)
    }

    this[$publicKey].push(pk)
    return this
  }

  addAuthentication(auth) {
    if (null == auth || 'object' != typeof auth) {
      throw new TypeError("DIDDocument#addAuthentication: Expecting object.")
    } else if (false == auth instanceof Authentication) {
      auth = Authentication.fromJSON(auth)
    }

    this[$authentication].push(auth)
    return this
  }

  addService(service) {
    if (null == service || 'object' != typeof service) {
      throw new TypeError("DIDDocument#addService: Expecting object.")
    } else if (false == service instanceof Service) {
      service = Service.fromJSON(service)
    }

    this[$service].push(service)
    return this
  }

  toJSON() {
    return {
      '@context': this[$context],

      id: this[$id],
      service: this[$service],
      publicKey: this[$publicKey],
      authentication: this[$authentication],
    }
  }
}

module.exports = {
  kDIDDocumentContext,
  DIDDocument
}
