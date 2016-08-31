const NAME = 'account';

class AccountRepository {

  constructor(storage) {
    this.storage = storage;
  }

  store({ accessToken, accessTokenSecret, userId, screenName }) {
    const json = {
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
      user_id: userId,
      screen_name: screenName
    };
    const data = JSON.stringify(json);

    return this.storage.write(NAME, data);
  }

  restore() {
    const raw = this.storage.read(NAME);
    const json = JSON.parse(raw);

    if (json == null) {
      return {}
    }

    return {
      accessToken: json['access_token'],
      accessTokenSecret: json['access_token_secret'],
      userId: json['user_id'],
      screenName: json['screen_name']
    }
  }

}

export default AccountRepository
