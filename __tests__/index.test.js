const microAuthVkontakte = require('../src')
const { endpoints } = require('../src/utils')

describe('microauth-vkontakte', () => {
  let options

  beforeEach(() => {
    options = {
      clientId: 'abc',
      clientSecret: '123',
      display: 'page',
      fields: [],
      redirectUrl: 'http://localhost:3000/auth/vkontatke/callback',
      scope: []
    }
  })

  describe('Errors', () => {
    describe('Configuration Object', () => {
      test('Should throw error if no configuration options provided', () => {
        const actual = () => microAuthVkontakte({})
        const expected = 'Must provide configuration options!'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if no clientId provided', () => {
        options.clientId = undefined
        const actual = () => microAuthVkontakte(options)
        const expected = 'Must provide value for clientId!'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if no clientSecret provided', () => {
        options.clientSecret = undefined
        const actual = () => microAuthVkontakte(options)
        const expected = 'Must provide value for clientSecret!'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if no redirectUrl provided', () => {
        options.redirectUrl = undefined
        const actual = () => microAuthVkontakte(options)
        const expected = 'Must provide value for redirectUrl!'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if redirectUrl not valid', () => {
        options.redirectUrl = 'some_gibberish'
        const actual = () => microAuthVkontakte(options)
        const expected = 'Provided redirectUrl: some_gibberish fails.'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if redirectUrl not valid', () => {
        options.redirectUrl = 'http:localhost:3000'
        const actual = () => microAuthVkontakte(options)
        const expected = 'Provided redirectUrl: http:localhost:3000 fails.'
        expect(actual).toThrow(expected)
      })

      test('Should throw error if redirectUrl not valid', () => {
        options.redirectUrl = 'https:localhost:3000'
        const actual = () => microAuthVkontakte(options)
        const expected = 'Provided redirectUrl: https:localhost:3000 fails.'
        expect(actual).toThrow(expected)
      })
    })
  })

  describe('Success', () => {
    describe('Configuration Object', () => {
      test('Should not throw an error if configuration object is correct', () => {
        const actual = () => microAuthVkontakte(options)
        expect(actual).not.toThrow()
      })
    })
  })

  describe('Endpoints', () => {
    test('Should return valid accessTokenUrl', () => {
      const getAccessTokenUrl = code => endpoints.accessTokenUrl(options, code)
      const actual = getAccessTokenUrl('123456')
      const expected = [
        expect.stringContaining(`client_id=${options.clientId}`),
        expect.stringContaining(`client_secret=${options.clientSecret}`),
        expect.stringContaining(`redirect_uri=${options.redirectUrl}`),
        expect.stringContaining('code=123456')
      ]
      expect([actual]).toEqual(expect.arrayContaining(expected))
    })
    test('Should return valid redirectTokenUrl', () => {
      const getRedirectUrl = state => endpoints.redirectUrl(options, state)
      const actual = getRedirectUrl('123456')
      const expected = [
        expect.stringContaining(`client_id=${options.clientId}`),
        expect.stringContaining(`display=${options.display}`),
        expect.stringContaining(`redirect_uri=${options.redirectUrl}`),
        // QUESTION: Should I check `scope` & `fields` and if empty drop from the request?
        // At the moment: `scope=[]` => '&scope=&response_type=...'
        expect.stringContaining(`scope=${options.scope}`),
        expect.stringContaining('state=123456')
      ]
      expect([actual]).toEqual(expect.arrayContaining(expected))
    })
    test('Should return valid userInfoUrl', () => {
      const getUserInfoUrl = accessToken =>
        endpoints.userInfoUrl(options, accessToken)
      const actual = getUserInfoUrl('123456')
      const expected = [
        expect.stringContaining(`access_token=123456`),
        // QUESTION: Should I check `scope` & `fields` and if empty drop from the request?
        // At the moment: `fields=[]` => '&fields='
        expect.stringContaining(`fields=${options.fields}`)
      ]
      expect([actual]).toEqual(expect.arrayContaining(expected))
    })
  })
})
