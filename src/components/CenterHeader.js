import React, { Fragment } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export const CenterHeader = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="headers row">
        <div className="col pr-0">
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
                href="#"
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
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => props.onPersonaChange({
                        personaName: option,
                      })}
                    >
                      {option}
                    </a>
                  </Fragment>
                );
              })}
            </div>
          </span>
        </div>
      </div>
      <div className="col-sm"></div>
      <div className="search-bar">
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
      </div>
    </nav>
  );
};
