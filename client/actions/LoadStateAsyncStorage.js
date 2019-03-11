import { LOAD_STATE_ASYNCSTORAGE } from '../constants';
import gql from 'graphql-tag';

export const LoadStateAsyncStorage = (client) => {
  return (dispatch) => {
    client.query({
      query: gql`query{
      items{
        id
        value
        completed
      }
    }` }).then(({data:{items}})=>{
      dispatch({
        type: LOAD_STATE_ASYNCSTORAGE,
        payload: items,
      });
    }).catch((err)=>{
      console.log(err.message);
      return
    });
  }
}
