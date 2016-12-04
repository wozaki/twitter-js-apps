import expect from 'expect'
import UrlEntity from '../../../main/domain/models/UrlEntity'

//https://dev.twitter.com/overview/api/entities
describe('UrlEntity', () => {

  context('given null', () => {
    const subject = new UrlEntity(null);
    it('returns undefined', () => {
      expect(subject.forDisplay).toEqual(undefined);
      expect(subject.expanded).toEqual(undefined);
      expect(subject.wrapped).toEqual(undefined);
    });
  });

  context('given undefined', () => {
    const subject = new UrlEntity(undefined);
    it('returns undefined', () => {
      expect(subject.forDisplay).toEqual(undefined);
      expect(subject.expanded).toEqual(undefined);
      expect(subject.wrapped).toEqual(undefined);
    });
  });

  context('given valid object', () => {
    const urlEntityFixture = {
      "display_url": "youtube.com\/watch?v=oHg5SJ\u2026",
      "expanded_url": "http:\/\/www.youtube.com\/watch?v=oHg5SJYRHA0",
      "indices": [32, 52],
      "url": "http:\/\/t.co\/IOwBrTZR"
    };
    const subject          = new UrlEntity(urlEntityFixture);
    it('returns url', () => {
      expect(subject.forDisplay).toEqual("youtube.com\/watch?v=oHg5SJ\u2026");
      expect(subject.expanded).toEqual("http:\/\/www.youtube.com\/watch?v=oHg5SJYRHA0");
      expect(subject.wrapped).toEqual("http:\/\/t.co\/IOwBrTZR");
    });
  });

});
