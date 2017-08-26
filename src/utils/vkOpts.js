/**
 * The defaults for the options object.
 * The user of this library must pass at least:
 * `clientId`, `clientSecret`, & `redirectUrl` as they
 * are required for authenticating with the Vkontakte
 * API.
 *
 * Values for display are: `page`, `popup`, `mobile`.
 * Currently the `fields` key returns the default fields
 * as per the Vkontakte API docs.
 *
 * For more information on `fields` options:
 * @see https://vk.com/dev/fields
 * For more information on `scope` options:
 * @see https://vk.com/dev/permissions
 */
module.exports = {
  clientId: undefined,
  clientSecret: undefined,
  display: 'page',
  fields: [],
  path: '/auth/vkontakte',
  redirectUrl: undefined,
  scope: ['email']
}
