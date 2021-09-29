import React, { Fragment, useState, useEffect } from "react";
import LaunchIcon from "@material-ui/icons/Launch";
import moment from "moment";
import { useStoreState, useStoreActions } from "easy-peasy";

import { CustomCarousel } from "../../components/CustomCarousel.js";
import PopUpModal from "../../components/PopUpModal";

import Icon_Snow from "../../assets/images/Icon-Snow.png";
import Icon_Dive from "../../assets/images/Icon-Dive.svg";

export const Dive = ({ persona, clickEvent, setPersonaHandler }) => {
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [modalName, setModalName] = useState("");
  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);

  const showPopUpModal2 = (clickValue) => {
    setShowPopUpModal(clickValue.show);
    setModalName(clickValue.buttonName);
  };

  const serviceCardInitialState = [
    {
      serviceName: "GE POWER PMx E2E",
      style: {
        display: "block",
      },
      from: "/dive",
      onClick: {
        pageName: "GE Power PMx E2E",
        headerText: "GE POWER PMx E2E",
      },
      img: {
        src: Icon_Dive,
        alt: "Dive-Icon",
        style: { width: "60%" },
      },
      serviceInfo: {
        "Data Ingestion": "Healthy $status",
        "User Management": `${21} active users out of ${200}`,
        "Number of Flows": 22,
      },
      displayPermissions: {
        displayCard: true,
      },
      buttons: {
        displayButtons: false,
        buttonInfo: [
          {
            buttonName: "Open",
            type: "external",
            onClick: {
              url: "#",
            },
          },
          {
            buttonName: "Users",
            type: "popup",
            onClick: {
              showPopUpModal: () => showPopUpModal2,
            },
          },
          {
            buttonName: "APIs",
            type: "popup",
            onClick: {
              showPopUpModal: () => showPopUpModal2,
            },
          },
          {
            buttonName: "Dashboard",
            type: "internal",
            path: "/threadconnect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "Remove",
            type: "internal",
            path: "/threadconnect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "dots",
            onClick: "",
          },
        ],
      },
    },
    {
      serviceName: "GE CORPORATE",
      style: {
        display: "block",
      },
      from: "/threadconnect",
      onClick: {
        pageName: "GE CORPORATE",
        headerText: "GE CORPORATE",
      },
      img: {
        src: Icon_Dive,
        alt: "Dive-Icon",
        style: { width: "60%" },
      },
      serviceInfo: {
        "Data Ingestion": "Healthy $status",
        "User Management": `${9} active users out of ${25}`,
        "Number of Flows": 52,
      },
      displayPermissions: {
        displayCard: true,
      },
      buttons: {
        displayButtons: false,
        buttonInfo: [
          {
            buttonName: "Open",
            type: "external",
            onClick: {
              url: "#",
            },
          },
          {
            buttonName: "Users",
            type: "popup",
            onClick: {
              showPopUpModal: () => showPopUpModal2,
            },
          },
          {
            buttonName: "APIs",
            type: "popup",
            onClick: {
              showPopUpModal: () => showPopUpModal2,
            },
          },
          {
            buttonName: "Dashboard",
            type: "internal",
            path: "/tcdashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "Remove",
            type: "internal",
            path: "/tcdashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "dots",
            onClick: "",
          },
        ],
      },
    },
  ];

  const [serviceCardDisplay, setServiceCardDisplay] = useState([]);
  const [firstTimeLoad, setFirstTimeLoad] = useState([]);

  const [serviceCards, setServiceCards] = useState(serviceCardInitialState);

  // componentDidMount
  useEffect(() => {
    setPageTitle("MY DIVE SERVICE");
    /* var serviceNames = [];
    serviceCards.forEach((service) => {
      serviceNames.push(service.serviceName);
    });
    setPersonaHandler(serviceNames); */

    let serviceArray = Object.assign([], serviceCards);
    let tempArr = [];
    let modeRan = serviceArray.length / 3;
    let arrMode =
      serviceArray.length <= 3
        ? serviceArray.length == 3
          ? Math.floor(modeRan) - 1
          : Math.floor(modeRan)
        : Math.ceil(modeRan) - 1;
    for (var i = 0; i <= arrMode; i++) {
      tempArr[i] = [];
      for (var j = 0; j < 3; j++) {
        if (serviceArray.length > 0) {
          tempArr[i].push(serviceArray[0]);
          serviceArray.splice(0, 1);
        }
      }
    }
    setTimeout(() => {
      setServiceCardDisplay(tempArr);
      setFirstTimeLoad(tempArr);
    }, 100);
  }, []);

  useEffect(() => {
    let updateServiceCards = Object.assign([], serviceCards);
    let tempCard = [[]];
    updateServiceCards.forEach((service, index) => {
      if (persona == service.serviceName) {
        tempCard[0].push(service);
      }
    });
    if (persona == "GLOBAL") {
      setServiceCardDisplay(firstTimeLoad);
    } else {
      setServiceCardDisplay(tempCard);
    }
  }, [persona]);

  return (
    <Fragment>
      <div
        className="container-lg w-100 p-3 borderStyle mb-3"
        id="carousel-container"
      >
        <div className="text-center titles mb-3">MY SUBSCRIPTIONS</div>
        <CustomCarousel
          serviceCardDisplay={serviceCardDisplay}
          clickEvent={clickEvent}
        />
        <PopUpModal
          showModal={showPopUpModal}
          onClose={() => showPopUpModal2}
          modalName={modalName}
        />
      </div>
      <div className="container-lg w-100 p-3 borderStyle ">
        <div className="row mx-1">
          <div className="col service-tile-content m-1 borderStyle p-2 titles">
            <div className="text-center titles mb-1">DIVE HEALTH</div>
            <div className="row p-1 m-1">
              <div className="col m-1 text-center service-tile-content">
                Dashboard: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Admin Console: <span className="redDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Customer: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
            </div>
            <div className="row p-1 m-1">
              <div className="col m-1 text-center service-tile-content">
                Elasticsearch: <span className="yellowDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                TRF: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Product TC: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
