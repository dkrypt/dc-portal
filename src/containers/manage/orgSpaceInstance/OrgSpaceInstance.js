import React, { useState, useEffect, useCallback } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Api from "../../../Apis/ManageApi.js";
let initialValues = {
  Org: "",
  Space: "",
};
let initialError = {
  Org: "",
  Space: "",
};
const Orgspaceinstance = (props) => {
  const [initialValue, setinitialValue] = useState(initialValues);
  const [error, seterror] = useState(initialError);
  const [orgList, setOrgList] = useState([]);
  const [spaceList, setSpaceList] = useState([]);
  const [errorStatus, seterrorStatus] = useState(false);

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setinitialValue({ ...initialValue, [name]: value });
    seterror(initialError);
  };
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
            // setMessage(err.data.message);
          }
        }
      });
  };
  useEffect(() => {
    handelgetOrgList();
  }, []);
  const orgSpaceChange = useCallback(() => {
    props.getOrgspaceValue(initialValue.Org, initialValue.Space);
  }, [initialValue.Org, initialValue.Space]);

  useEffect(() => {
    handelgetOrgList();
    // props.getOrgspaceValue(initialValue.Org, initialValue.Space);
    orgSpaceChange();
  }, [initialValue.Org, initialValue.Space]);

  return (
    <div>
      <Row className="mb-3 updateSubAlign">
        <Form.Group as={Col} md="3">
          <Form.Label className="select-label">Org</Form.Label>
          <br></br>
          <select
            className="form-select classic form-height"
            value={initialValue.Org}
            onChange={(e) => {
              handelInputChange(e);
              props.handelResetForm(true);
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
        <Form.Group as={Col} md="3">
          <Form.Label className="select-label">Space</Form.Label>
          <br></br>
          <select
            name="Space"
            className="form-select classic form-height"
            value={initialValue.Space}
            onChange={(e) => {
              handelInputChange(e);
              props.handelResetForm(true);
              if (e.target.value === "selectSpace") {
              } else {
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
      </Row>
    </div>
  );
};
export default Orgspaceinstance;
