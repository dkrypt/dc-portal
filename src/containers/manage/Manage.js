import React, { useEffect } from "react";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon_TC from "../../assets/images/Icon-TC.png";
import Icon_EC from "../../assets/images/Icon-EC.png";
import Icon_Dive from "../../assets/images/Icon-Dive.png";
import Subscription from "../../assets/images/subscriptionIcon.svg";
import UserImage from "../../assets/images/usersIcon.svg";
import { useStoreState, useStoreActions } from "easy-peasy";
function Manage(props) {
  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);

  //inside useeffect

  useEffect(() => {
    setPageTitle("MANAGE");
  }, []);
  return (
    <div className="manage-ui">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div className="managecard">
          <Link to="/manage/manage-subscription">
            <div className="Card card-1 manage-content card-content">
              <div>
                <img
                  className="img-fluid manage-image"
                  src={Subscription}
                  alt="Dive-Icon"
                ></img>
              </div>
              <div>
                <span className="card_title managename">Subscription</span>
              </div>
            </div>
            {/* </a> */}
          </Link>
        </div>
        <div className="managecard">
          <Link to="/manage/manage-user">
            <div className="Card card-1 card-content">
              <div>
                <img
                  className="img-fluid manage-image"
                  src={UserImage}
                  alt="UserImage"
                ></img>
              </div>
              <div>
                <span className="card_title manageuserwidth"> User</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="managecard">
          <Link to="/manage/manage-tc">
            <div className="Card card-1 card-content">
              <div>
                <img
                  className="img-fluid manage-image"
                  src={Icon_TC}
                  alt="TC-Icon"
                ></img>
              </div>
              <div>
                <span className="card_title manageuserwidth">
                  {" "}
                  Thread Connect
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="managecard">
          <Link to="/manage/manage-ec">
            <div className="Card card-1 card-content">
              <div>
                <img
                  className="img-fluid manage-image"
                  src={Icon_EC}
                  alt="EC-Icon"
                ></img>
              </div>
              <div>
                <span className="card_title manageuserwidth">
                  Enterprise Connect
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="managecard">
          <div className="Card card-1 card-content">
            <div>
              <img
                className="img-fluid manage-image"
                src={Icon_Dive}
                alt="Dive-Icon"
              ></img>
            </div>
            <div>
              <span className="card_title manageuserwidth">DIVE </span>
            </div>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
}

export default Manage;
