import { BrowserWindow } from 'electron'

export default class MainWindow {
  constructor(url) {
    this.window = new BrowserWindow({ width: 500, height: 800 });
    this.window.loadURL(url);
    this.window.on('closed', () => {
      this.window = null;
    });
  }

  /**
   * This is a public interface to connect to window.webContents.send.
   * The reason why this method exists is to hide the internal window property from others.
   */
  send(...args) {
    this.window.webContents.send(...args);
  }
}
