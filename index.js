'use strict'

const { Authentication } = require('./authentication')
const { DIDDocument } = require('./document')
const { PublicKey } = require('./public-key')
const { Service } = require('./service')

module.exports = {
  Authentication,
  DIDDocument,
  PublicKey,
  Service,
}
