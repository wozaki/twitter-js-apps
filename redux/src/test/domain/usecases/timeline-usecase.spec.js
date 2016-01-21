import expect from 'expect'
import sinon from 'sinon'
import TimelineUsecase from '../../../main/domain/usecases/TimelineUsecase'
import TwitterClient from '../../../main/infrastructure/TwitterClient'

describe('TimelineUsecase', () => {

  it('fetchHomeTweetsOlderThan should return', (done) => {
    const maxTweetId = "123";
    const fixtureTweets =
      [
        { id_str: "123", text: "hoge" },
        { id_str: "456", text: "fuga" },
        { id_str: "789", text: "piyo" }
      ];
    const stubTwitterClient = sinon.createStubInstance(TwitterClient);
    stubTwitterClient.statusesHomeTimeline
      .withArgs({ maxId: maxTweetId })
      .returns(new Promise((resolve) => resolve({ tweets: fixtureTweets })));

    const timelineUsecase = new TimelineUsecase(stubTwitterClient);
    timelineUsecase
      .fetchHomeTweetsOlderThan(maxTweetId)
      .then(({tweets}) => {
        expect(tweets.length).toEqual(2);
        expect(tweets[0].id_str).toEqual(fixtureTweets[1].id_str);
        expect(tweets[1].id_str).toEqual(fixtureTweets[2].id_str);
        done();
      })
      .catch(done);
  });

});
