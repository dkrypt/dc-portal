import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import BucAdnComponent from "./BucAdnComponent.js";
import DataTable from "react-data-table-component";
import Api from "../../../middleware/ManageApi.js";
import Select from "react-select";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
let regExp = /^([a-zA-Z0-9_-]){3,5}$/;
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
  InstanceName: "SelectInstanceName",
  maxSize: "2g",
  initialSize: "1g",
  version: "",
  host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
  fileSystemId: "12e51190",
  accessPoint: "0f259ecad065aa92d",
  user: "single",
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
  environment: "Dev",
  minMemory: "",
  maxMemory: "",
  minCpu: "",
  maxCpu: "",
  replicaCount: "",
  InstanceName: "",
  version: "",
};
const UpdateManagement = (props) => {
  // const [env, setenv] = useState("Dev");
  const [updateInitialData, setinitialData] = useState(initialValues);
  const [error, setError] = useState(Initialerror);
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [editData, setEditData] = useState({});
  const [ProjectList, setProjectList] = useState([]);
  const [MultiinstanceData, setMultiinstanceData] = useState([]);

  const handleChangeProject = (env) => {
    // setenv(env);
    // handleShow();
  };
  const resetForm = () => {
    setinitialData({
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
      version: "",
      host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
      fileSystemId: "12e51190",
      accessPoint: "0f259ecad065aa92d",
      user: "single",
      gitRepo:
        "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialData({ ...updateInitialData, [name]: value });
    setError(Initialerror);
    if (name == "environment") {
      const obj = {
        ...updateInitialData,
        environment: value,
        InstanceName: "",
        projectName: "",
        minCpu: "",
        maxCpu: "",
        minMemory: "",
        maxMemory: "",
        version: "",
        VLan: "",
        replicaCount: "",
        user: "single",
      };
      setinitialData(obj);
    }

    if (name == "user") {
      const obj = {
        ...updateInitialData,
        InstanceName: "",
        projectName: "",
        minCpu: "4",
        maxCpu: "5",
        minMemory: "7",
        maxMemory: "11",
        version: "",
        VLan: "",
        replicaCount: "1",
        user: value,
      };
      setinitialData(obj);
    }
  };
  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }
  useEffect(() => {
    let data = {
      environment: updateInitialData.environment.toLowerCase(),
      action: "updation",
    };
    let projectList = [];
    Api.ProjectNameList(data)
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200) {
          res.data.results &&
            res.data.results.forEach((p) => {
              projectList.push({ label: p.project_name, value: p.id });
            });
          setProjectList(projectList);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAIL") {
            setProjectList(err.response.data.results);
          }
        }
      });
  }, [updateInitialData.environment]);

  useEffect(() => {
    getmultiInstanceData();
  }, [updateInitialData.user === "multiple"]);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      editable: false,
    },
    {
      dataField: "project_name",
      text: "Instance Name",
      editable: false,
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Instance Name Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "buc",
      text: "BUC",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "BUC Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "adn",
      text: "ADN",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "ADN Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "min_memory",
      text: "Min Memory",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Min Memory Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "max_memory",
      text: "Max Memory",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Max Memory Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "min_cpu",
      text: "Min Cpu",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Min Cpu Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "max_cpu",
      text: "Max Cpu",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Max Cpu Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "replica_count",
      text: "ReplicaCount",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "ReplicaCount Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "vlan",
      text: "Vlan",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Vlan Required",
          };
        }
        return true;
      },
    },
    {
      dataField: "version",
      text: "Version",
      validator: (newValue, row, column) => {
        if (newValue === "") {
          return {
            valid: false,
            message: "Version Required",
          };
        }
        return true;
      },
    },
    {
      text: "Action",
      editable: false,
      formatter: (id, row) => {
        return <Button onClick={() => handleMultipleSubmit(row)}>save</Button>;
      },
    },
  ];

  const getSingleInstanceData = (e) => {
    let data = {
      environment:
        updateInitialData.environment === "Stage"
          ? "stage"
          : updateInitialData.environment === "Prod"
          ? "prod"
          : "dev",
      projectId: e.target.value,
    };
    Api.projectData(data)
      .then((res) => {
        if (res.status === "error") {
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
          const data = res.data.results[0];

          const obj = {
            host: data.host,
            ShortDescription: data.description,
            ShortName: "",
            Ci_Name: "",
            gitRepo: data.git_repository,
            BUC: data.buc,
            ADN: data.adn,
            InstanceName: e.target.value,
            environment: updateInitialData.environment,
            accessPoint: data.access_point,
            maxSize: "2g",
            initialSize: data.initial_size,
            projectName: data.project_name,
            minCpu: data.min_cpu,
            maxCpu: data.max_cpu,
            minMemory: data.min_memory,
            maxMemory: data.max_memory,
            version: data.version,
            VLan: data.vlan,
            replicaCount: data.replica_count,
            user: "single",
          };
          setinitialData(obj);
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
  const getmultiInstanceData = () => {
    let data = {
      environment:
        updateInitialData.environment === "Stage"
          ? "stage"
          : updateInitialData.environment === "Prod"
          ? "prod"
          : "dev",
    };
    Api.projectData(data)
      .then((res) => {
        if (res.status === "error") {
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
          const data = res.data.results;

          setMultiinstanceData(data);

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
  const handleFormSubmit = (event) => {
    let errorData = {
      ...error,
    };

    event.preventDefault();
    // debugger;

    if (updateInitialData.projectName === "") {
      errorData.projectName = "Project Name required";
    }
    if (updateInitialData.minCpu === "") {
      errorData.minCpu = "MinCpu  required";
    }
    if (updateInitialData.maxCpu === "") {
      errorData.maxCpu = "maxCpu  required";
    }
    if (updateInitialData.minMemory === "") {
      errorData.minMemory = "minMemory  required";
    }
    if (updateInitialData.maxMemory === "") {
      errorData.maxMemory = "maxMemory  required";
    }
    if (updateInitialData.replicaCount === "") {
      errorData.replicaCount = "replicaCount  required";
    }
    if (updateInitialData.version === "") {
      errorData.version = "Version  required";
    }
    if (updateInitialData.VLan === "") {
      errorData.VLan = "VLAN  required";
    }
    if (
      updateInitialData.projectName === "" ||
      updateInitialData.minCpu === "" ||
      updateInitialData.maxCpu === "" ||
      updateInitialData.minMemory === "" ||
      updateInitialData.maxMemory === "" ||
      updateInitialData.replicaCount === "" ||
      updateInitialData.version === "" ||
      updateInitialData.VLan === "" ||
      error.projectName !== "" ||
      error.minCpu !== "" ||
      error.maxCpu !== "" ||
      error.minMemory !== "" ||
      error.maxMemory !== "" ||
      error.replicaCount !== "" ||
      error.version !== "" ||
      error.VLan !== ""
    ) {
      setError(errorData);
    } else {
      let data = {
        projectid: updateInitialData.InstanceName,
        initialSize: "1g",
        maxSize: "2g",
        version: updateInitialData.version,
        host: updateInitialData.host,
        minMemory: updateInitialData.minMemory,
        minCpu: updateInitialData.minCpu,
        maxMemory: updateInitialData.maxMemory,
        maxCpu: updateInitialData.maxCpu,
        fileSystemId: "12e51190",
        accessPoint: updateInitialData.accessPoint,
        gitRepo: updateInitialData.gitRepo,
        environment: updateInitialData.environment.toLowerCase(),
        replicaCount: updateInitialData.replicaCount,
        description: updateInitialData.ShortDescription,
        vlan:
          updateInitialData.VLan === null ? "0.0.0.1" : updateInitialData.VLan,
      };
      Api.UpdateTcNewProvisioning(data)
        .then((res) => {
          if (res.status === "error") {
            seterrorStatus(true);
            setMessage(res.data.message);
          }
          if (res.status === 200 || res.status === 201) {
            setsuccessStatus(true);
            // setShow(true);
            if (res.data.message === "") {
              setMessage("Successfully Updated");
            } else {
              setMessage(res.data.message);
            }
            const obj = {
              ...updateInitialData,
              environment: updateInitialData.environment,
              InstanceName: "",
              projectName: "",
              minCpu: "4",
              maxCpu: "5",
              minMemory: "7",
              maxMemory: "11",
              version: "",
              VLan: "",
              replicaCount: "1",
              user: updateInitialData.user,
            };
            setinitialData(obj);
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

  const handleMultipleSubmit = (senddata) => {
    let data = {
      projectid: senddata.id,
      initialSize: "1g",
      maxSize: "2g",
      version: senddata.version,
      host: "aviation-tc-dev-aws.digitalconnect.apps.ge.com",
      minMemory: senddata.min_memory,
      minCpu: senddata.min_cpu,
      maxMemory: senddata.max_memory,
      maxCpu: senddata.max_cpu,
      fileSystemId: "12e51190",
      accessPoint: "0f259ecad065aa92d",
      gitRepo:
        "https://github.build.ge.com/digital-connect-devops/tc-aviation-argo-cd-apps.git",
      environment: updateInitialData.environment.toLowerCase(),
      replicaCount: senddata.replica_count,
      description: senddata.description,
      vlan: senddata.vlan,
    };
    Api.UpdateTcNewProvisioning(data)
      .then((res) => {
        if (res.status === "error") {
          seterrorStatus(true);
          setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
          setsuccessStatus(true);
          // setShow(true);
          if (res.data.message === "") {
            setMessage("Successfully Updated");
          } else {
            setMessage(res.data.message);
          }
          const obj = {
            ...updateInitialData,
            environment: updateInitialData.environment,
            InstanceName: "",
            projectName: "",
            minCpu: "",
            maxCpu: "",
            minMemory: "",
            maxMemory: "",
            version: "",
            VLan: "",
            replicaCount: "",
            user: updateInitialData.user,
          };
          setinitialData(obj);
          getmultiInstanceData();
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

  return (
    <>
      {" "}
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
      <Row className="align-row tc-manage">
        <Form.Group
          as={Row}
          className="mb-3 form-mar"
          onChange={handelInputChange}
        >
          <span className="radioselect">Environment</span>
          <Col sm={6} className="col-radio">
            <Form.Check
              type="radio"
              label="Dev"
              name="environment"
              id="environment"
              value="Dev"
              // defaultValue
              defaultChecked
              // checked={updateInitialData.environment === "Dev"}
            />
            <Form.Check
              type="radio"
              label="Stage"
              name="environment"
              id="environment"
              value="Stage"
              // checked={updateInitialData.environment === "Stage"}
            />
            <Form.Check
              type="radio"
              label="Prod"
              name="environment"
              id="environment"
              value="Prod"
              // checked={updateInitialData.environment === "Prod"}
            />
          </Col>
        </Form.Group>
      </Row>
      <Row className="align-row tc-manage">
        <Form.Group
          as={Row}
          className="mb-3 form-mar"
          onChange={handelInputChange}
        >
          <span className="radioselect">InstanceName</span>
          <Col sm={6} className="col-radio">
            <Form.Check
              type="radio"
              label="Single"
              name="user"
              id="user"
              value="single"
              checked={updateInitialData.user === "single"}
            />
            <Form.Check
              type="radio"
              label="Multiple"
              name="user"
              id="user"
              value="multiple"
              checked={updateInitialData.user === "multiple"}
            />
          </Col>
        </Form.Group>
        {updateInitialData.user === "single" ? (
          <Form.Group as={Col} md="6">
            <select
              className="form-select classic select-height"
              onChange={(e) => {
                handelInputChange(e);
                if (e.target.value === "SelectInstanceName") {
                  resetForm();
                } else {
                  getSingleInstanceData(e);
                }
              }}
              // sele
              style={{ height: "40px" }}
              id="InstanceName"
              name="InstanceName"
              value={updateInitialData.InstanceName}
            >
              <option value="SelectInstanceName">Select InstanceName</option>
              {ProjectList &&
                ProjectList.map((e, i) => {
                  return (
                    <option value={e.value} key={i}>
                      {e.label}
                    </option>
                  );
                })}
            </select>
            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
          </Form.Group>
        ) : (
          ""
        )}
      </Row>
      {updateInitialData.user === "single" ? (
        <div>
          <Row className="alignupdateRow tc-manage">
            <Form.Group as={Col} md="3">
              <Form.Label className="select-label">Project Name</Form.Label>{" "}
              <Form.Control
                disabled={true}
                type="text"
                placeholder="Project Name"
                id="projectName"
                name="projectName"
                value={updateInitialData.projectName}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.projectName === "" &&
                  error.projectName !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.projectName ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.projectName === "" &&
                error.projectName !== ""
                  ? error.projectName
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" className="fieldhelm">
              <Form.Label className="select-label">Helm version</Form.Label>
              <br></br>
              <Form.Control
                type="text"
                placeholder="Version"
                id="version"
                name="version"
                value={updateInitialData.version}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.version === "" && error.version !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.version ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.version === "" && error.version !== ""
                  ? error.version
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" className="vlanfield">
              <Form.Label>VLAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="VLAN"
                name="VLan"
                id="VLan"
                onChange={handelInputChange}
                value={updateInitialData.VLan}
                isInvalid={
                  updateInitialData.VLan === "" && error.VLan !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.VLan ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.VLan === "" && error.VLan !== ""
                  ? error.VLan
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 bucAdnCom tc-manage">
            <BucAdnComponent />
          </Row>
          <hr />
          <Row className="mb-3 alignupdateRow tc-manage">
            <Form.Group as={Col} md="2">
              <Form.Label>Min Memory</Form.Label>
              <Form.Control
                type="Number"
                name="minMemory"
                id="minMemory"
                value={updateInitialData.minMemory}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.minMemory === "" && error.minMemory !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.minMemory ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.minMemory === "" && error.minMemory !== ""
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
                value={updateInitialData.maxMemory}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.maxMemory === "" && error.maxMemory !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.maxMemory ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.maxMemory === "" && error.maxMemory !== ""
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
                value={updateInitialData.minCpu}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.minCpu === "" && error.minCpu !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.minCpu ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.minCpu === "" && error.minCpu !== ""
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
                value={updateInitialData.maxCpu}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.maxCpu === "" && error.maxCpu !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.maxCpu ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.maxCpu === "" && error.maxCpu !== ""
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
                value={updateInitialData.replicaCount}
                onChange={handelInputChange}
                isInvalid={
                  updateInitialData.replicaCount === "" &&
                  error.replicaCount !== ""
                    ? true
                    : false
                }
                isValid={updateInitialData.replicaCount ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {updateInitialData.replicaCount === "" &&
                error.replicaCount !== ""
                  ? error.replicaCount
                  : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div style={{ marginLeft: "18px" }} className="tc-manage">
            <Button type="submit" onClick={(e) => handleFormSubmit(e)}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <BootstrapTable
          keyField="id"
          data={MultiinstanceData}
          columns={columns}
          className="tc-manage"
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            autoSelectText: true,
            clickToSelect: { mode: "dbclick" ? true : false },
            style: { backgroundColor: "#c8e6c9" },
            bgColor: (row, rowIndex) => {
              return row ? "#c8e6c9" : "blue"; // return a color code
            },
          })}
        />
      )}
    </>
  );
};

export default UpdateManagement;
