import React, { Fragment } from "react";
import moment from "moment";
import Highcharts from "highcharts";

import CustomCarousel from "../../components/Carousal.js";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("DD-MM-YYYY"),
      month: moment().format("MMMM"),
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
    this.highChart();
    var serviceNames = [];

    this.props.setPersonaHandler(serviceNames);
  }

  /* componentDidUpdate(prevprops, prevstate) {
    if (prevprops.persona != this.props.persona) {
      
    }
  } */

  handleHighChartFilter(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
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
  highChart() {
    Highcharts.chart("columnContainer", {
      chart: {
        type: "column",
      },
      title: {
        text: "Connector Count",
        style: {
          color: "#005EB8",
          fontWeight: "bold",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.2vw !important",
        },
      },
      /* subtitle: {
          text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
      }, */
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
          text: "Count",
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      /* tooltip: {
          pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
      }, */
      series: [
        {
          /* name: 'Population', */
          data: this.state.highChartData,
          color: "#1f78b4",
          dataLabels: {
            /*  enabled: true, */
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

    Highcharts.chart("donutContainer", {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: "Success/<br>Failure Transactions",
        align: "center",
        verticalAlign: "middle",
        y: 90,
        style: {
          color: "#005EB8",
          fontWeight: "bold",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.2vw !important",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -30,
            style: {
              fontWeight: "bold",
              color: "white",
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ["50%", "90%"],
          size: "150%",
        },
      },
      series: [
        {
          type: "pie",
          name: "Success/Failure Transactions",
          innerSize: "50%",
          data: [
            ["Success", 80],
            ["Failure", 20],
            /* {
                    name: 'Other',
                    y: 7.61,
                    dataLabels: {
                        enabled: false
                    }
                } */
          ],
        },
      ],
    });
  }

  render() {
    return (
      <Fragment>
        <div className="container-lg w-100 p-3 borderStyle mb-3 tc-dashboard">
          <div className="row mx-1">
            <div className="col m-1 borderStyle">
              <div className="card border-0">
                <div className="card-body p-0">
                  <select
                    className="col-sm-4 borderStyle service-details"
                    name=""
                    id="highChartFilter"
                    onChange={this.handleHighChartFilter}
                  >
                    <option value="" defaultValue>
                      filter
                    </option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="9 Months">9 Months</option>
                    <option value="12 Months">12 Months</option>
                  </select>
                  <div id="columnContainer" style={{ height: "15rem" }}></div>
                </div>
              </div>
            </div>
            <div className="col m-1 borderStyle">
              <div className="card border-0">
                <div className="card-body p-0">
                  <select
                    className="col-sm-4 borderStyle service-details"
                    name=""
                    id="highChartFilter"
                    onChange={this.handleHighChartFilter}
                  >
                    <option value="" defaultValue>
                      filter
                    </option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="9 Months">9 Months</option>
                    <option value="12 Months">12 Months</option>
                  </select>
                  <div id="donutContainer" style={{ height: "15rem" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mx-2 mt-2">
            <div className="col-4 borderStyle">
              <div className="text-left titles mb-3">INTEGRATION VERSIONS</div>
              <ul className="list-unstyled service-details m-0">
                <li>Example 1: v1</li>
              </ul>
            </div>
          </div>
          <div className="row mx-1 mt-2">
            <div className="col p-0 d-flex align-items-center">
              <button type="button" className="btn btn-secondary btn-sm">
                Add User(s)
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                View/Modify Users
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                View Logs
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                Compare and Merge Flow
              </button>
            </div>
            <div className="col">
              <div className="row">
                <div className="col text-right">
                  System Health <span className="greenDot"></span>
                </div>
              </div>
              <div className="row">
                <div className="col text-right">
                  Last Restart- {this.state.date}{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-lg w-100 p-3 borderStyle">
          <div className="row service-text">           
            
          </div>
        </div> */}
      </Fragment>
    );
  }
}
