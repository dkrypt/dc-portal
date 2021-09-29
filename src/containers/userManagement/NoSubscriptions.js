import React, { Fragment, useEffect, useState } from "react";
import { div } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./UserManagement.css";

export default function NoSubscriptions(props) {
  useEffect(() => {
    props.clickEvent({
      pageName: "Dashboard",
      headerText: "DASHBOARD",
      subHeaderText: props.persona,
    });
    // props.changeUsername("Prasad Alokam");
  }, []);

  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle mb-4 main-dashboard">
        {/* <div className="text-center titles mb-3">MY SERVICES</div> */}
        <div className="alerts text-center">
          {/* <div className="text-success my-1">You have org: #ORGNAME and space: #SPACENAME</div> */}
          <div className="text-danger my-1">
            It looks like you do not have any active subscription and/ or are
            missing access to resources.
            <br />
            Please click the <a href="/">Request Access</a> button below if you
            need access to an existing subscription/ resource.
            <br />
            If you want to create a new subscription, please click on the{" "}
            <a href="/manage/manage-subscription">Request Subscription</a> button
          </div>
          {/* <div className="text-danger my-1">You do not have access to resources!</div> */}
        </div>
        <div className="row p-3 text-center no-subscription">
          <Link
            className="col p-5 m-2 borderStyle btn btn-dark disabled"
            to="#"
          >
            <b className="text-white no-subscription">Create Org and Space</b>
          </Link>
          <Link className="col p-5 m-2 borderStyle btn btn-primary" to="/manage/manage-subscription">
            <b className="text-white no-subscription">Request Subscription</b>
          </Link>
          <Link className="col p-5 m-2 borderStyle btn btn-primary" to="#">
            <b className="text-white no-subscription">Request Access</b>
          </Link>
        </div>
        <div className="need-help text-center">
          <div className="text-dark">
            Still having trouble? Reach out to <a href="">@GE Space Support</a>{" "}
            should you face any issues.
          </div>
        </div>
      </div>
    </Fragment>
  );
}
