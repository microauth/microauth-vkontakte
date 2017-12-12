const npsUtils = require('nps-utils')

const { concurrent, rimraf, series } = npsUtils

module.exports = {
  scripts: {
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
      default: series.nps('package.pack', 'package.open'),
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
      default: 'jest --runInBand',
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
