import { SELECT_EDIT_ITEM } from '../constants';

export const SelectEditItem = idEdit => {
  return (dispatch, getState) => {
    const item = getState().todos.items.find(({ id }) => id === idEdit);

    dispatch({
      type: SELECT_EDIT_ITEM,
      payload: item,
    });
  }
}
