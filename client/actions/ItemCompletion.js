import { ITEM_COMPLETION } from '../constants';
import gql from 'graphql-tag';

export const ItemCompletion = (modifiedItem, client) => {
  return (dispatch, getState) => {
    const items = getState().todos.items.map(item => {
      if (item.id === modifiedItem.id) {
        item.completed = !item.completed;

        client.mutate({
          mutation: gql`mutation{
            updateItem(id:"${item.id}", value: "${item.value}", completed: ${item.completed}){
              id
              value
              completed
            }
          }`}).then(console.log).catch((err) => {
            console.log('Error: ' + err.message);
            return
          });
      }

      return item;
    });

    dispatch({
      type: ITEM_COMPLETION,
      payload: items,
    });
  }
}
