import React from 'react';
import expect from 'expect'
import { spy } from 'sinon'
import { shallow } from 'enzyme';
import Tweet from '../../main/renderer/components/Tweet';
import ToggleFavoriteButton from '../../main/renderer/components/ToggleFavoriteButton';
import { homeTimeline } from '../fixtures/homeTimeline';

describe('<Tweet />', () => {
  const tweet = homeTimeline[0];

  it('calls onAnchorClicked which Tweet-datetime is clicked', () => {
    const props         = { onAnchorClicked: spy(), tweet };
    const wrapper       = shallow(<Tweet {...props}/>);
    const tweetDatetime = wrapper.find('.Tweet-datetime-anchor');

    tweetDatetime.simulate('click');
    expect(props.onAnchorClicked.calledOnce).toEqual(true);
  });

  it('renders favoriteButton', () => {
    const favoriteButton = <ToggleFavoriteButton isFavorited={true} toggleFavorite={() => {}}/>;
    const props          = { tweet, favoriteButton };
    const wrapper        = shallow(<Tweet {...props}/>);

    expect(wrapper.containsMatchingElement(favoriteButton)).toEqual(true);
  });

});
