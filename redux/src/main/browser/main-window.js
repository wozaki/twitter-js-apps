import BaseWindow from './base-window'

class MainWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 500, height: 800 });
  }
}

export default MainWindow
