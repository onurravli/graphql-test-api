const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const port = 3000;
const app = express();

const users = [
  {
    id: 1,
    name: "Onur",
    surname: "Ravli",
    username: "onurravli",
    active: true,
  },
  {
    id: 2,
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
`;

const resolvers = {
  Query: {
    users: () => users,
    userById: (_, { id }) => users.find((user) => user.id === id),
    userByUsername: (_, { username }) => users.find((user) => user.username === username),
    blockedUsers: () => users.filter((user) => user.active == false),
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
