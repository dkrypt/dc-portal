import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import Api from "../../../middleware/ManageApi.js";
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
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);

  useEffect(() => {
    let obj = {
      BUC: props.bucAdnValue.BUC,
      ADN: props.bucAdnValue.ADN,
    };
    setinitialData(obj);
  }, [props.bucAdnValue]);
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialData({ ...initialData, [name]: value });
  };

  const handelValidate = (e) => {
    let errorData1 = {
      ...error,
    };

    if (initialData.BUC === "") {
      errorData1.BUC = "BUC required";
    }
    if (initialData.ADN === "") {
      errorData1.ADN = "ADN  required";
    }

    if (
      initialData.BUC === "" ||
      initialData.ADN === "" ||
      error.BUC !== "" ||
      error.ADN !== ""
    ) {
      setError(errorData1);
    } else {
      let data = {
        buc: initialData.BUC,
        adn: initialData.ADN,
      };
      Api.bucAdnValidate(data)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              seterrorStatus(true);
              setMessage(res.data.message);
              props.bucadnvalidate(
                initialData,
                true,
                res.data.message,
                "error"
              );
            } else {
              setsuccessStatus(true);
              if (res.data.message === "") {
                setMessage("Validate Successfully");
                props.bucadnvalidate(
                  initialData,
                  true,
                  "Validate Successfully",
                  "success"
                );
              } else {
                setMessage(res.data.message);
                props.bucadnvalidate(
                  initialData,
                  true,
                  "Validate Successfully",
                  "success"
                );
              }
            }
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.status === "FAILED") {
              seterrorStatus(true);
              setMessage(err.data.message);
            }
          }
        });
    }
  };
  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }

  console.log("props", props);
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
