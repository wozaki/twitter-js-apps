import { BrowserWindow } from 'electron'

export default class NewTweetWindow {
  constructor(url) {
    this.browserWindow = new BrowserWindow({ width: 300, height: 200 }); //TODO: avoid to open in front of another NewTweetWindow
    this.browserWindow.loadURL(url);
    this.browserWindow.on('closed', () => {
      this.browserWindow = null;
    });
  }

  show() {
    this.browserWindow.show();
  }

}
