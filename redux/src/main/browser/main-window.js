import BaseWindow from './base-window'

const key = 'MainWindow';

class MainWindow extends BaseWindow {
  static KEY = key;

  constructor(url) {
    //TODO: implement dummy window buttons
    super(url, { width: 500, minWidth: 400, height: 800, minHeight: 140, frame: false });
  }

  get key() {
    return key;
  }
}

export default MainWindow
