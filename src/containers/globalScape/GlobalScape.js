import React, { Fragment, useState } from "react";
import {EventList} from "./eventManagement/EventList.js";
import {DelegatePriToSso} from "./DelegatePriToSso.js";
import {RevokeSso} from "./RevokeSso.js";
import {EnableAccount} from "./EnableAccount.js";
import {ModifyEventNsg} from "./ModifyEventNsg.js";
import {RemoveIP} from "./RemoveIP.js";
import {AssignGroup} from "./AssignGroup.js";
import {DisableAccount} from "./DisableAccount.js";
import { Link } from "react-router-dom";
import './GlobalScape.css';

export const GlobalScape = () => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Fragment>
      {currentStep === 0 && (
        <div className="container-lg w-100 p-3 borderStyle mb-5">
          <div className="row mx-1 gs-row">
            <Link to="/globalscape/eventmanagement">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(1)}>
                  Event Management
                </span>
              </div>
            </Link>
            <Link to="/globalscape/delegatepriviledgestosso">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(2)}>
                  Delegate Priviledges To SSO
                </span>
              </div>
            </Link>
            <Link to="/globalscape/revokesso">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(3)}>
                  Revoke SSO
                </span>
              </div>
            </Link>
          </div>
          <div className="row mx-1 gs-row">
            <Link to="/globalscape/enableaccount">
              <div className="Card gs-card">
                <span className="titles">Enable Account</span>
              </div>
            </Link>

            <Link to="/globalscape/modifyeventfornsg">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(5)}>
                  Modify Event For NSG
                </span>
              </div>
            </Link>
            <Link to="/globalscape/removeip">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(6)}>
                  Remove IP From Ban List
                </span>
              </div>
            </Link>
            <Link to="/globalscape/assigngroup">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(7)}>
                  Assign Group
                </span>
              </div>
            </Link>
            <Link to="/globalscape/disableaccount">
              <div className="Card gs-card">
                <span className="titles" onClick={() => setCurrentStep(8)}>
                  Disable Account
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
      {currentStep === 1 && <EventList />}
      {currentStep === 2 && <DelegatePriToSso />}
      {currentStep === 3 && <RevokeSso />}
      {currentStep === 4 && <EnableAccount />}
      {currentStep === 5 && <ModifyEventNsg />}
      {currentStep === 6 && <RemoveIP />}
      {currentStep === 7 && <AssignGroup />}
      {currentStep === 8 && <DisableAccount />}
    </Fragment>
  );
};