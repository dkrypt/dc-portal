import React, { Fragment, useState, useEffect } from "react";
import moment from "moment";
import Highcharts from "highcharts";

export const Dashboard = ({ setPersonaHandler }) => {
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [highChartData, setHighCharData] = useState([
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
  ]);
  useEffect(() => {
    highChart();
    setPersonaHandler([]);
  }, []);

  const handleHighChartFilter = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const regex = /\d\d|\d/gm;
    // console.log("Selected Value: ",value)
    const currentHighChartData = Object.assign([], highChartData);
    var newHighChartData = [];
    var monthValue = parseInt(value.match(regex)[0]);
    // console.log("Month Value: ",monthValue)

    for (var i = 0; i < monthValue; i++) {
      newHighChartData.push(currentHighChartData[i]);
    }

    Highcharts.charts[0].series[0].update({
      data: newHighChartData,
    });
  }
  const highChart = () => {
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
          data: highChartData,
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
};
