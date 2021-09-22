import React, { useEffect, useState } from "react";

import { Form, Row, Col } from "react-bootstrap";
let AdminBox = (props) => {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    setAdminData(props.adminData);
  }, [props.adminData]);
  console.log("Admin BOx=", props.adminData);
  return (
    <Row>
      <Form.Group as={Col} md="12">
        <Form.Label className="select-label">{props.label}</Form.Label>
        <br />
        <select
          multiple
          /* class="form-select classic" */ style={{ width: "100%" }}
        >
          {props.adminData &&
            props.adminData.map((element) => {
              return (
                <option>
                  {element.Id} - {element.Mail}{" "}
                </option>
              );
            })}
        </select>
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>
    </Row>
  );
};
export default AdminBox;
