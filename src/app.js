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

const App = () => (
  <ApolloProvider client={client}>
    <Query query={GET_USER}>
      {({ data, loading }) => {
        if (loading) return <div>loading...</div>;
        return (
          <Input value={data.user.email} />
          // <FormComponent initialValues={data.someQuery} update={mutate} />
        );
      }}
    </Query>

    {/* <Query query={GET_USER}>
      {({ data: { user } }) => {
        if (user) {
          return (
            <Row>
              <Col md={4} />
              <Col md={4}>
                <Form>
                  <Mutation
                    mutation={UPDATE_FIELD}
                    variables={{ value: user.email, field: "email" }}
                  >
                    {updateField => (
                      <InputGroup
                        id="email"
                        label="Email Address"
                        value={user ? user.email : ""}
                        onChange={updateField}
                      />
                    )}
                  </Mutation>
                  <InputGroup
                    id="password"
                    label="Password"
                    value={user ? user.password : ""}
                  />
                </Form>
              </Col>
            </Row>
          );
        }
        return <div>loading...</div>;
      }}
    </Query> */}
  </ApolloProvider>
);

export default App;

const Input = ({ value }) => {
  return (
    <Mutation mutation={UPDATE_FIELD}>
      {updateField => (
        <InputGroup
          id="email"
          label="Email Address"
          value={value}
          update={updateField}
        />
      )}
    </Mutation>
  );
};
