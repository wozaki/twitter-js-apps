export default (process.env.NODE_ENV === 'test')
    ? {}
    : require('./_twitterClient');
