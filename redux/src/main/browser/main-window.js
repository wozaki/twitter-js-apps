import { BrowserWindow } from 'electron'
import BaseWindow from './base-window'

export default class MainWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 500, height: 800 });
  }
}
