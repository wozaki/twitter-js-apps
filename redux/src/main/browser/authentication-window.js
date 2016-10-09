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

  onDidGetRedirectRequest(callback) {
    this.browserWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl, isMainFrame) => {
      callback(newUrl);
    });
  }

  get key() {
    return key;
  }
}

export default AuthenticationWindow
