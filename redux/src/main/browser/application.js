import { app, ipcMain } from 'electron'
import TwitterApi from 'node-twitter-api';
import ApplicationMenu from './application-menu'
import Authenticator from './authenticatior'
import MainWindow from './main-window'
import NewTweetWindow from './new-tweet-window'
import WindowCycler from './window-cycler'
import { credentialRepository } from './registory'
import PreferencesWindow from './preferences-window'

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
    if (credentialRepository.existsAtLeastOne()) {
      const credential = credentialRepository.restore();
      this.onAuthenticationSucceeded(credential);
    } else {
      this.openAuthenticationWindow()
        .on('authentication-succeeded', this.onAuthenticationSucceeded.bind(this));
    }
  }

  onAuthenticationSucceeded(credential) {
    const myAccount = {
      userId: credential.userId,
      screenName: credential.screenName
    };
    const twitterCredential = {
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret,
      accessToken: credential.accessToken,
      accessTokenSecret: credential.accessTokenSecret
    };

    this.callback(myAccount, twitterCredential);
    credentialRepository.store(credential);

    const mainWindow = this.openMainWindow();
    this.setApplicationMenu(mainWindow);
    this.subscribeRendererEvent();
    
    this.newTweetWindow = new WindowCycler(() => new NewTweetWindow(this.newTweetWindowUrl));
    this.newTweetWindow.prepare()
  }

  openAuthenticationWindow(force = false) {
    const twitterApi = new TwitterApi({
      callback: this.callbackUrl,
      consumerKey: this.consumerKey,
      consumerSecret: this.consumerSecret
    });
    const authenticator = new Authenticator(twitterApi);

    return authenticator.authenticateViaWindow(force);
  }

  openMainWindow() {
    return new MainWindow(this.mainWindowUrl);
  }

  openPreferencesWindow() {
    this.preferencesWindow =　new PreferencesWindow();
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
        //TODO: broadcast all window
        mainWindow.toggleDevTools();
        if (this.preferencesWindow != null) {
          this.preferencesWindow.toggleDevTools();
        }
      })
      .on('quit', () => {
        app.quit();
      })
      .on('open-preferences', () => {
        this.openPreferencesWindow();
      })
      .on('reload', () => {
        //TODO: broadcast all window
        mainWindow.reload();
        if (this.preferencesWindow != null) {
          this.preferencesWindow.reload();
        }
      })
      .on('new-tweet', () => {
        this.openNewTweetWindow();
      });
  }

  startCrashReporter() {
    //crashReporter.start();
  }
}
