import React, { Fragment } from "react";
import moment from "moment";
import Highcharts from "highcharts";

import "./ThreadConnect.css"

import CustomCarousel from "../../components/Carousal.js";
import PopUpModal from "../../components/PopUpModal";

import Icon_TC from "../../assets/images/Icon-TC.png";

export default class ThreadConnect extends React.Component {
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
          serviceName: "IBS",
          style: {
            display: "block",
          },
          from: "/threadconnect",
          onClick: {
            pageName: "IBS",
            headerText: "IBS",
          },
          img: {
            src: Icon_TC,
            alt: "TC-Icon",
            style: "",
          },
          serviceInfo: {
            "Status": "Healthy $status",
            "Connector Count for $month": 5,
            "Transaction Count for $date": 1250,
            "TC Release": "1.11.4.3.2.41",
          },
          displayPermissions: {
            displayCard: true,
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
                onClick: {
                  showPopUpModal: this.showPopUpModal.bind(this),
                },
              },
            ],
          },
        },
        {
          serviceName: "GPAS-Lite",
          style: {
            display: "block",
          },
          from: "/threadconnect",
          onClick: {
            pageName: "GPAS-Lite",
            headerText: "GPAS-LITE",
          },
          img: {
            src: Icon_TC,
            alt: "TC-Icon",
            style: "",
          },
          serviceInfo: {
            "Status": "Restarting $status",
            "Connector Count for $month": 8,
            "Transaction Count for $date": 2250,
            "TC Release": "1.11.4.3.2.41",
          },
          displayPermissions: {
            displayCard: true,
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
                onClick: {
                  showPopUpModal: this.showPopUpModal.bind(this),
                },
              },
            ],
          },
        },
      ],
      highChartData: [
        ["Jan", 24.2],
        ["Feb", 20.8],
        ["Mar", 14.9],
        ["Apr", 13.7],
        ["May", 13.1],
        ["Jun", 12.7],
        ["Jul", 12.4],
        ["Aug", 12.2],
        ["Sep", 12.0],
        ["Oct", 11.7],
        ["Nov", 11.5],
        ["Dec", 11.2],
      ],
    };

    this.handleHighChartFilter = this.handleHighChartFilter.bind(this);
  }

  componentDidMount() {
    // this.highChart();
    this.props.clickEvent({
      pageName: "ThreadConnect",
      headerText: "MY THREAD CONNECT SERVICE",
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

  handleHighChartFilter(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;
    const regex = /\d\d|\d/gm;
    // console.log("Selected Value: ",value)
    const currentHighChartData = Object.assign([], this.state.highChartData);
    var newHighChartData = [];
    var monthValue = parseInt(value.match(regex)[0]);
    // console.log("Month Value: ",monthValue)

    for (var i = 0; i < monthValue; i++) {
      newHighChartData.push(currentHighChartData[i]);
    }

    Highcharts.charts[0].series[0].update({
      data: newHighChartData,
    });

    // console.log("New Value: ",newHighChartData)
  }

  // istanbul ignore next
  /* highChart() {
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Usage Statistics",
        style: {
          color: "#005EB8",
          fontWeight: "bolder",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.5vw !important",
        },
      },
      subtitle: {
          text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "GE Inspira Sans !important",
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)'
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
          pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
      },
      series: [
        {
          name: 'Population',
          data: this.state.highChartData,
          color: "#1f78b4",
          dataLabels: {
             enabled: true,
            rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.1f}", // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "GE Inspira Sans !important",
            },
          },
        },
      ],
    });
  } */

  render() {
    return (
      <Fragment>
        <div
          className="container-lg w-100 p-3 borderStyle mb-3"
          id="carousel-container"
        >
          <div className="text-center titles mb-3">MY SUBSCRIPTIONS</div>
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
        {/* <div className="container-lg w-100 p-3 borderStyle">
          <div className="row service-text">
            <div className="col-6 mt-2">
              <div className="titles">SUBSCRIPTION SUMMARY</div>
              <ul className="pl-3 text-success">
                <li>Shared Sourcing Services(SSS): Healthy</li>
                <li>Supplier Connect(SCx): Restarting</li>
                <li>Customer Connect(CC): Healthy</li>
                <li>Corporate Shared: Healthy</li>
              </ul>
              <div className="row service-text">
                <div className="col service-tile-content">
                  <div className="titles">ALERTS</div>
                  <ul className="list-unstyled service-details">
                    <li>SCx Subscription is restarting</li>
                    <li>SCx Racer DB connector is down</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0">
                <div className="card-body p-0">
                  <select
                    className="col-sm-4 borderStyle service-details"
                    name=""
                    id="highChartFilter"
                    onChange={this.handleHighChartFilter}
                  >
                    <option value="" disabled selected>
                      filter
                    </option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="9 Months">9 Months</option>
                    <option value="12 Months">12 Months</option>
                  </select>
                  <div id="container" style={{ height: "15rem" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Fragment>
    );
  }
}
