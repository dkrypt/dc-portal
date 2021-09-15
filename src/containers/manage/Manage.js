import React from "react";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

import Icon_TC from "../../assets/images/Icon-TC.png";
import Icon_EC from "../../assets/images/Icon-EC.png";
import Icon_Dive from "../../assets/images/Icon-Dive.png";

function Manage(props) {
  let CardCss = {
    card: { margin: "10px" },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "10px",
    },
    image: { maxHeight: "150px" },
  };
  // <Link
  //   className="list-group-item list-group-item-action"
  //   to="/manage"
  //   onClick={this.props.clickEvent.bind(this, {
  //     pageName: "Manage",
  //     headerText: "MANAGE",
  //   })}
  // >
  //   <img className="img-fluid" alt="" src={Icon_Subscriptions} /> MANAGE
  // </Link>;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div style={CardCss.card}>
          <Link
            // className="list-group-item list-group-item-action"
            to="/manage/managesubscription"
            onClick={props.clickEvent.bind(this, {
              pageName: "Subscription",
              headerText: "SUBSCRIPTION",
            })}
          >
            {/* <img className="img-fluid" alt="" src={Icon_Subscriptions} /> MANAGE */}

            {/* <a
            href="#"
            onClick={props.clickEvent.bind(this, {
              pageName: "Subscription",
              headerText: "SUBSCRIPTION",
              // subHeaderText: "Persona 1",
            })}
          > */}
            <div
              className="Card card-1"
              style={CardCss.content}
              // onClick={() => history.push("/manage/thread-connect")}
            >
              <div>
                <img
                  className="img-fluid"
                  src="data:image/png;base64,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"
                  alt="Dive-Icon"
                  style={CardCss.image}
                ></img>
              </div>
              <div>
                <span
                  style={{
                    // width: "158px",
                    // fontSize: "1.2vw",
                    // fontWeight: "bold",
                    textAlign: "center",
                  }}
                  className="card_title"
                >
                  Subscription
                </span>
              </div>
            </div>
            {/* </a> */}
          </Link>
        </div>
        <div style={CardCss.card}>
          {/* <a
            href="#"
            onClick={props.clickEvent.bind(this, {
              pageName: "User",
              headerText: "Manage User",
              // subHeaderText: "Persona 1",
            })}
          > */}
          <Link
            // className="list-group-item list-group-item-action"
            to="/manage/manageuser"
            onClick={props.clickEvent.bind(this, {
              pageName: "User",
              headerText: "Manage User",
            })}
          >
            <div className="Card card-1" style={CardCss.content}>
              <div>
                <img
                  className="img-fluid"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK1fsA-JGwlLyGtZUC6MOrOvpRdjZUxZcf3A&usqp=CAU"
                  alt="Dive-Icon"
                  style={CardCss.image}
                ></img>
              </div>
              <div>
                <span style={{ width: "158px" }} className="card_title">
                  {" "}
                  User
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div style={CardCss.card}>
          {/* <a
            href="#"
            onClick={props.clickEvent.bind(this, {
              pageName: "ManageTC",
              headerText: "MANAGE THREAD CONNECT",
              // subHeaderText: "Persona 1",
            })}
          > */}
          <Link
            // className="list-group-item list-group-item-action"
            to="/manage/managetc"
            onClick={props.clickEvent.bind(this, {
              pageName: "ManageTC",
              headerText: "MANAGE THREAD CONNECT",
            })}
          >
            <div
              className="Card card-1"
              style={CardCss.content}
              // style={{ width: "20vw", height: "30vh" }}
            >
              <div>
                <img
                  className="img-fluid"
                  src={Icon_TC}
                  alt="TC-Icon"
                  style={CardCss.image}
                ></img>
              </div>
              <div>
                <span style={{ width: "158px" }} className="card_title">
                  {" "}
                  Thread Connect
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div style={CardCss.card}>
          {/* <a
            href="#"
            onClick={props.clickEvent.bind(this, {
              pageName: "Enterpriseconnect",
              headerText: "ENTERPRISECONNECT",
              // subHeaderText: "Persona 1",
            })}
          > */}
          <Link
            // className="list-group-item list-group-item-action"
            to="/manage/manage_ec"
            onClick={props.clickEvent.bind(this, {
              pageName: "Enterpriseconnect",
              headerText: "ENTERPRISECONNECT",
            })}
          >
            <div
              className="Card card-1"
              style={CardCss.content}
              // style={{ width: "20vw", height: "30vh" }}
            >
              <div>
                <img
                  className="img-fluid"
                  src={Icon_EC}
                  alt="EC-Icon"
                  style={CardCss.image}
                ></img>
              </div>
              <div>
                <span style={{ width: "158px" }} className="card_title">
                  Enterprise Connect
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div style={CardCss.card}>
          <div
            className="Card card-1"
            style={CardCss.content}
            // style={{ width: "20vw", height: "30vh" }}
          >
            <div>
              <img
                className="img-fluid"
                src={Icon_Dive}
                alt="Dive-Icon"
                style={CardCss.image}
              ></img>
            </div>
            <div>
              <span style={{ width: "158px" }} className="card_title">
                DIVE{" "}
              </span>
            </div>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}

export default Manage;
