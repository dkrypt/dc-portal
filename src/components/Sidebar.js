import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';

import { SidebarMenuItem } from "./SidebarMenuItem";
import { Footer } from "./Footer";

import Logo_GE from "../assets/images/Logo-GE1.svg";
import Icon_Products from "../assets/images/Icon-Products.svg";
import Icon_Dashboard from "../assets/images/Icon-Dashboard.svg";
import Icon_Manage from "../assets/images/Icon-Subscriptions.svg";
import Icon_Announcements from "../assets/images/Icon-Announcements-Events.svg";
import Icon_Engagement_Requests from "../assets/images/Icon-Engagement-Requests.svg";
import Icon_Support from "../assets/images/Icon-Support.svg";
import Icon_Settings from "../assets/images/Icon-Settings.svg";
import Icon_Administration from "../assets/images/Icon-Administration.svg";

export default function Sidebar(props) {
  // const [userName, setUserName] = useState("");
  // const [unit, setUnit] = useState("");
  const [persona, setPersona] = useState("OWNER");
  const [togglePersona, setTogglePersona] = useState(false);
  const userName = useStoreState(state=>state.user.fullName);
  const unit = useStoreState(state=>state.user.organizationalUnit)

  const handleTogglePersona = (selectedPersona) => {
    setPersona(selectedPersona);
  };

  const menuItems = [
    {
      name: "DASHBOARD",
      to: "/",
      targetBlank: false,
      imgSrc: Icon_Dashboard,
      displayItem: true,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
    {
      name: "PRODUCTS & SERVICES",
      to: "https://dc-wordpress-ci.digitalconnect.apps.ge.com",
      targetBlank: true,
      imgSrc: Icon_Products,
      displayItem: true,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
    {
      name: "MANAGE",
      to: "/manage",
      targetBlank: false,
      imgSrc: Icon_Manage,
      displayItem: persona === "OWNER" ? true : false,
      hasSubMenu: true,
      subMenuItems: [
        {
          name: "SUBSCRIPTIONS",
          to: "/manage/manage-subscription",
          targetBlank: false,
        },
        {
          name: "USERS",
          to: "/manage/manage-user",
          targetBlank: false,
        },
        {
          name: "THREAD CONNECT",
          to: "/manage/manage-tc",
          targetBlank: false,
        },
        {
          name: "ENTERPRISE CONNECT",
          to: "/manage/manage-ec",
          targetBlank: false,
        },
        {
          name: "DIVE",
          to: "/",
          targetBlank: false,
        },
      ],
    },
    {
      name: "ANNOUNCEMENTS & EVENTS",
      to: "/",
      targetBlank: false,
      imgSrc: Icon_Announcements,
      displayItem: true,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
    {
      name: "ENGAGEMENT REQUESTS",
      to: "#",
      targetBlank: false,
      imgSrc: Icon_Engagement_Requests,
      displayItem: true,
      hasSubMenu: true,
      subMenuItems: [
        {
          name: "NEW ENGAGEMENT REQUEST",
          to: "/new-engagement-request",
          targetBlank: false,
        },
      ],
    },
    {
      name: "SUPPORT",
      to: "/support",
      targetBlank: false,
      imgSrc: Icon_Support,
      displayItem: true,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
    {
      name: "PREFERENCES",
      to: "/",
      targetBlank: false,
      imgSrc: Icon_Settings,
      displayItem: true,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
    {
      name: "ADMINISTRATION",
      to: "/",
      targetBlank: false,
      imgSrc: Icon_Administration,
      displayItem: persona === "OWNER" ? true : false,
      hasSubMenu: false,
      subMenuItems: [
        {
          name: "",
          to: "",
        },
      ],
    },
  ];

/*   useEffect(() => {
    let { fullName, organizationalUnit } = props.userInfo;
    setUserName(fullName);
    setUnit(organizationalUnit);
  }, [props.userInfo]); */

  return (
    <div className="col-3 p-0" id="sidebar-wrapper">
      <div className="sidebar-heading pl-5 pr-4">
        <div className="d-flex flex-row">
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
      <SidebarMenuItem menuItems={menuItems} />
      <Footer />
    </div>
  );
}
