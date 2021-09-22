import React, { Fragment, useState, useEffect } from "react";
import { EventList } from "./eventManagement/EventList.js";
import { DelegatePriToSso } from "./DelegatePriToSso.js";
import { RevokeSso } from "./RevokeSso.js";
import { ModifyEventNsg } from "./ModifyEventNsg.js";
import { RemoveIP } from "./RemoveIP.js";
import MaintainGroup from "./MaintainGroup.js";
import ManageAccount from "./ManageAccount.js";
import { Link } from "react-router-dom";
import "./GlobalScape.css";

export const GlobalScape = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(()=>{
    props.clickEvent({
      pageName: "GlobalScape",
      headerText: "GLOBALSCAPE",
      subHeaderText: "GLOBAL",
    })
  }, [])
  return (
    <Fragment>
      {currentStep === 0 && (
        <div className="container-lg w-100 p-3 borderStyle mb-5">
          <div className="row mx-1 gs-row">
            <Link to="/globalscape/event-management">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(1)}>
                  Event Management
                </span>
              </div>
            </Link>
            <Link to="/globalscape/delegate-priviledges">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(2)}>
                  Delegate Priviledges To SSO
                </span>
              </div>
            </Link>
            <Link to="/globalscape/revoke-sso">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(3)}>
                  Revoke SSO
                </span>
              </div>
            </Link>
          </div>
          <div className="row mx-1 gs-row">           
            <Link to="/globalscape/remove-ip">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(6)}>
                  Remove IP From Ban List
                </span>
              </div>
            </Link>
            
            <Link to="/globalscape/maintain-group">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(8)}>
                  Maintain Group
                </span>
              </div>
            </Link>
            <Link to="/globalscape/manage-account">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(9)}>
                  Manage Account
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
      {currentStep === 1 && <EventList />}
      {currentStep === 2 && <DelegatePriToSso />}
      {currentStep === 3 && <RevokeSso />}

      {currentStep === 5 && <ModifyEventNsg />}
      {currentStep === 6 && <RemoveIP />}
     
      {currentStep === 8 && <MaintainGroup />}
      {currentStep === 9 && <ManageAccount />}
    </Fragment>
  );
};
