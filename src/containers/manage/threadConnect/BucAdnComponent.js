import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
const initialValues = {
  BUC: "",
  ADN: "",
};
const InitialError = {
  BUC: "",
  ADN: "",
};
let BucAdnComponent = (props) => {
  const [initialData, setinitialData] = useState(initialValues);
  const [error, setError] = useState(InitialError);
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialData({ ...initialData, [name]: value });
    console.log("initial data", initialData);
  };

  const handelValidate = () => {
    console.log("validate", initialData);
    if (!initialData.BUC) {
      error.BUC = "BUC required";
    }
    if (!initialData.ADN) {
      error.ADN = "ADN  required";
    }
    setError(error);
    props.bucadnvalidate(initialData);
  };
  return (
    <>
      <Row className="mb-4">
        <Form.Group as={Col} md="5">
          <Form.Label>BUC</Form.Label>
          <Form.Control
            type="text"
            placeholder="BUC"
            name="BUC"
            id="BUC"
            onChange={handelInputChange}
            value={initialData.BUC}
            isInvalid={!initialData.BUC && error.BUC ? error.BUC : ""}
            isValid={!initialData.BUC && error.BUC ? error.BUC : ""}
          />

          <Form.Control.Feedback type="invalid">
            {!initialData.BUC && error.BUC ? error.BUC : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="5">
          <Form.Label>ADN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ADN"
            name="ADN"
            id="ADN"
            onChange={handelInputChange}
            value={initialData.ADN}
            isInvalid={!initialData.ADN && error.ADN ? error.ADN : ""}
            isValid={!initialData.ADN && error.ADN ? error.ADN : ""}
          />

          <Form.Control.Feedback type="invalid">
            {!initialData.ADN && error.ADN ? error.ADN : ""}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          style={{ marginTop: "31px" }}
          as={Col}
          md="1"
          controlId="validationFormik05"
        >
          <Button onClick={() => handelValidate()}>Validate</Button>
        </Form.Group>
      </Row>
    </>
  );
};
export default BucAdnComponent;
