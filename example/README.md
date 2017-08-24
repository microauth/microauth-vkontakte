# Example

If you are choosing to run this example locally and not use the `now-cli` deployment button found in the repository's [README](https://github.com/rockchalkwushock/microauth-vkontakte#running-the-example) please follow the following instructions:

1. Install the present dependencies:

```sh
pwd /microauth-vkontakte/example
npm install
# or
yarn
```

2. Add `dotenv-safe`:

```sh
pwd /microauth-vkontakte/example
npm install --save dotenv-safe
# or
yarn add dotenv-safe
```

3. Create `.env` & `.env.example` files:

```sh
pwd /microauth-vkontakte/example
touch .env .env.example
```

4. Add your `VK_APP_ID` & `VK_APP_SECRET` to the `.env` file:

```txt
// Inside .env
VK_APP_ID=123
VK_APP_SECRET=abc
```

```txt
// Inside .env.example
VK_APP_ID='my app id'
VK_APP_SECRET='my app secret'
```

5. Add the following at the top of `index.js`:

```js
require('dotenv-safe').load()
```

6. Run:

```sh
pwd /microauth-vkontakte/example
npm start
# or
yarn start
```

7. Navigate to `http://localhost:3000/auth/vkontatke`.
