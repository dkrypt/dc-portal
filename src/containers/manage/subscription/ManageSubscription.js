import React, { useEffect, useState } from "react";
import { Tab, Nav, Col, Card } from "react-bootstrap";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import NewSubscription from "./NewSubscription.js";
import UpdateSubscription from "./UpdateSubscription.js";
function ManageSubscription(props) {
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    props.clickEvent({
      pageName: "Subscription",
      headerText: "SUBSCRIPTION",
      subHeaderText: "GLOBAL",
    });
  }, []);

  const UpdateSub = () => {
    setUpdate(true);
    setCreate(false);
  };
  const CreateSubscription = () => {
    setUpdate(false);
    setCreate(true);
  };

  return (
    <>
      <div className="container-lg w-100 p-3 mb-3">
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          className="tc-manage"
        >
          <Card className="tc-manage">
            <Card.Header className="tc-manage">
              <Nav variant="pills" className="tc-manage">
                <Col
                  md={3}
                  className="tc-manage"
                  onClick={() => CreateSubscription()}
                >
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="first" className="tc-manage">
                      New Subscription
                    </Nav.Link>
                  </Nav.Item>
                </Col>
                <Col md={3} className="tc-manage" onClick={() => UpdateSub()}>
                  <Nav.Item className="card aligncenter tc-manage">
                    <Nav.Link eventKey="second">Update Subscription</Nav.Link>
                  </Nav.Item>
                </Col>
              </Nav>
            </Card.Header>
            <Card.Body className="tc-manage">
              <Tab.Content className="tc-manage">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <NewSubscription
                    create={create}
                    isloading={props.isloading}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  <UpdateSubscription
                    update={update}
                    isloading={props.isloading}
                  />
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
