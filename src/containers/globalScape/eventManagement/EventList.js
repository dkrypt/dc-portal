import React, { Fragment, useState, useEffect } from "react";
import ToastMessage from "../ToastMessage.js";
import {EventListButtons} from "./EventListButtons.js";
import AxiosInstance from "../api/api.js";
import { Spinner } from "react-bootstrap";

export const EventList = ({clickEvent}) => {
  // Local state getters and setters
  const [showModal, setShowModal] = useState(false);
  const [showToastM, setShowToastM] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    clickEvent({
      pageName: "EventManagement",
      headerText: "EVENT MANAGEMENT",
      subHeaderText: "GLOBAL",
    });
    AxiosInstance.post("/DISP_DISPLAY_EVENT_LIST?UserID=502663088")
      .then((response) => {
        setEventsData(response.data);
        setLoading(false);
      })
      .catch((e) =>console.error(e));
  }, []);
  const updatedToastMessage = (value, msg) => {
    setShowToastM(value);
    setToastMessage(msg);
  }
  const closeModal = () => {
    setShowModal(false);
  };
  const filterEvents = (e) => {
    if(eventsData?.length > 0){
      const filteredEvents = eventsData.filter(({EVENT_NAME})=>EVENT_NAME.toLowerCase().indexOf(e.target.value.toString().toLowerCase()) > -1);
      setFilteredEvents(filteredEvents);
    }
  }
  const finalEventsList = (filteredEvents && (filteredEvents.length > 0)) ? filteredEvents : eventsData;
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5 gs-container">
      {
        loading ? 
          <Spinner className="gs-loader" animation="border" /> : 
          <Fragment>
            <div className="gs_event-header">              
              <div className="search gs-search">
                <input
                  type="text"
                  name="search"
                  className="round borderStyle"
                  placeholder="Search"
                  onChange={filterEvents}
                />
                <input type="submit" className="corner" value="" />
              </div>             
            </div>
            {finalEventsList.map(({ EVENT_NAME }, index) => {
              return (
                <div className="gs-table-row borderStyle" key={index}>
                  <div className="gs-inner-row borderStyle">
                    <h6>Event Name</h6>
                    <div className="gs_event-col">{EVENT_NAME}</div>
                  </div>
                  <EventListButtons eventName={EVENT_NAME} toastMessage={updatedToastMessage}/>                  
                </div>
              );
            })}
            {toastMessage && <ToastMessage
                showToast={showToastM}
                toastMessage={toastMessage}               
                updateToast={updatedToastMessage}
                />
            }
          </Fragment>
        }
    </div>
  );
};