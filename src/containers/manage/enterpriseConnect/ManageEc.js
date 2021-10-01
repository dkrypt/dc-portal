import React, { useEffect, useState } from "react";
import {
  Tab,
  Nav,
  Row,
  Col,
  Tabs,
  Container,
  Card,
  Button,
} from "react-bootstrap";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import EcNewProvisioning from "./EcNewProvisioning.js";
import EcUpdateProvisioning from "./EcUpdateProvisioning.js";
import { useStoreState, useStoreActions } from "easy-peasy";
function ManageEc(props) {
  const [OrgSpaceValue, setOrgSpaceValue] = useState({});
  const [resetForm, setResetForm] = useState(false);

  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);

  //inside useeffect

  useEffect(() => {
    setPageTitle("MANAGE ENTERPRISE CONNECT");
  }, []);

  const getOrgSpaceValue = (data) => {
    setOrgSpaceValue(data);
    setOrgSpaceValue((prev) => prev);
  };
  const handelResetForm = (value) => {
    setResetForm(value);
  };
  return (
    <>
      <div className="container-lg w-100 p-3 mb-3 tc-manage">
        <Orgspaceinstance
          getOrgspaceValue={getOrgSpaceValue}
          handelResetForm={handelResetForm}
        />
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Card className="tc-manage">
            <Card.Header className="tc-manage">
              <Nav variant="pills" className="tc-manage">
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage ">
                    <Nav.Link eventKey="first" className="tc-manage">
                      New Provisioning
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage ">
                    <Nav.Link eventKey="second" className="tc-manage">
                      Update Management
                    </Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage add-scroll">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <EcNewProvisioning OrgSpaceValue={OrgSpaceValue} />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  <EcUpdateProvisioning OrgSpaceValue={OrgSpaceValue} />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </>
  );
}

export default ManageEc;
