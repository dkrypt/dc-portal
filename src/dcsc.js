import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import useAxios from "axios-hooks";

import "./app.css";
import Sidebar from "./components/Sidebar.js";
import { CenterHeader } from "./components/CenterHeader.js";
import { CookieNotification } from "./components/CookieNotification";
import Router from "./router/Router.js";
import ReactLoader from "./components/ReactLoader";
import useCookie from "./DataLayer/useCookie";

const BASE_ENDPOINT = process.env.REACT_APP_BASEURL;


const API_ENDPOINT = process.env.REACT_APP_DCURL && process.env.REACT_APP_ENV ==="development" ? `${process.env.REACT_APP_DCURL}/v1.2beta/dcsc/api`: "/v1.2beta/dcsc/api";
console.log("API_ENDPOINT: ",API_ENDPOINT)
const API_USER_CONTEXT_PATH = "/v1.2beta/user";

export default function DCSC() {
  // Global state variables
  const setJwt = useStoreActions((actions) => actions.setJwt);
  const setGlobalDataset = useStoreActions(
    (actions) => actions.dataStore.global.setDataset
  );
  const setOperationsDataset = useStoreActions(
    (actions) => actions.dataStore.operations.setDataset
  );
  const setGlobalscapeDataset = useStoreActions(
    (actions) => actions.dataStore.globalscape.setDataset
  );
  const jwt = useStoreState((state) => state.jwt);
  const parentDSKey = useStoreState((state) => state.parentDSKey);
  const userName = useStoreState((state) => state.user.fullName);
  const setUser = useStoreActions((actions) => actions.setUser);
  const globalDataset = useStoreState(
    (state) => state.dataStore.global.dataset
  );
  // get/set/clear cookie
  const [cookieValue, setCookie, clearCookie] = useCookie("ec-config");

  // Local state variables
  const [appState, setAppState] = useState({
    currentPage: "",
    headerText: "",
    subHeaderText: "GLOBAL",
    subHeaderOpts: [],
  });
  const [displayUI, setDisplayUI] = useState(false);

  // Http Requests
  let datasetReqConfig = {
    method: "GET",
  };
  const [datasetResponse, executeDataset] = useAxios(datasetReqConfig, {
    manual: true,
  });
  let gsDatasetReqConfig = {
    method: "GET",
  };
  const [gsDatasetResponse, executeGsDataset] = useAxios(gsDatasetReqConfig, {
    manual: true,
  });
  let opsDatasetReqConfig = {
    method: "GET",
  };
  const [opsDatasetResponse, executeOpsDataset] = useAxios(
    opsDatasetReqConfig,
    {
      manual: true,
    }
  );
  let userEndpointConfig = { method: "GET" };
  const [userEndpointResponse, executeUserEndpoint] = useAxios(
    userEndpointConfig,
    { manual: true }
  );

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
    isLoader(true);
    setJwt(cookieValue);
    if (jwt) {
      isLoader(true);
      executeDataset({
        url: `${API_ENDPOINT}/${parentDSKey}`,
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((response) => {
          setGlobalDataset(response.data.dcPortal);
        })
        .catch((err) => console.error("Error", err));
    }
  }, [jwt]);

  useEffect(() => {
    if (globalDataset.hasOwnProperty("sdcUrl")) {
      executeUserEndpoint({
        url: `${globalDataset.sdcUrl}${API_USER_CONTEXT_PATH}`,
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((response) => {
          setUser(response.data[0]);
          isLoader(false);
          setDisplayUI(true);
        })
        .catch((err) => console.error("User Endpoint Failed: ", err));
    }
  }, [globalDataset]);

  useEffect(() => {
    if (
      globalDataset.hasOwnProperty("gsKey") &&
      globalDataset.hasOwnProperty("opsKey")
    ) {
      let gsKey = globalDataset.gsKey;
      let opsKey = globalDataset.opsKey;

      const getGsData = executeGsDataset({
        url: `${API_ENDPOINT}/${gsKey}`,
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const getOpsData = executeOpsDataset({
        url: `${API_ENDPOINT}/${opsKey}`,
        headers: { Authorization: `Bearer ${jwt}` },
      });
      Promise.all([getGsData, getOpsData])
        .then(([gsResp, opsResp]) => {
          setGlobalscapeDataset(gsResp.data.globalscape);
          setOperationsDataset(opsResp.data.operations);
        })
        .catch((err) => console.error("Promise Failed: ", err));
    }
  }, [userName]);

  useEffect(() => {
    var serviceNames = ["IBS", "GPAS-Lite"];

    setTimeout(() => {
      setAppState((prevState) => ({
        ...prevState,
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
        {displayUI ? (
          <div className="MainDiv">
            <div className="row m-0">
              <Sidebar clickEvent={switchPage} />
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
                    isLoader={isLoader}
                  />
                  <CookieNotification />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Fragment>
    </BrowserRouter>
  );
}
