import expect from 'expect'
import { Accounts, Account } from '../../../main/domain/models/Accounts'
import * as accountFixture from '../../fixtures/account'

const primaryAccountFixture = accountFixture.primaryAccount;
const subAccountFixture = accountFixture.subAccount;
const subAccount2Fixture = accountFixture.subAccount2;

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

describe('Accounts', () => {
  const primaryAccount = new Account(primaryAccountFixture);
  const subAccount = new Account(subAccountFixture);
  const subAccount2 = new Account(subAccount2Fixture);

  describe('#primary', () => {
    let subject;

    context('when having primary Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([
          primaryAccount,
          subAccount
        ]);
        subject = accounts.primary;
      });

      it('returns primary account', () => {
        expect(subject).toEqual(primaryAccount);
      });
    });

    context('when having no primary Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([
          subAccount,
          subAccount2
        ]);
        subject = accounts.primary;
      });

      it('returns undefined', () => {
        expect(subject).toEqual(undefined);
      });
    });
  });


  describe('#subAccounts', () => {
    let subject;

    context('when having 2 sub Accounts', () => {
      beforeEach(() => {
        const accounts = new Accounts([
          primaryAccount,
          subAccount,
          subAccount2,
        ]);
        subject = accounts.subAccounts;
      });

      it('returns 2 accounts', () => {
        expect(subject.length).toEqual(2);
      });

      it('returns sub accounts', () => {
        expect(subject[0]).toEqual(subAccount);
        expect(subject[1]).toEqual(subAccount2);
      });
    });

    context('when having only primary Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([
          primaryAccount
        ]);
        subject = accounts.subAccounts;
      });

      it('returns empty array', () => {
        expect(subject).toEqual([]);
      });
    });
  });
});
