import { EventEmitter } from 'events';
import AuthenticationWindow from './authentication-window'
import Credential from '../domain/models/Credential'

class Authenticator extends EventEmitter {
  constructor(twitterApi) {
    super();
    this.twitterApi = twitterApi;
  }

  authenticateViaWindow(force) {
    this.twitterApi.getRequestToken((error, requestToken, requestTokenSecret) => {
      const authUrl = this.twitterApi.getAuthUrl(requestToken + "&force_login=" + force);
      this._extractOauthVerifierFromWindow(authUrl, (oauthVerifier) => {
        this.twitterApi.getAccessToken(requestToken, requestTokenSecret, oauthVerifier,
          (error, accessToken, accessTokenSecret, { user_id, screen_name }) => {
            const credential = new Credential(user_id, accessToken, accessTokenSecret, screen_name);
            this.emit('authentication-succeeded', credential);
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
          this._extractOauthVerifierFromWindow(newUrl);
        });
      }
    });
  }

}

export default Authenticator
