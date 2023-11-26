const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const port = 3000;
const app = express();

let _id = 0;

const users = [
  {
    id: ++_id,
    name: "Onur",
    surname: "Ravli",
    username: "onurravli",
    active: true,
  },
  {
    id: ++_id,
    name: "John",
    surname: "Doe",
    username: "johndoe",
    active: false,
  },
];

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    surname: String!
    username: String!
    active: Boolean!
  }

  type Query {
    users: [User]
    userById(id: Int!): User
    userByUsername(username: String!): User
    blockedUsers: [User]
  }

  type Mutation {
    createUser(name: String!, surname: String!, username: String!): User
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    userById: (_, { id }) => users.find((user) => user.id === id),
    userByUsername: (_, { username }) => users.find((user) => user.username === username),
    blockedUsers: () => users.filter((user) => user.active == false),
  },
  Mutation: {
    createUser: (_, { name, surname, username }) => {
      // You can create your new user here. For example, on a database.
      const newUser = {
        id: 23,
        name: name,
        surname: surname,
        username: username,
        active: true,
      };
      return newUser;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
});
