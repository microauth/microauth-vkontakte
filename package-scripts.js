const npsUtils = require('nps-utils')

const { rimraf, series } = npsUtils

const version = require('./package.json').version

module.exports = {
  scripts: {
    clean: series(rimraf('coverage'), rimraf('package'), rimraf('*.tgz')),
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
      open: `open microauth-vkontakte-${version}.tgz`,
      pack: 'npm pack'
    },
    release: 'semantic-release',
    reportCoverage: 'codecov',
    test: {
      default: 'jest --runInBand',
      coverage: series.nps('test --coverage --silent'),
      watch: series.nps('test --watch')
    },
    validate: {
      default: series.nps('lint.fix'),
      dependencies: 'snyk test',
      withCoverage: series.nps('validate', 'test.coverage')
    }
  }
}
