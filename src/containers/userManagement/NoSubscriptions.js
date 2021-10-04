import React, { Fragment, useEffect, useState } from "react";
import { div } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

import "./UserManagement.css";

export default function NoSubscriptions(props) {
  const setPageTitle = useStoreActions(actions=>actions.setPageTitle)
  useEffect(() => {
    /* props.clickEvent({
      pageName: "Dashboard",
      headerText: "DASHBOARD",
      subHeaderText: props.persona,
    }); */
    setPageTitle("DASHBOARD")
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
            Please click the <a href="/">Request Access</a> below if you
            need access to an existing subscription/ resource.
            <br />
            If you want to create a new subscription or update subscriptions under an existing org-space, please click on the{" "}
            <a href="/manage/manage-subscription">Request Subscription</a>
          </div>
          {/* <div className="text-danger my-1">You do not have access to resources!</div> */}
        </div>
        <div className="row p-3 text-center no-subscription">
          {/* <Link
            className="col m-2 borderStyle user-buttons btn btn-dark"
            to="#"
          >
          <div className="button-text">
            <b className="text-white">Create Org and Space</b>
            <div className="info">
              <small>Info about COS</small>
            </div>
            </div>
          </Link> */}
          <Link className="col m-2 user-buttons borderStyle btn btn-primary" to="/manage/manage-subscription">
          <div className="button-text">
            <b className="text-white">Request Subscription</b>
            <div className="info">
              <small>Info about Request Subscription</small>
            </div>
            </div>
          </Link>
          <Link className="col m-2 user-buttons borderStyle btn btn-primary" to="#">
          <div className="button-text">
          <b className="text-white">Request Access</b>
          <div className="info">
              <small>Info about Request Access</small>
            </div>
            </div>
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
