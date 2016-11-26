import expect from 'expect'
import { Accounts, Account } from '../../../main/domain/models/Accounts'
import * as accountFixture from '../../fixtures/account'

const primaryAccountFixture = accountFixture.primaryAccount;
const subAccountFixture = accountFixture.subAccount;
const subAccount2Fixture = accountFixture.subAccount2;
const dummyAccountFixture = accountFixture.dummyAccount;

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

  describe('isDummy', () => {
    context('when id is null', () => {
      it('returns true', () => {
        expect(new Account(dummyAccountFixture).isDummy).toEqual(true)
      });
    });
    context('when id is not null', () => {
      it('returns false', () => {
        expect(new Account(primaryAccountFixture).isDummy).toEqual(false)
      });
    });
  });
});

describe('Accounts', () => {
  const primaryAccount = new Account(primaryAccountFixture);
  const subAccount = new Account(subAccountFixture);
  const subAccount2 = new Account(subAccount2Fixture);
  const dummyAccount = new Account(dummyAccountFixture);

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


  describe('#isEmpty', () => {
    let subject;

    context('when having Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([primaryAccount]);
        subject        = accounts.isEmpty;
      });
      it('returns false', () => {
        expect(subject).toEqual(false);
      });
    });

    context('when having no Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([]);
        subject        = accounts.isEmpty;
      });
      it('returns true', () => {
        expect(subject).toEqual(true);
      });
    });

    context('when having only dummy Account', () => {
      beforeEach(() => {
        const accounts = new Accounts([dummyAccount]);
        subject        = accounts.isEmpty;
      });
      it('returns true', () => {
        expect(subject).toEqual(true);
      });
    });
  });

  describe('#fromJson', () => {
    let subject;

    context('when given an empty array', () => {
      beforeEach(() => {
        subject = Accounts.fromJson([]);
      });
      it('returns Accounts having only dummy account', () => {
        expect(subject.asArray.length).toEqual(1);
        expect(subject.asArray[0].isDummy).toEqual(true);
      });
    });

    context('when given two raw account objects', () => {
      beforeEach(() => {
        subject = Accounts.fromJson([primaryAccountFixture, subAccountFixture]);
      });
      it('returns Accounts having two Account', () => {
        expect(subject.asArray.length).toEqual(2);
        expect(subject.asArray[0].id).toEqual(primaryAccountFixture.id_str);
        expect(subject.asArray[1].id).toEqual(subAccountFixture.id_str);
      });
    });
  });


});
