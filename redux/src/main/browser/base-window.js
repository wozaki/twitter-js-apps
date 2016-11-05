import { BrowserWindow } from 'electron'

class BaseWindow {
  constructor(url, options) {
    this.isRunning = true;
    this.prepare(url, options);
  }

  prepare(url, options) {
    this.initializer = () => new BrowserWindow(options);
    this.browserWindow = this.initializer();
    this.browserWindow.hide();
    this.browserWindow.loadURL(url);
    this.browserWindow.on('closed', () => {
      if (this.isRunning) {
        this.prepare(url, options);
      } else {
        this.browserWindow = null;
      }
    });
  }

  stopHotLoading() {
    this.isRunning = false
  }

  /**
   * @return {string}
   */
  get key() {
    throw Error("you must override this method")
  }

  focus() {
    this.browserWindow.focus();
  }

  show() {
    this.browserWindow.show();
  }

  hide() {
    this.browserWindow.hide();
  }

  send(...args) {
    this.browserWindow.webContents.send(...args);
  }

  close(...args) {
    this.browserWindow.close()
  }

  reload() {
    this.browserWindow.webContents.reloadIgnoringCache();
  }

  toggleDevTools() {
    this.browserWindow.toggleDevTools();
  }

}

export default BaseWindow
