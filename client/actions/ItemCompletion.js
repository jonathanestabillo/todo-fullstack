import { ITEM_COMPLETION } from '../constants';

export const ItemCompletion = modifiedItem => {
  return (dispatch, getState) => {
    const items = getState().todos.items.map(item => {
      if (item.id === modifiedItem.id) {
        item.completed = !item.completed;
      }

      return item;
    });

    dispatch({
      type: ITEM_COMPLETION,
      payload: items,
    });
  }
}
