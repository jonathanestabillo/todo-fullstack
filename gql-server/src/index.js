const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const typeDefs = gql`
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

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    items: () => {
      return axios.get('http://localhost:3000/items').then(res => res.data);
    }
  },
  Mutation: {
    addItem: (parent, args) => {
      return axios.post('http://localhost:3000/items', args).then(res => res.data);
    },
    deleteItem: (parent, {id}) => {
      return axios.delete('http://localhost:3000/items/' + id).then(res => res.data);
    },
    updateItem: (parent, args) => {
      return axios.patch('http://localhost:3000/items/' + args.id, {value: args.value, completed: args.completed}).then(res => res.data);
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);