import BaseWindow from './base-window'

class AuthenticationWindow extends BaseWindow {
  constructor(url) {
    super(url, { width: 800, height: 600, 'node-integration': false });
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
}

export default AuthenticationWindow
