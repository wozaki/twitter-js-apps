import { BrowserWindow } from 'electron'

export default class PreferencesWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 800, height: 500 });
    this.window.loadURL(`file://${__dirname}/../renderer/preferences-window.html`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }

  send(...args) {
    this.window.webContents.send(...args);
  }
}
