import BaseWindow from './base-window'

const key = 'MainWindow';

class MainWindow extends BaseWindow {
  static KEY = key;

  constructor(url) {
    super(url, { width: 500, height: 800 });
  }

  get key() {
    return key;
  }
}

export default MainWindow
