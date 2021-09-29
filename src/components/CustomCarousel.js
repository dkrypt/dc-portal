import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Carousel,
  Dropdown,
  OverlayTrigger,
  Popover,
  Tooltip,
  Button,
  Image,
} from "react-bootstrap";
import LaunchIcon from "@material-ui/icons/Launch";

import Icon_Open from "../assets/images/Icon-Open.svg";
import Icon_Snow from "../assets/images/Icon-Snow.png";

const DOLLARREGEX = /[$].+/gm;

export const CustomCarousel = ({ clickEvent, serviceCardDisplay }) => {
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const [month, setMonth] = useState(moment().format("MMMM"));
  const [subscriptionsTooltip, setSubscriptionsTooltip] = useState([]);  
const setPageTitle = useStoreActions(actions=>actions.setPageTitle)
 
  const handleExternalLink = (url) => {
    // window.open(url, '_blank');
    console.log(url);
  };

  

  const filterServiceValue = (value, subscriptions) => {
    return typeof value == "string" && value.includes("Healthy") ? (
      value === "Healthy $partial" ? (
        <span className="yellowDot"></span>
      ) : (
        <span className="greenDot"></span>
      )
    ) : value === "Restarting" ? (
      <span className="yellowDot"></span>
    ) : value === "Stopped" ? (
      <span className="redDot"></span>
    ) : subscriptions.length > 0 ? (
      addTooltip(value, subscriptions)
    ) : value
  };

  const addTooltip = (value, subscriptions) => {

    
    // setSubscriptionsTooltip(subscriptions)

    // console.log("subscriptions: ",subscriptions)
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={(props)=>renderTooltip(props, subscriptions)}
      >
        <span>{value}</span>
      </OverlayTrigger>
    );
  };

  const renderTooltip = (props, subscriptions) => (
    
    <Tooltip bsPrefix="tooltip" id="button-tooltip" {...props}>
    {/* {console.log("Props: ",props)} */}
    <ul>{subscriptions.map((subscription,index)=>{
      return<li key={index}>{subscription}</li>
    })}</ul>
    </Tooltip>
  );

  /* const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  ); */

  return (
    <Carousel interval={5000}>
      {serviceCardDisplay.map((serviceCard, indexArr) => {
        return (
          <Carousel.Item key={indexArr}>
            <div className="row">
              {serviceCard.map((service, index) => {
                return (
                  <div
                    className={
                      serviceCard.length < 2
                        ? "col-sm-4 service-tile-content"
                        : "col service-tile-content"
                    }
                    key={index}
                  >
                    <div className="thumb-wrapper borderStyle p-1">
                      <Link
                        className="service-text"
                        to={
                          service.from +
                          "/" +
                          service.onClick.pageName.toLowerCase()
                        }
                        onClick={() =>setPageTitle(service.onClick.headerText)
                        }
                      >
                        <div className="row mb-2">
                          <div className="col ml-1 titles service-tile-content">
                            {service.serviceName}
                          </div>
                          {service.hasOwnProperty("img") ? (
                            <div className="col-3 text-center service-tile-content">
                              <img
                                className="img-fluid"
                                src={service.img.src}
                                alt={service.img.alt}
                                style={
                                  typeof service.img.style == "object"
                                    ? service.img.style
                                    : {}
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </Link>
                      <div className="row service-details">
                        {Object.entries(service.serviceInfo).map(
                          ([key, value], index) => {
                            return (
                              <div
                                className="col m-1 service-tile-content"
                                key={index}
                              >
                                {key
                                  .replace("$date", date)
                                  .replace("$month", month)}
                                :{" "}
                                {filterServiceValue(
                                  value,
                                  service.hasOwnProperty("subscriptions") ? service.subscriptions : []
                                )}
                                {/* {key
                                    .replace("$date", this.state.date)
                                    .replace("$month", this.state.month)}
                                  :{" "}
                                  {DOLLARREGEX.exec(value) !== null
                                    ? value.replace(/[$].+/gm, " ")
                                    : value}
                                  {value == "Healthy $status" ? (
                                    <span className="greenDot"></span>
                                  ) : value == "Restarting $status" ? (
                                    <span className="yellowDot"></span>
                                  ) : typeof value == "string" &&
                                    value.includes("$open") ? (
                                    <a href="#">
                                      <LaunchIcon className="m-1" />
                                    </a>
                                  ) : typeof value == "string" &&
                                    value.includes("$snowimg") ? (
                                    <a href="#">
                                      <img
                                        className="img-fluid m-1"
                                        src={Icon_Snow}
                                        alt="Open-Icon"
                                        style={{ width: "5%" }}
                                      />
                                    </a>
                                  ) : (
                                    ""
                                  )} */}
                              </div>
                            );
                          }
                        )}
                      </div>
                      {service.buttons.displayButtons ? (
                        <div className="row carousel-buttons px-3 py-1">
                          {service.buttons.buttonInfo.map(
                            (buttonData, index) => {
                              return buttonData.buttonName == "dots" ? (
                                <Dropdown key={index}>
                                  <Dropdown.Toggle
                                    id="dropdown-basic"
                                    drop="down"
                                    variant="secondary btn-sm"
                                  >
                                    . . .
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      target="_blank"
                                      href="https://graylog-prod-aws.digitalconnect.apps.ge.com/streams"
                                    >
                                      Graylog
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      target="_blank"
                                      href="https://grafana-preprod-aws.digitalconnect.apps.ge.com/login"
                                    >
                                      Grafana
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                      onClick={() =>
                                        buttonData.onClick.displayPopUpModal({
                                          show: true,
                                          buttonName: "Integration Versions",
                                        })
                                      }
                                    >
                                      Integration Version Details
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              ) : (
                                <button
                                  key={index}
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={
                                    buttonData.type == "popup"
                                      ? () =>
                                          buttonData.onClick.displayPopUpModal({
                                            show: true,
                                            buttonName: buttonData.buttonName,
                                          })
                                      : () =>
                                          handleExternalLink(
                                            buttonData.onClick.url
                                          )
                                  }
                                >
                                  {/* {buttonData.buttonName == "Open" ? (
                                    <img
                                      className="img-fluid"
                                      src={Icon_Open}
                                      alt="Open-Icon"
                                      style={{ width: "25%" }}
                                    />
                                  ) : (
                                    ""
                                  )} */}
                                  {buttonData.type == "internal" ? (
                                    <Link className="" to={buttonData.path}>
                                      {buttonData.buttonName}
                                    </Link>
                                  ) : (
                                    buttonData.buttonName
                                  )}
                                </button>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
