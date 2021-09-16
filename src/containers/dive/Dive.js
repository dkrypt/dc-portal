import React, { Fragment, useState, useEffect } from "react";
import LaunchIcon from "@material-ui/icons/Launch";
import moment from "moment";

import {Carousal as CarouselItem} from "../../components/Carousal.js";
import PopUpModal from "../../components/PopUpModal";

import Icon_Snow from "../../assets/images/Icon-Snow.png";
import Icon_Dive from "../../assets/images/Icon-Dive.svg";

export const Dive = ({persona, clickEvent, setPersonaHandler}) => {
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [serviceCardDisplay, setServiceCardDisplay] = useState([]);
  const [firstTimeLoad, setFirstTimeLoad] = useState([]);
  const [showPopUpModal, setShowPopUpModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [serviceCards, setServiceCards] = useState([]);
  
  // componentDidMount
  useEffect(() => {
    clickEvent({
      pageName: "Dive",
      headerText: "MY DIVE SERVICE",
      subHeaderText: "GLOBAL",
    })
    var serviceNames = [];
    // var serviceNames = serviceCards.map(service => service.serviceName);
    serviceCards.forEach((service) => {
      serviceNames.push(service.serviceName);
    });
    setPersonaHandler(serviceNames);
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

  const showPopUpModal2 = (clickValue) => {
    setShowPopUpModal(clickValue.show);
    setModalName(clickValue.buttonName);
  }
  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle mb-3">
        <div className="row mx-1">
          <div className="col service-tile-content m-1 borderStyle p-2 titles">
          <div className="text-center titles mb-1">DIVE HEALTH</div>
            <div className="row p-1 m-1">
              <div className="col m-1 text-center service-tile-content">
                Dashboard: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Admin Console: <span className="redDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Customer: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
            </div>
            <div className="row p-1 m-1">
              <div className="col m-1 text-center service-tile-content">
                Elasticsearch: <span className="yellowDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                TRF: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
              <div className="col m-1 text-center service-tile-content">
                Product TC: <span className="greenDot"></span>
                <a href="#">
                  <LaunchIcon className="m-1" />
                </a>
                <a href="#">
                  <img
                    className="img-fluid m-1"
                    src={Icon_Snow}
                    alt="Open-Icon"
                    style={{ width: "10%" }}
                  />
                </a>
              </div>
            </div>              
        </div>
      </div>          
      </div>
      <div
        className="container-lg w-100 p-3 borderStyle"
        id="carousel-container"
      >
        <div className="text-center titles mb-3">DIVE ORG</div>
        <CarouselItem
          serviceCardDisplay={serviceCardDisplay}
          clickEvent={clickEvent}
        />
        <PopUpModal
          showModal={showPopUpModal}
          onClose={showPopUpModal2}
          modalName={modalName}
        />
      </div>
    </Fragment>
  );
};
