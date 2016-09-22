import expect from 'expect'
import { Accounts, Account } from '../../../main/domain/models/Accounts'
import * as accountFixture from '../../fixtures/account'

const primaryAccountFixture = accountFixture.primaryAccount;

describe('Account', () => {
  describe('properties', () => {
    let subject;
    beforeEach(() => {
      subject = new Account(primaryAccountFixture);
    });

    it('returns same value as json', () => {
      expect(subject.id).toEqual(primaryAccountFixture.id_str);
      expect(subject.profileImageUrl).toEqual(primaryAccountFixture.profile_image_url);
      expect(subject.screenName).toEqual(primaryAccountFixture.screen_name);
      expect(subject.tweetCount).toEqual(primaryAccountFixture.statuses_count);
      expect(subject.followersCount).toEqual(primaryAccountFixture.followers_count);
      expect(subject.followingCount).toEqual(primaryAccountFixture.friends_count);
      expect(subject.isPrimary).toEqual(primaryAccountFixture.is_primary);
    });
  });
});
