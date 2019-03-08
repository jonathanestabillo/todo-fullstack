import { CANCEL_EDIT_ITEM } from '../constants';

export const CancelEditItem = () => {
  return (dispatch) => {
    dispatch({
      type: CANCEL_EDIT_ITEM,
      payload: {},
    });
  }
};
