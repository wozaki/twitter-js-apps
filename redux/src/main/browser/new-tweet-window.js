import { BrowserWindow } from 'electron'

export default class NewTweetWindow {
  constructor(url) {
    this.win = new BrowserWindow({ width: 300, height: 200 }); //TODO: avoid to open in front of another NewTweetWindow
    this.win.loadURL(url);
    this.win.on('closed', () => {
      this.win = null;
    });
  }
}
