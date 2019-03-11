import { DELETE_ITEM } from '../constants';
import gql from 'graphql-tag';

export const DeleteItem = (selectedItemId, client) => {
  return (dispatch, getState) => {
    client.mutate({
      mutation: gql`mutation{
        deleteItem(id:"${selectedItemId}"){
          id
        }
      }`}).then(console.log).catch((err) => {
        console.log('Error: ' + err.message);
        return
      });

    const items = getState().todos.items.filter(({ id }) => id !== selectedItemId);

    dispatch({
      type: DELETE_ITEM,
      payload: items,
    });
  }
}
