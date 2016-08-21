import { remote } from 'electron'
const myAccount = remote.getGlobal('myAccount');

class My {
  constructor(userId, screenName) {
    this.userId = userId;
    this.screenName = screenName;
  }
}

export default new My(myAccount.userId, myAccount.screenName);
