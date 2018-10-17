'use strict'

const { Authentication } = require('./authentication')
const { PublicKey } = require('./public-key')
const { normalize } = require('./normalize')
const { Service } = require('./service')
const { DID } = require('did-uri')

const $id = Symbol('id')
const $proof = Symbol('proof')
const $created = Symbol('created')
const $updated = Symbol('updated')
const $revoked = Symbol('revoked')
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
    if (context && 'string' == typeof context || Array.isArray(context)) {
      this[$context] = context
    } else {
      this[$context] = kDIDDocumentContext
    }

    // 4.2 DID Subject
    // - https://w3c-ccg.github.io/did-spec/#did-subject
    // The DID subject is the identifier that the DID
    // Document is about, i.e., it is the DID described
    // by DID Document.
    this[$id] = new DID(opts.did || opts.id)

    // 4.3 Public Keys
    // - https://w3c-ccg.github.io/did-spec/#public-keys
    // Public keys are used for digital signatures,
    // encryption and other cryptographic operations,
    // which in turn are the basis for purposes such as
    // authentication (see Section 4.4 Authentication) or
    // establishing secure communication with service
    // endpoints (see Section 4.6 Service Endpoints).
    this[$publicKey] = Object.assign([], opts.publicKey)

    // 4.4 Authentication
    // - https://w3c-ccg.github.io/did-spec/#authentication
    // Authentication is the mechanism by which an entity
    // can cryptographically prove that they are associated
    // with a DID and DID Description
    this[$authentication] = Object.assign([], opts.authentication)

    // 4.6 Service Endpoints
    // - https://w3c-ccg.github.io/did-spec/#service-endpoints
    // In addition to publication of authentication and authorization
    // mechanisms, the other primary purpose of a DID Document is to
    // enable discovery of service endpoints for the entity. A service
    // endpoint may represent any type of service the entity wishes to
    // advertise, including decentralized identity management services
    // for further discovery, authentication, authorization, or interaction.
    this[$service] = Object.assign([], opts.service)

    // 4.7 Created
    // - https://w3c-ccg.github.io/did-spec/#created-optional
    // Standard metadata for identifier records includes a timestamp of
    // the original creation.
    if (null == opts.created) {
      this[$created] = new Date()
    } else if ('string' == typeof opts.created) {
      this[$created] = new Date(opts.created)
    }

    // 4.8 Updated
    // - https://w3c-ccg.github.io/did-spec/#updated-optional
    // Standard metadata for identifier records includes a timestamp
    // of the most recent change.
    if (null == opts.updated) {
      this[$updated] = new Date()
    } else if ('string' == typeof opts.updated) {
      this[$updated] = new Date(opts.updated)
    }

    // 4.9 Proof
    // - https://w3c-ccg.github.io/did-spec/#proof-optional
    // A proof on a DID Document is cryptographic proof of the integrity of
    // the DID Document according to either:
    //   1. The entity as defined in section 4.6 Service Endpoints, or if not present:
    //   2. The delegate as defined in section 4.3.
    this[$proof] = Object.assign({}, opts.proof)

    // 5.0 Revoked
    // - https://w3c-ccg.github.io/did-spec/#delete-revoke
    // A timestamp value indicating when the identifier was revoked
    if (opts.revoked) {
      this[$revoked] = new Date()
    }
  }

  get context() { return this[$context] }
  get id() { return this[$id] }
  get publicKey() { return this[$publicKey] }
  get authentication() { return this[$authentication] }
  get service() { return this[$service] }
  get created() { return this[$created] }
  get updated() { return this[$updated] }
  get revoked() {
    if (this[$revoked]) {
      return this[$revoked]
    }
    else {
      return null
    }
  }
  get proof() { return this[$proof] }

  [require('util').inspect.custom]() {
    return Object.assign(new class DIDDocument {}, this.toJSON())
  }

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

  proof(proof) {
    return Object.assign(this[$proof], proof)
  }

  update() {
    this[$updated] = new Date()
    return this
  }

  digest(hash, encoding) {
    const json = this.toJSON()
    const { id, publicKey, authentication, service, created, updated, revoked } = json
    const  normal = normalize({id, publicKey, authentication, service, created, updated, revoked})
    const string = JSON.stringify(normal)
    const digest = hash(Buffer.from(string))
    return encoding ? digest.toString(encoding) : digest
  }

  toJSON() {
    const ddo = {
      '@context': this[$context],
      id: this[$id],
      publicKey: this[$publicKey],
      authentication: this[$authentication],
      service: this[$service],
      created: this[$created].toISOString(),
      updated: this[$updated].toISOString(),
      proof: this[$proof],
    }
    if (this[$revoked]) {
      ddo.revoked = this[$revoked]
    }
    return ddo
  }
}

module.exports = {
  kDIDDocumentContext,
  DIDDocument
}
