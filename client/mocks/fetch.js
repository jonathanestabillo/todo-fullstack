import { ASYNCSTORAGE_NAME } from '../constants';
import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v1';
import txtgen from 'txtgen';

const createItemList = (itemCount) => {
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

const createResponse = (items) => {
  let response = {
    status: 200,
    json: () => Promise.resolve(items),
  }

  return response;
}

export default (url, payload) => {
  return new Promise((resolve, reject) => {
    if (payload) {
      const asyncStorageState = async () => {
        try {
          await AsyncStorage.setItem(ASYNCSTORAGE_NAME, JSON.stringify(payload));
        } catch (error) {
          console.log(error.message);
        }
      }
      resolve(createResponse({ message: 'OK' }));
    } else {
      const asyncStorageState = async () => {
        try {
          payload = await AsyncStorage.getItem(ASYNCSTORAGE_NAME) || null;
        } catch (error) {
          console.log(error.message);
        }

        return JSON.parse(payload);
      }
      (asyncStorageState) ? resolve(createResponse(asyncStorageState)) : resolve(createItemList(5));
    }
  });
}