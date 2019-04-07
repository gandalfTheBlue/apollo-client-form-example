import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

export const GET_USER = gql`
  {
    user {
      email
      password
    }
  }
`;

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache,
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
