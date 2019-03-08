//Comment this line to use the actual fetch API. Or you can use 'config' node package
import fetch from '../mocks/fetch';

export const SaveStateAsyncStorage = () => {
  return (dispatch, getState) => {
    fetch('https://example.com/api/todoList', {
      method: 'post',
      body: JSON.stringify(getState().todos.items)
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Looks like there was a problem. Status Code: ' + response.status);
      }
      return response.json();
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }
}
