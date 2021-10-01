import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import Api from "../../../Apis/ManageApi.js";
const initialValues = {
  BUC: "",
  ADN: "",
  bucAdnValidate: "",
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
  const [bucAdnResponseData, setbucAdnResponseData] = useState({});
  const [previousData, setpreviousData] = useState({});

  useEffect(() => {
    let obj = {
      BUC: props.bucAdnValue.BUC,
      ADN: props.bucAdnValue.ADN,
      bucAdnValidate: props.bucAdnValue.bucAdnValidate,
    };
    setinitialData(obj);
    setpreviousData(obj);
  }, [props.bucAdnValue]);
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialData({ ...initialData, [name]: value });
  };

  const handelValidate = (e) => {
    // e.preventDefault();
    // debugger;

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
      // setIsLoading(true);
      let data = {
        buc: initialData.BUC,
        adn: initialData.ADN,
      };
      Api.bucAdnValidate(data)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              // setIsLoading(false);
              seterrorStatus(true);
              setMessage("Error");
            } else {
              // setIsLoading(false);
              if (res.data.results.isValid === "TRUE") {
                setsuccessStatus(true);
                setMessage(res.data.results.validMsg);
                setbucAdnResponseData("BUC And ADN Validate Succesfully");
                let obj = {
                  ...initialData,
                  bucAdnValidate: "true",
                };
                setinitialData(obj);
                props.bucadnvalidate(
                  obj,
                  true,
                  true,
                  "Validate Successfully",
                  "success",
                  previousData
                );
              } else {
                seterrorStatus(true);
                setbucAdnResponseData(res.data.results);
                setMessage("BUC And ADN Not Validate");
                let obj = {
                  ...initialData,
                  bucAdnValidate: "false",
                };
                setinitialData(obj);
                props.bucadnvalidate(
                  obj,
                  false,
                  true,
                  "BUC And ADN Not Validate",
                  "error",
                  previousData
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

  // const resetForm = () => {
  //   setinitialData(initialData);
  // };

  // console.log("props", props);

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
            // isInvalid={!initialData.BUC && error.BUC ? error.BUC : ""}
            // isValid={!initialData.BUC && error.BUC ? error.BUC : ""}
            // isInvalid={
            //   initialData.bucAdnValidate === "false" ||
            //   (initialData.BUC === "" && error.BUC !== "")
            //     ? true
            //     : false
            // }
            // isValid={
            //   initialData.bucAdnValidate === "true" ||
            //   (initialData.BUC === "" && error.BUC !== "")
            //     ? true
            //     : false
            // }
            isInvalid={
              initialData.bucAdnValidate === "false" ||
              (initialData.BUC === "" && error.BUC !== "")
                ? true
                : false
            }
            isValid={
              initialData.bucAdnValidate === "true" ||
              (initialData.BUC === "" && error.BUC !== "")
                ? true
                : previousData.BUC && previousData.BUC !== ""
                ? true
                : false
            }
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
            // isInvalid={!initialData.ADN && error.ADN ? error.ADN : ""}
            // isValid={!initialData.ADN && error.ADN ? error.ADN : ""}
            // isInvalid={
            //   initialData.bucAdnValidate === "FALSE" ||
            //   (initialData.ADN === "" && error.ADN !== "")
            //     ? true
            //     : false
            // }
            // isValid={
            //   initialData.bucAdnValidate === "TRUE" ||
            //   (initialData.ADN === "" && error.ADN !== "")
            //     ? true
            //     : false
            // }
            isInvalid={
              initialData.bucAdnValidate === "false" ||
              (initialData.ADN === "" && error.ADN !== "")
                ? true
                : false
            }
            isValid={
              initialData.bucAdnValidate === "true" ||
              (initialData.ADN === "" && error.ADN !== "")
                ? true
                : previousData.ADN && previousData.ADN !== ""
                ? true
                : false
            }
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
