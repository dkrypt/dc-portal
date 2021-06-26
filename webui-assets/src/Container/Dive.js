import React, { Fragment } from "react";

export default class Dive extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.highChart();
  }

  // istanbul ignore next
  highChart() {
    // Create the chart
    Highcharts.chart("container", {
      chart: {
        type: "line",
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
      // subtitle: {
      //     text: 'Source: WorldClimate.com'
      // },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        // title: {
        //     text: 'GE Power PMXE2E'
        // }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "GE Power PMXE2E",
          data: [
            7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
          ],
        },
        {
          name: "GE Power",
          data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
      ],
    });
  }

  render() {
    return (
      <Fragment>
        <div className="container-lg w-100 p-3 borderStyle mb-5">
          <div className="row mx-1">
            <div className="col m-1 borderStyle p-2 text-left">
              <h6>
                <b>Summary</b>
              </h6>
              <div className="row service-details">
                <div className="col">Dashboard Count: 8</div>
                <div className="col">Dashboard Status:</div>
                <div className="col">Subscription Count: 4</div>
                <div className="col">Subscription Status:</div>
              </div>
            </div>
            <div className="col m-1 borderStyle p-2 text-left">
              <h6>
                <b>Subscription Summary</b>
              </h6>
              <div className="row service-details g-2">
                <div className="col">Ariba Vendor Onboarding</div>
                <div className="col">BMS_Material Master</div>
                <div className="col">BMS_Production Order</div>
                <div className="col">Goods Receipt</div>
                <div className="col">Purchare Order</div>
                <div className="col">Tech Assignment</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-lg w-100 p-3 borderStyle">
          <div className="row service-text">
            <div className="col-6 mt-2">
              <h6>
                <b>Subscription Summary</b>
              </h6>
              <ul className="pl-3 service-details">
                <li>
                  <a
                    href="#"
                    onClick={this.props.clickEvent.bind(this, {
                      pageName: "DivePower",
                      headerText: "My Dive Service",
                      subHeaderText: "Dive Power PMX E2E",
                    })}
                  >
                    GE Power PMXE2E: Healthy
                  </a>
                </li>
                <li>GE Power: No Dashboards & Users</li>
              </ul>
              <div className="row service-text">
                <div className="col">
                  <h6>
                    <b>Alerts</b>
                  </h6>
                  <ul className="list-unstyled service-details">
                    <li>GE Power Subscription has no active Dashboard</li>
                    <li>GE Power Subscription has no active Users</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0">
                <div className="card-body p-0">
                  <div id="container" style={{ height: "15rem" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}