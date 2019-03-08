import { DELETE_ITEM } from '../constants';

export const DeleteItem = (selectedItemId) => {
  return (dispatch, getState) => {
    const items = getState().todos.items.filter(({ id }) => id !== selectedItemId);
    dispatch({
      type: DELETE_ITEM,
      payload: items,
    });
  }
}
