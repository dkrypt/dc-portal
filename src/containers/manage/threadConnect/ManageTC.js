import React, { useEffect, useState } from "react";
import { Tab, Nav, Col, Card } from "react-bootstrap";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import NewProvisioning from "./NewProvisioning.js";
import UpdateManagement from "./UpdateManagement.js";
function ThreadConnect(props) {
  const [count, setCount] = useState(0);
  const [OrgSpaceValue, setOrgSpaceValue] = useState({});
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    props.clickEvent({
      pageName: "ManageTC",
      headerText: "MANAGE THREAD CONNECT",
      subHeaderText: "GLOBAL",
    });
  }, []);
  useEffect(() => {
    // setCount(count + 1);
    // alert("hi");
  }, [count]);

  const handelChange = (e, i) => {
    setCount(i);
  };
  const getOrgSpaceValue = (data) => {
    setOrgSpaceValue(data);
  };
  const createTc = () => {
    setUpdate(false);
    setCreate(true);
  };
  const UpdateTc = () => {
    setUpdate(true);
    setCreate(false);
  };
  console.log("OrgSpaceValue", OrgSpaceValue);
  return (
    <>
      <div className="container-lg w-100 p-3 mb-3 tc-manage">
        <Orgspaceinstance getOrgspaceValue={getOrgSpaceValue} />
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Card className="tc-manage">
            <Card.Header className="tc-manage">
              <Nav variant="pills" className="tc-manage">
                <Col md={3} className="tc-manage" onClick={() => createTc()}>
                  <Nav.Item className="card aligncenter tc-manage ">
                    <Nav.Link
                      eventKey="first"
                      className="tc-manage"
                      onClick={(e) => handelChange(e, 1)}
                    >
                      New Provisioning
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage" onClick={() => UpdateTc()}>
                  <Nav.Item className="card aligncenter tc-manage ">
                    <Nav.Link
                      eventKey="second"
                      className="tc-manage"
                      onClick={(e) => handelChange(e, 2)}
                    >
                      Update Management
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link
                      eventKey="third"
                      className="tc-manage"
                      onClick={(e) => handelChange(e, 3)}
                    >
                      Deployment
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link
                      eventKey="four"
                      className="tc-manage"
                      onClick={(e) => handelChange(e, 4)}
                    >
                      File-Placement
                    </Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <NewProvisioning
                    OrgSpaceValue={OrgSpaceValue}
                    create={create}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  <UpdateManagement
                    OrgSpaceValue={OrgSpaceValue}
                    update={update}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="tc-manage">
                  {" "}
                  <h1>Deployment </h1>{" "}
                </Tab.Pane>
                <Tab.Pane eventKey="four" className="tc-manage">
                  <h1>File-Placement</h1>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </>
  );
}

export default ThreadConnect;
