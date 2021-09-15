import React, { useState } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";
import BucAdnComponent from "../threadConnect/BucAdnComponent.js";
let initialValues = {
  Org: "",
  Space: "",
  BUC: "",
  ADN: "",
  Products: [],
};
let initialError = {
  Org: "",
  Space: "",
  BUC: "",
  ADN: "",
  Products: "",
};
const NewSubscription = (props) => {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);

  const resetValue = () => {
    setinitialValue(initialValues);
  };
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialValue({ ...initialValue, [name]: value });
    const checkedArr = [];
    let value1;
    if (event.target.type !== "checkbox") {
      value1 = event.target.value;
    } else {
      const checkeds = document.getElementsByTagName("input");
      for (let i = 0; i < checkeds.length; i++) {
        if (checkeds[i].checked) {
          checkedArr.push(checkeds[i].value);
        }
      }
      value1 = checkedArr;
      const obj = {
        ...initialValue,
        Products: value1,
      };
      setinitialValue(obj);
    }

    seterror(initialError);
  };
  const handelSubmit = (e) => {
    let errorData = {
      ...error,
    };
    e.preventDefault();
    if (initialValue.Org === "") {
      errorData.Org = "Org required";
    }
    if (initialValue.Space === "") {
      errorData.Space = "Space  required";
    }
    if (initialValue.BUC === "") {
      errorData.BUC = "Buc  required";
    }
    if (initialValue.ADN === "") {
      errorData.ADN = "ADN  required";
    }
    if (initialValue.Products.length == 0) {
      errorData.Products = "Select Atleast 1 product";
    }
    if (
      initialValue.Org === "" ||
      initialValue.Space === "" ||
      initialValue.BUC === "" ||
      initialValue.ADN === "" ||
      initialValue.Products.length == 0 ||
      error.Org !== "" ||
      error.Space !== "" ||
      error.BUC !== "" ||
      error.ADN !== "" ||
      error.Products !== ""
    ) {
      seterror(errorData);
    } else {
    }
  };
  console.log("initialValue", initialValue);
  console.log("error", error);
  return (
    <div>
      <Row className="mb-3 newSubAlign">
        <Form.Group as={Col} md="4">
          <Form.Label>Org</Form.Label>
          <Form.Control
            type="text"
            name="Org"
            placeholder="Please Enter Org"
            value={initialValue.Org}
            onChange={handelInputChange}
            isInvalid={
              initialValue.Org === "" && error.Org !== "" ? true : false
            }
            isValid={initialValue.Org ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {initialValue.Org === "" && error.Org !== "" ? error.Org : ""}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Space</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Space"
            name="Space"
            value={initialValue.Space}
            onChange={handelInputChange}
            isInvalid={
              initialValue.Space === "" && error.Space !== "" ? true : false
            }
            isValid={initialValue.Space ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {initialValue.Space === "" && error.Space !== "" ? error.Space : ""}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-6 bucAdnComNew">
        <BucAdnComponent />
      </Row>
      <Row className="mb-3 newSubAlign">
        <Form.Group
          as={Col}
          md="6"
          controlId="validationFormik03"
          className="product-CheckBoxGroup"
        >
          <div id="checkbox-group">Products </div>
          <div className="product-checkBox">
            <Form.Check
              label="ThreadConnect"
              type="checkbox"
              name="Products"
              value="ThreadConnect"
              id="Products"
              onChange={handelInputChange}
            />
            <Form.Check
              label="EnterpriseConnect"
              type="checkbox"
              name="Products"
              value="EnterpriseConnect"
              id="Products"
              className="form-check"
              onChange={handelInputChange}
            />
            <Form.Check
              label="DIVE"
              type="checkbox"
              name="Products"
              id="Products"
              value="DIVE"
              className="form-check"
              onChange={handelInputChange}
            />
          </div>
        </Form.Group>
        <div className="productCheck">
          <br></br>
          {initialValue.Products == 0 && error.Products !== ""
            ? error.Products
            : ""}
        </div>
      </Row>
      <Row className="mb-3 subscription-submit">
        <Button type="submit" onClick={(e) => handelSubmit(e)}>
          Submit
        </Button>
      </Row>
    </div>
  );
};

export default NewSubscription;
