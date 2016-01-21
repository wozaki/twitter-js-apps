import expect from 'expect'
import sinon from 'sinon'
import FavoriteUsecase from '../../../main/domain/usecases/FavoriteUsecase'
import TwitterClient from '../../../main/infrastructure/TwitterClient'

describe('FavoriteUsecase', () => {
  const tweetId = "123";
  const fixtureTweet = { id_str: "123" };

  it('add should return', (done) => {
    const stubTwitterClient = sinon.createStubInstance(TwitterClient);
    stubTwitterClient.favoritesCreate
      .withArgs({ tweetId })
      .returns(new Promise((resolve) => resolve({ tweet: fixtureTweet })));

    const favoriteUsecase = new FavoriteUsecase(stubTwitterClient);
    favoriteUsecase
      .add(tweetId)
      .then(({tweet}) => {
        expect(tweet.id_str).toEqual(fixtureTweet.id_str);
        done();
      })
      .catch(done);
  });

  it('remove should return', (done) => {
    const stubTwitterClient = sinon.createStubInstance(TwitterClient);
    stubTwitterClient.favoritesDestroy
      .withArgs({ tweetId })
      .returns(new Promise((resolve) => resolve({ tweet: fixtureTweet })));

    const favoriteUsecase = new FavoriteUsecase(stubTwitterClient);
    favoriteUsecase
      .remove(tweetId)
      .then(({tweet}) => {
        expect(tweet.id_str).toEqual(fixtureTweet.id_str);
        done();
      })
      .catch(done);
  });

});
