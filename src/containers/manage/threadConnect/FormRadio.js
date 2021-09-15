import React from "react";
import { Form } from "react-bootstrap";
const FormRadio = (props) => {
  let { env } = props;

  return (
    <Form.Check
      type="radio"
      label={props.env}
      name="Env"
      id="Env"
      value={props.env}
    />
  );
};
export default FormRadio;
