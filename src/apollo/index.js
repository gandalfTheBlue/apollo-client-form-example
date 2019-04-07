import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { GET_USER } from "./query";

const typeDefs = gql`
  type User {
    id: String
    email: String
    password: String
  }

  type Query {
    user: User
  }
`;

const data = {
  user: {
    id: "1",
    email: "shan.yang@anz.com",
    password: "password",
    __typename: "User"
  }
};

const cache = new InMemoryCache();
cache.writeData({ data });

export const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers: {
    Mutation: {
      updateField: (_, { value, field }, { cache }) => {
        const data = cache.readQuery({ query: GET_USER });
        const newData = { ...data, user: { ...data.user, [field]: value } };
        cache.writeQuery({ query: GET_USER, data: newData });
        return null;
      }
    }
  }
});
