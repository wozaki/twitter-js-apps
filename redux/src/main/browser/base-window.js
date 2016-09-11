import { BrowserWindow } from 'electron'

class BaseWindow {
  constructor(url, options) {
    this.onClosedHandler = null;
    this.browserWindow = new BrowserWindow(options);
    this.browserWindow.loadURL(url);
    this.browserWindow.on('closed', () => {
      if (this.onClosedHandler != null) {
        this.onClosedHandler();
      }
      this.browserWindow = null;
    });
  }

  show() {
    this.browserWindow.show();
  }

  hide() {
    this.browserWindow.hide();
  }

  setClosedHandler(handler) {
    this.onClosedHandler = handler;
  }

  send(...args) {
    this.browserWindow.webContents.send(...args);
  }

  close(...args) {
    this.browserWindow.close()
  }

}

export default BaseWindow
