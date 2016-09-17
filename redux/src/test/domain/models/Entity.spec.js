import expect from 'expect'
import Entity from '../../../main/domain/models/Entity'

describe('Entity', () => {
  describe('#id', () => {
    it('returns same value as argument', () => {
      const subject = new DummyEntity("123", "hoge");
      expect(subject.id).toEqual("123");
    });
  });

  describe('#equals', () => {
    let subject;
    beforeEach(() => {
      subject = new DummyEntity("123", "hoge");
    });

    it('returns false when a comparison entity is null', () => {
      expect(subject.equals(null)).toEqual(false);
    });

    it('returns false when a comparison entity is not same', () => {
      const comparison = new DummyEntity2(subject.id, "hoge");
      expect(subject.equals(comparison)).toEqual(false);
    });

    it('returns false when id of a comparison entity is not same', () => {
      const comparison = new DummyEntity("12", "hoge");
      expect(subject.equals(comparison)).toEqual(false);
    });

    it('returns false when id of a comparison entity is not same type', () => {
      const comparison = new DummyEntity(123, "hoge");
      expect(subject.equals(comparison)).toEqual(false);
    });

    it('returns true when a comparison entity has same id even though its property is not same', () => {
      const comparison = new DummyEntity(subject.id, "fuga");
      expect(subject.equals(comparison)).toEqual(true);
    });
  });
});

class DummyEntity extends Entity {
  constructor(id, property1) {
    super(id);
    this.property1 = property1;
  }
}

class DummyEntity2 extends Entity {
  constructor(id, property1) {
    super(id);
    this.property1 = property1;
  }
}
