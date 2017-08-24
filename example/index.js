const { send } = require('micro')
const microAuthVkontakte = require('microauth-vkontakte')

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
