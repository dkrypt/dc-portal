import React, { useEffect } from "react";
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
import UserManagement from "./UserManagement.js";
function ManageUser(props) {
  useEffect(() => {
    props.clickEvent({
      pageName: "User",
      headerText: "Manage User",
      subHeaderText: "GLOBAL",
    });
  }, []);
  return (
    <>
      <div className="container-lg w-100 p-3 mb-3 tc-manage">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          className="tc-manage"
        >
          <Card className="tc-manage">
            <Card.Header className="tc-manage">
              <Nav variant="pills" className="tc-manage">
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="first">New User</Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <UserManagement />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </>
  );
}

export default ManageUser;
