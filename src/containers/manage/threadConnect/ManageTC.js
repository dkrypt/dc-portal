import React, { useEffect } from "react";
import { Tab, Nav, Col, Card } from "react-bootstrap";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import NewProvisioning from "./NewProvisioning.js";
import UpdateManagement from "./UpdateManagement.js";
function ThreadConnect(props) {
  useEffect(() => {
    props.clickEvent({
      pageName: "ManageTC",
      headerText: "MANAGE THREAD CONNECT",
      subHeaderText: "GLOBAL",
    });
  }, []);
  return (
    <>
      <div className="container-lg w-100 p-3 mb-3 tc-manage">
        <Orgspaceinstance />
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
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="third" className="tc-manage">
                      Deployment
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="four" className="tc-manage">
                      File-Placement
                    </Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <NewProvisioning />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  <UpdateManagement />
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
