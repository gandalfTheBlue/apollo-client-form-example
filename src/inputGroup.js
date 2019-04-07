import React from "react";
import { Form } from "react-bootstrap";

const InputGroup = ({ id, label, value, update }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        onChange={e =>
          update({ variables: { value: e.target.value, field: id } })
        }
      />
    </Form.Group>
  );
};

export default InputGroup;
