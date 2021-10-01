import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert, Spinner } from "react-bootstrap";

function FilePlacement(props) {
  return (
    <>
      {props.OrgValue !== "" && props.spaceValue !== "" ? (
        <div>
          <Row className="align-row">
            <Form.Group
              as={Row}
              className="mb-3 form-mar"
              // onChange={(e) => handelInputChange(e)}
            >
              <span className="radioselect tc-manage">Environment</span>
              <Col sm={6} className="col-radio">
                <Form.Check
                  type="radio"
                  label="Dev"
                  name="env"
                  value="Dev"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  label="Stage"
                  name="env"
                  value="Stage"
                />
                <Form.Check type="radio" label="Prod" name="env" value="Prod" />
              </Col>
              <Form.Control.Feedback type="invalid">
                {/* {initialData.env === "" && error.env !== "" ? error.env : ""} */}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br></br>
          <Row className="mb-12 tc-manage">
            <Form.Group as={Col} md="3">
              <Form.Label className="select-label">Instance Name</Form.Label>
              <br></br>
              <select
                className="form-select classic select-height instanceheight"
                //future use
                //   onChange={(e) => {
                //     handelInputChange(e);
                //     FindInstanceInfo(e);
                //   }}

                id="InstanceName"
                name="InstanceName"
                //   value={initialData.InstanceName}
              >
                <option value="">Select Instance Name</option>
                {/* {ProjectList &&
                ProjectList.map((e, i) => {
                  return (
                    <option value={e.id} key={i}>
                      {e.project_name}
                    </option>
                  );
                })} */}
              </select>
              <br></br>
              <span className="deploye-errmsg">
                {/* {initialData.InstanceName === "" && error.InstanceName !== ""
                ? error.InstanceName
                : ""} */}
              </span>
            </Form.Group>
            <Form.Group
              as={Col}
              md="1"
              className="deploy-attachFile"
            ></Form.Group>

            <Form.Group as={Col} md="3" className="deploy-attachFile">
              <Form.Label>Attach File</Form.Label>
              <Form.Control
                type="file"
                placeholder="Attach File"
                name="AttachFile"
                id="AttachFile"
                // value={initialData.AttachFile}
                // onChange={handelInputChange}
              />
              <Form.Control.Feedback type="invalid">
                {/* {initialData.AttachFile === "" && error.AttachFile
              ? error.AttachFile
              : ""} */}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label className="select-label">
                Select Permission Location
              </Form.Label>
              <br></br>
              <select
                className="form-select classic select-height instanceheight"
                //   onChange={(e) => {
                //     handelInputChange(e);
                //     FindInstanceInfo(e);
                //   }}

                id="Location"
                name="Location"
                //   value={initialData.Location}
              >
                <option value="">Select Permission Location</option>
                {/* {ProjectList &&
                ProjectList.map((e, i) => {
                  return (
                    <option value={e.id} key={i}>
                      {e.project_name}
                    </option>
                  );
                })} */}
              </select>
              <br></br>
              <span className="deploye-errmsg">
                {/* {initialData.Project === "" && error.Project !== ""
                ? error.Project
                : ""} */}
              </span>
            </Form.Group>
            <Form.Group as={Col} md="4" className="relativePath">
              <Form.Label>Enter relative path</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter relative path"
                name="relativepath"
                // onChange={handelInputChange}
                // value={updateInitialData.Comment}
                // isInvalid={
                //   updateInitialData.bucAdnValidate === "false" ||
                //   (updateInitialData.BUC === "" && error.BUC !== "")
                //     ? true
                //     : false
                // }
                // isValid={
                //   updateInitialData.bucAdnValidate === "true" ||
                //   (updateInitialData.BUC === "" && error.BUC !== "")
                //     ? true
                //     : previousDataUpdate.BUC && previousDataUpdate.BUC !== ""
                //     ? true
                //     : false
                // }
              />

              <Form.Control.Feedback type="invalid">
                {/* {updateInitialData.Comment === "" && error.Comment !== ""
              ? error.Comment
              : ""} */}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="4">
              <Form.Label>Please Enter Comments</Form.Label>
              <Form.Control
                as="textarea"
                // type="text"
                placeholder="Comment"
                name="Comment"
                // onChange={handelInputChange}
                // value={updateInitialData.Comment}
                // isInvalid={
                //   updateInitialData.bucAdnValidate === "false" ||
                //   (updateInitialData.BUC === "" && error.BUC !== "")
                //     ? true
                //     : false
                // }
                // isValid={
                //   updateInitialData.bucAdnValidate === "true" ||
                //   (updateInitialData.BUC === "" && error.BUC !== "")
                //     ? true
                //     : previousDataUpdate.BUC && previousDataUpdate.BUC !== ""
                //     ? true
                //     : false
                // }
              />

              <Form.Control.Feedback type="invalid">
                {/* {updateInitialData.Comment === "" && error.Comment !== ""
              ? error.Comment
              : ""} */}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              className="deploy-submit"
              as={Col}
              md="1"
              controlId="validationFormik05"
            >
              <Button
              //   onClick={(e) => handelValidate(e)}
              //   disabled={
              //     (previousDataUpdate.ADN &&
              //       previousDataUpdate.ADN !== updateInitialData.ADN) ||
              //     (previousDataUpdate.BUC &&
              //       previousDataUpdate.BUC !== updateInitialData.BUC)
              //       ? false
              //       : true
              //   }
              >
                Submit
              </Button>
            </Form.Group>
          </Row>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FilePlacement;
