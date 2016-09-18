import { RECEIVED_ACCOUNT } from '../constants/ActionTypes';
import { Accounts, Account } from '../../domain/models/Accounts';

const initialState = Accounts.dummy;

export default function account(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_ACCOUNT:
      const receivedAccount = Account.fromJson(action.user, true);
      return state.refresh(receivedAccount);
    default:
      return state;
  }
}
