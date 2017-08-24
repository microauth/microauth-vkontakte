# Contributing

I am open to, and grateful for, any contributions made by the community. By contributing to How-To-Open-Source, you agree to abide by the [code of conduct](https://github.com/rockchalkwushock/microauth-vkontakte/blob/master/CODE_OF_CONDUCT.md).

## Reporting Issues & Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/rockchalkwushock/microauth-vkontakte/issues) to make sure your issue hasn't already been reported.

### Bugs & Improvements

I use the issue tracker to keep track of bugs and improvements to How-To-Open-Source. I encourage you to open issues to discuss improvements, architecture, theory, internal implementation, etc. If a topic has been discussed before, I will ask you to join the previous discussion.

### Getting Help

If you are just asking a question about 'How to ...' please start the title of your issue as: `[Question]`.

### I'm not scalable, so help me out!

Please structure questions and issues in a manner that uses syntax highlighting, indentation, & split text into paragraphs. Try to state your question/issue as concisely as possible.

Please keep in mind that I spend my free time trying to help you. You can make it easier for me if you provide versions of the relevant libraries and a runnable small project reproducing your issue. You can put your code on [JSBin](https://jsbin.com/?html,js,output) or, for bigger projects, on GitHub. Make sure all the necessary dependencies are declared in `package.json` so anyone can run `npm install && npm start` and reproduce your issue.

## Development

Visit the [issue tracker](https://github.com/rockchalkwushock/microauth-vkontakte/issues) to find a list of open issues that need attention.

Fork, then clone the repository:

```bash
git clone
```

### Building

Running the build.

```bash
npm start build
```

### Linting & Testing

To run all at once, run the following:

```bash
npm run precommit
```

To run only tests:

```bash
npm test
```

To run only linting:

```bash
npm run lint
```

To continuously watch and run tests:

```bash
npm run test:watch
```

## Docs

Improvements to the documentation are always welcome. This goes for the wiki as well.

## Examples

[Local Example](https://github.com/rockchalkwushock/microauth-vkontakte/tree/master/example)

## Sending a Pull Request

In general, the contribution workflow looks like this:

- Open an issue in the [issue tracker](https://github.com/rockchalkwushock/microauth-vkontakte/issues).
- Fork the repository.
- Create a new feature branch based off the `master` branch.
- Make sure all tests and linting pass.
- Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, I'll try to get back to you as soon as possible. I may suggest some changes or improvements.

Thank you for contributing!
