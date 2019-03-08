import { EDIT_ITEM } from '../constants';

export const EditItem = modifiedItem => {
  return (dispatch, getState) => {
    const items = getState().todos.items.map(item => {
      if (item.id === modifiedItem.id) {
        item.value = modifiedItem.value;
      }

      return item;
    });

    dispatch({
      type: EDIT_ITEM,
      payload: items,
    });
  }
}
