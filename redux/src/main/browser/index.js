import twitterConfig from './twitter-config.js'
import Application from './application'

global.application = new Application(twitterConfig);
global.application.run((credential) => {
  global.credential = credential;
  global.twitterConfig = {
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret
  };
});
