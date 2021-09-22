import React, { Fragment, useState, useEffect } from "react";
import { EventListButtons } from "./EventListButtons.js";
import AxiosInstance from "../api/api.js";
import ModifySchedule from "./ModifySchedule.js";

export const EventList = ({ clickEvent, isLoader }) => {
  // Local state getters and setters
  const [showModal, setShowModal] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [eventsData, setEventsData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ssoIdText, setSsoIdText] = useState("502663088");

  useEffect(() => {
    clickEvent({
      pageName: "EventManagement",
      headerText: "EVENT MANAGEMENT",
      subHeaderText: "GLOBAL",
    });
    AxiosInstance.post("/DISP_DISPLAY_EVENT_LIST?UserID=502663088")
      .then((response) => {
        setEventsData(response.data);
        isLoader(false);
      })
      .catch((e) => console.error(e));
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };
  const filterEvents = (e) => {
    const events = eventsData;
    setSearchText(e.target.value);
    if (events?.length > 0) {
      const filteredEvents = events.filter(
        ({ EVENT_NAME }) =>
          EVENT_NAME.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      setFilteredEvents(filteredEvents);
    }
  };

  const handleSsoIDfun = (e) => {
    setSsoIdText(e.target.value);
  };
  const fetchEventData = () => {
    isLoader(true);
    const eventAPI = `/DISP_DISPLAY_EVENT_LIST?UserID=${ssoIdText}`;
    AxiosInstance.post(eventAPI)
      .then((response) => {
        setEventsData(response.data);
        isLoader(false);
      })
      .catch((e) => {
        console.error(e);
        alert("API Error: ", e);
        isLoader(false);
      });
  };

  const finalEventsList =
    searchText.length > 0 && filteredEvents?.length >= 0
      ? filteredEvents
      : eventsData;
  const searchTextMsg = filteredEvents?.length > 0 ? "Search Result" : "Total Records";
 
  
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5 gs-container">
      <div className="gs_event-header">
        <div className="search gs-search">
          <input
            type="text"
            name="search"
            className="round borderStyle"
            placeholder="Search"
            onChange={filterEvents}
            autoComplete="off"
          />
        </div>
        <span>
          {searchTextMsg}: {finalEventsList.length}
         
        </span>
        <div className="gs-right-btn">
          <input
            type="number"
            className="round borderStyle sso"
            placeholder="Enter SSO ID"
            onChange={handleSsoIDfun}
          />
          <button
            type="button"
            onClick={fetchEventData}
            className="gs-btn purple fix-btn"
          >
            Fetch Events
          </button>
        </div>
      </div>

      {finalEventsList.map(({ EVENT_NAME }, index) => {
        return (
          <div className="gs-table-row borderStyle" key={index}>
            <div className="gs-inner-row borderStyle">
              <h6>Event Name</h6>
              <div className="gs_event-col">{EVENT_NAME}</div>
            </div>
            <EventListButtons eventName={EVENT_NAME} isLoader={isLoader} />
          </div>
        );
      })}
    </div>
  );
};
