//register Twitter App https://apps.twitter.com/
//rename twitter-config
export default {
    callbackUrl: 'http://example.com',
    consumerKey: 'xxxxxxxxxxxxxxxxxx',
    consumerSecret: 'xxxxxxxxxxxxxxxxxx',
    mainWindowUrl: `file://${__dirname}/../renderer/index.html`,
    newTweetWindowUrl: `file://${__dirname}/../renderer/new-tweet-window.html`
}