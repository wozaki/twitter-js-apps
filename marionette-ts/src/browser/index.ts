'use strict';

import { Application } from 'twitter-electron-window';
import twitterConfig from './twitter-config';

let global: any = {};
const application = new Application(twitterConfig);
application.run((myAccount, twitterCredential) => {
    global.myAccount = myAccount;
    global.twitterCredential = twitterCredential;
});
