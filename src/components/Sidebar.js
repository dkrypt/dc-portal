import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo_GE from "../assets/images/Logo-GE1.svg";
import Icon_Products from "../assets/images/Icon-Products.svg";
import Icon_Dashboard from "../assets/images/Icon-Dashboard.svg";
import Icon_Subscriptions from "../assets/images/Icon-Subscriptions.svg";
import Icon_Announcements from "../assets/images/Icon-Announcements-Events.svg";
import Icon_Engagement_Requests from "../assets/images/Icon-Engagement-Requests.svg";
import Icon_Support from "../assets/images/Icon-Support.svg";
import Icon_Settings from "../assets/images/Icon-Settings.svg";
import Icon_Administration from "../assets/images/Icon-Administration.svg";
import { Footer } from "./Footer";

export default function Sidebar(props) {
  const [userName, setUserName] = useState("Steve Rogers");
  const [unit, setUnit] = useState("GE Corporate");
  const [persona, setPersona] = useState("OWNER");
  const [togglePersona, setTogglePersona] = useState(false);

  const handleTogglePersona = (selectedPersona) => {
    setPersona(selectedPersona);
  };

  useEffect(() => {
    console.log("displayUsername: ", props.displayUsername);
    setUserName(props.displayUsername);
  }, [props.displayUsername]);

  return (
    <div className="col-3 p-0" id="sidebar-wrapper">
      <div className="sidebar-heading px-5">
        <div className="d-flex flex-row px-3">
          <div className="col-3 p-0 ge-logo-col">
            <Link to="/">
              <img className="img-fluid GE-Logo" alt="" src={Logo_GE} />
            </Link>
          </div>
          <div className="col-9 px-0">
            <div className="text-center GE-header">
              <Link to="/">
                <b>DIGITAL CONNECT</b>
              </Link>
            </div>
            <div className="border-bottom mx-3"></div>
            <div className="text-center user-details pt-1">
              <span className="user-name">
                <b>{userName}</b>
              </span>
              <span className="detail-divider mx-1">|</span>
              <span className="department">
                <b>{unit}</b>
              </span>
              {togglePersona ? (
                <div className="toggle-persona">
                  <a
                    className="dropdown-toggle"
                    href="#"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <b>{persona}</b>
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleTogglePersona("OWNER")}
                    >
                      OWNER
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleTogglePersona("VIEWER")}
                    >
                      VIEWER
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="list-group list-group-flush p-0 mt-2">
        <span className="sidebarMenu">
          <Link className="list-group-item list-group-item-action" to="/">
            <img className="img-fluid" alt="" src={Icon_Dashboard} />
            <span>DASHBOARD</span>
          </Link>
        </span>
        <span className="sidebarMenu">
          <a
            target="_blank"
            href="https://dc-wordpress-ci.digitalconnect.apps.ge.com/"
            className="list-group-item list-group-item-action"
          >
            <img className="img-fluid" alt="" src={Icon_Products} />
            <span>PRODUCTS & SERVICES</span>
          </a>
        </span>
        {persona === "OWNER" ? (
          <span className="sidebarMenu dropright">
            <Link
              className="list-group-item list-group-item-action dropdown-toggle"
              to="/manage"
              role="button"
              id="dropdownMenuLink"
              // data-toggle="dropdown"
              aria-expanded="false"
            >
              <img className="img-fluid" alt="" src={Icon_Subscriptions} />
              <span>MANAGE</span>
            </Link>
            <div className="dropdown-menu dropdown-content">
              <Link className="dropdown-item" to="/manage/manage-subscription">
                SUBSCRIPTION
              </Link>
              <Link className="dropdown-item " to="/manage/manage-user">
                USER
              </Link>
              <Link className="dropdown-item" to="/manage/manage-tc">
                THREAD CONNECT
              </Link>
              <Link className="dropdown-item" to="/manage/manage-ec">
                ENTERPRISE CONNECT
              </Link>
              <Link className="dropdown-item">DIVE</Link>
            </div>
            {/* <Link
              className="list-group-item list-group-item-action"
              to="/manage"
              onClick={() =>
                props.clickEvent({
                  pageName: "Manage",
                  headerText: "MANAGE",
                  subHeaderText: "GLOBAL",
                })
              }
            >
              <img className="img-fluid" alt="" src={Icon_Subscriptions} />
              <span>MANAGE</span>
            </Link> */}
          </span>
        ) : (
          ""
        )}
        <span className="sidebarMenu">
          <Link
            className="list-group-item list-group-item-action"
            to="/announcements-events"
            onClick={() =>
              props.clickEvent({
                pageName: "AnnouncementsAndEvents",
                headerText: "ANNOUNCEMENTS & EVENTS",
                subHeaderText: "GLOBAL",
              })
            }
          >
            <img className="img-fluid" alt="" src={Icon_Announcements} />
            <span>ANNOUNCEMENTS & EVENTS</span>
          </Link>
        </span>
        <span className="sidebarMenu dropright">
          <Link
            className="list-group-item list-group-item-action dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            // data-toggle="dropdown"
            aria-expanded="false"
          >
            <img className="img-fluid" alt="" src={Icon_Engagement_Requests} />
            <span>ENGAGEMENT REQUESTS</span>
          </Link>
          <div className="dropdown-menu dropdown-content">
            <Link className="dropdown-item" to="/new-engagement-request">
              NEW ENGAGEMENT REQUEST
            </Link>
            <Link className="dropdown-item " to="/new-engagement-request">
              ENHANCEMENT REQUEST
            </Link>
            <Link className="dropdown-item" to="/new-engagement-request">
              OPTIONAL
            </Link>
          </div>
        </span>
        <span className="sidebarMenu">
          <Link
            className="list-group-item list-group-item-action"
            to="/support"
            onClick={() =>
              props.clickEvent({
                pageName: "Support",
                headerText: "SUPPORT",
                subHeaderText: "GLOBAL",
              })
            }
          >
            <img className="img-fluid" alt="" src={Icon_Support} />
            <span>SUPPORT</span>
          </Link>
        </span>
        <span className="sidebarMenu">
          <Link
            className="list-group-item list-group-item-action"
            to="/preferences"
            onClick={() =>
              props.clickEvent({
                pageName: "Preferences",
                headerText: "PREFERENCES",
                subHeaderText: "GLOBAL",
              })
            }
          >
            <img className="img-fluid" alt="" src={Icon_Settings} />
            <span>PREFERENCES</span>
          </Link>
        </span>
        {persona === "OWNER" ? (
          <span className="sidebarMenu">
            <Link
              className="list-group-item list-group-item-action"
              to="/administration"
              onClick={() =>
                props.clickEvent({
                  pageName: "Administration",
                  headerText: "ADMINISTRATION",
                  subHeaderText: "GLOBAL",
                })
              }
            >
              <img className="img-fluid" alt="" src={Icon_Administration} />
              <span>ADMINISTRATION</span>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </div>
  );
}
