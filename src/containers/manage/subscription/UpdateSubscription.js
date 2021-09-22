import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import BucAdnComponent from "../threadConnect/BucAdnComponent.js";
import Api from "../../../middleware/ManageApi.js";
let initialValues = {
  Org: "",
  Space: "",
  adn: "",
  buc: "",
  Products: [],
};
let initialError = {
  Org: "",
  Space: "",
  adn: "",
  buc: "",
  Products: "",
};
const UpdateSubscription = (props) => {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);
  const [orgList, setOrgList] = useState([]);
  const [spaceList, setSpaceList] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [ProductList, setProductList] = useState([]);
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handelgetOrgList();
    getProductList();
  }, []);

  useEffect(() => {
    handelgetOrgList();
    getProductList();
    setinitialValue(initialValues);
  }, [props.update === true]);

  const resetForm = () => {
    setinitialValue(initialValues);
  };
  const getProductList = () => {
    Api.productList()
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200) {
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

  const Reset = () => {
    resetForm();
    seterror(initialError);
  };
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialValue({ ...initialValue, [name]: value });
    seterror(initialError);
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
    }
  };

  const handelCheck = (event) => {
    let NewArray = [...initialValue.Products, event.target.id];
    if (initialValue.Products.includes(event.target.id)) {
      NewArray = NewArray.filter((i) => i !== event.target.id);
    }
    const obj = {
      ...initialValue,
      Products: NewArray,
    };
    setinitialValue(obj);
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
      errorData.buc = "Buc  required";
    }
    if (initialValue.adn === "") {
      errorData.adn = "adn  required";
    }
    if (initialValue.Products.length == 0) {
      errorData.Products = "Select Atleast 1 product";
    }
    if (
      initialValue.Org === "" ||
      initialValue.Space === "" ||
      initialValue.buc === "" ||
      initialValue.adn === "" ||
      initialValue.Products.length == 0 ||
      error.Org !== "" ||
      error.Space !== "" ||
      error.buc !== "" ||
      error.adn !== "" ||
      error.Products !== ""
    ) {
      seterror(errorData);
    } else {
      setIsLoading(true);
      let data = {
        id: updateData.id,
        buc: initialValue.buc,
        adn: initialValue.adn,
        products: initialValue.Products,
      };

      Api.updatesubscriptionData(data)
        .then((res) => {
          if (res.status === "error") {
            setIsLoading(false);
            seterrorStatus(true);
            setMessage(res.data.message);
          }
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              setIsLoading(false);
              seterrorStatus(true);
              setMessage(res.data.message);
            } else {
              setIsLoading(false);
              setsuccessStatus(true);
              Reset();
              if (res.data.message === "") {
                setMessage("Successfully Updated");
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
  const handelgetOrgList = () => {
    setIsLoading(true);
    Api.getOrgList()
      .then((res) => {
        if (res.status === "error") {
          setIsLoading(false);
        }
        if (res.status === 200) {
          setIsLoading(false);
          setOrgList(res.data.results);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAIL") {
            setOrgList(err.response.data.results);
          }
        }
      });
  };
  const fetchSpaceList = (e) => {
    setIsLoading(true);
    Api.getSpaceList(e.target.value)
      .then((res) => {
        if (res.status === "error") {
          setIsLoading(false);
        }
        if (res.status === 200 || res.status === 201) {
          setIsLoading(false);
          const data = res.data.results;
          setSpaceList(data);
          if (res.data.message === "") {
          } else {
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
  };
  const FetchUpdateSubscriptionData = (event) => {
    let selectedcheckbox = [];
    setIsLoading(true);
    Api.getUpdatesubscriptionData(initialValue.Org, event.target.value)
      .then((res) => {
        if (res.status === "error") {
          setIsLoading(false);
        }
        if (res.status === 200 || res.status === 201) {
          setIsLoading(false);
          const data = res.data.results;
          setUpdateData(data);
          data &&
            data.products.map((e) => {
              return selectedcheckbox.push(e.product_id.toString());
            });
          const obj = {
            ...initialValue,
            Space: event.target.value,
            Products: selectedcheckbox,
            buc: data && data.buc,
            adn: data && data.adn,
          };
          setinitialValue(obj);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAILED") {
          }
        }
      });
  };
  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }
  return (
    <div>
      {isLoading === true ? (
        <div
          style={{
            display: "block",
            position: "fixed",
            zIndex: "900",
            width: "100%",
            height: "100%",
            overflow: "auto",
            left: "50%",
            top: "50%",
          }}
        >
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
      <Row className="mb-3 updateSubAlign">
        <Form.Group as={Col} md="3">
          <Form.Label className="select-label">Org</Form.Label>
          <br></br>
          <select
            className="form-select classic form-height"
            value={initialValue.Org}
            onChange={(e) => {
              handelInputChange(e);
              if (e.target.value === "selectOrg") {
                Reset();
              } else {
                fetchSpaceList(e);
              }
            }}
            name="Org"
          >
            <option value="selectOrg"> Select Org </option>
            {orgList &&
              orgList.map((e, i) => {
                return (
                  <option value={e.id} key={i}>
                    {e.org_name}
                  </option>
                );
              })}
          </select>
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
              if (e.target.value === "selectSpace") {
                Reset();
              } else {
                FetchUpdateSubscriptionData(e);
              }
            }}
          >
            <option value="selectSpace"> Select Space </option>
            {spaceList &&
              spaceList.map((e, i) => {
                return (
                  <option value={e.id} key={i}>
                    {e.org_space}
                  </option>
                );
              })}
          </select>

          <span className="errorMsg">
            {initialValue.Space === "" && error.Space !== "" ? error.Space : ""}
          </span>
        </Form.Group>
      </Row>
      <Row className="mb-3 bucAdnComNew">
        {/* <BucAdnComponent /> */}
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
                initialValue.buc === "" && error.buc !== "" ? error.buc : ""
              }
              isValid={
                initialValue.buc === "" && error.buc !== "" ? error.buc : ""
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
                initialValue.adn === "" && error.adn !== "" ? error.adn : ""
              }
              isValid={
                initialValue.adn === "" && error.adn !== "" ? error.adn : ""
              }
            />

            <Form.Control.Feedback type="invalid">
              {initialValue.adn === "" && error.adn !== "" ? error.adn : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            style={{ marginTop: "31px" }}
            as={Col}
            md="1"
            controlId="validationFormik05"
          >
            <Button onClick={(e) => handelValidate(e)}>Validate</Button>
          </Form.Group>
        </Row>
      </Row>
      <Row className="updateSubAlign">
        <Form.Group as={Col} md="12" className="product-CheckBoxGroup ">
          <div id="checkbox-group">Products </div>
          <div className="product-checkBox">
            {ProductList &&
              ProductList.map((e, i) => {
                return (
                  <Form.Check
                    key={i}
                    label={e.name}
                    type="checkbox"
                    name="Products"
                    value={e.id}
                    id={e.id}
                    className="form-check"
                    onChange={handelCheck}
                    checked={initialValue.Products.find((pr) => {
                      return pr == e.id ? true : false;
                    })}
                  />
                );
              })}
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
