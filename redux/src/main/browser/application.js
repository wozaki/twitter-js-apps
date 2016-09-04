import { app, ipcMain } from 'electron'
import ApplicationMenu from './application-menu'
import AuthenticationWindow from './authentication-window'
import MainWindow from './main-window'
import NewTweetWindow from './new-tweet-window'
import { accountRepository } from './registory'

export default class Application {

  constructor({ consumerKey, consumerSecret, callbackUrl, mainWindowUrl, newTweetWindowUrl }) {
    this.callbackUrl = callbackUrl;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.mainWindowUrl = mainWindowUrl;
    this.newTweetWindowUrl = newTweetWindowUrl;
  }

  run(callback) {
    this.callback = callback;
    this.startCrashReporter();
    this.registerApplicationCallbacks();
  }

  onReady() {
    if (accountRepository.existsAtLeastOne()) {
      const account = accountRepository.restore();
      this.onAuthenticationSucceeded(account);
    } else {
      this.openAuthenticationWindow()
        .on('authentication-succeeded', this.onAuthenticationSucceeded.bind(this));
    }
  }

  onAuthenticationSucceeded({ accessToken, accessTokenSecret, userId, screenName }) {
    const myAccount = {
      userId: userId,
      screenName: screenName
    };
    const twitterCredential = {
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      accessToken: accessToken,
      accessTokenSecret: accessTokenSecret
    };

    this.callback(myAccount, twitterCredential);
    accountRepository.store({ accessToken, accessTokenSecret, userId, screenName });

    const mainWindow = this.openMainWindow();
    this.setApplicationMenu(mainWindow);
    this.subscribeRendererEvent();
  }

  openAuthenticationWindow() {
    return new AuthenticationWindow(this.consumerKey, this.consumerSecret, this.callbackUrl);
  }

  openMainWindow() {
    return new MainWindow(this.mainWindowUrl);
  }

  openNewTweetWindow() {
    new NewTweetWindow(this.newTweetWindowUrl);
  }

  subscribeRendererEvent() {
    ipcMain.on('open-new-tweet-window', () => {
      this.openNewTweetWindow();
    });
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
    });
    app.on('ready', this.onReady.bind(this));
  }

  setApplicationMenu(mainWindow) {
    new ApplicationMenu()
      .on('open-dev-tools', () => {
        mainWindow.window.toggleDevTools();
      })
      .on('quit', () => {
        app.quit();
      })
      .on('reload', () => {
        mainWindow.window.webContents.reloadIgnoringCache();
      })
      .on('new-tweet', () => {
        this.openNewTweetWindow();
      });
  }

  startCrashReporter() {
    //crashReporter.start();
  }
}
