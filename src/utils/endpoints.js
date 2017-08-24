const constants = require('./constants')

const { apiVersion, authUrl, profileUrl, responseType, tokenUrl } = constants

module.exports = {
  accessTokenUrl: (opts, code) =>
    `${tokenUrl}?client_id=${opts.clientId}&client_secret=${opts.clientSecret}&redirect_uri=${opts.redirectUrl}&code=${code}`,
  redirectUrl: (opts, state) =>
    `${authUrl}?client_id=${opts.clientId}&display=${opts.display}&redirect_uri=${opts.redirectUrl}&scope=${opts.scope}&response_type=${responseType}&v=${apiVersion}&state=${state}`,
  userInfoUrl: (opts, accessToken) =>
    `${profileUrl}?access_token=${accessToken}&fields=${opts.fields}`
}
