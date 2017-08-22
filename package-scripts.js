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
    default: 'nps',
    lint: {
      default: 'eslint src __tests__',
      fix: series.nps('lint --fix')
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
      withCoverage: concurrent.nps('validate', 'test.coverage')
    }
  }
}
