const querystring = require('querystring')
const { parse } = require('url')

const rp = require('request-promise')
const redirect = require('micro-redirect')
const { v4 } = require('uuid')

const { checkRequired, endpoints, vkOpts } = require('./utils')

const provider = 'vkontakte'

module.exports = options => {
  // 1. Check the options passed by user & throw error if missing required keys.
  const verified = checkRequired(options)
  // 2. If fails abort and throw error.
  if (!verified) throw new Error()
  // 3. Merge constants with user defined configuration.
  const config = { ...vkOpts, ...options }
  // 4. Prepare endpoints.
  const getAccessTokenUrl = code => endpoints.accessTokenUrl(config, code)
  const getRedirectUrl = state => endpoints.redirectUrl(config, state)
  const getUserInfoUrl = accessToken =>
    endpoints.userInfoUrl(config, accessToken)
  // 5. Create storage for 'state' values for checking the responses.
  const states = []

  /**
   * REVIEW:
   * Everything above this function resides within a closure meaning none of it is
   * accessible by the global scope. The only things accessible are whatever the
   * below function returns.
   *
   * That being said the use of the `config` object below could be leaking sensitive data,
   * (i.e. clientId & clientSecret).
   *
   * QUESTION: How can I test that this is/is not the case?
   */
  return fn => async (req, res, ...args) => {
    const { pathname, query } = parse(req.url)

    // REVIEW using config.path could potentially be leaking data?
    if (pathname === config.path) {
      try {
        const state = v4()
        const redirectUrl = getRedirectUrl(state)
        states.push(state)
        return redirect(res, 302, redirectUrl)
      } catch (err) {
        args.push({ err, provider })
        return fn(req, res, ...args)
      }
    }
    // REVIEW using config.redirectUrl could potentially be leaking data?
    const callbackPath = parse(config.redirectUrl).pathname
    if (pathname === callbackPath) {
      try {
        const { state, code } = querystring.parse(query)

        if (!states.includes(state)) {
          const err = new Error('Invalid state')
          args.push({ err, provider })
          return fn(req, res, ...args)
        }

        const response = await rp({
          method: 'GET',
          url: getAccessTokenUrl(code),
          json: true
        })

        const accessToken = response.access_token
        const data = await rp({
          method: 'GET',
          url: getUserInfoUrl(accessToken),
          json: true
        })

        const result = {
          provider,
          accessToken,
          info: data.response[0] // promise returns as {[{}]}
        }

        args.push({ ...result })
        return fn(req, res, ...args)
      } catch (err) {
        args.push({ err, provider })
        return fn(req, res, ...args)
      }
    }
    return fn(req, res, ...args)
  }
}
