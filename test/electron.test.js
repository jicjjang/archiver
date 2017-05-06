
const Application = require('spectron').Application
const electron = require('electron-prebuilt')
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

global.before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});

describe('application launch', function () {
  this.timeout(15000)
  beforeEach(function () {
    this.app = new Application({
      path: electron,
      args: ['./electron.js']
    })
    return this.app.start()
  })

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness
  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('opens a window', function () {
    this.timeout(15000)
    return this.app.client.waitUntilWindowLoaded()
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
      .getWindowCount().should.eventually.equal(1)
      .getTitle().should.eventually.equal('Archiver')
  })
})
