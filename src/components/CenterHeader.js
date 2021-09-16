import React, { Fragment } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export default class CenterHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid p-2 center-header">
        <div className="row ml-2 mt-4 headers">
          <div className="col p-0">
            {this.props.headerText}

            <span className="global-icon ml-1">
              <a
                className="dropdown-toggle"
                href="#"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.props.subText}
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  className="dropdown-item"
                  onClick={this.props.onPersonaChange.bind(this, {
                    personaName: "GLOBAL",
                  })}
                >
                  GLOBAL
                </a>

                {this.props.subHeaderOpts.map((option, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-item">﹂<a
                        className="sub-org-space"
                        onClick={this.props.onPersonaChange.bind(this, {
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
  }
}
