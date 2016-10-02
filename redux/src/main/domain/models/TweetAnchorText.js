import twitterText from 'twitter-text';

export default class TweetAnchorText {
  constructor(tweet) {
    this._tweet    = tweet;
    this._entities = twitterText.extractEntitiesWithIndices(tweet.text, { extractUrlsWithoutProtocol: false });
  }

  get entities() {
    return this._entities.map((entity) => {
      if (entity.url) {
        return new AnchorToUrl(entity, this._tweet.entities.urls)
      } else if (entity.hashtag) {
        return new AnchorToHashtag(entity);
      } else if (entity.listSlug) {
        return new AnchorToList(entity);
      } else if (entity.screenName) {
        return new AnchorToMention(entity);
      } else if (entity.cashtag) {
        return new AnchorToCashtag(entity);
      } else {
        console.log("TODO: Implement", entity)
      }
    })
  }
}

class BaseAnchor {
  constructor(entity) {
    this._entity    = entity;
    this.startIndex = entity.indices[0];
    this.endIndex   = entity.indices[1];
  }

  get text() {
    throw Error('must override text');
  }

  get title() {
    throw Error('must override title');
  }

  get url() {
    throw Error('must override url');
  }
}

class AnchorToUrl extends BaseAnchor {
  constructor(entity, entityUrls) {
    super(entity);
    this._entityUrls = entityUrls;
  }

  get text() {
    const url       = this.url;
    const urlEntity = this._getUrlEntityFromUrl(url);

    if (urlEntity && urlEntity.display_url) {
      return twitterText.linkTextWithEntity(urlEntity, { invisibleTagAttrs: "style='position:absolute;left:-9999px;'" });
    } else {
      return twitterText.htmlEscape(url);
    }
  }

  get title() {
    return '';
  }

  get url() {
    return this._entity.url;
  }

  _getUrlEntityFromUrl(url) {
    return this._entityUrls.filter((urlEntity) => {
      return urlEntity.url === url;
    })[0];
  }
}

class AnchorToHashtag extends BaseAnchor {
  get text() {
    return '#' + twitterText.htmlEscape(this._entity.hashtag);
  }

  get title() {
    return '#' + this._entity.hashtag;
  }

  get url() {
    return `https://twitter.com/#!/search?q=%23${this._entity.hashtag}`;
  }
}

class AnchorToList extends BaseAnchor {
  get text() {
    return '@' + twitterText.htmlEscape(this._identifier);
  }

  get title() {
    return '@' + this._identifier;
  }

  get url() {
    return `https://twitter.com/${this._identifier}`;
  }

  get _identifier() {
    return this._entity.screenName + this._entity.listSlug;
  }
}

class AnchorToMention extends BaseAnchor {
  get text() {
    return '@' + twitterText.htmlEscape(this._identifier);
  }

  get title() {
    return '@' + this._identifier;
  }

  get url() {
    return `https://twitter.com/${this._identifier}`;
  }

  get _identifier() {
    return this._entity.screenName;
  }
}

class AnchorToCashtag extends BaseAnchor {
  get text() {
    return '$' + twitterText.htmlEscape(this._cashtag);
  }

  get title() {
    return '$' + this._cashtag;
  }

  get url() {
    return `https://twitter.com/#!/search?q=%24${this._cashtag}`;
  }

  get _cashtag() {
    return this._entity.cashtag;
  }
}
