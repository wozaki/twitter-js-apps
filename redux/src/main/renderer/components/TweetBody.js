import React from 'react';
import Time from './Time';
import twitterText from 'twitter-text';
import { shell } from 'electron'
import TweetAnchorText from '../../domain/models/TweetAnchorText';

class Anchor extends React.Component {
  onClicked(event) {
    event.preventDefault();
    shell.openExternal(event.currentTarget.href);
  }

  render() {
    return <a
      className="Tweet-anchor"
      dangerouslySetInnerHTML={{ __html: this.props.text }}
      href={this.props.url}
      onClick={this.onClicked.bind(this)}
      tabIndex="-1"
      title={this.props.title}
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
    const { text, id_str } = this.props.tweet;
    let index              = 0;

    const entities = new TweetAnchorText(this.props.tweet).entities;
    entities.forEach((entity) => {
      components.push(<Text text={text.substring(index, entity.startIndex)}/>);

      if (this.getImageUrls().indexOf(entity.url) === -1) {
        components.push(
          <Anchor
            text={entity.text}
            title={entity.title}
            url={entity.url}
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
