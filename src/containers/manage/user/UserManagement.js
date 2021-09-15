import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import OrgSpaceInstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import AdminBox from "./AdminBox.js";
import SearchModal from "./SearchModal.js";
const UserManagement = (props) => {
  // const [initialValue, setinitialValue] = useState({
  //   SSO: "",
  //   Admin: [],
  // });
  const [sso, setSSO] = useState("Search SSO");
  const [adminList, setAdminList] = useState([]);
  useEffect(() => {}, [setAdminList]);

  // const resetValue = () => {
  //   setinitialValue({
  //     Org: "",
  //     Space: "",
  //   });
  // };

  //Handle SSO change
  const handleChange = (event) => {
    console.log(sso);
    setSSO(event.target.value);
  };

  //Add Admin to Array
  const addAdmin = (value) => {
    console.log("Recieved Value", value);
    console.log("AdminList", adminList);
    let flag = 2;

    let newAdminList = adminList;

    if (adminList.length === 0) {
      newAdminList.push(value);
      setAdminList(newAdminList);
    } else {
      adminList &&
        adminList.filter((element) => {
          console.log("element=", element);
          if (element.Id === value.Id) {
            flag = 0;
          } else {
            flag = 1;
          }
          return flag === 1
            ? setAdminList(newAdminList.push(value))
            : alert("user exist");
        });

      console.log("Flag", flag);
    }
  };
  //Clear SSO
  const clearSSO = (event) => {
    setSSO("Search SSO");
  };

  return (
    <>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">Org</Form.Label>

          <select
            className="form-select classic select-height"
            // value={values.InstanceName}
            // onChange={InstanceHandleChange}
            // onchange={handleChange}
            // style={{ height: "40px" }}
            // isInvalid={!!errors.InstanceName}
            // defaultValue=""
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.InstanceName}
          >
            <option defaultValue> Select org </option>
            <option value="org1">Org1</option>
            <option value="org2">Org2</option>
            <option value="org3">Org3</option>
          </select>
          <Form.Control.Feedback type="invalid">
            {/* {errors.InstanceName} */}
          </Form.Control.Feedback>
          {/* </FloatingLabel> */}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">Space</Form.Label>

          <select
            className="form-select classic select-height"
            // value={values.InstanceName}
            // onChange={InstanceHandleChange}
            // onchange={handleChange}
            // style={{ height: "40px" }}
            // isInvalid={!!errors.InstanceName}
            // defaultValue=""
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.InstanceName}
          >
            <option defaultValue> Select Space </option>
            <option value="Space1">Space1</option>
            <option value="Space2">Space2</option>
            <option value="Space3">Space3</option>
          </select>
          <Form.Control.Feedback type="invalid">
            {/* {errors.Space} */}
          </Form.Control.Feedback>
          {/* </FloatingLabel> */}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationFormik03">
          <Form.Label className="select-label">instance</Form.Label>

          <select
            className="form-select classic select-height"
            // value={values.InstanceName}
            // onChange={InstanceHandleChange}
            // onchange={handleChange}
            // style={{ height: "40px" }}
            // isInvalid={!!errors.InstanceName}
            // defaultValue=""
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.InstanceName}
          >
            <option defaultValue> Select instance </option>
            <option value="instance1">instance1</option>
            <option value="instance2">instance2</option>
            <option value="instance3">instance3</option>
          </select>
          <Form.Control.Feedback type="invalid">
            {/* {errors.Space} */}
          </Form.Control.Feedback>
          {/* </FloatingLabel> */}
        </Form.Group>
      </Row>
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col>
          <AdminBox adminData={adminList} label="Admin user" />
          <Form.Group as={Col} md="12" controlId="validationFormik01">
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Form.Control
                  type="text"
                  name="SSO"
                  placeholder="SSO Search"
                  //   value={values.Org}
                  onChange={handleChange}
                  //   // isValid={touched.BusinessName && !errors.BusinessName}
                  //   isInvalid={!!errors.Org}
                />
              </div>
              <div>
                <SearchModal
                  sso={sso}
                  addAdmin={addAdmin}
                  clearSSO={clearSSO}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <AdminBox adminData={adminList} label="content1" />
          <Form.Group as={Col} md="12" controlId="validationFormik01">
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Form.Control
                  type="text"
                  name="SSO"
                  placeholder="content1 Search"
                  //   value={values.Org}
                  onChange={handleChange}
                  //   // isValid={touched.BusinessName && !errors.BusinessName}
                  //   isInvalid={!!errors.Org}
                />
              </div>
              <div>
                <SearchModal
                  sso={sso}
                  addAdmin={addAdmin}
                  clearSSO={clearSSO}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <AdminBox adminData={adminList} label="content2" />
          <Form.Group as={Col} md="12" controlId="validationFormik01">
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Form.Control
                  type="text"
                  name="SSO"
                  placeholder="content2 Search"
                  //   value={values.Org}
                  onChange={handleChange}
                  //   // isValid={touched.BusinessName && !errors.BusinessName}
                  //   isInvalid={!!errors.Org}
                />
              </div>
              <div>
                <SearchModal
                  sso={sso}
                  addAdmin={addAdmin}
                  clearSSO={clearSSO}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
        <Col>
          <AdminBox adminData={adminList} label=" content3" />
          <Form.Group as={Col} md="12" controlId="validationFormik01">
            <br />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <Form.Control
                  type="text"
                  name="SSO"
                  placeholder="content3 Search"
                  //   value={values.Org}
                  onChange={handleChange}
                  //   // isValid={touched.BusinessName && !errors.BusinessName}
                  //   isInvalid={!!errors.Org}
                />
              </div>
              <div>
                <SearchModal
                  sso={sso}
                  addAdmin={addAdmin}
                  clearSSO={clearSSO}
                />
              </div>
            </div>
          </Form.Group>
        </Col>
      </Row>
      <div className="mb-3 row">
        <div
          className="d-flex justify-content-between"
          style={{ margin: " 3% 45%" }}
        >
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
