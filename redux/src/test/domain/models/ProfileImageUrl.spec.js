import expect from 'expect'
import ProfileImageUrl from '../../../main/domain/models/ProfileImageUrl'

describe('ProfileImageUrl', () => {

  context('given null', () => {
    const subject = new ProfileImageUrl(null);
    it('returns empty string', () => {
      expect(subject.normal).toEqual("");
      expect(subject.bigger).toEqual("");
      expect(subject.mini).toEqual("");
      expect(subject.original).toEqual("");
    });
  });

  context('given valid url', () => {
    const url     = "http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png"
    const subject = new ProfileImageUrl(url);

    describe('#normal', () => {
      it('returns normal size profile url', () => {
        expect(subject.normal)
          .toEqual("http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png");
      });
    });

    describe('#bigger', () => {
      it('returns bigger size profile url', () => {
        expect(subject.bigger)
          .toEqual("http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_bigger.png");
      });
    });

    describe('#mini', () => {
      it('returns mini size profile url', () => {
        expect(subject.mini)
          .toEqual("http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_mini.png");
      });
    });

    describe('#original', () => {
      it('returns original size profile url', () => {
        expect(subject.original)
          .toEqual("http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3.png");
      });
    });
  });

});
