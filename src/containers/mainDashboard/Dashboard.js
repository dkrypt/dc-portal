import React, { Fragment } from "react";

import CustomCarousel from "../../components/Carousal.js";

import Icon_TC from "../../assets/images/Icon-TC.png";
import Icon_EC from "../../assets/images/Icon-EC.svg";
import Icon_Dive from "../../assets/images/Icon-Dive.svg";
import Icon_Globalscape from "../../assets/images/Icon-Globalscape.svg";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCardDisplay: [],
      firstTimeLoad: [],
      serviceCards: [
        {
          serviceName: "THREAD CONNECT",
          style: {
            display: "block",
          },
          from:"",
          onClick: {
            pageName: "ThreadConnect",
            headerText: "MY THREAD CONNECT SERVICE",
          },
          img: {
            src: Icon_TC,
            alt: "TC-Icon",
            style: { width: "87%" },
          },
          serviceInfo: {
            "Subscription Count": 2,
          },
          displayPermissions: {
            displayCard: true,
          },
          buttons: {
            displayButtons: false,
            buttonInfo: [
              {
                buttonName: "Open",
                onClick: "",
              },
              {
                buttonName: "Users",
                onClick: "",
              },
              {
                buttonName: "Api's",
                onClick: "",
              },
              {
                buttonName: "Dashboard",
                onClick: "",
              },
              {
                buttonName: "Remove",
                onClick: "",
              },
              {
                buttonName: "dots",
                onClick: "",
              },
            ],
          },
        },
        {
          serviceName: "ENTERPRISE CONNECT",
          style: {
            display: "block",
          },
          from:"",
          onClick: {
            pageName: "EnterpriseConnect",
            headerText: "MY ENTERPRISE CONNECT SERVICE",
          },
          img: {
            src: Icon_EC,
            alt: "EC-Icon",
            style: { width: "75%" },
          },
          serviceInfo: {
            "Subscription Count": 2,
          },
          displayPermissions: {
            displayCard: true,
          },
          buttons: {
            displayButtons: false,
            buttonInfo: [
              {
                buttonName: "Open",
                onClick: "",
              },
              {
                buttonName: "Users",
                onClick: "",
              },
              {
                buttonName: "Api's",
                onClick: "",
              },
              {
                buttonName: "Dashboard",
                onClick: "",
              },
              {
                buttonName: "Remove",
                onClick: "",
              },
              {
                buttonName: "dots",
                onClick: "",
              },
            ],
          },
        },
        {
          serviceName: "DIVE",
          style: {
            display: "block",
          },
          from:"",
          onClick: {
            pageName: "Dive",
            headerText: "MY DIVE SERVICE",
          },
          img: {
            src: Icon_Dive,
            alt: "Dive-Icon",
            style: "",
          },
          serviceInfo: {
            "Number of Orgs": `${9} $open`,
            "Open Incidents": `${2}`,
            "What's New": "$open"
          },
          displayPermissions: {
            displayCard: true,
          },
          buttons: {
            displayButtons: false,
            buttonInfo: [
              {
                buttonName: "Open",
                onClick: "",
              },
              {
                buttonName: "Users",
                onClick: "",
              },
              {
                buttonName: "Api's",
                onClick: "",
              },
              {
                buttonName: "Dashboard",
                onClick: "",
              },
              {
                buttonName: "Remove",
                onClick: "",
              },
              {
                buttonName: "dots",
                onClick: "",
              },
            ],
          },
        },
        {
          serviceName: "GLOBALSCAPE",
          style: {
            display: "block",
          },
          from:"",
          onClick: {
            pageName: "Globalscape",
            headerText: "MY GLOBALSCAPE SERVICE",
          },
          img: {
            src: Icon_Globalscape,
            alt: "Globalscape Fav",
            style: "",
          },
          serviceInfo: {
            "Subscription Count": 1,
          },
          displayPermissions: {
            displayCard: true,
          },
          buttons: {
            displayButtons: false,
            buttonInfo: [
              {
                buttonName: "Open",
                onClick: "",
              },
              {
                buttonName: "Users",
                onClick: "",
              },
              {
                buttonName: "Api's",
                onClick: "",
              },
              {
                buttonName: "Dashboard",
                onClick: "",
              },
              {
                buttonName: "Remove",
                onClick: "",
              },
              {
                buttonName: "dots",
                onClick: "",
              },
            ],
          },
        },
      ],
    };
  }

  componentDidMount() {

    this.props.clickEvent({
      pageName: "Dashboard",
      headerText: "DASHBOARD",
      subHeaderText: "GLOBAL",
    })
    
    var serviceNames = [];
    this.state.serviceCards.forEach((service) => {
      serviceNames.push(service.serviceName)
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

  render() {
    return (
      <Fragment>
        <div className="container-lg w-100 p-3 borderStyle mb-4 main-dashboard">
          <div className="text-center titles mb-3">MY SERVICES</div>
          <CustomCarousel
            serviceCardDisplay={this.state.serviceCardDisplay}
            clickEvent={this.props.clickEvent}
          />
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
                GE Renewable Energy to supply DC-Coupled system to Convergent
                forx 123 MWh hybrid solar plus storage project in Upstatek
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
