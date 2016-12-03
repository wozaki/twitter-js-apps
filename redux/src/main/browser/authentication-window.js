import BaseWindow from './base-window'

const key = 'AuthenticationWindow';

class AuthenticationWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 800, height: 600, 'node-integration': false });
    this.show(); // x(
  }

  onWillNavigate(callback) {
    this.browserWindow.webContents.on('will-navigate', (event, authedUrl) => {
      callback(authedUrl);
    })
  }

  get key() {
    return key;
  }
}

export default AuthenticationWindow
