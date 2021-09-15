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
const UpdateSubscription = (props) => {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);
  console.log("props NewProvisioning", props);

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
  const resetValue = () => {
    setinitialValue({
      Org: "",
      Space: "",
      BUC: "",
      ADN: "",
      Products: [],
    });
  };
  console.log("initialValue", initialValue);
  console.log("error", error);
  return (
    <div>
      <Row className="mb-3 updateSubAlign">
        <Form.Group as={Col} md="3">
          <Form.Label className="select-label">Org</Form.Label>
          <br></br>
          <select
            className="form-select classic form-height"
            value={initialValue.Org}
            onChange={(e) => {
              handelInputChange(e);
            }}
            name="Org"
          >
            <option defaultValue> Select Org </option>
            <option value="Org1">Org1</option>
            <option value="Org2">Org2</option>
            <option value="Org3">Org3</option>
          </select>
          {/* <Form.Control.Feedback type="invalid"> */}
          <br></br>
          <span className="errorMsg">
            {initialValue.Org === "" && error.Org !== "" ? error.Org : ""}
          </span>
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label className="select-label">Space</Form.Label>
          <br></br>
          <select
            name="Space"
            className="form-select classic form-height"
            value={initialValue.Space}
            onChange={(e) => {
              handelInputChange(e);
            }}
          >
            <option defaultValue> Select Space </option>
            <option value="Space1">Space1</option>
            <option value="Space2">Space2</option>
            <option value="Space3">Space3</option>
          </select>

          <span className="errorMsg">
            {initialValue.Space === "" && error.Space !== "" ? error.Space : ""}
          </span>
        </Form.Group>
      </Row>
      <Row className="mb-3 bucAdnComNew">
        <BucAdnComponent />
      </Row>
      <Row className="updateSubAlign">
        <Form.Group as={Col} md="6" className="product-CheckBoxGroup ">
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
      <Row className="mb-3 UpdateSubmit">
        <Button type="submit" onClick={(e) => handelSubmit(e)}>
          Submit
        </Button>
      </Row>
    </div>
  );
};

export default UpdateSubscription;
