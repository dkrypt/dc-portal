import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Loader from "react-loader-spinner";
import "./app.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Sidebar from "./components/Sidebar.js";
import CenterHeader from "./components/CenterHeader.js";
import CookieNotification from "./components/CookieNotification";
import Router from "./router/Router.js";
import Breadcrumb from "./breadcrumb/Breadcrumb.js";

const BASE_ENDPOINT = process.env.REACT_APP_BASEURL;

const API_ENDPOINT = "/v1.2beta/dcsc/api/";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "",
      headerText: "",
      subHeaderText: "",
      subHeaderOpts: [],
      authToken: "",
      endPoint: API_ENDPOINT,
      previousPageDetails: {
        previousPage: "",
        headerText: "",
      },
      isloading: "none",
    };
  }

  componentDidMount() {
    let authToken = this.getToken("ec-config");
    setTimeout(() => {
      this.setState({
        authToken: authToken       
      });
    }, 1000);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.headerText != this.state.headerText) {
      // console.log("Location: ",pathnames)
      /* this.setState({        
        currentPage: this.state.previousPageDetails.previousPage,
        headerText: this.state.previousPageDetails.headerText,
      }); */
    }
  }

  switchPage(changePageTo) {
    this.setState({
      previousPageDetails: {
        previousPage: this.state.currentPage,
        headerText: this.state.headerText,
        subHeaderText: this.state.subHeaderText,
      },
      currentPage: changePageTo.pageName,
      headerText: changePageTo.headerText,
      subHeaderText: changePageTo.subHeaderText,
    });
  }

  changePersona(value) {
    this.setState({
      subHeaderText: value.personaName,
    });
  }

  setPersonaOptions(options) {
    this.setState({
      subHeaderOpts: options,
    });
  }

  getToken(name) {
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
  }
isLoader(load){
if(load){
  this.setState({
    isloading : "block"
  })
}
else{
  this.setState({
    isloading : "none"
  })
}
}
  render() {
    return (
      <BrowserRouter basename={BASE_ENDPOINT}>
        <Fragment>
          <div
            className="loader container-fluid"
            style={{ display: this.state.isloading }}
          >
            <div className="row w-100 h-100 text-center">
              <Loader
                className="col-sm-12"
                type="Oval"
                color="#00BFFF"
                height={80}
                width={80}
                // timeout={4000} //3 secs
              />
            </div>
          </div>
          <div className="MainDiv">
            <div className="row m-0">
              <Sidebar clickEvent={this.switchPage.bind(this)} />

              <div className="col-9 p-0 page-content-wrapper">
                <CenterHeader
                  headerText={this.state.headerText}
                  subText={this.state.subHeaderText}
                  subHeaderOpts={this.state.subHeaderOpts}
                  onPersonaChange={this.changePersona.bind(this)}
                />

                <div className="container-fluid center-container d-grid mb-2">
                  <Breadcrumb />
                  <Router
                    clickEvent={this.switchPage.bind(this)}
                    persona={this.state.subHeaderText}
                    setPersonaHandler={this.setPersonaOptions.bind(this)}
                    baseUrl={this.state.endPoint}
                    authToken={this.state.authToken}
                    isLoader = {this.isLoader.bind(this)}
                  />
                  <CookieNotification/>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}
