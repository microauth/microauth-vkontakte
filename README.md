# microauth-vkontakte :closed_lock_with_key:

[![npm](https://img.shields.io/npm/v/microauth-vkontakte.svg?style=flat-square)](https://www.npmjs.com/package/microauth-vkontakte)
[![npm](https://img.shields.io/npm/l/microauth-vkontakte.svg?style=flat-square)](https://www.npmjs.com/package/microauth-vkontakte)
[![npm](https://img.shields.io/npm/dt/microauth-vkontakte.svg?style=flat-square)](https://www.npmjs.com/package/microauth-vkontakte)

[![CircleCI](https://img.shields.io/circleci/project/github/rockchalkwushock/microauth-vkontakte.svg?style=flat-square)](https://circleci.com/gh/rockchalkwushock/microauth-vkontakte)
[![Codecov](https://img.shields.io/codecov/c/github/rockchalkwushock/microauth-vkontakte.svg?style=flat-square)](https://codecov.io/gh/rockchalkwushock/microauth-vkontakte)
[![Greenkeeper](https://img.shields.io/badge/Greenkeeper-enabled-brightgreen.svg?style=flat-square)](https://greenkeeper.io/)
[![NSP Status](https://nodesecurity.io/orgs/rcws-development/projects/694dfead-2741-4640-934b-1633dc219106/badge)](https://nodesecurity.io/orgs/rcws-development/projects/694dfead-2741-4640-934b-1633dc219106)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rockchalkwushock/microauth-vkontakte/pulls)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![nps](https://img.shields.io/badge/scripts%20run%20with-nps-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)
[![code style equimper](https://img.shields.io/badge/code%20style-equimper-blue.svg?style=flat-square)](https://github.com/EQuimper/eslint-config-equimper)

> Vkontakte OAuth for [`micro`](https://github.com/zeit/micro).

Currently in `alpha` should not be used in production until stable version is released.

## Todo

- [ ] Clean up internal documentation.
- [x] Enable GreenKeeper.
- [x] Add `all-contributors`.
- [ ] Code Review, if possible.
- [ ] Clean up README.
- [ ] Make public & publish to NPM.

## Note to users

> At the time of writing this package the following are supported:

Feature | Node Version | Flags
---------|----------|---------
 `async/await` | `^8.x.x` | no
 `object rest properties` | `^8.4.0` | `8.2.1` with `--harmony`
 `object spread properties` | `^8.4.0` | `8.2.1` with `--harmony`

Information from [Node Green](http://node.green/#ESNEXT-candidate--stage-3-).

## Running the example

1. Setup an account with [Zeit](https://zeit.co).
2. Go to [Vkontakte](https://vk.com/editapp?act=create) & create an app to get your credentials.
3. Click the button below and add those credentials along with your Zeit API Token to the environment variables requested by `now`.
4. Use a browser or a tool like [Postman](https://www.getpostman.com/postman) and visit: `https://your-now-url.now.sh/auth/vkontakte`.

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/rockchalkwushock/microauth-vkontakte/example&env=VK_APP_ID&env=VK_APP_SECRET)

You may also choose to run the example locally by cloning the repository & following these [instructions](https://github.com/rockchalkwushock/microauth-vkontakte/example/#readme).

## Usage

```sh
npm install --save micro microauth-vkontakte
# or
yarn add micro microauth-vkontakte
```

```js
const { send } = require('micro')
const microAuthVkontakte = require('microauth-vkontakte')

const options = {
  clientId: 'YOUR VK APP ID',
  clientSecret: 'YOUR VK APP SECRET',
  fields: ['city', 'country', 'photo_200'],
  redirectUrl: 'http://localhost:3000/auth/vkontatke/callback',
  scope: ['friends', 'photos']
}

const vkontakteAuth = microAuthVkontakte(options)

module.exports = vkontakteAuth(async (req, res, auth) => {
  if (!auth) return send(res, 404, 'Not Found')
  if (auth.err) {
    console.log(auth.err)
    return send(res, 403, 'Forbidden')
  }
  return `Hello ${auth.info.first_name}`
})
```

## Contributing

Please read the [CONTRIBUTING.md](https://github.com/rockchalkwushock/microauth-vkontakte/blob/master/CONTRIBUTING.md)

## Development & Testing

```sh
npm test
# or
yarn test
```

To verify the package is in working order on your local machine you can run the below script. It will produces `./package`. You can then go into the `./example` directory and change the location of `const microAuthVkontakte = require('../package/lib')`.

```sh
npm start package
# or
yarn start package
```

## License

[MIT](https://github.com/rockchalkwushock/microauth-vkontakte/blob/master/LICENSE)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section --><!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
