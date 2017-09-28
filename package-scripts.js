const npsUtils = require('nps-utils')

const { concurrent, crossEnv, rimraf, series } = npsUtils

module.exports = {
  scripts: {
    // NOTE REVIEW
    // Keep the build script & these packages strictly for users
    // not operating on node@8.4.x or higher.
    build: `${crossEnv(
      'BABEL_ENV=build'
    )} babel src --out-dir lib --plugins=transform-object-rest-spread`,
    clean: series(
      rimraf('coverage'),
      rimraf('lib'),
      rimraf('package'),
      rimraf('*.tgz')
    ),
    commit: 'git cz',
    contributors: {
      add: 'all-contributors add',
      generate: 'all-contributors generate'
    },
    default: 'nps',
    lint: {
      default: 'eslint src __tests__',
      fix: series.nps('lint --fix')
    },
    package: {
      default: series.nps('build', 'package.pack', 'package.open'),
      open: 'open microauth-vkontakte-0.0.0-development.tgz',
      pack: 'npm pack'
    },
    release: series(
      'semantic-release pre',
      'npm publish',
      'semantic-release post'
    ),
    reportCoverage: 'codecov',
    test: {
      default: 'jest --config jest.config.json --runInBand',
      coverage: series.nps('test --coverage --silent'),
      watch: series.nps('test --watch')
    },
    validate: {
      default: concurrent.nps('lint'),
      dependencies: 'nsp check',
      withCoverage: concurrent.nps('validate', 'test.coverage')
    }
  }
}
