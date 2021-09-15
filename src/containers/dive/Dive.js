import React, { Fragment } from "react";
import LaunchIcon from "@material-ui/icons/Launch";
import moment from "moment";

import CustomCarousel from "../../components/Carousal.js";
import PopUpModal from "../../components/PopUpModal";

import Icon_Snow from "../../assets/images/Icon-Snow.png";
import Icon_Dive from "../../assets/images/Icon-Dive.svg";

export default class Dive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("DD-MM-YYYY"),
      month: moment().format("MMMM"),
      serviceCardDisplay: [],
      firstTimeLoad: [],
      showPopUpModal: false,
      modalName: "",
      serviceCards: [
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
            style: {width: "60%"},
          },
          serviceInfo: {
            "Data Ingestion": "Healthy $status",
            "User Management": `${21} active users out of ${200} $open`,
            "Number of Flows": 22,
            "Open Incidents": "$snowimg",
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
                  showPopUpModal: this.showPopUpModal.bind(this),
                },
              },
              {
                buttonName: "APIs",
                type: "popup",
                onClick: {
                  showPopUpModal: this.showPopUpModal.bind(this),
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
            style: {width: "60%"},
          },
          serviceInfo: {
            "Data Ingestion": "Healthy $status",
            "User Management": `${9} active users out of ${25} $open`,
            "Number of Flows": 52,
            "Open Incidents": "$snowimg",
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
                  showPopUpModal: this.showPopUpModal.bind(this),
                },
              },
              {
                buttonName: "APIs",
                type: "popup",
                onClick: {
                  showPopUpModal: this.showPopUpModal.bind(this),
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
      ]
    };
  }

  componentDidMount() {

    this.props.clickEvent({
      pageName: "Dive",
      headerText: "MY DIVE SERVICE",
      subHeaderText: "GLOBAL",
    })

    var serviceNames = [];
    this.state.serviceCards.forEach((service) => {
      serviceNames.push(service.serviceName);
    });
    this.props.setPersonaHandler(serviceNames);

    let serviceArray = Object.assign([], this.state.serviceCards);
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
      this.setState({
        serviceCardDisplay: tempArr,
        firstTimeLoad: tempArr,
      });
      
    }, 100);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.persona != this.props.persona) {
      let updateServiceCards = Object.assign([], this.state.serviceCards);
      let tempCard = [[]];
      updateServiceCards.forEach((service, index) => {
        if (this.props.persona == service.serviceName) {
          tempCard[0].push(service);
        }
      });
      if (this.props.persona == "GLOBAL") {
        this.setState({
          serviceCardDisplay: this.state.firstTimeLoad,
        });
      } else {
        this.setState({
          serviceCardDisplay: tempCard,
        });
      }

    }
  }

  showPopUpModal(clickValue) {
    this.setState({
      showPopUpModal: clickValue.show,
      modalName: clickValue.buttonName,
    });
  }


  render() {
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
          <CustomCarousel
            serviceCardDisplay={this.state.serviceCardDisplay}
            clickEvent={this.props.clickEvent}
          />
          <PopUpModal
            showModal={this.state.showPopUpModal}
            onClose={this.showPopUpModal.bind(this)}
            modalName={this.state.modalName}
          />
        </div>
      </Fragment>
    );
  }
}
