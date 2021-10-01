import React, { useEffect, useState } from "react";
import { Tab, Nav, Col, Card } from "react-bootstrap";
import TcDeploy from "../deploy/TcDeploy.js";
import FilePlacement from "../filePlacement/FilePlacement.js";
import Orgspaceinstance from "../orgSpaceInstance/OrgSpaceInstance.js";
import NewProvisioning from "./NewProvisioning.js";
import UpdateManagement from "./UpdateManagement.js";
import { useStoreState, useStoreActions } from "easy-peasy";
function ThreadConnect(props) {
  const [count, setCount] = useState(0);
  const [OrgValue, setOrgValue] = useState("");
  const [spaceValue, setSpaceValue] = useState("");
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(true);
  const [Deploy, setDeploy] = useState(false);
  const [filePlacement, setfilePlacement] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);

  //inside useeffect

  useEffect(() => {
    setPageTitle("MANAGE THREAD CONNECT");
  }, []);

  const handelChange = (e, i) => {
    setCount(i);
  };
  const getOrgSpaceValue = (org, space) => {
    setOrgValue(org);
    setSpaceValue(space);
  };
  const createTc = () => {
    setUpdate(false);
    setCreate(true);
    setDeploy(false);
    setfilePlacement(false);
  };
  const UpdateTc = () => {
    setUpdate(true);
    setCreate(false);

    setDeploy(false);
    setfilePlacement(false);
  };
  const handelDeploy = () => {
    setUpdate(false);
    setCreate(false);
    setDeploy(true);
    setfilePlacement(false);
  };
  const HandelFilePlacement = () => {
    setUpdate(false);
    setCreate(false);
    setDeploy(false);
    setfilePlacement(true);
  };
  const handelResetForm = (value) => {
    setResetForm(value);
  };
  const handelFile = () => {
    setUpdate(false);
    setCreate(false);
    setDeploy(false);
    setfilePlacement(false);
  };
  return (
    <>
      <div className="container-lg w-100  mb-3 tc-manage">
        <Orgspaceinstance
          getOrgspaceValue={getOrgSpaceValue}
          handelResetForm={handelResetForm}
        />
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
                <Col
                  md={3}
                  className="tc-manage"
                  onClick={() => handelDeploy()}
                >
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
                <Col
                  md={3}
                  className="tc-manage"
                  onClick={() => HandelFilePlacement()}
                >
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
              <Tab.Content className="tc-manage add-scroll">
                <Tab.Pane eventKey="first" className="tc-manage">
                  <div>
                    {create === true && OrgValue !== "" && spaceValue !== "" ? (
                      <NewProvisioning
                        OrgValue={OrgValue}
                        spaceValue={spaceValue}
                        create={create}
                        resetForm={resetForm}
                        handelResetForm={handelResetForm}
                        // handelFile={handelFile}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="tc-manage">
                  {update === true && OrgValue !== "" && spaceValue !== "" ? (
                    <UpdateManagement
                      OrgValue={OrgValue}
                      spaceValue={spaceValue}
                      update={update}
                      resetForm={resetForm}
                      handelResetForm={handelResetForm}
                      // handelFile={handelFile}
                    />
                  ) : (
                    ""
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="tc-manage">
                  {" "}
                  <TcDeploy OrgValue={OrgValue} spaceValue={spaceValue} />
                </Tab.Pane>
                <Tab.Pane eventKey="four" className="tc-manage">
                  <FilePlacement OrgValue={OrgValue} spaceValue={spaceValue} />
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
