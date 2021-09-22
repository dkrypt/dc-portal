import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import Api from "../../../middleware/ManageApi.js";

let initialValues = {
  Org: "",
  Space: "",
  InstanceName: "",
};
let initialError = {
  Org: "",
  Space: "",
  InstanceName: "",
};
function UserManagement() {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);
  const [orgList, setOrgList] = useState([]);
  const [spaceList, setSpaceList] = useState([]);
  const [userRoleList, setuserRoleList] = useState([]);
  const [show, setShow] = useState(false);
  const [roleId, SetRoleid] = useState("");
  const [adminsso, setAdminsso] = useState("");
  const [TeamLeaderSso, setTeamLeaderSso] = useState("");
  const [EcCreationSso, setEcCreationSso] = useState("");
  const [content, setcontent] = useState("");
  const [ssoData, setSsoData] = useState([]);
  const [UserRoleId, setRoleId] = useState("");
  const [message, setMessage] = useState("");
  const [successStatus, setsuccessStatus] = useState(false);
  const [errorStatus, seterrorStatus] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ProjectList, setProjectList] = useState([]);
  const [Erroradminsso, setErroradminsso] = useState("");
  const [ErrorTeamLeadsso, setErrorTeamLeadsso] = useState("");
  const [ErrorEcCreationsso, setErrorEcCreationsso] = useState("");
  const [ErrorContentsso, setErrorcontentsso] = useState("");

  const handelgetOrgList = () => {
    Api.getOrgList()
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200) {
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
  const handelgetUserRoleList = () => {
    setIsLoading(true);
    Api.getUserRoleList()
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200) {
          setIsLoading(false);
          setuserRoleList(res.data.results);
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
    Api.getSpaceList(e.target.value)
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200 || res.status === 201) {
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

  const handelgetUserRoleListData = (e) => {
    Api.getUserRoleListData(e.target.value)
      .then((res) => {
        if (res.status === "error") {
        }
        if (res.status === 200 || res.status === 201) {
          const data = res.data.results;
          setUser(data);
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

  // useEffect(() => {
  //   handelgetUserRoleListData(initialValue.space);
  // }, [initialValue.space]);

  useEffect(() => {
    handelgetOrgList();
    handelgetUserRoleList();
    projectListdata();
  }, []);

  if (successStatus === true || errorStatus === true) {
    setInterval(function () {
      setsuccessStatus(false);
      seterrorStatus(false);
    }, 4000);
  }
  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialValue({ ...initialValue, [name]: value });
    seterror(initialError);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const adminSsoHandleChange = (e, id) => {
    SetRoleid(id);
    if (id === userRoleList[0].id) {
      setAdminsso(e.target.value);
    } else if (id === userRoleList[1].id) {
      setTeamLeaderSso(e.target.value);
    } else if (id === userRoleList[2].id) {
      setEcCreationSso(e.target.value);
    } else if (id === userRoleList[3].id) {
      setcontent(e.target.value);
    }
  };

  const searchAdminList = (e, roleId) => {
    SetRoleid(roleId);
    setIsLoading(true);
    let data = {
      sso_id: adminsso || TeamLeaderSso || EcCreationSso || content,
    };
    Api.ssoSearch(data)
      .then((res) => {
        if (res.status === "error") {
          // seterrorStatus(true);
          // setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
          setIsLoading(false);
          setSsoData(res.data.resulsts);
          handleShow();
          setRoleId(roleId);
          // setUserValue(user);

          if (res.data.message === "") {
            // setMessage("Successfully Updated");
          } else {
            // setMessage(res.data.message);
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAILED") {
            // seterrorStatus(true);
            // setMessage(err.data.message);
          }
        }
      });
  };
  const handleChecked = (e, data, roleId) => {
    let obj = {
      ssoId: data.sso_id,
      email: data.email,
      name: data.first_name + " " + data.last_name,
      roles: [roleId],
    };
    if (user.length === 0) {
      user.push(obj);
      setUser(user);
    } else {
      let newArr = [...user];
      let exitdata = newArr && newArr.findIndex((u) => u.ssoId === data.sso_id);
      if (exitdata !== -1) {
        newArr[exitdata].roles.push(roleId);
      } else {
        user.push(obj);
        setUser(user);
      }
      setUser(newArr);
    }
    handleClose();
    setUser(user);
  };

  const handelUserAManagment = () => {
    let data = {
      org_space_id: initialValue.Space,
      users: user,
    };
    setIsLoading(true);
    Api.userRole(data)
      .then((res) => {
        if (res.status === "error") {
          // seterrorStatus(true);
          // setMessage(res.data.message);
        }
        if (res.status === 200 || res.status === 201) {
          // setUser([]);
          // setAdminsso("");
          // setTeamLeaderSso("");
          // setEcCreationSso("");
          // setcontent("");
          setIsLoading(false);
          setsuccessStatus(true);
          setMessage("Successfully Created");
          if (res.data.message === "") {
          } else {
            // setMessage(res.data.message);
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data.status === "FAILED") {
            // seterrorStatus(true);
            // setMessage(err.data.message);
          }
        }
      });
  };

  const removeUser = (ele, id) => {
    const allOtherUser = user.filter((u) => u.ssoId !== ele.ssoId);

    const usertoUpdate = user.filter((us) => us.ssoId === ele.ssoId)[0];

    const updatedRoles = usertoUpdate.roles.filter((r) => r !== id);

    const updatedUser = { ...usertoUpdate, roles: updatedRoles };
    setUser([...allOtherUser, updatedUser]);
  };

  const displayData = (id) => {
    let data = user && user.filter((item) => item.roles.includes(id));
    return (
      data &&
      data.map((e, i) => {
        return (
          <div key={i} style={{ display: "flex" }}>
            <div>{e.ssoId}</div>
            <div
              style={{
                marginLeft: "7px",
              }}
              onClick={() => removeUser(e, id)}
            >
              <i
                className="fa fa-times"
                aria-hidden="true"
                style={{ paddingBottom: "6px", color: "red" }}
              ></i>
            </div>
          </div>
        );
      })
    );
  };

  const projectListdata = () => {
    let data = {
      environment: "dev",
      action: "updation",
    };
    let projectList = [];
    setIsLoading(true);
    Api.ProjectNameList(data)
      .then((res) => {
        if (res.data.status === "FAIL") {
          setIsLoading(false);
        }
        if (res.status === 200) {
          setIsLoading(false);
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
  };

  return (
    <>
      {isLoading === true ? (
        <div
          style={{
            display: "block",
            position: "fixed",
            zIndex: "9900",
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

      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label className="select-label">Org</Form.Label>
          <br></br>
          <select
            className="form-select classic form-height"
            value={initialValue.Org}
            onChange={(e) => {
              handelInputChange(e);
              if (e.target.value === "selectOrg") {
                // Reset();
              } else {
                fetchSpaceList(e);
              }
            }}
            name="Org"
          >
            <option value=""> Select Org </option>
            {orgList &&
              orgList.map((e, i) => {
                return (
                  <option value={e.id} key={i}>
                    {e.org_name}
                  </option>
                );
              })}
          </select>
          {/* <Form.Control.Feedback type="invalid"> */}
          <br></br>
          <span className="errorMsg">
            {initialValue.Org === "" && error.Org !== "" ? error.Org : ""}
          </span>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label className="select-label">Space</Form.Label>
          <br></br>
          <select
            name="Space"
            className="form-select classic form-height"
            value={initialValue.Space}
            onChange={(e) => {
              handelInputChange(e);
              if (e.target.value === "selectSpace") {
              } else {
                handelgetUserRoleListData(e);
              }
            }}
          >
            <option value=""> Select Space </option>
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
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">instance Name</Form.Label>
          <br></br>
          <select
            className="form-select classic select-height"
            onChange={(e) => {
              handelInputChange(e);
            }}
            style={{ height: "40px" }}
            id="InstanceName"
            name="InstanceName"
            value={initialValue.InstanceName}
          >
            <option value="">Select InstanceName</option>
            {ProjectList &&
              ProjectList.map((e, i) => {
                return (
                  <option value={e.value} key={i}>
                    {e.label}
                  </option>
                );
              })}
          </select>
          <Form.Control.Feedback type="invalid">
            {/* {errors.Space} */}
          </Form.Control.Feedback>
          {/* </FloatingLabel> */}
        </Form.Group>
      </Row>

      {initialValue.Org !== "" &&
      initialValue.Space !== "" &&
      initialValue.InstanceName !== "" ? (
        <Row>
          {/* roleId */}
          {userRoleList &&
            userRoleList.map((role, i) => {
              return (
                <Form.Group as={Col} md="3" key={i}>
                  <Form.Label className="select-label">
                    {role.role_name}
                  </Form.Label>
                  <br />
                  <div
                    // multiple
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      overflowY: "scroll",
                      border: "1px solid",
                      height: "60%",
                    }}
                  >
                    {displayData(role.id)}
                  </div>
                  <div style={{ height: "38px", display: "flex" }}>
                    <div>
                      <Form.Control
                        type="text"
                        name="SSO"
                        placeholder="SSO Search"
                        id={role.id}
                        value={
                          role.id === userRoleList[0].id
                            ? adminsso
                            : role.id === userRoleList[1].id
                            ? TeamLeaderSso
                            : role.id === userRoleList[2].id
                            ? EcCreationSso
                            : role.id === userRoleList[3].id
                            ? content
                            : ""
                        }
                        onChange={(e) => adminSsoHandleChange(e, role.id)}
                      />
                      <span style={{ color: "red" }}>
                        {role.id === userRoleList[0].id && adminsso === ""
                          ? Erroradminsso
                          : role.id === userRoleList[1].id &&
                            TeamLeaderSso === ""
                          ? ErrorTeamLeadsso
                          : role.id === userRoleList[2].id &&
                            EcCreationSso === ""
                          ? ErrorEcCreationsso
                          : role.id === userRoleList[3].id && content === ""
                          ? ErrorContentsso
                          : ""}
                      </span>
                    </div>
                    <div>
                      <Button
                        onClick={(e) => {
                          if (
                            role.id === userRoleList[0].id &&
                            adminsso === ""
                          ) {
                            setErroradminsso("Required SSO");
                          } else if (
                            role.id === userRoleList[1].id &&
                            TeamLeaderSso === ""
                          ) {
                            setErrorTeamLeadsso("Required SSO");
                          } else if (
                            role.id === userRoleList[2].id &&
                            EcCreationSso === ""
                          ) {
                            setErrorEcCreationsso("Required SSO");
                          } else if (
                            role.id === userRoleList[3].id &&
                            content === ""
                          ) {
                            setErrorcontentsso("Required SSO");
                          } else {
                            setErroradminsso("");
                            setErrorTeamLeadsso("");
                            setErrorEcCreationsso("");
                            setErrorcontentsso("");
                            searchAdminList(e, role.id);
                          }
                        }}
                      >
                        <img
                          src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
                          alt=""
                        />
                      </Button>
                    </div>
                  </div>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              );
            })}
        </Row>
      ) : (
        <Row>
          {initialValue.Org !== "" && initialValue.Space !== "" ? (
            <Row>
              {userRoleList && userRoleList[0] ? (
                <Form.Group as={Col} md="12">
                  <Form.Label className="select-label">
                    {userRoleList && userRoleList[0].role_name}
                  </Form.Label>
                  <br />
                  <div
                    // multiple
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      overflowY: "scroll",
                      border: "1px solid",
                      height: "60%",
                    }}
                  >
                    {displayData(userRoleList && userRoleList[0].id)}
                  </div>
                  <div style={{ height: "38px", display: "flex" }}>
                    <div>
                      <Form.Control
                        type="text"
                        name="SSO"
                        placeholder="SSO Search"
                        id={userRoleList && userRoleList[0].id}
                        value={
                          userRoleList &&
                          userRoleList[0].id === userRoleList &&
                          userRoleList[0].id
                            ? adminsso
                            : ""
                        }
                        onChange={(e) =>
                          adminSsoHandleChange(
                            e,
                            userRoleList && userRoleList[0].id
                          )
                        }
                      />
                      <span style={{ color: "red" }}>
                        {adminsso === "" ? Erroradminsso : ""}
                      </span>
                    </div>
                    <div>
                      <Button
                        onClick={(e) => {
                          if (adminsso === "") {
                            setErroradminsso("Required SSO");
                          } else {
                            setErroradminsso("");
                            searchAdminList(
                              e,
                              userRoleList && userRoleList[0].id
                            );
                          }
                        }}
                      >
                        <img
                          src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
                          alt=""
                        />
                      </Button>
                    </div>
                  </div>
                  <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </Form.Group>
              ) : (
                ""
              )}
            </Row>
          ) : (
            ""
          )}
        </Row>
      )}
      <br></br>
      {initialValue.Org !== "" && initialValue.Space !== "" ? (
        <Row style={{ marginTop: "40px" }}>
          <Button
            variant="primary"
            style={{ marginLeft: "13px" }}
            onClick={() => handelUserAManagment()}
          >
            Submit
          </Button>
        </Row>
      ) : (
        ""
      )}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>SSO Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Table className="SSOtable" striped bordered hover size="lg">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <td></td>
                <td>
                  <b>Sso id</b>
                </td>
                <td>
                  <b>Mail ID </b>
                </td>
                <td>
                  <b> First Name</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {ssoData.map((element, i) => {
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px",
                      }}
                    >
                      <input
                        type="radio"
                        // id={element.sso_id}
                        id="sso"
                        name="sso"
                        value={element.sso_id}
                        onChange={(e) => handleChecked(e, element, UserRoleId)}
                      />
                    </td>
                    {/* <td style={{ padding: "10px" }}>
                      <img
                        src={element.avatar}
                        alt="avatar"
                        style={{
                          width: "30%",
                          height: "12%",
                          borderRadius: "27px",
                        }}
                      />
                    </td> */}
                    <td style={{ padding: "10px" }}>{element.sso_id}</td>
                    <td style={{ padding: "10px" }}>{element.email}</td>
                    <td style={{ padding: "10px" }}>
                      {element.first_name} {element.last_name}
                    </td>
                    {/* <td style={{ padding: "10px" }}>{element.last_name}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default UserManagement;
