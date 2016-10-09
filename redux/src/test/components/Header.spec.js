import React from 'react';
import expect from 'expect'
import { shallow } from 'enzyme';
import Header from '../../main/renderer/components/Header';

describe('<Header />', () => {
  it('renders title with given props', () => {
    const props   = { title: "test" };
    const wrapper = shallow(<Header {...props}/>);
    expect(wrapper.find('.Header-title').text()).toEqual(props.title);
  });
});
