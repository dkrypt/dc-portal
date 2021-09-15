import React from "react";

import { Form, Row, Col } from "react-bootstrap";

const Orgspaceinstance = (props) => {
  const [org, setorg] = React.useState("");
  const [space, setspace] = React.useState("");
  const [instance, setinstance] = React.useState("");
  const handleChanges = (event) => {
    switch (event.target.id) {
      case "instance":
        setinstance(event.target.value);
        break;
      case "space":
        setspace(event.target.value);
        break;
      case "org":
        setorg(event.target.value);
        break;
      default:
    }
  };

  return (
    <div>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">Org</Form.Label>

          <select className="form-select classic select-height">
            <option defaultValue> Select org </option>
            <option value="org1">Org1</option>
            <option value="org2">Org2</option>
            <option value="org3">Org3</option>
          </select>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">Space</Form.Label>

          <select className="form-select classic select-height">
            <option defaultValue> Select Space </option>
            <option value="Space1">Space1</option>
            <option value="Space2">Space2</option>
            <option value="Space3">Space3</option>
          </select>
          <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
};
export default Orgspaceinstance;
