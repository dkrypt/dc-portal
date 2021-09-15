import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import BucAdnComponent from "./BucAdnComponent.js";

import Api from "../../../middleware/ManageApi.js";

let initialValues = {
  projectName: "",
  ShortDescription: "",
  ShortName: "",
  Ci_Name: "",
  VLan: "",
  BUC: "",
  ADN: "",
  environment: "Dev",
  minMemory: "7",
  maxMemory: "11",
  minCpu: "4",
  maxCpu: "5",
  replicaCount: "1",
  InstanceName: "",
  maxSize: "2g",
  initialSize: "1g",
  version: "0.0.7",
  host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
  fileSystemId: "12e51190",
  accessPoint: "0f259ecad065aa92d",
  gitRepo:
    "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
};

const Initialerror = {
  projectName: "",
  ShortDescription: "",
  ShortName: "",
  Ci_Name: "",
  VLan: "",
  BUC: "",
  ADN: "",
  environment: "",
  minMemory: "8",
  maxMemory: "12",
  minCpu: "4",
  maxCpu: "5",
  replicaCount: "1",
  InstanceName: "",
};
let regExp = /^([a-zA-Z0-9_-]){3,5}$/;
const NewProvisioning = (props) => {
  const [advanceOption, setadvanceOption] = useState(false);
  const [initialData, setinitialData] = useState(initialValues);
  const [error, setError] = useState(Initialerror);
  const [env, setenv] = useState("Dev");
  const [ProjectList, setProjectList] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const handleChangeProject = (env) => {
    setenv(env);
    // resetValue();
  };
  const resetForm = () => {
    setinitialData(initialValues);
  };
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialData({ ...initialData, [name]: value });

    if (name == "environment") {
      setinitialData({
        projectName: "",
        ShortDescription: "",
        ShortName: "",
        Ci_Name: "",
        VLan: "",
        BUC: "",
        ADN: "",
        environment: value,
        minMemory: "7",
        maxMemory: "11",
        minCpu: "4",
        maxCpu: "5",
        replicaCount: "1",
        InstanceName: "",
        maxSize: "2g",
        initialSize: "1g",
        version: "0.0.7",
        host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
        fileSystemId: "12e51190",
        accessPoint: "0f259ecad065aa92d",
        gitRepo:
          "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
      });
    }
  };

  const advanceHandelChange = () => {
    setadvanceOption(!advanceOption);
  };

  const bucadnvalidate = (data) => {};

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    let data = {
      environment: initialData.environment.toLowerCase(),
      action: "creation",
    };
    Api.ProjectNameList(data)
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200) {
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
  }, [initialData.environment]);

  const handleFormSubmit = (event) => {
    let errorData = {
      ...error,
    };
    event.preventDefault();

    if (!initialData.projectName) {
      errorData.projectName = "Project Name required";
    }
    if (!initialData.environment) {
      errorData.environment = "environment required";
    }
    if (!initialData.ShortDescription) {
      errorData.ShortDescription = "ShortDescription  required";
    }
    if (!initialData.ShortName) {
      errorData.ShortName = "ShortName  required";
    } else if (regExp.test(initialData.ShortName)) {
      errorData.ShortName = "ShortName length should be 3 to 5";
    }
    if (!initialData.minCpu) {
      errorData.minCpu = "MinCpu  required";
    }
    if (!initialData.maxCpu) {
      errorData.maxCpu = "maxCpu  required";
    }
    if (!initialData.minMemory) {
      errorData.minMemory = "minMemory  required";
    }
    if (!initialData.maxMemory) {
      errorData.maxMemory = "maxMemory  required";
    }
    if (!initialData.replicaCount) {
      errorData.replicaCount = "replicaCount  required";
    }

    if (
      initialData.projectName === "" ||
      initialData.ShortDescription === "" ||
      initialData.ShortName === "" ||
      !error.projectName === "" ||
      !error.ShortDescription === "" ||
      !error.ShortName === ""
    ) {
      setError(errorData);
    } else {
      let data = {
        initialSize: "1g",
        maxSize: "2g",
        projectName: initialData.projectName,
        version: "0.0.7",
        host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        fileSystemId: "12e51190",
        accessPoint: "0f259ecad065aa92d",
        gitRepo:
          "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
        environment: env.toLowerCase(),
        replicaCount: initialData.replicaCount,
        shortName: initialData.ShortName,
        description: initialData.ShortDescription,
      };
      Api.createTcNewProvisioning(data)
        .then((res) => {
          if (res.status === "error") {
            seterrorStatus(true);
            setMessage(res.data.message);
          }
          if (res.status === 200 || res.status === 201) {
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
    let data = {
      projectName: e.target.value,
    };
    Api.checkProjectNameExist(data)
      .then((res) => {
        if (res.status === "error") {
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (
          res.status === 200 ||
          res.status === 201 ||
          res.status === "SUCCESS"
        ) {
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
    if (!initialData.InstanceName) {
      errorData.InstanceName = "InstanceName required";
    }
    if (!initialData.MinCpu) {
      errorData.MinCpu = "MinCpu  required";
    }
    if (!initialData.maxCpu) {
      errorData.maxCpu = "maxCpu  required";
    }
    if (!initialData.minMemory) {
      errorData.minMemory = "minMemory  required";
    }
    if (!initialData.maxMemory) {
      errorData.maxMemory = "maxMemory  required";
    }
    if (!initialData.replicaCount) {
      errorData.replicaCount = "replicaCount  required";
    }

    if (
      initialData.InstanceName === "" &&
      initialData.MinCpu === "" &&
      initialData.maxCpu === "" &&
      initialData.minMemory === "" &&
      initialData.maxMemory === "" &&
      initialData.replicaCount === ""
    ) {
      setError(errorData);
    } else {
      let data = {
        projectId: initialData.InstanceName,
        environment: initialData.environment.toLowerCase(),
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        replicaCount: initialData.replicaCount,
      };

      Api.createNewInstance(data)
        .then((res) => {
          if (res.status === "error") {
            seterrorStatus(true);
            setMessage(res.data.message);
          }
          if (res.status === 200 || res.status === 201) {
            setsuccessStatus(true);
            setShow(true);
            setadvanceOption(false);
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
              environment: "Stage",
              minMemory: "8",
              maxMemory: "12",
              minCpu: "4",
              maxCpu: "5",
              replicaCount: "1",
              InstanceName: "",
              maxSize: "2g",
              initialSize: "1g",
              version: "0.0.7",
              host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
              fileSystemId: "12e51190",
              accessPoint: "0f259ecad065aa92d",
              gitRepo:
                "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
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
    if (!initialData.InstanceName) {
      errorData.InstanceName = "InstanceName required";
    }
    if (!initialData.MinCpu) {
      errorData.MinCpu = "MinCpu  required";
    }
    if (!initialData.maxCpu) {
      errorData.maxCpu = "maxCpu  required";
    }
    if (!initialData.minMemory) {
      errorData.minMemory = "minMemory  required";
    }
    if (!initialData.maxMemory) {
      errorData.maxMemory = "maxMemory  required";
    }
    if (!initialData.replicaCount) {
      errorData.replicaCount = "replicaCount  required";
    }

    if (
      initialData.InstanceName === "" &&
      initialData.MinCpu === "" &&
      initialData.maxCpu === "" &&
      initialData.minMemory === "" &&
      initialData.maxMemory === "" &&
      initialData.replicaCount === ""
    ) {
      setError(errorData);
    } else {
      let data = {
        projectId: initialData.InstanceName,
        environment: initialData.environment.toLowerCase(),
        minMemory: initialData.minMemory,
        minCpu: initialData.minCpu,
        maxMemory: initialData.maxMemory,
        maxCpu: initialData.maxCpu,
        replicaCount: initialData.replicaCount,
      };

      Api.createNewInstance(data)
        .then((res) => {
          if (res.status === "error") {
            seterrorStatus(true);
            setMessage(res.data.message);
          }
          if (res.status === 200 || res.status === 201) {
            setsuccessStatus(true);
            setShow(true);
            setadvanceOption(false);
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
              environment: "Prod",
              minMemory: "8",
              maxMemory: "12",
              minCpu: "4",
              maxCpu: "5",
              replicaCount: "1",
              InstanceName: "",
              maxSize: "2g",
              initialSize: "1g",
              version: "0.0.7",
              host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
              fileSystemId: "12e51190",
              accessPoint: "0f259ecad065aa92d",
              gitRepo:
                "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
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
    Api.FindProjectInfo(
      e.target.value,
      initialData.environment === "Stage"
        ? "dev"
        : initialData.environment === "Prod"
        ? "stage"
        : ""
    )
      .then((res) => {
        if (res.status === "error") {
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
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
  console.log("error", error);
  console.log("initialData", initialData);
  return (
    <>
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
          onChange={handelInputChange}
        >
          <span className="radioselect tc-manage">Environment</span>
          <Col sm={6} className="col-radio">
            <Form.Check
              type="radio"
              label="Dev"
              name="environment"
              id="environment"
              value="Dev"
              defaultValue="Dev"
              defaultChecked
              // checked={initialData.environment === "Dev"}
            />
            <Form.Check
              type="radio"
              label="Stage"
              name="environment"
              id="environment"
              value="Stage"
              // checked={initialData.environment === "Stage"}
            />
            <Form.Check
              type="radio"
              label="Prod"
              name="environment"
              id="environment"
              value="Prod"
              // checked={initialData.environment === "Prod"}
            />
          </Col>
          <Form.Control.Feedback type="invalid">
            {initialData.environment === "" && error.environment !== ""
              ? error.environment
              : ""}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      {initialData.environment === "Dev" ? (
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
              onInput={(e) => ProjectNameExit(e)}
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
                initialData.ShortDescription === "" && error.ShortDescription
                  ? true
                  : false
              }
              isValid={initialData.ShortDescription ? true : false}
            />

            <Form.Control.Feedback type="invalid">
              {!initialData.ShortDescription === "" || error.ShortDescription
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
              isInvalid={
                initialData.ShortName === "" && error.ShortName !== ""
                  ? true
                  : false
              }
              isValid={regExp.test(initialData.ShortName) ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {initialData.ShortName === "" && error.ShortName
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
              className="form-select classic select-height"
              onChange={(e) => {
                handelInputChange(e);
                FindInstanceInfo(e);
              }}
              // sele
              style={{ height: "40px" }}
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
            <Form.Control.Feedback type="invalid">
              {initialData.InstanceName === "" && error.InstanceName
                ? error.InstanceName
                : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      )}

      {initialData.environment === "Dev" ? (
        <Row className="mb-3 bucAdnCom tc-manage">
          <BucAdnComponent bucadnvalidate={bucadnvalidate} />
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
                !initialData.minMemory && error.minMemory ? error.minMemory : ""
              }
              isValid={initialData.minMemory ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {!initialData.minMemory && error.minMemory ? error.minMemory : ""}
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
                !initialData.maxMemory && error.maxMemory ? error.maxMemory : ""
              }
              isValid={initialData.maxMemory ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {!initialData.maxMemory && error.maxMemory ? error.maxMemory : ""}
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
                !initialData.minCpu && error.minCpu ? error.minCpu : ""
              }
              isValid={initialData.minCpu ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {!initialData.minCpu && error.minCpu ? error.minCpu : ""}
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
                !initialData.maxCpu && error.maxCpu ? error.maxCpu : ""
              }
              isValid={initialData.maxCpu ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {!initialData.maxCpu && error.maxCpu ? error.maxCpu : ""}
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
                !initialData.replicaCount && error.replicaCount
                  ? error.replicaCount
                  : ""
              }
              isValid={initialData.replicaCount ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {!initialData.replicaCount && error.replicaCount
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
            initialData.environment === "Dev"
              ? (e) => handleFormSubmit(e)
              : initialData.environment === "Stage"
              ? (e) => createNewInstance(e)
              : (e) => createNewProdInstance(e)
          }
        >
          Submit
        </Button>
      </Row>
    </>
  );
};

export default NewProvisioning;
