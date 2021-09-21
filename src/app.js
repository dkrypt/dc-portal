import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider, createStore } from 'easy-peasy';
import "./app.css";

import Sidebar from "./components/Sidebar.js";
import {CenterHeader} from "./components/CenterHeader.js";
import {CookieNotification} from "./components/CookieNotification";
import Router from "./router/Router.js";
import ReactLoader from "./components/ReactLoader";
import StoreModel from './StoreModel';

const BASE_ENDPOINT = process.env.REACT_APP_BASEURL;

const API_ENDPOINT = "/v1.2beta/dcsc/api/";
const store = createStore(StoreModel);

export default function App() {
  const [appState, setAppState] = useState({
    currentPage: "",
    headerText: "",
    subHeaderText: "GLOBAL",
    subHeaderOpts: [],
    authToken: "",
    endPoint: API_ENDPOINT,
    isloading: "block",
  });

  const [defaultUsername, setDefaultUsername] = useState("Steve Rogers");

  useEffect(() => {
    let authToken = getToken("ec-config");

    var serviceNames = ["IBS", "GPAS-Lite"];

    // setPersonaOptions(serviceNames);
    setTimeout(() => {
      setAppState((prevState) => ({
        ...prevState,
        authToken: authToken,
        isloading: "none",
        subHeaderOpts: serviceNames,
      }));
    }, 300);
  }, []);

  const switchPage = (changePageTo) => {
    setAppState((prevState) => ({
      ...prevState,
      currentPage: changePageTo.pageName,
      headerText: changePageTo.headerText,
      // subHeaderText: changePageTo.subHeaderText,
    }));
  };

  const changePersona = (value) => {
    setAppState((prevState) => ({
      ...prevState,
      subHeaderText: value.personaName,
    }));
  };

  const setPersonaOptions = (options) => {
    setAppState((prevState) => ({
      ...prevState,
      subHeaderOpts: options,
    }));
  };

  const getToken = (name) => {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
  };

  const changeUsername = (username) => {
    console.log("username: ", username);
    setTimeout(() => {
      setDefaultUsername(username);
    }, 100);
  };

  const isLoader = (load) => {
    if (load) {
      setAppState((prevState) => ({
        ...prevState,
        isloading: "block",
      }));
    } else {
      setAppState((prevState) => ({
        ...prevState,
        isloading: "none",
      }));
    }
  };

  return (
    <StoreProvider store={store}>
      <BrowserRouter basename={BASE_ENDPOINT}>
        <Fragment>
          <div
            className="loader container-fluid"
            style={{ display: appState.isloading }}
          >
            <div className="row w-100 h-100 text-center">
              <ReactLoader />
            </div>
          </div>
          <div className="MainDiv">
            <div className="row m-0">
              <Sidebar
                clickEvent={switchPage}
                displayUsername={defaultUsername}
              />
              <div className="col-9 p-0 page-content-wrapper">
                <CenterHeader
                  headerText={appState.headerText}
                  subText={appState.subHeaderText}
                  subHeaderOpts={appState.subHeaderOpts}
                  onPersonaChange={changePersona}
                />
                <div className="container-fluid center-container d-grid mb-2">
                  <Router
                    clickEvent={switchPage}
                    persona={appState.subHeaderText}
                    setPersonaHandler={setPersonaOptions}
                    baseUrl={appState.endPoint}
                    authToken={appState.authToken}
                    isLoader={isLoader}
                    changeUsername={changeUsername}
                  />
                  <CookieNotification />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    </StoreProvider>
  );
}
