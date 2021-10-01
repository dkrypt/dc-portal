import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
// import Loader from "react-loader-spinner";
import { useStoreState, useStoreActions } from "easy-peasy";
import Api from "../../../Apis/ManageApi.js";
let initialValues = {
  Org: "",
  Space: "",
  buc: "",
  adn: "",
  Product: [],
  bucAdnValidate: "",
};
let initialError = {
  Org: "",
  Space: "",
  buc: "",
  adn: "",
  Product: "",
};
const NewSubscription = (props) => {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);
  const [ProductList, setProductList] = useState([]);
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bucAdnResponseData, setbucAdnResponseData] = useState({});

  const baseUrl = useStoreState(
    (state) => state.dataStore.operations.dataset.manageUrl
  );
  const resetForm = () => {
    setinitialValue(initialValues);
  };

  useEffect(() => {
    getProductList();
    resetValue();
  }, []);

  useEffect(() => {
    getProductList();
    resetValue();
    setinitialValue(initialValues);
  }, [props.create === true]);

  const getProductList = () => {
    setIsLoading(true);
    Api.productList(baseUrl)
      .then((res) => {
        if (res.data.status === "FAIL") {
          setIsLoading(false);
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (res.status === 200) {
          setIsLoading(false);
          setProductList(res.data.results);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAIL") {
            setProductList(err.response.data.results);
          }
        }
      });
  };

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
        Product: value1,
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
    if (initialValue.buc === "") {
      errorData.BUC = "Buc  required";
    }
    if (initialValue.adn === "") {
      errorData.ADN = "ADN  required";
    }
    if (initialValue.Product.length == 0) {
      errorData.Product = "Select Atleast 1 product";
    }
    if (
      initialValue.Org === "" ||
      initialValue.Space === "" ||
      // initialValue.buc === "" ||
      // initialValue.adn === "" ||
      initialValue.Product.length == 0 ||
      error.Org !== "" ||
      error.Space !== "" ||
      // error.buc !== "" ||
      // error.adn !== "" ||
      error.Product !== ""
    ) {
      seterror(errorData);
    } else {
      let data = {
        org: initialValue.Org,
        space: initialValue.Space,
        products: initialValue.Product,
      };
      if (initialValue.buc && initialValue.bucAdnValidate === "true") {
        data.buc = initialValue.buc;
      }
      if (initialValue.adn && initialValue.bucAdnValidate === "true") {
        data.adn = initialValue.adn;
      }
      setIsLoading(true);
      Api.newSubscription(baseUrl, data)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              seterrorStatus(true);
              setMessage(res.data.message);
              resetValue();
              setIsLoading(false);
            } else {
              setIsLoading(false);
              setsuccessStatus(true);
              Reset();
              if (res.data.message === "") {
                setMessage("Successfully created");
              } else {
                setMessage(res.data.message);
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
  const handelValidate = (e) => {
    e.preventDefault();
    let errorData1 = {
      ...error,
    };

    if (initialValue.buc === "") {
      errorData1.buc = "BUC required";
    }
    if (initialValue.adn === "") {
      errorData1.adn = "ADN  required";
    }

    if (
      initialValue.buc === "" ||
      initialValue.adn === "" ||
      error.buc !== "" ||
      error.adn !== ""
    ) {
      seterror(errorData1);
    } else {
      setIsLoading(true);
      let data = {
        buc: initialValue.buc,
        adn: initialValue.adn,
      };
      Api.bucAdnValidate(baseUrl, data)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              setIsLoading(false);
              seterrorStatus(true);
              setMessage("Error");
            } else {
              setIsLoading(false);
              if (res.data.results.isValid === "TRUE") {
                setsuccessStatus(true);
                setMessage(res.data.results.validMsg);
                setbucAdnResponseData("Validation Succesfull");
                let obj = {
                  ...initialValue,
                  bucAdnValidate: "true",
                };
                setinitialValue(obj);
              } else {
                seterrorStatus(true);
                setbucAdnResponseData(res.data.results);
                setMessage("Validation Failed");
                let obj = {
                  ...initialValue,
                  bucAdnValidate: "false",
                };
                setinitialValue(obj);
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
  const Reset = () => {
    resetForm();
    seterror(initialError);
    ProductList.map((e) => {
      return (document.getElementById(e.id).checked = false);
    });
  };

  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }
  // console.log("bucAdnResponseData", bucAdnResponseData);
  return (
    <div>
      {isLoading === true ? (
        <div className="spineerUi">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        ""
      )}

      {successStatus == true ? (
        <Alert
          variant="success"
          onClose={() => setsuccessStatus(false)}
          dismissible
        >
          <p>{message}</p>
        </Alert>
      ) : (
        ""
      )}
      {errorStatus == true ? (
        <Alert
          variant="danger"
          onClose={() => seterrorStatus(false)}
          dismissible
        >
          <p>{message}</p>
        </Alert>
      ) : (
        ""
      )}
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
        <Row className="mb-4">
          <Form.Group as={Col} md="5">
            <Form.Label>BUC</Form.Label>
            <Form.Control
              type="text"
              placeholder="BUC"
              name="buc"
              onChange={handelInputChange}
              value={initialValue.buc}
              isInvalid={
                initialValue.bucAdnValidate === "false" ||
                (initialValue.buc === "" && error.buc !== "")
                  ? true
                  : false
              }
              isValid={
                initialValue.bucAdnValidate === "true" ||
                (initialValue.buc === "" && error.buc !== "")
                  ? true
                  : false
              }
            />

            <Form.Control.Feedback type="invalid">
              {initialValue.buc === "" && error.buc !== "" ? error.buc : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="5">
            <Form.Label>ADN</Form.Label>
            <Form.Control
              type="text"
              placeholder="ADN"
              name="adn"
              onChange={handelInputChange}
              value={initialValue.adn}
              isInvalid={
                initialValue.bucAdnValidate === "false" ||
                (initialValue.adn === "" && error.adn !== "")
                  ? true
                  : false
              }
              isValid={
                initialValue.bucAdnValidate === "true" ||
                (initialValue.adn === "" && error.adn !== "")
                  ? true
                  : false
              }
            />

            <Form.Control.Feedback type="invalid">
              {initialValue.adn === "" && error.adn !== "" ? error.adn : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="bucadnvalidation"
            as={Col}
            md="1"
            controlId="validationFormik05"
          >
            <Button onClick={(e) => handelValidate(e)}>Validate</Button>
          </Form.Group>
        </Row>
      </Row>
      <Row className="mb-3 newSubAlign">
        <Form.Group
          as={Col}
          md="12"
          controlId=""
          className="product-CheckBoxGroup"
        >
          <div id="checkbox-group">Products </div>
          <div className="product-checkBox">
            {ProductList &&
              ProductList.map((e, i) => {
                return (
                  <Form.Check
                    key={i}
                    label={e.name}
                    type="checkbox"
                    name="Product"
                    value={e.id}
                    id={e.id}
                    className="form-check"
                    onChange={handelInputChange}
                  />
                );
              })}
          </div>
        </Form.Group>
        <div className="productCheck">
          <br></br>
          {initialValue.Product == 0 && error.Product !== ""
            ? error.Product
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
