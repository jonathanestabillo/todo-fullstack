import { LOAD_STATE_ASYNCSTORAGE } from '../constants';

//Comment this line to use the actual fetch API. Or you can use 'config' node package
import fetch from '../mocks/fetch';

export const LoadStateAsyncStorage = () => {
  return (dispatch) => {
    fetch('https://example.com/api/todoList').then((response) => {
      if (response.status !== 200) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }

      // Examine the text in the response
      response.json().then((data) => {
        if(data){
          dispatch({
            type: LOAD_STATE_ASYNCSTORAGE,
            payload: data,
          });
        }else{
          throw new Error('There is a problem parsing the API result.');
        }
      });
    }).catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }
}
