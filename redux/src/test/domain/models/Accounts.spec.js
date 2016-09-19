import expect from 'expect'
import { Accounts, Account } from '../../../main/domain/models/Accounts'
import * as twitterFixture from '../../fixtures/twitter'

const accountFixture = twitterFixture.account;
const accountFixture2 = twitterFixture.account2;

describe('Account', () => {
  describe('properties', () => {
    let subject;
    beforeEach(() => {
      subject = new Account(accountFixture);
    });

    it('returns same value as json', () => {
      expect(subject.id).toEqual(accountFixture.id_str);
      expect(subject.profileImageUrl).toEqual(accountFixture.profile_image_url);
      expect(subject.screenName).toEqual(accountFixture.screen_name);
      expect(subject.tweetCount).toEqual(accountFixture.statuses_count);
      expect(subject.followersCount).toEqual(accountFixture.followers_count);
      expect(subject.followingCount).toEqual(accountFixture.friends_count);
    });
  });

});
