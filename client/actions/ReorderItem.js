import { REORDER_ITEM } from '../constants';

export const ReorderItem = (initialPosition, newPosition) => {
  return (dispatch, getState) => {
    const clone = getState().todos.items;
    const removed = clone.splice(initialPosition, 1);
    clone.splice(newPosition, 0, removed[0]);

    dispatch({
      type: REORDER_ITEM,
      payload: clone,
    });
  }
}
