import expect from 'expect'
import { Accounts, Account } from '../../../main/domain/models/Accounts'
import * as twitterFixture from '../../fixtures/twitter'

const accountFixture = twitterFixture.account;
const accountFixture2 = twitterFixture.account2;

describe('Account', () => {
  describe('properties', () => {
    let subject;
    beforeEach(() => {
      subject = new Account(accountFixture, true, true);
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

  describe('#isDummy', () => {
    context('when setting isDummy to true', () => {
      let subject;
      beforeEach(() => {
        subject = new Account(accountFixture, true, true);
      });
      it('returns true', () => {
        expect(subject.isDummy).toEqual(true);
      });
    });
  });

  describe('#dummy', () => {
    let subject;
    beforeEach(() => {
      subject = Account.dummy;
    });
    it('returns dummy account', () => {
      expect(subject.isDummy).toEqual(true);
    });
  });
});

describe('Accounts', () => {
  describe('#dummy', () => {
    let subject;
    beforeEach(() => {
      subject = Accounts.dummy;
    });

    it('contains 1 account', () => {
      expect(subject._accounts.length).toEqual(1);
    });

    it('contains dummy account', () => {
      expect(subject._accounts[0].isDummy).toEqual(true);
    });
  });

  describe('#refresh', () => {
    const account = new Account(accountFixture, true, false);
    const accounts = new Accounts([
      account
    ]);

    context('when refreshing by new account', () => {
      const subject = accounts.refresh(new Account(accountFixture2, true, false));
      it('increments account', () => {
        expect(subject._accounts.length).toEqual(2);
      });
    });

    context('when refreshing by same account', () => {
      let newfix = twitterFixture.account;
      newfix.screen_name = "new account name";
      const sameAccount = new Account(newfix, true, false);
      const subject = accounts.refresh(sameAccount);

      it('keeps number of account', () => {
        expect(subject._accounts.length).toEqual(1);
      });

      it('replaces new account', () => {
        expect(subject._accounts[0].screenName).toEqual("new account name");
      });
    });


    context('when having dummy account', () => {
      context('when refreshing by new account', () => {
        const subject = accounts.refresh(new Account(accountFixture, true, false))
        it('increments account', () => {
          expect(subject._accounts.length).toEqual(1);
        });
      });
    });
  });
});
