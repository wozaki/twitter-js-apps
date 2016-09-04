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
    this.mainWindow = null;
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
    this.setApplicationMenu();
    this.subscribeRendererEvent();
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

    this.openMainWindow();
  }

  openAuthenticationWindow() {
    return new AuthenticationWindow(this.consumerKey, this.consumerSecret, this.callbackUrl);
  }

  openMainWindow() {
    this.mainWindow = new MainWindow(this.mainWindowUrl);
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

  setApplicationMenu() {
    new ApplicationMenu()
      .on('open-dev-tools', () => {
        this.mainWindow.window.toggleDevTools();
      })
      .on('quit', () => {
        app.quit();
      })
      .on('reload', () => {
        this.mainWindow.window.webContents.reloadIgnoringCache();
      })
      .on('new-tweet', () => {
        this.openNewTweetWindow();
      });
  }

  startCrashReporter() {
    //crashReporter.start();
  }
}
