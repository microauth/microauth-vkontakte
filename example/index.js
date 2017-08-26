const { send } = require('micro')
const microAuthVkontakte = require('microauth-vkontakte')

/**
 * NOTE:
 *
 * redirectUrl is setup in this fashion for use with the `Deploy to Now` button
 * on the repository's README.md. If operating locally by running either:
 * `npm start` or `yarn start` you will be using the localhost url.
 *
 * The `process.env.NOW_URL` is populated upon deployment using the `now-cli`
 * @see https://github.com/zeit/now-cli
 *
 * In either case you MUST give this address to your VK Application Settings
 * or you will receive error messages about an incorrect redirectUrl.
 */

const options = {
  clientId: process.env.VK_APP_ID,
  clientSecret: process.env.VK_APP_SECRET,
  display: 'page',
  fields: ['city', 'country', 'photo_200'],
  redirectUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/auth/vkontakte/callback'
      : `${process.env.NOW_URL}/auth/vkontakte/callback`,
  scope: ['friends', 'photos']
}

const vkontakteAuth = microAuthVkontakte(options)

module.exports = vkontakteAuth(async (req, res, auth) => {
  if (!auth) {
    return send(res, 404, 'Not Found')
  }

  if (auth.err) {
    // TODO: Error handling here!
    console.error(auth.err)
    return send(res, 403, 'Forbidden')
  }
  return `Hello ${auth.info.first_name}`
})
