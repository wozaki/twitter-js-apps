import { EventEmitter } from 'events';
import AuthenticationWindow from './authentication-window'

class Authenticator extends EventEmitter {
  constructor(twitterApi) {
    super();
    this.twitterApi = twitterApi;
  }

  authenticateViaWindow() {
    this.twitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      const authUrl = this.twitterApi.getAuthUrl(requestToken);
      this._extractOauthVerifierFromWindow(authUrl, (oauthVerifier) => {
        this.twitterApi.getAccessToken(requestToken, requestTokenSecret, oauthVerifier,
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
      });
    });

    return this;
  }

  _extractOauthVerifierFromWindow(authUrl, callback) {
    const window = new AuthenticationWindow(authUrl);

    window.onWillNavigate((authedUrl) => {
      let matched;
      if (matched = authedUrl.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        callback(matched[2]);
        setImmediate(() => {
          window.close();
        });
      } else if (matched = authedUrl.match(/&redirect_after_login_verification=([^&]*)/)) {
        window.onDidGetRedirectRequest((newUrl) => {
          this._getAccessTokenFromWindow(newUrl);
        });
      }
    });
  }

}

export default Authenticator
