import React, { Fragment } from "react";
import EventList from "./eventManagement/EventList.js";
import DelegatePriToSso from "./DelegatePriToSso.js";
import RevokeSso from "./RevokeSso.js";
import EnableAccount from "./EnableAccount.js";
import ModifyEventNsg from "./ModifyEventNsg.js";
import RemoveIP from "./RemoveIP.js";
import AssignGroup from "./AssignGroup.js";
import DisableAccount from "./DisableAccount.js";
import { Link } from "react-router-dom";
import "./GlobalScape.css"

export default class GlobalScape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  updateStep(step) {
    this.setState({ currentStep: step });
  }

  render() {
    return (
      <Fragment>
        {this.state.currentStep === 0 && (
          <div className="container-lg w-100 p-3 borderStyle mb-5">
            <div className="row mx-1 gs-row">
              <Link to="/globalscape/eventmanagement">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(1)}>
                    Event Management
                  </span>
                </div>
              </Link>
              <Link to="/globalscape/delegatepriviledgestosso">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(2)}>
                    Delegate Priviledges To SSO
                  </span>
                </div>
              </Link>
              <Link to="/globalscape/revokesso">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(3)}>
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
                  <span className="titles" onClick={() => this.updateStep(5)}>
                    Modify Event For NSG
                  </span>
                </div>
              </Link>
              <Link to="/globalscape/removeip">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(6)}>
                    Remove IP From Ban List
                  </span>
                </div>
              </Link>
              <Link to="/globalscape/assigngroup">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(7)}>
                    Assign Group
                  </span>
                </div>
              </Link>
              <Link to="/globalscape/disableaccount">
                <div className="Card gs-card">
                  <span className="titles" onClick={() => this.updateStep(8)}>
                    Disable Account
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
        {this.state.currentStep === 1 && <EventList />}
        {this.state.currentStep === 2 && <DelegatePriToSso />}
        {this.state.currentStep === 3 && <RevokeSso />}
        {this.state.currentStep === 4 && <EnableAccount />}
        {this.state.currentStep === 5 && <ModifyEventNsg />}
        {this.state.currentStep === 6 && <RemoveIP />}
        {this.state.currentStep === 7 && <AssignGroup />}
        {this.state.currentStep === 8 && <DisableAccount />}
      </Fragment>
    );
  }
}
