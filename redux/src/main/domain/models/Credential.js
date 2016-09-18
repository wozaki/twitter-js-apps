import Entity from './Entity'

class Credential extends Entity {
  constructor(userId, accessToken, accessTokenSecret, screenName) {
    super(userId);
    this.userId = userId;
    this.accessToken = accessToken;
    this.accessTokenSecret = accessTokenSecret;
    this.screenName = screenName;
  }

  static fromJson({ user_id, access_token, access_token_secret, screen_name }) {
    return new Credential(user_id, access_token, access_token_secret, screen_name);
  }

  get toJson() {
    return {
      user_id: this.userId,
      access_token: this.accessToken,
      access_token_secret: this.accessTokenSecret,
      screen_name: this.screenName
    };
  }
}

export default Credential;
