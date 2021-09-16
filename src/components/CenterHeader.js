import React, { Fragment } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export const CenterHeader = (props) => {
  return (
    <div className="container-fluid p-2 center-header">
      <div className="row ml-2 mt-4 headers">
        <div className="col p-0">
          {props.headerText}

          <span className="global-icon ml-1">
            <a
              className="dropdown-toggle"
              href="#"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {props.subText}
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a
                className="dropdown-item"
                onClick={() => props.onPersonaChange({
                  personaName: "GLOBAL",
                })}
              >
                GLOBAL
              </a>

              {props.subHeaderOpts.map((option, index) => {
                return (
                  <Fragment key={index}>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item">﹂<a
                      className="sub-org-space"
                      onClick={() => props.onPersonaChange({
                        personaName: option,
                      })}
                    >
                      {option}
                    </a></div>
                    
                  </Fragment>
                );
              })}
            </div>
          </span>
        </div>
      </div>
      <div className="row ml-2 mt-3 .service-tile-content">
        <Breadcrumb />
      </div>
      {/* Disabled Search Option for Time Being */}
      {/* <div className="search-bar">
        <form id="search-form">
          <div className="search">
            <input
              type="text"
              name="search"
              className="round"
              placeholder="search"
            />
            <input type="submit" className="corner" value="" />
          </div>
        </form>
      </div> */}
    </div>
  );
};
