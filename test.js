'use strict'

const { Authentication } = require('./authentication')
const { DIDDocument } = require('./document')
const { Service } = require('./service')
const test = require('tape')

test("new Authentication(type, props)", (t) => {
  const publicKey = 'did:ara:1234#key-1'
  const type = 'RsaSignatureAuthentication2018'
  const auth = new Authentication(type, { publicKey })

  t.true(publicKey == auth.publicKey)
  t.true(type == auth.type)
  t.end()
})

test("Authentication#fromJSON()", (t) => {
  const publicKey = 'did:ara:1234#key-1'
  const type = 'RsaSignatureAuthentication2018'
  const auth = Authentication.fromJSON({ type, publicKey })

  t.true(publicKey == auth.publicKey)
  t.true(type == auth.type)
  t.end()
})

test("new Service(type, serviceEndpoint, props)", (t) => {
  const type = 'WebService'
  const serviceEndpoint = 'http://my.service.example.com/v1'
  const token = '12345'
  const props = {token}
  const service = new Service(type, serviceEndpoint, props)
  t.true(type == service.type)
  t.true(serviceEndpoint == service.serviceEndpoint)
  t.true(token == service.token)
  t.end()
})

test("Service#fromJSON()", (t) => {
  const type = 'WebService'
  const serviceEndpoint = 'http://my.service.example.com/v1'
  const token = '12345'
  const props = {token}
  const service = Service.fromJSON({type, serviceEndpoint, token})
  t.true(type == service.type)
  t.true(serviceEndpoint == service.serviceEndpoint)
  t.true(props.token == service.token)
  t.end()
})
