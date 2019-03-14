//import {gql } from 'apollo-server-express';

export const typeDefs = `
  type Item {
    id: String,
    value: String,
    completed: Boolean
  }
  
  type Query {
    items: [Item]
  }

  type Mutation {
    addItem(id: String, value: String, completed: Boolean): Item,
    deleteItem(id: String): Item,
    updateItem(id: String, value: String, completed: Boolean): Item,
  }
`;