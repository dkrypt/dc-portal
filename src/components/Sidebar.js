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
import Icon_Github from "../assets/images/Icon-Github.svg";
import Icon_Yammer from "../assets/images/Icon-Yammer.svg";
import Icon_Confluence from "../assets/images/Icon-Confluence.svg";

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
      <div className="sidebar-heading px-3 py-2">
        <div className="d-flex flex-row px-3 py-2">
          <div className="col-3 p-0">
            <Link to="/">
              <img className="img-fluid GE-Logo" alt="" src={Logo_GE} />
            </Link>
          </div>
          <div className="col-9 px-0 pt-1">
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
            DASHBOARD
          </Link>
        </span>
        <span className="sidebarMenu">
          <a
            target="_blank"
            href="https://dc-wordpress-ci.digitalconnect.apps.ge.com/"
            className="list-group-item list-group-item-action"
          >
            <img className="img-fluid" alt="" src={Icon_Products} />
            PRODUCTS & SERVICES
          </a>
        </span>
        {persona === "OWNER" ? (
          <span className="sidebarMenu dropright">
          <Link
            className="list-group-item list-group-item-action dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-expanded="false"
          >
             <img className="img-fluid" alt="" src={Icon_Subscriptions} />
              MANAGE
          </Link>
          <div className="dropdown-menu dropdown-content">
            <Link className="dropdown-item" to="/manage/managesubscription">SUBSCRIPTION</Link>
            <Link className="dropdown-item " to="/manage/manageuser">USER</Link>
            <Link className="dropdown-item" to="/manage/managetc">THREAD CONNECT</Link>
            <Link className="dropdown-item" to="/manage/manage_ec">ENTERPRISE CONNECT</Link>
            <Link className="dropdown-item" >DIVE</Link>
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
              MANAGE
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
            ANNOUNCEMENTS & EVENTS
          </Link>
        </span>
        <span className="sidebarMenu dropright">
          <Link
            className="list-group-item list-group-item-action dropdown-toggle"
            to="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <img className="img-fluid" alt="" src={Icon_Engagement_Requests} />
            ENGAGEMENT REQUESTS
          </Link>
          <div className="dropdown-menu dropdown-content">
            <Link className="dropdown-item" to="/new-engagement-request">NEW ENGAGEMENT REQUEST</Link>
            <Link className="dropdown-item " to="/new-engagement-request">ENHANCEMENT REQUEST</Link>
            <Link className="dropdown-item" to="/new-engagement-request">OPTIONAL</Link>
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
            SUPPORT
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
            PREFERENCES
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
              ADMINISTRATION
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="col-3 footer">
        <div className="social-media text-center page-footer">
          <div className="social-tag text-muted">Socialize With Us</div>
          <img alt="" className="img-fluid px-2" src={Icon_Github} />
          <img alt="" className="img-fluid px-2" src={Icon_Yammer} />
          <img alt="" className="img-fluid px-2" src={Icon_Confluence} />
        </div>
        <div className="footer-copyright text-center text-muted mt-2">
          © 2021 GENERAL ELECTRIC
        </div>
      </div>
    </div>
  );
}
