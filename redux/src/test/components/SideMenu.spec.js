import React from 'react';
import expect from 'expect'
import { spy } from 'sinon'
import { shallow } from 'enzyme';
import SideMenu from '../../main/renderer/components/SideMenu';
import { Account } from '../../main/domain/models/Accounts'
import * as accountFixture from '../fixtures/account'

const primaryAccount = new Account(accountFixture.primaryAccount);
const subAccount     = new Account(accountFixture.subAccount);
const subAccount2    = new Account(accountFixture.subAccount2);

describe('<SideMenu />', () => {
  it('calls onClickedNewTweet when pencil icon is clicked', () => {
    const props      = { account: primaryAccount, onClickedNewTweet: spy(), subAccounts: [] };
    const wrapper    = shallow(<SideMenu {...props}/>);
    const pencilIcon = wrapper.find('.fa-pencil-square-o').closest('.SideMenu-item');

    pencilIcon.simulate('click');
    expect(props.onClickedNewTweet.calledOnce).toEqual(true);
  });

  it('renders all account avatar', () => {
    const props   = { account: primaryAccount, onClickedNewTweet: ()=> {}, subAccounts: [subAccount, subAccount2] };
    const wrapper = shallow(<SideMenu {...props}/>);

    expect(wrapper.find('.SideMenu-item-avatar').length).toEqual(3);
  });

  it('passes clicked SubAccount to onClickSubAccount', (done) => {
    const onClickSubAccount = (account) => {
      expect(account).toEqual(subAccount2);
      done();
    };
    const props             = {
      account: primaryAccount,
      onClickedNewTweet: () => {},
      onClickSubAccount,
      subAccounts: [subAccount, subAccount2]
    };

    const wrapper = shallow(<SideMenu {...props}/>);
    wrapper.find('.SideMenu-item-avatar').last().closest('.SideMenu-item').simulate('click');
  });

});
