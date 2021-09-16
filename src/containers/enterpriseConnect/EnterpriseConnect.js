import React, { Fragment, useEffect } from "react";
import Highcharts from "highcharts";

export const EnterpriseConnect = ({ setPersonaHandler, }) => {
  useEffect(() => {
    highChart();
    setPersonaHandler();
  }, []);
  const highChart = () => {
    // Create the chart
    Highcharts.chart("pieContainer", {
      chart: {
        type: "pie",
      },
      title: {
        text: "Quality of Service",
        style: {
          color: "#005EB8",
          fontWeight: "bold",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.2vw !important",
        },
      },
      subtitle: {
        text: "<div>" + 95 + "%</div><br>Agent Up Time of Total",
        align: "center",
        verticalAlign: "middle",
        style: {
          fontSize: "6px",
          textAlign: "center",
        },
        x: 0,
        y: 0,
        useHTML: true,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ["50%", "40%"],
          dataLabels: {
            enabled: false,
          },
          states: {
            hover: {
              enabled: false,
            },
          },
          size: "100%",
          innerSize: "95%",
          borderColor: null,
          borderWidth: 8,
        },
      },
      tooltip: {
        valueSuffix: " %",
      },
      series: [
        {
          innerSize: "80%",
          data: [
            {
              name: "Speed",
              y: 6,
              color: "red",
            },
            {
              name: "Non Prioritised",
              y: 80,
              color: "green",
            },
          ],
        },
      ],
    });

    Highcharts.chart("barContainer", {
      chart: {
        type: "bar",
      },
      title: {
        text: "Agent Health Status Report",
        style: {
          color: "#005EB8",
          fontWeight: "bold",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.2vw !important",
        },
      },
      /* subtitle: {
        text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
      }, */
      xAxis: {
        categories: ["Ex1", "Ex2"],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Agent",
          align: "high",
        },
        labels: {
          overflow: "justify",
        },
      },
      tooltip: {
        valueSuffix: " %",
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: false,
          },
          pointPadding: 0,
          borderWidth: 0,
        },
      },
      /* legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 30,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      }, */
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "bar1",
          data: [20, 30],
        },
        {
          name: "bar2",
          data: [30, 40],
        },
      ],
    });

    Highcharts.chart("columnContainer", {
      chart: {
        type: "column",
      },
      title: {
        text: "Event Reporting",
        style: {
          color: "#005EB8",
          fontWeight: "bold",
          fontFamily: "GE Inspira Sans !important",
          fontSize: "1.2vw !important",
        },
      },
      /* subtitle: {
        text: 'Source: WorldClimate.com'
      }, */
      xAxis: {
        categories: ["Ex1", "Ex2"],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Events",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "bar1",
          data: [20, 30],
        },
        {
          name: "bar2",
          data: [45, 20],
        },
      ],
    });
  }
  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle mb-3">
        <div className="row mx-1">
          <div className="col mx-1 borderStyle">
            <div className="card border-0">
              <div className="card-body p-0">
                <div id="barContainer" style={{ height: "15rem" }}></div>
              </div>
            </div>
          </div>
          <div className="col mx-1 borderStyle">
            <div className="card border-0">
              <div className="card-body p-0">
                <div id="columnContainer" style={{ height: "15rem" }}></div>
              </div>
            </div>
          </div>
          <div className="col mx-1 borderStyle">
            <div className="card border-0">
              <div className="card-body p-0">
                <div id="pieContainer" style={{ height: "15rem" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg w-100 p-3 borderStyle">
        <div className="row service-text p-3">
          <div className="col service-tile-content borderStyle p-3 mx-1">
            <div className="titles mb-1">SUMMARY</div>
            <ul className="list-unstyled service-details m-0">
              <li>Licenses Has Been Created: 6</li>
              <li>Active Client/Server Instance: 10</li>
              <li>Active Connectivity in Client Pool: 30</li>
              <li>Gateway Scaling: 5</li>
              <li>Failed Connection Since Launched: 5</li>
            </ul>
          </div>
          <div className="col service-tile-content borderStyle p-3 mx-1">
            <div className="titles mb-1">Additional Links</div>
            <ul className="list-unstyled service-details m-0">
              <li>
                <a href="#">@Access Customer Portal</a>
              </li>
              <li>
                <a href="#">@Webhook Creations</a>
              </li>
              <li>
                <a href="#">@New Gateway Service Request</a>
              </li>
              <li>
                <a href="#">@New License Request</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
