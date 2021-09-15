import React, { Fragment } from "react";

export default class CenterHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="headers row">
          <div className="col pr-0">
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
                  href="#"
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
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={this.props.onPersonaChange.bind(this, {
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
  }
}
