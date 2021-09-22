import React, { Fragment, useState } from "react";
import AxiosInstance from "../api/api.js";
import ToastMessage from "../ToastMessage.js";
import { ViewSchedule } from "./ViewSchedule.js";
import {ModifySchedule} from "./ModifySchedule.js";
import ConfirmPopup from "./ConfirmPopup.js";

export const EventListButtons = ({ eventName, isLoader }) => {
  // State getters and setters
  const [runNowData, setRunNowData] = useState("");
  const [enableData, setEnableData] = useState("");
  const [disableData, setDisableData] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");

  const [showToastM, setShowToastM] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [confirmBoxMsg, setConfirmBoxMsg] = useState("");
  const [showModalModify, setShowModalModify] = useState(false);
  const runNowClick = () => {
    isLoader(true);
    AxiosInstance.post(`/ASYNCExecuteEvent?EventRuleName=${eventName}&ID=12345`)
      .then((response) => {
        setRunNowData(response.data);
        isLoader(false);
        updatedToastMessage(true, response.data);
      })
      .catch((e) => {
        isLoader(false);
        alert(e);
      });
  };
  const onValueChange = (changeEvent) => {
    const target = changeEvent.target;
    if (target.value === "Enable") {
      setSelectedOption("enable");
      setShowConfirmBox(true);
      setConfirmBoxMsg("enabling");
    } else if (target.value === "Disable") {
      setShowConfirmBox(true);
      setSelectedOption("disable");
      setConfirmBoxMsg("disabling");
    } else {
      setShowConfirmBox(false);
    }
  };
  const runNowButtonHandler = () => {
    setShowConfirmBox(true);
    setSelectedOption("run now");
    setConfirmBoxMsg("immediate run");
  };

  const updatedToastMessage = (value, msg) => {
    setShowToastM(value);
    setToastMessage(msg);
  };

  const closeConfirmBox = () => {
    setShowConfirmBox(false);
  };
  const enableNow = () => {
    isLoader(true);
    AxiosInstance.post(
      `/ENE_SYNC_ENABLE_EVENT?EventRuleName=${eventName}&event_Enabled=true`
    )
      .then((response) => {
        setEnableData(response.data);
        isLoader(false);
        // toastMessage(true, enableData);
        updatedToastMessage(true, response.data);
      })
      .catch((e) => {
        console.error(e);
        alert(e);
        isLoader(false);
      });
  };

  const disableNow = () => {
    isLoader(true);
    AxiosInstance.post(
      `/ENE_SYNC_ENABLE_EVENT?EventRuleName=${eventName}&event_Enabled=false`
    )
      .then((response) => {
        setDisableData(response.data);
        isLoader(false);
        updatedToastMessage(true, response.data);
      })
      .catch((e) => console.error(e));
  };
  const viewScheduleFun = (eventname) => {
    setShowModalModify(true);
    setSelectedEventName(eventName);
  };
  const closeModal = () => {
    setShowModal(false);
    setShowModalModify(false);
  };

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
            </label>{" "}
          </div>
          <button
            className="gs-btn green fix-btn"
            onClick={() => runNowButtonHandler()}
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
            <span>Run Now</span>
          </button>
          <button className="gs-btn grey fix-btn disabled">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-break"
              viewBox="0 0 16 16"
            >
              <path d="M0 10.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zM12 0H4a2 2 0 0 0-2 2v7h1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7h1V2a2 2 0 0 0-2-2zm2 12h-1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2H2v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2z" />
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
          toastMessage={"updatedToastMessage"}
        />
      )}
      {showModalModify && (
        <ModifySchedule
          openModal={showModalModify}
          closeModal={closeModal}
          eventName={selectedEventName}
          toastMessage={updatedToastMessage}
        />
      )}

      {showConfirmBox && (
        <ConfirmPopup
          selectedOption={selectedOption}
          eventName={eventName}
          toastMessage={updatedToastMessage}
          isLoader={isLoader}
          onClose={closeConfirmBox}
          onEnable={enableNow}
          onDisable={disableNow}
          onRunNow={runNowClick}
          confirmBoxMsg={confirmBoxMsg}
        />
      )}
      {toastMessage && (
        <ToastMessage
          showToast={showToastM}
          updateToast={updatedToastMessage}
          toastMessage={toastMessage}
        />
      )}
    </Fragment>
  );
};
