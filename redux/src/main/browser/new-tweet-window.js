import { BrowserWindow } from 'electron'
import BaseWindow from './base-window'

export default class NewTweetWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 300, height: 200 });
  }
}
