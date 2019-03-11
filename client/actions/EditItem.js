import { EDIT_ITEM } from '../constants';
import gql from 'graphql-tag';

export const EditItem = (modifiedItem, client) => {
  return (dispatch, getState) => {
    const items = getState().todos.items.map(item => {
      if (item.id === modifiedItem.id) {
        item.value = modifiedItem.value;

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
      type: EDIT_ITEM,
      payload: items,
    });
  }
}
