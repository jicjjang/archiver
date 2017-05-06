const Application = require('spectron').Application
const chaiAsPromised = require('chai-as-promised')
const electron = require('electron-prebuilt')
const assert = require('assert')

const app = new Application({
  path: electron,
  args: ['./electron.js']
})

beforeEach(function () {
  return app.start().then(function (app) {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
    return app
  })
})

afterEach(function () {
  if (app && app.isRunning()) {
    return app.stop()
  }
})

describe("application launch", function () {
  this.timeout(15000)
  it("shows an initial window", function () {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      return app.client.getTitle()
    }).then(function(title) {
      assert.equal(title, 'Archiever')
      return app
    })
  })
})
