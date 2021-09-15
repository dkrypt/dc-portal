import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Carousel, Dropdown } from "react-bootstrap";
import LaunchIcon from "@material-ui/icons/Launch";

import Icon_Open from "../assets/images/Icon-Open.svg";
import Icon_Snow from "../assets/images/Icon-Snow.png";

const DOLLARREGEX = /[$].+/gm;

export default class CarouselItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("DD-MM-YYYY"),
      month: moment().format("MMMM"),
    };
  }

  componentDidMount() {
    setTimeout(() => {
      let carouselNode = document.querySelector(".carousel-indicators");

      if (carouselNode != null) {
        carouselNode.classList.add("col-12", "p-0");
      }
    }, 100);
  }

  handleExternalLink(url) {
    window.open(url, "_blank");
  }

  render() {
    return (
      <Carousel interval={3000}>
        {this.props.serviceCardDisplay.map((serviceCard, indexArr) => {
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
                          onClick={this.props.clickEvent.bind(this, {
                            pageName: service.onClick.pageName,
                            headerText: service.onClick.headerText,
                          })}
                        >
                          <div className="row mb-2">
                            <div className="col ml-1 titles service-tile-content">
                              {service.serviceName}
                            </div>
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
                                  )}
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
                                        onClick={buttonData.onClick.showPopUpModal.bind(
                                          this,
                                          {
                                            show: true,
                                            buttonName: "Integration Versions",
                                          }
                                        )}
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
                                        ? buttonData.onClick.showPopUpModal.bind(
                                            this,
                                            {
                                              show: true,
                                              buttonName: buttonData.buttonName,
                                            }
                                          )
                                        : buttonData.type == "external"
                                        ? this.handleExternalLink.bind(
                                            buttonData.onClick.url
                                          )
                                        : ""
                                    }
                                  >
                                    {buttonData.buttonName == "Open" ? (
                                      <img
                                        className="img-fluid"
                                        src={Icon_Open}
                                        alt="Open-Icon"
                                        style={{ width: "25%" }}
                                      />
                                    ) : (
                                      ""
                                    )}
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
  }
}
