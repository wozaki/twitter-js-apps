import expect from 'expect'
import { Users, User } from '../../../main/domain/models/Users'
import * as userFixtures from '../../fixtures/users'

const userFixture1 = userFixtures.user1;
const userFixture2 = userFixtures.user2;

describe('Users', () => {
  const user1 = new User(userFixture1);
  const user2 = new User(userFixture2);

  describe('#find', () => {
    context('when users has normal users', () => {
      const users = new Users([user1, user2]);
      context('and given not exist id', () => {
        it('returns dummy user', () => {
          expect(users.find("123").isDummy).toEqual(true);
        });
      });
      context("and given user2's id", () => {
        it('returns user2', () => {
          expect(users.find(user2.id)).toEqual(user2);
        });
      });
    });

    context('when users has only dummy user', () => {
      const users = new Users([User.dummy]);
      it('returns dummy user', () => {
        expect(users.find(user1.id).isDummy).toEqual(true);
      });
    });
  });


  describe('#fromObjects', () => {
    let subject;

    context('when given an empty array', () => {
      beforeEach(() => {
        subject = Users.fromObjects([]);
      });
      it('returns Users having only dummy user', () => {
        expect(subject._users.length).toEqual(1);
        expect(subject._users[0].isDummy).toEqual(true);
      });
    });

    context('when given two raw user objects', () => {
      beforeEach(() => {
        subject = Users.fromObjects([userFixture1, userFixture2]);
      });
      it('returns Users having two User', () => {
        expect(subject._users.length).toEqual(2);
        expect(subject._users[0].id).toEqual(userFixture1.id_str);
        expect(subject._users[1].id).toEqual(userFixture2.id_str);
      });
    });
  });

});
