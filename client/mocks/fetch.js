import { ASYNCSTORAGE_NAME } from '../constants';
import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v1';
const txtgen = require('txtgen');

createItemList = (itemCount) => {
  let items = [];

  for (let count = 0; count <= itemCount; count++) {
    let item = {
      id: uuid(),
      value: txtgen.sentence(),
      completed: false,
    }

    items.push(item);
  }

  return createResponse(items);
}

createResponse = (items) => {
  let response = {
    status: 200,
    json: () => Promise.resolve(items),
  }

  return response;
}

getStorageState = async () => {
  try {
    payload = await AsyncStorage.getItem(ASYNCSTORAGE_NAME);
    console.log('############### LOADED ######################');
    console.log(payload);
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
}

setStorageState = async (payload) => {
  try {
    result = await AsyncStorage.setItem(ASYNCSTORAGE_NAME, JSON.stringify(payload));
    console.log('############### SAVED ######################');
    console.log(result);
    return
  } catch (error) {
    throw new Error(error.message);
  }
}

export default (url, payload) => {
  return new Promise((resolve, reject) => {
    if (payload) {
      this.setStorageState(JSON.parse(payload.body)).then(() => {
        resolve(createResponse({ message: 'OK' }));
      }).catch((err) => {
        console.log(err.message);
        resolve(createResponse({ error: err.message }));
      })
    } else {
      this.getStorageState().then((payload) => {
        if(payload){
          console.log('####### HAS STORAGE ############');
          resolve(this.createResponse(JSON.parse(payload)))
        }else{
          console.log('####### CREATE MOCK LIST ############');
          resolve(this.createItemList(5));
        }
      }).catch((err) => {
        console.log(err.message);
      })
    }
  });
}