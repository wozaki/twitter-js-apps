import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from '../actions/app';
import * as tweetActions from '../actions/tweet';
import Editor from '../components/Editor';

export default class NewTweetContainer extends Component {

  componentWillMount() {
    const {setUp} = this.props.actions;
    setUp();
  }

  render() {
    const { account } = this.props;
    const { postTweet } = this.props.actions;

    // TODO: render account image and place
    // TODO: post image
    // TODO: post by click TweetButton

    return (
      <div className="NewTweet">
        <main className="NewTweet-main">
          <aside className="NewTweet-main-left">
            <img className="Tweet-avatar" src={account.profile_image_url}/>
          </aside>
          <div className="NewTweet-main-center">
            <Editor key="editor" onTweetSubmitted={postTweet}/>
          </div>
        </main>
        <footer className="NewTweet-footer">
          <div className="NewTweet-footer-tweetButton">
            Tweet
          </div>
        </footer>
      </div>
    );
  }
}

NewTweetContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, appActions, tweetActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  const { account } = state;
  return {
    account: account
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTweetContainer);
