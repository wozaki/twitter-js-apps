import twitterConfig from './twitter-config.js'
import { Application } from 'twitter-electron-window'

global.application = new Application(twitterConfig);
global.application.run((myAccount, twitterCredential) => {
  global.myAccount = myAccount;
  global.twitterCredential = twitterCredential;
});
