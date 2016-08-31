import { EventEmitter } from 'events';
import { BrowserWindow } from 'electron'
import Twitter from 'node-twitter-api';

export default class AuthenticationWindow extends EventEmitter {
  constructor(consumerKey, consumerSecret, callbackUrl) {
    super();
    const twitter = new Twitter({
      callback: callbackUrl,
      consumerKey: consumerKey,
      consumerSecret: consumerSecret
    });

    twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
      const authUrl = twitter.getAuthUrl(requestToken);
      this.window = new BrowserWindow({ width: 800, height: 600, 'node-integration': false });
      this.getAccessToken(twitter, requestToken, requestTokenSecret, authUrl);
    });
  }

  getAccessToken(twitter, requestToken, requestTokenSecret, authUrl) {
    this.window.webContents.on('will-navigate', (event, authedUrl) => {
      let matched;
      if (matched = authedUrl.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2],
          (error, accessToken, accessTokenSecret, { user_id, screen_name }) => {
            this.emit(
              'authentication-succeeded',
              {
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret,
                userId: user_id,
                screenName: screen_name
              }
            );
          });
        event.preventDefault();
        setImmediate(() => {
          this.window.close();
        });
      } else if (matched = authedUrl.match(/&redirect_after_login_verification=([^&]*)/)) {
        this.window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl, isMainFrame) => {
          this.getAccessToken(twitter, requestToken, requestTokenSecret, newUrl);
        });
      }
    });
    this.window.loadURL(authUrl);
  }
}
