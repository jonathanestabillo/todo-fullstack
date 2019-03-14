//import axios from 'axios';
import { SqlService } from './services';
const sqlService = new SqlService;

// Provide resolver functions for your schema fields
export const resolvers = {
    Query: {
        items: () => {
            return sqlService.getItems().then((res) => {
                let result = [];

                res.map((item) => {
                    let itm = {
                        id: item.id.toString(),
                        value: item.value,
                        completed: (item.completed == 1) ? true : false,
                    }
                    result.push(itm);
                });
                console.log(result);
                return result;
            }).catch((err) => {
                console.log(err.message);
            });
            //return axios.get('http://localhost:3000/items').then(res => res.data);
        }
    },
    Mutation: {
        addItem: (parent, args) => {
            return sqlService.addItem(args).then((res) => {
                return true;
            }).catch((err) => {
                console.log(err.message);
            });
            //return axios.post('http://localhost:3000/items', args).then(res => res.data);
        },
        deleteItem: (parent, { id }) => {
            return sqlService.deleteItem(id).then((res) => {
                return true;
            }).catch((err) => {
                console.log(err.message);
            });
            //return axios.delete('http://localhost:3000/items/' + id).then(res => res.data);
        },
        updateItem: (parent, args) => {
            return sqlService.updateItem(args).then((res) => {
                return true;
            }).catch((err) => {
                console.log(err.message);
            });
            //return axios.patch('http://localhost:3000/items/' + args.id, { value: args.value, completed: args.completed }).then(res => res.data);
        },
    }
};