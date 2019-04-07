import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { ApolloProvider, Query, Mutation } from "react-apollo";
import { client } from "./apollo";
import InputGroup from "./inputGroup";
import { GET_USER } from "./apollo/query";
import gql from "graphql-tag";

const UPDATE_FIELD = gql`
  mutation UpdateField($value: String!, $field: String!) {
    updateField(value: $value, field: $field) @client
  }
`;

const Input = ({ id, value, label }) => {
  return (
    <Mutation mutation={UPDATE_FIELD}>
      {updateField => (
        <InputGroup id={id} label={label} value={value} update={updateField} />
      )}
    </Mutation>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Query query={GET_USER}>
      {({ data, loading }) => {
        if (loading) return <div>loading...</div>;
        const { user } = data;
        return (
          <Row>
            <Col md={4} />
            <Col md={4}>
              <Form>
                <Input id="email" label="Email address:" value={user.email} />
                <Input id="password" label="Password:" value={user.password} />
              </Form>
            </Col>
          </Row>
        );
      }}
    </Query>
  </ApolloProvider>
);

export default App;
