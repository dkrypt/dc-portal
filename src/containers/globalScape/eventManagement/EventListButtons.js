import React, { Fragment, useState } from "react";
import AxiosInstance from "../api/api.js";
import { Spinner } from "react-bootstrap";
import {ViewSchedule} from "./ViewSchedule.js";

export const EventListButtons = ({ eventName, toastMessage }) => {
  // State getters and setters
  const [runNowData, setRunNowData] = useState('');
  const [enableData, setEnableData] = useState('');
  const [disableData, setDisableData] = useState('');
  const [selectedEventName, setSelectedEventName] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(false);
  const runNowClick = () => {
    setLoaded(true);
    AxiosInstance.post(`/ASYNCExecuteEvent?EventRuleName=${eventName}&ID=12345`)
      .then((response) => {
        setRunNowData(response.data);
        setLoaded(false);
        toastMessage(true, runNowData);
      })
      .catch((e) => {
        setLoaded(false);
        alert(e);        
      });
  }
  const onValueChange = (changeEvent) => {
    setSelectedOption(changeEvent.currentTarget.value);
    if (selectedOption === 'Enable') {
      enableNow();
    } else if (selectedOption === 'Disable') {
      disableNow();
    }  
  }
  const enableNow = () => {
    AxiosInstance.post(`/ENE_SYNC_ENABLE_EVENT?EventRuleName=${eventName}&event_Enabled=true`)    
      .then((response) => {
        setEnableData(response.data);
        toastMessage(true, enableData);
      })
      .catch((e) => console.error(e));
  }
  const disableNow = () => {
    AxiosInstance.post(`/ENE_SYNC_ENABLE_EVENT?EventRuleName=${eventName}&event_Enabled=false`)    
      .then((response) => {
        setDisableData(response.data);
        toastMessage(true, disableData);
      })
      .catch((e) => console.error(e));
  }
  const viewScheduleFun = (eventname) => {
    setShowModal(true);
    setSelectedEventName(eventName);
  }
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <Fragment>
    <div className="row gs-bottom-row">
      <h6 className="col-sm-2">Action</h6>
      <div className="col-sm-10">
        <div className="gs-radio">
          <label>
            <input
              type="radio"
              value="Enable"
              name="optradio"
              checked={selectedOption === "Enable"}
              onChange={onValueChange}
            />
            Enable
          </label>

          <label>
            <input
              type="radio"
              value="Disable"
              name="optradio"
              checked={selectedOption === "Disable"}
              onChange={onValueChange}
            />
            Disable
          </label> </div>
          <button
            className="gs-btn green fix-btn"
            onClick={() => runNowClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
            <span>{!loaded ? "Run Now" : 
              (<>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </>
              )}
            </span>
          </button>
          <button
            className="gs-btn grey fix-btn disabled"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-menu-button-wide-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0h-13zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span>View Schedule</span>
          </button>
          <button
            className="gs-btn maroon fix-btn"
            onClick={() => viewScheduleFun(eventName)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-break" viewBox="0 0 16 16">
<path d="M0 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zM12 0H4a2 2 0 0 0-2 2v7h1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7h1V2a2 2 0 0 0-2-2zm2 12h-1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2H2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2z"/>
</svg>
      
            <span>Modify Schedule</span>
          </button>
       
      </div>
    </div>
    {showModal && (
      <ViewSchedule
        openModal={showModal}
        closeModal={closeModal}
        eventName={selectedEventName}
        toastMessage={'updatedToastMessage'}
      />
    )}
    </Fragment>
  );
};