import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import BucAdnComponent from "../threadConnect/BucAdnComponent.js";
import Api from "../../../middleware/ManageApi.js";
import Creatable, { makeCreatableSelect } from "react-select/creatable";
let initialValues = {
  projectName: "",
  ShortDescription: "",
  Gateway: "",
  EcClient: "",
  OperatingSystem: "",
  SystemType: "",
  SystemPort: "",
  SystemIp: "",
  AttachFile: "",
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
  OperatingSystem: "",
  SystemType: "",
  SystemPort: "",
  SystemIp: "",
  AttachFile: "",
  Gateway: "",
  EcClient: "",
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
const EcUpdateProvisioning = (props) => {
  const [advanceOption, setadvanceOption] = useState(false);
  const [initialData, setinitialData] = useState(initialValues);
  const [error, setError] = useState(Initialerror);
  const [env, setenv] = useState("Dev");
  const [ProjectList, setProjectList] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [TcsOption, setTcsOption] = useState(false);
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
        OperatingSystem: "",
        SystemType: "",
        SystemPort: "",
        SystemIp: "",
        AttachFile: "",
        Gateway: "",
        EcClient: "",
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
  const TcsHandelChange = () => {
    setTcsOption(!TcsOption);
  };

  const bucadnvalidate = (data) => {
    const obj = {
      ...initialData,
      BUC: data.BUC,
      ADN: data.ADN,
    };
    setinitialData(obj);
  };

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
    if (!initialData.OperatingSystem) {
      errorData.OperatingSystem = "Operating System Required";
    }
    if (!initialData.SystemType) {
      errorData.SystemType = "SystemType Required";
    }
    if (!initialData.SystemPort) {
      errorData.SystemPort = "SystemPort Required";
    }

    if (!initialData.SystemIp) {
      errorData.SystemIp = "SystemIp Required";
    }
    if (!initialData.AttachFile) {
      errorData.AttachFile = "AttachFile Required";
    }

    if (!initialData.Gateway) {
      errorData.Gateway = "Gateway  required";
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
      initialData.Gateway === "" ||
      initialData.OperatingSystem === "" ||
      initialData.SystemType === "" ||
      initialData.SystemPort === "" ||
      initialData.SystemIp === "" ||
      initialData.AttachFile === "" ||
      !error.projectName === "" ||
      !error.ShortDescription === "" ||
      !error.Gateway === "" ||
      !error.OperatingSystem === "" ||
      !error.SystemType === "" ||
      !error.SystemIp === "" ||
      !error.SystemPort === "" ||
      !error.AttachFile === ""
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
        // shortName: initialData.ShortName,
        description: initialData.ShortDescription,
        OperatingSystem: initialData.OperatingSystem,
        SystemType: initialData.SystemType,
        SystemIp: initialData.SystemIp,
        SystemPort: initialData.SystemPort,
        AttachFile: initialData.AttachFile,
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
              OperatingSystem: "",
              SystemType: "",
              SystemPort: "",
              SystemIp: "",
              AttachFile: "",
              Gateway: "",
              EcClient: "",
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
      // api call for create new provisioning

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
              OperatingSystem: "",
              SystemType: "",
              SystemPort: "",
              SystemIp: "",
              AttachFile: "",
              Gateway: "",
              EcClient: "",
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
  let EcClient = [
    { label: "ecClient1", value: "ecClient1" },
    { label: "ecClient2", value: "ecClient2" },
    { label: "ecClient3", value: "ecClient3" },
    { label: "ecClient4", value: "ecClient4" },
  ];
  let TargetSytemType = [
    { label: "TargetSytemType1", value: "TargetSytemType1" },
    { label: "TargetSytemType2", value: "TargetSytemType2" },
    { label: "TargetSytemType3", value: "TargetSytemType3" },
    { label: "TargetSytemType4", value: "TargetSytemType4" },
  ];
  let TargetSytemIp = [
    { label: "TargetSytemIp1", value: "TargetSytemIp1" },
    { label: "TargetSytemIp2", value: "TargetSytemIp2" },
    { label: "TargetSytemIp3", value: "TargetSytemIp3" },
    { label: "TargetSytemIp4", value: "TargetSytemIp4" },
  ];
  let TargetSytemPort = [];

  return (
    <>
      {props.OrgSpaceValue.Org !== "" && props.OrgSpaceValue.Space !== "" ? (
        <div>
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
                />
                <Form.Check
                  type="radio"
                  label="Stage"
                  name="environment"
                  id="environment"
                  value="Stage"
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
                <Form.Label>Instance Name</Form.Label>
                <select
                  className="form-select classic select-height"
                  onChange={(e) => {
                    handelInputChange(e);
                    FindInstanceInfo(e);
                  }}
                  style={{ height: "40px" }}
                  id="InstanceName"
                  name="InstanceName"
                  value={initialData.InstanceName}
                >
                  <option value="">Select InstanceName</option>
                  <option value="InstanceName1">InstanceName 1</option>
                  <option value="InstanceName2">InstanceName 2</option>
                  <option value="InstanceName3">InstanceName 3</option>
                </select>
                <Form.Control.Feedback type="invalid">
                  {initialData.InstanceName === "" && error.InstanceName
                    ? error.InstanceName
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
                <Form.Label>Gate way</Form.Label>
                <br></br>
                <select
                  className="form-select classic select-height"
                  onChange={(e) => {
                    handelInputChange(e);
                    FindInstanceInfo(e);
                  }}
                  style={{ height: "40px" }}
                  id="Gateway"
                  name="Gateway"
                  value={initialData.Gateway}
                >
                  <option value="">Select Gateway</option>
                  <option value="Gateway1">Gateway 1</option>
                  <option value="Gateway2">Gateway 2</option>
                  <option value="Gateway3">Gateway 3</option>
                </select>
                <Form.Control.Feedback type="invalid">
                  {initialData.Gateway === "" && error.Gateway
                    ? error.Gateway
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
          <Row className="mb-3 alignbox tc-manage">
            <Form.Group as={Col} md="4">
              <Form.Label>Ec Client</Form.Label>
              <br></br>
              <Creatable
                isClearable
                // onChange={this.handleChange}
                // onInputChange={this.handleInputChange}
                options={EcClient}
                placeholder="Select or Input EcClient"
              />
              <Form.Control.Feedback type="invalid">
                {initialData.EcClient === "" && error.EcClient
                  ? error.EcClient
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" style={{ marginTop: "-13px" }}>
              <Form.Label className="select-label">Operating System</Form.Label>
              <br></br>
              <select
                className="form-select classic select-height"
                onChange={(e) => {
                  handelInputChange(e);
                  FindInstanceInfo(e);
                }}
                style={{ height: "40px" }}
                id="OperatingSystem"
                name="OperatingSystem"
                value={initialData.OperatingSystem}
              >
                <option value="">Select Operating System</option>
                <option value="window">window</option>
                <option value="LINUX">LINUX</option>
                <option value="MAC">MAC</option>
              </select>
              <Form.Control.Feedback type="invalid">
                {initialData.OperatingSystem === "" && error.OperatingSystem
                  ? error.OperatingSystem
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Target System Type</Form.Label>
              <br></br>
              <Creatable
                isClearable
                // onChange={this.handleChange}
                // onInputChange={this.handleInputChange}
                options={TargetSytemType}
                placeholder="Select or Input TargetSytemType"
              />
              <Form.Control.Feedback type="invalid">
                {initialData.SystemType === "" && error.SystemType
                  ? error.SystemType
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 alignbox tc-manage">
            <Form.Group as={Col} md="4">
              <Form.Label className="select-label">Target System Ip</Form.Label>

              <br></br>
              <Creatable
                isClearable
                // onChange={this.handleChange}
                // onInputChange={this.handleInputChange}
                options={TargetSytemIp}
                placeholder="Select or Input TargetSytemIp"
              />
              <Form.Control.Feedback type="invalid">
                {initialData.SystemIp === "" && error.SystemIp
                  ? error.SystemIp
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" style={{ marginTop: "12px" }}>
              <Form.Label>Target System Port</Form.Label>

              <br></br>
              <Creatable
                isClearable
                // onChange={this.handleChange}
                // onInputChange={this.handleInputChange}
                options={TargetSytemPort}
                placeholder="Select or Input TargetSytemPort"
              />
              <Form.Control.Feedback type="invalid">
                {initialData.SystemPort === "" && error.SystemPort
                  ? error.SystemPort
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="1" style={{ marginTop: "50px" }}>
              <Form.Check
                type="switch"
                id="custom-switch1"
                label="Tcs"
                onChange={() => TcsHandelChange()}
              />
            </Form.Group>
            {TcsOption === true ? (
              <Form.Group as={Col} md="3" style={{ marginTop: "18px" }}>
                <Form.Label>Attach File</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Attach File"
                  name="AttachFile"
                  id="AttachFile"
                  value={initialData.AttachFile}
                  onChange={handelInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  {initialData.AttachFile === "" && error.AttachFile
                    ? error.AttachFile
                    : ""}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              ""
            )}
          </Row>

          {initialData.environment === "Dev" ? (
            <Row className="mb-3 bucAdnCom tc-manage">
              <BucAdnComponent
                bucadnvalidate={bucadnvalidate}
                bucAdnValue={initialData}
              />
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
                    !initialData.minMemory && error.minMemory
                      ? error.minMemory
                      : ""
                  }
                  isValid={initialData.minMemory ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {!initialData.minMemory && error.minMemory
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
                    !initialData.maxMemory && error.maxMemory
                      ? error.maxMemory
                      : ""
                  }
                  isValid={initialData.maxMemory ? true : false}
                />
                <Form.Control.Feedback type="invalid">
                  {!initialData.maxMemory && error.maxMemory
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
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default EcUpdateProvisioning;
