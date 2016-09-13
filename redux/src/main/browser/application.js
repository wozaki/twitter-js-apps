import { app, ipcMain } from 'electron'
import TwitterApi from 'node-twitter-api';
import ApplicationMenu from './application-menu'
import Authenticator from './authenticatior'
import MainWindow from './main-window'
import NewTweetWindow from './new-tweet-window'
import WindowCycler from './window-cycler'
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
    
    this.newTweetWindow = new WindowCycler(() => new NewTweetWindow(this.newTweetWindowUrl));
    this.newTweetWindow.prepare()
  }

  openAuthenticationWindow() {
    const twitterApi = new TwitterApi({
      callback: this.callbackUrl,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret
    });
    const authenticator = new Authenticator(twitterApi);

    return authenticator.authenticateViaWindow();
  }

  openMainWindow() {
    return new MainWindow(this.mainWindowUrl);
  }

  openNewTweetWindow() {
    this.newTweetWindow.showWindow()
  }

  subscribeRendererEvent() {
    ipcMain.on('open-new-tweet-window', () => {
      this.openNewTweetWindow();
    });
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
    });

    app.on('will-quit', () => {
      this.newTweetWindow.stop();
    });

    app.on('ready', this.onReady.bind(this));
  }

  setApplicationMenu(mainWindow) {
    new ApplicationMenu()
      .on('open-dev-tools', () => {
        mainWindow.toggleDevTools();
      })
      .on('quit', () => {
        app.quit();
      })
      .on('reload', () => {
        mainWindow.reload();
      })
      .on('new-tweet', () => {
        this.openNewTweetWindow();
      });
  }

  startCrashReporter() {
    //crashReporter.start();
  }
}
