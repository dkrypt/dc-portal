import React, { Fragment, useEffect, useState } from "react";

import "./ThreadConnect.css";

import {CustomCarousel} from "../../components/CustomCarousel.js";
import PopUpModal from "../../components/PopUpModal";

import Icon_TC from "../../assets/images/Icon-TC.png";

export const ThreadConnect = (props) => {
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [modalName, setModalName] = useState("");

  const displayPopUpModal = (clickValue) => {
    setShowPopUpModal(clickValue.show);
    if (clickValue.buttonName) {
      setModalName(clickValue.buttonName);
    }
  };

  const serviceCardsInitailState = [
    {
      serviceName: "IBS",
      from: "/thread-connect",
      onClick: {
        pageName: "IBS",
        headerText: "IBS",
      },
      serviceInfo: {
        Status: "Healthy",
        "Connector Count for $month": 5,
        "Transaction Count for $date": 1250,
        "TC Release": "1.11.4.3.2.41",
      },
      buttons: {
        displayButtons: true,
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
              displayPopUpModal,
            },
          },
          {
            buttonName: "APIs",
            type: "popup",
            onClick: {
              displayPopUpModal,
            },
          },
          {
            buttonName: "Dashboard",
            type: "internal",
            path: "/thread-connect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "Remove",
            type: "internal",
            path: "/thread-connect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "dots",
            onClick: {
              displayPopUpModal,
            },
          },
        ],
      },
    },
    {
      serviceName: "GPAS-Lite",
      from: "/thread-connect",
      onClick: {
        pageName: "GPAS-Lite",
        headerText: "GPAS-LITE",
      },
      serviceInfo: {
        Status: "Restarting",
        "Connector Count for $month": 8,
        "Transaction Count for $date": 2250,
        "TC Release": "1.11.4.3.2.41",
      },
      buttons: {
        displayButtons: true,
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
              displayPopUpModal,
            },
          },
          {
            buttonName: "APIs",
            type: "popup",
            onClick: {
              displayPopUpModal,
            },
          },
          {
            buttonName: "Dashboard",
            type: "internal",
            path: "/thread-connect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "Remove",
            type: "internal",
            path: "/thread-connect/dashboard",
            onClick: {
              pageName: "TCDashboard",
              headerText: "",
            },
          },
          {
            buttonName: "dots",
            onClick: {
              displayPopUpModal,
            },
          },
        ],
      },
    },
  ];

  const [serviceCards, setServiceCards] = useState(serviceCardsInitailState);
  const [serviceCardDisplay, setServiceCardDisplay] = useState([]);
  const [firstTimeLoad, setFirstTimeLoad] = useState([]);

  const callFirstTimeLoad = () => {
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
    return tempArr;
  };
  useEffect(() => {
    props.clickEvent({
      pageName: "ThreadConnect",
      headerText: "MY THREAD CONNECT SERVICE",
      subHeaderText: props.persona,
    });

    /*  var serviceNames = [];
    serviceCards.forEach((service) => {
      serviceNames.push(service.serviceName);
    });

    props.setPersonaHandler(serviceNames); */

    if (props.persona === "GLOBAL") {
      callFirstTimeLoad();
    } else {
      let updateServiceCards = Object.assign([], serviceCards);
      let tempCard = [[]];
      updateServiceCards.forEach((service, index) => {
        if (props.persona == service.serviceName) {
          tempCard[0].push(service);
        }
      });
      setServiceCardDisplay(tempCard);
    }
  }, []);

  useEffect(() => {
    if (props.persona === "GLOBAL") {
      callFirstTimeLoad();
    } else {
      let updateServiceCards = Object.assign([], serviceCards);
      let tempCard = [[]];
      updateServiceCards.forEach((service, index) => {
        if (props.persona == service.serviceName) {
          tempCard[0].push(service);
        }
      });
      setServiceCardDisplay(tempCard);
    }
  }, [props.persona]);

  return (
    <Fragment>
      <div
        className="container-lg w-100 p-3 borderStyle mb-3"
        id="carousel-container"
      >
        <div className="text-center titles mb-3">MY SUBSCRIPTIONS</div>
        <CustomCarousel
          serviceCardDisplay={serviceCardDisplay}
          clickEvent={props.clickEvent}
        />
        <PopUpModal
          showModal={showPopUpModal}
          onClose={displayPopUpModal}
          modalName={modalName}
        />
      </div>
    </Fragment>
  );
};
