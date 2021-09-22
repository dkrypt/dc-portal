import React, { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

import Icon_TC from "../../assets/images/Icon-TC.png";
import Icon_EC from "../../assets/images/Icon-EC.png";
import Icon_Dive from "../../assets/images/Icon-Dive.png";
import Subscription from "../../assets/images/subscroptionImage.jpg";
import UserImage from "../../assets/images/userImage.png";

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
  useEffect(() => {
    props.clickEvent({
      pageName: "Manage",
      headerText: "MANAGE",
      subHeaderText: "GLOBAL",
    });
  }, []);
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
            to="/manage/manage-subscription"
            onClick={props.clickEvent.bind(this, {
              pageName: "Subscription",
              headerText: "SUBSCRIPTION",
            })}
          >
            <div
              className="Card card-1 manage-content "
              style={CardCss.content}
            >
              <div>
                <img
                  className="img-fluid"
                  src={Subscription}
                  alt="Dive-Icon"
                  style={CardCss.image}
                ></img>
              </div>
              <div>
                <span
                  style={{
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
          <Link
            to="/manage/manage-user"
            onClick={props.clickEvent.bind(this, {
              pageName: "User",
              headerText: "Manage User",
            })}
          >
            <div className="Card card-1" style={CardCss.content}>
              <div>
                <img
                  className="img-fluid"
                  src={UserImage}
                  alt="UserImage"
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
          <Link
            to="/manage/manage-tc"
            onClick={props.clickEvent.bind(this, {
              pageName: "ManageTC",
              headerText: "MANAGE THREAD CONNECT",
            })}
          >
            <div className="Card card-1" style={CardCss.content}>
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
          <Link
            to="/manage/manage-ec"
            onClick={props.clickEvent.bind(this, {
              pageName: "Enterpriseconnect",
              headerText: "ENTERPRISECONNECT",
            })}
          >
            <div className="Card card-1" style={CardCss.content}>
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
          <div className="Card card-1" style={CardCss.content}>
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
