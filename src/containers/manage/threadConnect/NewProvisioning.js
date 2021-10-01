import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";

import BucAdnComponent from "./BucAdnComponent.js";

import Api from "../../../Apis/ManageApi.js";
import { useStoreState, useStoreActions } from "easy-peasy";
let initialValues = {
  projectName: "",
  ShortDescription: "",
  ShortName: "",
  Ci_Name: "",
  VLan: "",
  BUC: "",
  ADN: "",
  bucAdnValidate: "",
  env: "Dev",
  minMemory: "7",
  maxMemory: "11",
  minCpu: "4",
  maxCpu: "5",
  replicaCount: "1",
  InstanceName: "",
  maxSize: "2g",
  initialSize: "1g",
  version: "0.0.7",
};

const Initialerror = {
  projectName: "",
  ShortDescription: "",
  ShortName: "",
  Ci_Name: "",
  VLan: "",
  BUC: "",
  ADN: "",
  env: "",
  minMemory: "",
  maxMemory: "",
  minCpu: "",
  maxCpu: "",
  replicaCount: "",
  InstanceName: "",
};
let regExp = /^([a-zA-Z0-9_-]){3,5}$/;
const NewProvisioning = (props) => {
  // const baseUrl = useStoreState(
  //   (state) => state.dataStore.operations.dataset.manageUrl
  // );

  const [advanceOption, setadvanceOption] = useState(false);
  const [initialData, setinitialData] = useState(initialValues);
  const [error, setError] = useState(Initialerror);
  // const [env, setenv] = useState("Dev");
  const [ProjectList, setProjectList] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bucAdnResponseData, setbucAdnResponseData] = useState({});
  const [OrgValues, setOrgValues] = useState("");
  const [spaceValues, setspaceValue] = useState("");

  if (spaceValues !== props.spaceValue) {
    setspaceValue(props.spaceValue);
  } else {
  }

  useEffect(() => {
    resetForm();
  }, [props.create === true, props.resetForm === true]);

  const resetForm = () => {
    setinitialData(initialValues);
    props.handelResetForm(false);
  };

  const handelInputChange = (event) => {
    setError(Initialerror);
    const { name, value } = event.target;
    setinitialData({ ...initialData, [name]: value });

    if (name == "env") {
      setinitialData({
        projectName: "",
        ShortDescription: "",
        ShortName: "",
        Ci_Name: "",
        VLan: "",
        BUC: "",
        ADN: "",
        env: value,
        minMemory: "7",
        maxMemory: "11",
        minCpu: "4",
        maxCpu: "5",
        replicaCount: "1",
        InstanceName: "",
        maxSize: "2g",
        initialSize: "1g",
        version: "0.0.7",
      });
    }
  };

  const advanceHandelChange = () => {
    setadvanceOption(!advanceOption);
  };

  useEffect(() => {
    resetForm();
  }, [props.create === true, props.resetForm === true]);

  useEffect(() => {
    projectListdata();
    setOrgValues(props.OrgValue);
    setspaceValue(props.spaceValue);
  }, [
    props.spaceValue !== "" &&
      props.create === true &&
      initialData.env !== "Dev",
  ]);
  useEffect(() => {
    projectListdata();
  }, [initialData.env]);

  useEffect(() => {
    projectListdata();
  }, [OrgValues, spaceValues]);

  const projectListdata = () => {
    if (props.spaceValue) {
      setIsLoading(true);
      let data = {
        environment: initialData.env.toLowerCase(),
        action: "creation",
        orgSpaceId: props.spaceValue,
      };

      Api.ProjectNameList(data)
        .then((res) => {
          if (res.data.status === "FAIL") {
            setIsLoading(false);
          }
          if (res.status === 200) {
            setIsLoading(false);
            setProjectList(res.data.results);
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.status === "FAIL") {
              setProjectList(err.response.data.results);
            }
          }
        });
    } else {
    }
  };

  const handleFormSubmit = (event) => {
    setIsLoading(true);
    let errorData = {
      ...error,
    };
    event.preventDefault();

    if (initialData.projectName === "") {
      errorData.projectName = "Project Name required";
    }
    if (initialData.env === "") {
      errorData.env = "environment required";
    }
    if (initialData.ShortDescription === "") {
      errorData.ShortDescription = "ShortDescription  required";
    }
    if (initialData.ShortName === "") {
      errorData.ShortName = "ShortName  required";
    } else if (
      initialData.ShortName !== "" &&
      regExp.test(initialData.ShortName) === true
    ) {
      errorData.ShortName = "";
    } else {
      errorData.ShortName = "ShortName length should be 3 to 5";
    }
    if (initialData.minCpu === "") {
      errorData.minCpu = "MinCpu  required";
    }
    if (initialData.maxCpu === "") {
      errorData.maxCpu = "maxCpu  required";
    }
    if (initialData.minMemory === "") {
      errorData.minMemory = "minMemory  required";
    }
    if (initialData.maxMemory === "") {
      errorData.maxMemory = "maxMemory  required";
    }
    if (initialData.replicaCount === "") {
      errorData.replicaCount = "replicaCount  required";
    }
    if (
      initialData.projectName === "" ||
      initialData.ShortDescription === "" ||
      initialData.ShortName === "" ||
      initialData.minCpu === "" ||
      initialData.maxCpu === "" ||
      initialData.minMemory === "" ||
      initialData.maxMemory === "" ||
      initialData.replicaCount === "" ||
      error.projectName !== "" ||
      error.ShortDescription !== "" ||
      error.ShortName !== "" ||
      error.minCpu !== "" ||
      error.maxCpu !== "" ||
      error.minMemory !== "" ||
      error.maxMemory !== "" ||
      error.replicaCount !== ""
    ) {
      setError(errorData);
    } else {
      setIsLoading(true);
      let data = {
        initialSize: "6g",
        maxSize: "16g",
        projectName: initialData.projectName,
        // version: "0.0.7",
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        environment: initialData.env.toLowerCase(),

        replicaCount: initialData.replicaCount,
        shortName: initialData.ShortName,
        description: initialData.ShortDescription,
        orgSpaceId: props.spaceValue,
      };
      if (initialData.BUC !== "" && initialData.bucAdnValidate === "true") {
        data.buc = initialData.BUC;
      }

      if (initialData.ADN !== "" && initialData.bucAdnValidate === "true") {
        data.adn = initialData.ADN;
      }

      Api.createTcNewProvisioning(data)
        .then((res) => {
          // setIsLoading(true);
          if (res.data.status === "FAIL") {
            setIsLoading(false);
            seterrorStatus(true);
            setMessage(res.data.message);
          } else if (
            res.status === 200 ||
            res.status === 201 ||
            res.status === "SUCCESS"
          ) {
            setIsLoading(false);
            setsuccessStatus(true);
            setShow(true);
            if (res.data.message === "") {
              setMessage("Successfully created");
            } else {
              setMessage(res.data.message);
            }
            resetForm();
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
  // project Name Exit or not
  const ProjectNameExit = (e) => {
    setIsLoading(true);
    let data = {
      projectName: initialData.projectName,
      shortName: e.target.value,
    };
    Api.checkProjectNameExist(data)

      .then((res) => {
        setIsLoading(true);
        if (res.data.status === "FAIL") {
          setIsLoading(false);
          seterrorStatus(true);
          setMessage(res.data.message);
        } else if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === "SUCCESS"
        ) {
          setIsLoading(false);
          setsuccessStatus(true);
          setShow(true);
          if (res.data.message === "") {
            setMessage("Project Name Available");
          } else {
            setMessage(res.data.message);
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

  const createNewInstance = (event) => {
    let errorData = {
      ...error,
    };
    event.preventDefault();
    if (initialData.InstanceName === "") {
      errorData.InstanceName = "InstanceName required";
    }
    if (initialData.minCpu === "") {
      errorData.minCpu = "MinCpu  required";
    }
    if (initialData.maxCpu === "") {
      errorData.maxCpu = "maxCpu  required";
    }
    if (initialData.minMemory === "") {
      errorData.minMemory = "minMemory  required";
    }
    if (initialData.maxMemory === "") {
      errorData.maxMemory = "maxMemory  required";
    }
    if (initialData.replicaCount === "") {
      errorData.replicaCount = "replicaCount  required";
    }

    if (
      initialData.InstanceName === "" ||
      initialData.minCpu === "" ||
      initialData.maxCpu === "" ||
      initialData.minMemory === "" ||
      initialData.maxMemory === "" ||
      initialData.replicaCount === "" ||
      error.InstanceName !== "" ||
      error.minCpu !== "" ||
      error.maxCpu !== "" ||
      error.minMemory !== "" ||
      error.maxMemory !== "" ||
      error.replicaCount !== ""
    ) {
      setError(errorData);
    } else {
      setIsLoading(true);
      let data = {
        projectId: initialData.InstanceName,
        environment: initialData.env.toLowerCase(),
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        replicaCount: initialData.replicaCount,
      };

      Api.createNewInstance(data)
        .then((res) => {
          // setIsLoading(true);
          if (res.data.status === "FAIL") {
            setIsLoading(false);
            seterrorStatus(true);
            setMessage(res.data.message);
          } else if (res.status === 200 || res.status === 201) {
            setIsLoading(false);
            setsuccessStatus(true);
            setShow(true);
            setadvanceOption(false);
            projectListdata();
            document.getElementById("custom-switch").checked = false;
            if (res.data.message === "") {
              setMessage("successfully Upgraded");
            } else {
              setMessage(res.data.message);
            }

            setinitialData({
              projectName: "",
              ShortDescription: "",
              ShortName: "",
              Ci_Name: "",
              VLan: "",
              BUC: "",
              ADN: "",
              env: "Stage",
              minMemory: "8",
              maxMemory: "12",
              minCpu: "4",
              maxCpu: "5",
              replicaCount: "1",
              InstanceName: "",
              maxSize: "2g",
              initialSize: "1g",
              version: "0.0.7",
            });
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
  const createNewProdInstance = (event) => {
    let errorData = {
      ...error,
    };
    event.preventDefault();
    if (initialData.InstanceName === "") {
      errorData.InstanceName = "InstanceName required";
    }
    if (initialData.minCpu === "") {
      errorData.minCpu = "MinCpu  required";
    }
    if (initialData.maxCpu === "") {
      errorData.maxCpu = "maxCpu  required";
    }
    if (initialData.minMemory === "") {
      errorData.minMemory = "minMemory  required";
    }
    if (initialData.maxMemory === "") {
      errorData.maxMemory = "maxMemory  required";
    }
    if (initialData.replicaCount === "") {
      errorData.replicaCount = "replicaCount  required";
    }

    if (
      initialData.InstanceName === "" ||
      initialData.minCpu === "" ||
      initialData.maxCpu === "" ||
      initialData.minMemory === "" ||
      initialData.maxMemory === "" ||
      initialData.replicaCount === "" ||
      error.InstanceName !== "" ||
      error.minCpu !== "" ||
      error.maxCpu !== "" ||
      error.minMemory !== "" ||
      error.maxMemory !== "" ||
      error.replicaCount !== ""
    ) {
      setError(errorData);
    } else {
      setIsLoading(true);
      let data = {
        projectId: initialData.InstanceName,
        environment: initialData.env.toLowerCase(),
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        replicaCount: initialData.replicaCount,
      };

      Api.createNewInstance(data)
        .then((res) => {
          // setIsLoading(true);
          if (res.data.status === "FAIL") {
            setIsLoading(false);
            seterrorStatus(true);
            setMessage(res.data.message);
          } else if (res.status === 200 || res.status === 201) {
            setIsLoading(false);
            setsuccessStatus(true);
            setShow(true);
            setadvanceOption(false);
            projectListdata();
            document.getElementById("custom-switch").checked = false;
            if (res.data.message === "") {
              setMessage("successfully Upgraded");
            } else {
              setMessage(res.data.message);
            }

            setinitialData({
              projectName: "",
              ShortDescription: "",
              ShortName: "",
              Ci_Name: "",
              VLan: "",
              BUC: "",
              ADN: "",
              env: "Prod",
              minMemory: "8",
              maxMemory: "12",
              minCpu: "4",
              maxCpu: "5",
              replicaCount: "1",
              InstanceName: "",
              maxSize: "2g",
              initialSize: "1g",
              version: "0.0.7",
            });
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

  const FindInstanceInfo = (e) => {
    setIsLoading(true);
    Api.FindProjectInfo(
      e.target.value,
      initialData.env === "Stage"
        ? "dev"
        : initialData.env === "Prod"
        ? "stage"
        : ""
    )

      .then((res) => {
        if (res.data.status === "FAIL") {
          setIsLoading(false);
          seterrorStatus(true);
          setMessage(res.data.message);
        } else if (res.status === 200 || res.status === 201) {
          setIsLoading(false);
          const data = res.data.results[0];
          setadvanceOption(true);
          document.getElementById("custom-switch").checked = true;

          const obj = {
            ...initialData,
            InstanceName: e.target.value,
            minCpu: data.min_cpu,
            maxCpu: data.max_cpu,
            minMemory: data.min_memory,
            maxMemory: data.max_memory,
            replicaCount: data.replica_count,
          };
          setinitialData(obj);

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

  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }
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
      setIsLoading(true);
      Api.bucAdnValidate(data)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            if (res.data.status === "FAIL") {
              setIsLoading(false);
              seterrorStatus(true);
              setMessage("Error");
            } else {
              setIsLoading(false);
              if (res.data.results.isValid === "TRUE") {
                setsuccessStatus(true);
                setMessage("Validation Succesfull");
                setbucAdnResponseData(res.data.results);
                let obj = {
                  ...initialData,
                  bucAdnValidate: "true",
                };
                setinitialData(obj);
              } else {
                seterrorStatus(true);
                setbucAdnResponseData(res.data.results);
                setMessage("Validation Failed");
                let obj = {
                  ...initialData,
                  bucAdnValidate: "false",
                };
                setinitialData(obj);
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
  return (
    <>
      {OrgValues !== "" && spaceValues !== "" ? (
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
          <Row className="align-row">
            <Form.Group
              as={Row}
              className="mb-3 form-mar"
              onChange={(e) => handelInputChange(e)}
            >
              <span className="radioselect tc-manage">Environment</span>
              <Col sm={6} className="col-radio">
                <Form.Check
                  type="radio"
                  label="Dev"
                  name="env"
                  value="Dev"
                  // defaultChecked
                  checked={initialData.env === "Dev"}
                />
                <Form.Check
                  type="radio"
                  label="Stage"
                  name="env"
                  value="Stage"
                  checked={initialData.env === "Stage"}
                />
                <Form.Check
                  type="radio"
                  label="Prod"
                  name="env"
                  value="Prod"
                  checked={initialData.env === "Prod"}
                />
              </Col>
              <Form.Control.Feedback type="invalid">
                {initialData.env === "" && error.env !== "" ? error.env : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {initialData.env === "Dev" ? (
            <Row className="mb-3 alignbox tc-manage">
              <Form.Group as={Col} md="4">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project Name"
                  id="projectName"
                  name="projectName"
                  value={initialData.projectName}
                  onChange={handelInputChange}
                  // onInput={(e) => ProjectNameExit(e)}

                  isInvalid={
                    initialData.projectName === "" && error.projectName !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.projectName ? true : false}
                />

                <Form.Control.Feedback type="invalid">
                  {initialData.projectName === "" && error.projectName !== ""
                    ? error.projectName
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  type="text"
                  id="ShortDescription"
                  placeholder="Short Description"
                  name="ShortDescription"
                  value={initialData.ShortDescription}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.ShortDescription === "" &&
                    error.ShortDescription
                      ? true
                      : false
                  }
                  isValid={initialData.ShortDescription ? true : false}
                />

                <Form.Control.Feedback type="invalid">
                  {!initialData.ShortDescription === "" ||
                  error.ShortDescription
                    ? error.ShortDescription
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Short Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Short Name"
                  name="ShortName"
                  id="ShortName"
                  value={initialData.ShortName}
                  onChange={handelInputChange}
                  onInput={(e) => ProjectNameExit(e)}
                  isInvalid={
                    (initialData.ShortName === "" && error.ShortName !== "") ||
                    (initialData.ShortName !== "" && error.ShortName !== "")
                      ? true
                      : false
                  }
                  isValid={
                    initialData.ShortName !== "" &&
                    error.ShortName == "" &&
                    regExp.test(initialData.ShortName) === true
                      ? true
                      : false
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.ShortName === "" && error.ShortName !== ""
                    ? error.ShortName
                    : initialData.ShortName !== "" && error.ShortName !== ""
                    ? error.ShortName
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          ) : (
            <Row className="mb-3 tc-manage">
              <Form.Group as={Col} md="6">
                <Form.Label className="select-label">Instance Name</Form.Label>

                <select
                  className="form-select classic select-height instanceheight"
                  onChange={(e) => {
                    handelInputChange(e);
                    FindInstanceInfo(e);
                  }}
                  id="InstanceName"
                  name="InstanceName"
                  value={initialData.InstanceName}
                >
                  <option value="">Select InstanceName</option>
                  {ProjectList &&
                    ProjectList.map((e, i) => {
                      return (
                        <option value={e.id} key={i}>
                          {e.project_name}
                        </option>
                      );
                    })}
                </select>
                <br></br>
                <span className="deploye-errmsg">
                  {initialData.InstanceName === "" && error.InstanceName !== ""
                    ? error.InstanceName
                    : ""}
                </span>
              </Form.Group>
            </Row>
          )}
          {initialData.env === "Dev" ? (
            <Row className="mb-3 bucAdnCom tc-manage">
              {/* <BucAdnComponent
                bucadnvalidate={bucadnvalidate}
                bucAdnValue={initialData}
              /> */}
              <Row className="mb-4">
                <Form.Group as={Col} md="5">
                  <Form.Label>BUC</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="BUC"
                    name="BUC"
                    onChange={handelInputChange}
                    value={initialData.BUC}
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
                        : false
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {initialData.BUC === "" && error.BUC !== ""
                      ? error.BUC
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="5">
                  <Form.Label>ADN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ADN"
                    name="ADN"
                    onChange={handelInputChange}
                    value={initialData.ADN}
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
                        : false
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {initialData.ADN === "" && error.ADN !== ""
                      ? error.ADN
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="deploy-submit"
                  as={Col}
                  md="1"
                  controlId="validationFormik05"
                >
                  <Button onClick={(e) => handelValidate(e)}>Validate</Button>
                </Form.Group>
              </Row>
            </Row>
          ) : (
            ""
          )}
          <Row className="mb-3 form-switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Advance Option"
              onChange={() => advanceHandelChange()}
            />
          </Row>
          {advanceOption === true ? (
            <Row className="mb-3 alignbox tc-manage">
              <Form.Group as={Col} md="2">
                <Form.Label>Min Memory</Form.Label>
                <Form.Control
                  type="Number"
                  name="minMemory"
                  id="minMemory"
                  value={initialData.minMemory}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.minMemory === "" && error.minMemory !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.minMemory ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.minMemory === "" && error.minMemory !== ""
                    ? error.minMemory
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Max Memory</Form.Label>
                <Form.Control
                  type="Number"
                  name="maxMemory"
                  id="maxMemory"
                  value={initialData.maxMemory}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.maxMemory === "" && error.maxMemory !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.maxMemory ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.maxMemory === "" && error.maxMemory !== ""
                    ? error.maxMemory
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="2">
                <Form.Label>Min Cpu</Form.Label>
                <Form.Control
                  type="Number"
                  name="minCpu"
                  id="minCpu"
                  value={initialData.minCpu}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.minCpu === "" && error.minCpu !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.minCpu ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.minCpu === "" && error.minCpu !== ""
                    ? error.minCpu
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Max Cpu</Form.Label>
                <Form.Control
                  type="Number"
                  name="maxCpu"
                  id="maxCpu"
                  value={initialData.maxCpu}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.maxCpu === "" && error.maxCpu !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.maxCpu ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.maxCpu === "" && error.maxCpu !== ""
                    ? error.maxCpu
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>Replica Count</Form.Label>
                <Form.Control
                  type="Number"
                  name="replicaCount"
                  id="replicaCount"
                  value={initialData.replicaCount}
                  onChange={handelInputChange}
                  isInvalid={
                    initialData.replicaCount === "" && error.replicaCount !== ""
                      ? true
                      : false
                  }
                  isValid={initialData.replicaCount ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.replicaCount === "" && error.replicaCount !== ""
                    ? error.replicaCount
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          ) : (
            ""
          )}
          <Row className="alignbox tc-manage">
            <Button
              type="submit"
              className="submit"
              onClick={
                initialData.env === "Dev"
                  ? (e) => handleFormSubmit(e)
                  : initialData.env === "Stage"
                  ? (e) => createNewInstance(e)
                  : (e) => createNewProdInstance(e)
              }
            >
              Submit
            </Button>
          </Row>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NewProvisioning;
