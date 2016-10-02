import React from 'react';
import Time from './Time';
import twitterText from 'twitter-text';
import TweetAnchorText from '../../domain/models/TweetAnchorText';

class Anchor extends React.Component {
  render() {
    const { onAnchorClicked, url, text, title } = this.props;

    return <a
      className="Tweet-anchor"
      dangerouslySetInnerHTML={{ __html: text }}
      href={url}
      onClick={onAnchorClicked}
      tabIndex="-1"
      title={title}
    />;
  }
}

class Image extends React.Component {
  onClicked(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Tweet-image-container">
        <a href={this.props.tweetUrl} onClick={this.onClicked.bind(this)} tabIndex="-1">
          <img className="Tweet-image" src={this.props.imageUrl}/>
        </a>
      </div>
    );
  }
}

class Text extends React.Component {
  getText() {
    return twitterText.htmlEscape(this.props.text);
  }

  render() {
    return <span dangerouslySetInnerHTML={{ __html: this.getText() }}/>;
  }
}

export default class TweetBody extends React.Component {
  getComponents() {
    const components       = [];
    const { onAnchorClicked, tweet } = this.props;
    const { text, id_str } = tweet;
    let index              = 0;

    const entities = new TweetAnchorText(tweet).entities;
    entities.forEach((entity) => {
      components.push(<Text text={text.substring(index, entity.startIndex)}/>);

      if (this.getImageUrls().indexOf(entity.url) === -1) {
        components.push(
          <Anchor
            text={entity.text}
            title={entity.title}
            url={entity.url}
            onAnchorClicked={onAnchorClicked}
          />
        );
      }
      index = entity.endIndex;
    });

    components.push(<Text text={text.substring(index, text.length)}/>);
    components.push(...this.getImages());
    return components;
  }

  getImages() {
    if (this.props.tweet.extended_entities && this.props.tweet.extended_entities.media) {
      return this.props.tweet.extended_entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return <Image imageUrl={media.media_url_https} tweetUrl={media.url}/>;
      });
    } else {
      return [];
    }
  }

  getImageUrls() {
    if (this.props.tweet.extended_entities && this.props.tweet.extended_entities.media) {
      return this.props.tweet.extended_entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return media.url;
      });
    } else {
      return [];
    }
  }

  render() {
    return (
      <div className="Tweet-body">
        {this.getComponents()}
      </div>
    );
  }
}
