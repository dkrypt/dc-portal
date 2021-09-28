import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';
import useAxios from "axios-hooks";

import "./app.css";
import Sidebar from "./components/Sidebar.js";
import {CenterHeader} from "./components/CenterHeader.js";
import {CookieNotification} from "./components/CookieNotification";
import Router from "./router/Router.js";
import ReactLoader from "./components/ReactLoader";
import useCookie from "./DataLayer/useCookie";

const BASE_ENDPOINT = process.env.REACT_APP_BASEURL;

const API_ENDPOINT = "/v1.2beta/dcsc/api/";

export default function DCSC() {
  // Global state variables
  const setJwt = useStoreActions(actions => actions.setJwt);
  const setGlobalDataset = useStoreActions(actions => actions.dataStore.global.setDataset);
  const jwt = useStoreState(state => state.jwt);
  const parentDSKey = useStoreState(state =>state.parentDSKey);
  // get/set/clear cookie
  const [cookieValue, setCookie, clearCookie] = useCookie('ec-config');

  // Local state variables
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

  // Http Requests
  let datasetReqConfig = { method: 'GET', url: `${API_ENDPOINT}/${parentDSKey}` };  
  const [datasetResponse, executeDataset] = useAxios(datasetReqConfig, {manual: true});

  // Component Methods
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
  
  useEffect(() => {
    setJwt(cookieValue);
    if (jwt) {
      executeDataset({
        headers: { Authorization: `Bearer ${jwt}`}
      }).then((response) => {
        setGlobalDataset(response.data.dcPortal);
      })
      .catch(err => console.error('Error', err))
    }
  }, [jwt]);

  useEffect(() => {
    var serviceNames = ["IBS", "GPAS-Lite"];

    setTimeout(() => {
      setAppState((prevState) => ({
        ...prevState,
        authToken: '',
        isloading: "none",
        subHeaderOpts: serviceNames,
      }));
    }, 300);
  }, []);

  return (
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
  );
}
