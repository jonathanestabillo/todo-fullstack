import uuid from 'uuid/v1';
import { ADD_ITEM } from '../constants';
import gql from 'graphql-tag';

export const AddItem = (itemValue, client) => {
  return (dispatch) => {
    const id = uuid();

    const todoItem = {
      value: itemValue,
      id,
      completed: false,
    };

    client.mutate({
      mutation: gql`mutation{
        addItem(id:"${todoItem.id}", value: "${todoItem.value}", completed: ${todoItem.completed}){
          id
          value
          completed
        }
      }`}).then(console.log).catch((err) => {
        console.log('Error: ' + err.message);
        return
      });

    dispatch(
      {
        type: ADD_ITEM,
        payload: todoItem,
      }
    )
  }
}
