<img src="https://github.com/arablocks/ara-module-template/blob/master/ara.png" width="30" height="30" /> did-document
========

# Decentralized Identity (DID) Document
DID documents contain a set of data that describes a DID, including mechanisms, such as public keys and pseudonymous biometrics, that an entity can use to authenticate itself as the DID. A DID Document may also contain other attributes or claims describing the entity. These documents are graph-based data structures that are typically expressed using [JSON-LD], but may be expressed using other compatible graph-based data formats.

## Table of Contents
* [Status](#status)
* [Stability](#stability)
* [Installation](#installation)
* [Usage](#usage)
* [API](#api)
* [References](#references)

## Status
This project is in active development.

## Stability
> [Stability][stability-index]: 1 - Experimental. These features are still under
> active development and subject to non-backwards compatible changes, or even
> removal, in any future version. Use of the feature is not recommended
> in production environments. Experimental features are not subject to
> the Node.js Semantic Versioning model.

## Installation

```sh
$ npm install arablocks/did-document
```

## Usage

```js
const { DIDDocument } = require('did-document')
const did = 'did:ara:701012c34fc3c883c4b61dfae06568483c5ae6c81020767ee536a9ba6300792b'

// create a new DID document
const ddo = new DIDDocument({ id: did })

// Add a publicKey to an existing DID document
ddo.addPublicKey({
  id: `${did}#owner`,
  publicKeyHex: "ec84465527bea0f8c54ce6c42c0d7549a7163336655a8bcaf731f07eb2997c73",
  publicKeyBase58: "GvGCfZpuJapzxoo3rgyaYR39XReFxaWpZZUvoaq1o8qg",
  publicKeyBase64: "OyERlUnvqD4xUzmxCwNdUmnFjM2ZVqLyvcx8H6ymXxz"
})

// Add an authentication mechanism
ddo.addAuthentication({
  publicKey: `${did}#owner`,
  type: "Ed25519SignatureAuthentication2018"
})

// Add a service endpoint to the DDO
ddo.addService({
  id: `${did}#arasite`,
  type: 'ara-site.Service',
  serviceEndpoint: 'http://www.ara.one',
  description: 'This is our project site'
})

```

## API

### `doc = new DIDDocument(opts, context)`

#### `doc.context`
The generic DID context to which the DID document refers to

#### `doc.id`
The Decentralized Identity to which the document belongs to

#### `doc.publicKey`
A lists public keys whose corresponding private keys are controlled by the entity identified by the DID identifier

#### `doc.authentication`

A list of mechanisms by which an entity can cryptographically prove that they are associated with a DID and DID Description

#### `doc.service`

Service endpoints represent any type of service that the DID entity wishes to advertise, including decentralized identity management services for further discovery, authentication, authorization, or interaction

#### `doc.addPublicKey(publicKey)`
Add a public key entity to the DID document

#### `doc.addAuthentication(authentication)`
Add an authentication mechanism to the did document

#### `doc.addService(service)`
Add a service endpoint to the did document

#### `doc.toJSON()`
Convert a DID document to JSON format


## References
- [DID specification](https://w3c-ccg.github.io/did-spec/)
- [JSON-LD](https://www.w3.org/TR/json-ld/)

[JSON-LD]: https://www.w3.org/TR/json-ld/
[stability-index]: https://nodejs.org/api/documentation.html#documentation_stability_index
