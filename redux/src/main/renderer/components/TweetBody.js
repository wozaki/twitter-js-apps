import React from 'react';
import Time from './Time';
import twitterText from 'twitter-text';
import TweetAnchorText from '../../domain/models/TweetAnchorText';

const Anchor = ({ onAnchorClicked, url, text, title }) => {
  return (
    <a className="Tweet-anchor"
       dangerouslySetInnerHTML={{ __html: text }}
       href={url}
       onClick={onAnchorClicked}
       tabIndex="-1"
       title={title}
    />
  )
};

const Image = ({ imageUrl, tweetUrl }) => {

  const onClicked = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Tweet-image-container">
      <a href={tweetUrl} onClick={onClicked} tabIndex="-1">
        <img className="Tweet-image" src={imageUrl}/>
      </a>
    </div>
  );
};

const Text = ({ text }) => {
  const escapedText = twitterText.htmlEscape(text);
  return <span dangerouslySetInnerHTML={{ __html: escapedText }}/>;
};

const TweetBody = ({ onAnchorClicked, tweet }) => {

  const getComponents = () => {
    const components       = [];
    // const { onAnchorClicked, tweet } = this.props;
    const { text, id_str } = tweet;
    let index              = 0;

    const entities = new TweetAnchorText(tweet).entities;
    entities.forEach((entity) => {
      components.push(<Text text={text.substring(index, entity.startIndex)}/>);

      if (getImageUrls().indexOf(entity.url) === -1) {
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
    components.push(...getImages());
    return components;
  };

  const getImages = () => {
    if (tweet.extended_entities && tweet.extended_entities.media) {
      return tweet.extended_entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return <Image imageUrl={media.media_url_https} tweetUrl={media.url}/>;
      });
    } else {
      return [];
    }
  };

  const getImageUrls = () => {
    if (tweet.extended_entities && tweet.extended_entities.media) {
      return tweet.extended_entities.media.filter((media) => {
        return media.type === 'photo';
      }).map((media) => {
        return media.url;
      });
    } else {
      return [];
    }
  };

  return (
    <div className="Tweet-body">
      {getComponents()}
    </div>
  );
};

export default TweetBody
