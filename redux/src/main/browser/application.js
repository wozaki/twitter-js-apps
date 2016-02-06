import { openExternal } from 'shell'
import app from 'app'
import {ipcMain} from 'electron'
import ApplicationMenu from './application-menu'
import AuthenticationWindow from './authentication-window'
import BrowserWindow from 'browser-window'
import crashReporter from 'crash-reporter'
import MainWindow from './main-window'
import NewTweetWindow from './new-tweet-window'

export default class Application {

    constructor({consumerKey, consumerSecret, callbackUrl}) {
        this.accessToken = null;
        this.accessTokenSecret = null;
        this.callbackUrl = callbackUrl;
        this.consumerKey = consumerKey;
        this.consumerSecret = consumerSecret;
        this.mainWindow = null;
    }

    onAuthenticationSucceeded({ accessToken, accessTokenSecret, userId, screenName }) {
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
        this.setTwitterCredentialToGlobal();
        this.setMyAccountToGlobal(userId, screenName);
        this.openMainWindow();
    }

    onReady() {
        this.openAuthenticationWindow();
        this.setApplicationMenu();
        this.subscribeRendererEvent();
    }

    openAuthenticationWindow() {
        new AuthenticationWindow(this.consumerKey, this.consumerSecret, this.callbackUrl)
            .on('authentication-succeeded', this.onAuthenticationSucceeded.bind(this)
        );
    }

    openMainWindow() {
        this.mainWindow = new MainWindow();
    }

    openNewTweetWindow() {
        new NewTweetWindow();
    }

    subscribeRendererEvent() {
        ipcMain.on('open-new-tweet-window', () => {
            this.openNewTweetWindow();
        });
    }

    setMyAccountToGlobal(userId, screenName) {
        const myAccount = {
            userId: userId,
            screenName: screenName
        };
        global.myAccount = myAccount;
    }

    setTwitterCredentialToGlobal() {
        const twitterCredential = {
            consumerKey: this.consumerKey,
            consumerSecret: this.consumerSecret,
            accessToken: this.accessToken,
            accessTokenSecret: this.accessTokenSecret
        };
        global.twitterCredential = twitterCredential;
    }

    registerApplicationCallbacks() {
        app.on('window-all-closed', () => {
        });
        app.on('ready', this.onReady.bind(this));
    }

    run() {
        this.startCrashReporter();
        this.registerApplicationCallbacks();
    }

    setApplicationMenu() {
        new ApplicationMenu().on('open-dev-tools', () => {
            this.mainWindow.window.toggleDevTools();
        }).on('quit', () => {
            app.quit();
        }).on('reload', () => {
            this.mainWindow.window.webContents.reloadIgnoringCache();
        }).on('new-tweet', () => {
            this.openNewTweetWindow();
        }).on('search', () => {
            this.mainWindow.send('select-search-box');
        }).on('select-next-channel', () => {
            this.mainWindow.send('select-next-channel');
        }).on('select-previous-channel', () => {
            this.mainWindow.send('select-previous-channel');
        });
    }

    startCrashReporter() {
        //crashReporter.start();
    }
}
