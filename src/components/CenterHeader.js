import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

export const CenterHeader = ({
  subHeaderOpts,
  headerText,
  subText,
  onPersonaChange,
}) => {
  const [subHeaderOptions, setSubHeaderOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSubHeaderOptions(subHeaderOpts);
  }, [subHeaderOpts]);

  const filterEvents = (e) => {
    const events = subHeaderOpts;
    setSearchText(e.target.value);
    if (events?.length > 0) {
      const filteredEvents = events.filter(
        (EVENT_NAME) =>
          EVENT_NAME.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      setSubHeaderOptions(filteredEvents);
    }
  };

  return (
    <div className="container-fluid p-2 center-header">
      <div className="d-flex flex-row headers service-tile-content">
        <div className="col p-0">
          {headerText}

          <span className="global-icon ml-1">
            <a
              className="dropdown-toggle"
              href="#"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {subText}
            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <div className="search">
                <input
                  type="text"
                  name="search"
                  className="round borderStyle dropdown-item"
                  placeholder="Search"
                  onChange={filterEvents}
                  autoComplete="off"
                />
              </div>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                onClick={() =>
                  onPersonaChange({
                    personaName: "GLOBAL",
                  })
                }
              >
                GLOBAL
              </a>

              {subHeaderOptions.map((option, index) => {
                return (
                  <Fragment key={index}>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item">
                      ﹂
                      <a
                        className="sub-org-space"
                        onClick={() =>
                          onPersonaChange({
                            personaName: option,
                          })
                        }
                      >
                        {option}
                      </a>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </span>
        </div>
      </div>
      <div className="d-flex flex-row service-tile-content">
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
