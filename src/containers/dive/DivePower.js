import React, { Fragment, useEffect } from "react";
import Highcharts from "highcharts";

export const DivePower = ({ setPersonaHandler }) => {
  const highCharts = () => {
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
      ],
    });
  };
  useEffect(() => {
    highCharts();
    setPersonaHandler([])
  }, []);
  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle mb-5">
        <div className="row mx-1">
          <div className="col service-tile-content m-1 borderStyle p-2 text-left">
            <div className="titles">SUMMARY</div>
            <div className="row service-details">
              <div className="col service-tile-content">
                Dashboard Count: 8
              </div>
              <div className="col service-tile-content">
                Dashboard Status: <span className="yellowDot"></span>
              </div>
              <div className="col service-tile-content">
                Subscription Status: <span className="greenDot"></span>
              </div>
              <div className="col service-tile-content">User Count: 4</div>
            </div>
          </div>
          <div className="col service-tile-content m-1 borderStyle p-2 text-left">
            <div className="titles">SUBSCRIPTION SUMMARY</div>
            <div className="row service-details g-2">
              <div className="col service-tile-content">
                Ariba Vendor Onboarding
              </div>
              <div className="col service-tile-content">
                BMS_Material Master
              </div>
              <div className="col service-tile-content">
                BMS_Production Order
              </div>
              <div className="col service-tile-content">Goods Receipt</div>
              <div className="col service-tile-content">Purchare Order</div>
              <div className="col service-tile-content">Tech Assignment</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg w-100 p-3 borderStyle">
        <div className="row service-text">
          <div className="col service-tile-content-6 mt-2">
            <div className="titles">SUBSCRIPTION INSIGHTS</div>
            <span className="badge badge-success ml-1">Active</span>

            <ul className="pl-3 list-unstyled service-details">
              <li>Subscription Plan: Yearly(Platinum)</li>
              <li>Created Date: March 29,2021</li>
              <li>Valid Till: March 3, 2022</li>
              <li>Last Invoice Generation: March 29,2021</li>
              <li>Next Invoice Generation: March 29,2022</li>
            </ul>
            <div className="row justify-content-center">
              <div className="col service-tile-content">
                <button
                  type="button"
                  className="btn btn-warning text-white m-1"
                >
                  Change Plan
                </button>
                <button type="button" className="btn btn-danger m-1">
                  Cancel Subscription
                </button>
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
};