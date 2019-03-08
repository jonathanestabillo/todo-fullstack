import uuid from 'uuid/v1';
import { ADD_ITEM } from '../constants';

export const AddItem = (itemValue) => {
  return (dispatch) => {
    const id = uuid();
    
    const todoItem = {
      value: itemValue,
      id,
      completed: false,
    };

    dispatch(
      {
        type: ADD_ITEM,
        payload: todoItem,
      }
    )
  }
}
