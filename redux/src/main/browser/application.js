import { app, ipcMain } from 'electron'
import TwitterApi from 'node-twitter-api';
import ApplicationMenu from './application-menu'
import Authenticator from './authenticatior'
import MainWindow from './main-window'
import NewTweetWindow from './new-tweet-window'
import { credentialRepository } from './registory'
import PreferencesWindow from './preferences-window'
import WindowManager from './window-manager'

export default class Application {

  constructor({ consumerKey, consumerSecret, callbackUrl, mainWindowUrl, newTweetWindowUrl }) {
    this.callbackUrl       = callbackUrl;
    this.consumerKey       = consumerKey;
    this.consumerSecret    = consumerSecret;
    this.mainWindowUrl     = mainWindowUrl;
    this.newTweetWindowUrl = newTweetWindowUrl;
    this.windowManager     = new WindowManager();
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
    this.callback(credential);
    credentialRepository.store(credential);

    const mainWindow = new MainWindow(this.mainWindowUrl);
    mainWindow
      .on('scroll-touch-begin', () => {
        mainWindow.send('scroll-touch-begin')
      })
      .on('scroll-touch-end', () => {
        mainWindow.send('scroll-touch-end')
      });
    const newTweetWindow    = new NewTweetWindow(this.newTweetWindowUrl);
    const preferencesWindow = new PreferencesWindow(mainWindow);
    this.windowManager.register(mainWindow, newTweetWindow, preferencesWindow);

    mainWindow.browserWindow.on('closed', () => {
      this.quit();
    });

    this.openMainWindow();
    this.setApplicationMenu();
    this.subscribeRendererEvent();
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
    this.windowManager.ensure(MainWindow.KEY)
  }

  openPreferencesWindow() {
    this.windowManager.ensure(PreferencesWindow.KEY)
  }

  openNewTweetWindow() {
    this.windowManager.ensure(NewTweetWindow.KEY)
  }

  subscribeRendererEvent() {
    ipcMain
      .on('open-new-tweet-window', () => {
        this.openNewTweetWindow();
      })
      .on('add-account', (event) => {
        this.openAuthenticationWindow(true).on('authentication-succeeded', (credential) => {
          event.sender.send('added-account', credential);
        });
      })
      .on('go-back', () => {
        const mainWindow = this.windowManager.find(MainWindow.KEY);
        mainWindow.goBack()
      })
  }

  registerApplicationCallbacks() {
    app.on('window-all-closed', () => {
    });

    app.on('will-quit', () => {
    });

    app.on('ready', this.onReady.bind(this));
  }

  quit() {
    this.windowManager.stopHotLoading();
    app.quit();
  }

  setApplicationMenu() {
    new ApplicationMenu()
      .on('open-dev-tools', () => {
        this.windowManager.toggleDevTools();
      })
      .on('quit', () => {
        this.quit();
      })
      .on('open-preferences', () => {
        this.openPreferencesWindow();
      })
      .on('reload', () => {
        this.windowManager.reload();
      })
      .on('new-tweet', () => {
        this.openNewTweetWindow();
      });
  }

  startCrashReporter() {
    //crashReporter.start();
  }
}
