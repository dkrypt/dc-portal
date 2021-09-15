import React, { useEffect } from "react";
import { Tab, Nav, Col, Card } from "react-bootstrap";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import NewSubscription from "./NewSubscription.js";
import UpdateSubscription from "./UpdateSubscription.js";
function ManageSubscription(props) {
  useEffect(() => {
    props.clickEvent({
      pageName: "Subscription",
      headerText: "SUBSCRIPTION",
      subHeaderText: "GLOBAL",
    });
  }, []);
  return (
    <>
      <div className="container-lg w-100 p-3 mb-3">
        <Orgspaceinstance />
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
                    <Nav.Link eventKey="first" className="tc-manage">
                      New Subscription
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage">
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="second">Update Subscription</Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <NewSubscription />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  <UpdateSubscription />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </>
  );
}

export default ManageSubscription;
