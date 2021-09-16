import React, { Fragment, useEffect, useState } from "react";

import "./UserManagement.css";

export default function NoSubscriptions(props) {
  useEffect(() => {
    props.clickEvent({
      pageName: "Dashboard",
      headerText: "DASHBOARD",
      subHeaderText: props.persona,
    });
    props.changeUsername("Prasad Alokam");
  }, []);

  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle mb-4 main-dashboard">
        <div className="text-center titles mb-3">MY SERVICES</div>
        <div className="p-3 text-center text-danger no-subscription">
          You have no subscriptions on Digital Connect Self Service Portal,
          Please <a href="/">click here</a> to subscribe.
        </div>
      </div>
      <div className="container-lg w-100 p-3 borderStyle">
        <div className="text-center mb-2">
          <div className="titles">PLANNED OUTAGES</div>
          <div className="d-flex flex-column service-details">
            <div className="text-center para-text my-2">
              March 22, 2021 (04:00 To 05:00 EST) Thread Connect Corporate
              Production will undergo monthly patching activity
            </div>
            <div className="text-center para-text my-2">
              April 8, 2021 (02:00 To 04:00 EST) Enterprise Connect Gateways
              will not be reachable due to planned maintenance activity
            </div>
          </div>
          <div className="border-bottom border-grey border-1 mx-1"></div>
        </div>
        <div className="text-center mb-2">
          <div className="titles">IMPORTANT ANNOUNCEMENTS</div>
          <div className="d-flex flex-column service-details">
            <div className="text-center para-text my-2">
              GE Healthcare Unveils Vscan Air, a New Intuitive, Wireless
              Handheld Ultrasound
            </div>
            <div className="text-center para-text my-2">
              GE Renewable Energy to supply DC-Coupled system to Convergent forx
              123 MWh hybrid solar plus storage project in Upstatek
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
