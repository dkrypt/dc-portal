import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { ViewScheduleDaily } from "./ViewScheduleDaily.js";
import { ViewScheduleOnce } from "./ViewScheduleOnce.js";
import { ViewScheduleWeekly } from "./ViewScheduleWeekly.js";
import { ModifyYearly } from "./ModifyYearly.js";
import { ModifyMonthly } from "./ModifyMonthly.js";

export const ModifySchedule = ({
  closeModal,
  toastMessage,
  openModal,
  eventName,
  isLoader,
}) => {
  const [scheduleTime, setScheduleTime] = useState("");
  // const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDaily, setShowModalDaily] = useState(false);
  const [showModalOnce, setShowModalOnce] = useState(false);
  const [showModalWeekly, setShowModalWeekly] = useState(false);
  const [showModalMonthly, setShowModalMonthly] = useState(false);
  const [showModalYearly, setShowModalYearly] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const onEnablebuttonClick = () => {
    closeModal();
    toastMessage(true, "Modify schedule saved");
  };
  const viewScheduleDailyFun = (evntName) => {
    setShowModal(true);
    setSelectedEventName(evntName);
  };
  // const viewScheduleOnceFun = (evntName) => {
  //   setShowModalOnce(true);
  //   setSelectedEventName(evntName);
  // };
  const viewScheduleWeeklyFun = (evntName) => {
    setShowModalWeekly(true);
    setSelectedEventName(evntName);
  };
  const viewScheduleMonthlyFun = (evntName) => {
    setShowModalMonthly(true);
    setSelectedEventName(evntName);
  };
  const viewScheduleYearlyFun = (evntName) => {
    setShowModalYearly(true);
    setSelectedEventName(evntName);
  };
  const closeModalWeekly = () => {
    setShowModalWeekly(false);
  };
  const closeModalYearly = () => {
    setShowModalYearly(false);
  };
  const closeModalMonthly = () => {
    setShowModalMonthly(false);
  };
  return (
    <Modal
      show={openModal}
      onHide={closeModal}
      className="Parent-modal"
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Modify Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="gs_eve-name">
            Event Name*
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-sm"
              type="text"
              id=""
              name=""
              value={eventName}
              disabled
            />{" "}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="gs_eve-sso">
            Schedule
          </label>

          <div className="col-sm-10">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optradio"
                  value="Daily"
                  onClick={() => viewScheduleDailyFun()}
                />{" "}
                Daily
              </label>
            </div>
            {/* <div className="radio">           
              <label><input type="radio" name="optradio" value="Once" onClick={() => viewScheduleOnceFun()}/> Once</label>
            </div> */}
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optradio"
                  value="Weekly"
                  onClick={() => viewScheduleWeeklyFun()}
                />{" "}
                Weekly
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optradio"
                  value="Monthly"
                  onClick={() => viewScheduleMonthlyFun()}
                />{" "}
                Monthly
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optradio"
                  value="Yearly"
                  onClick={() => viewScheduleYearlyFun()}
                />{" "}
                Yearly
              </label>
            </div>
            {/* <div className="radio">               
                <label><input type="radio" name="optradio" value="Continually" /> Continually</label>
              </div> */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={onEnablebuttonClick}>
          Save Changes
        </Button> */}
      </Modal.Footer>
      {showModal && (
        <ViewScheduleDaily
          openModal={showModal}
          closeModal={closeModal}
          eventName={selectedEventName}
          isLoader={isLoader}
          // toastMessage={updatedToastMessage}
        />
      )}
      {showModalOnce && (
        <ViewScheduleOnce
          openModal={showModalOnce}
          closeModal={closeModal}
          eventName={eventName}
          isLoader={isLoader}
          // toastMessage={updatedToastMessage}
        />
      )}

      {showModalWeekly && (
        <ViewScheduleWeekly
          openModal={showModalWeekly}
          closeModal={closeModalWeekly}
          eventName={eventName}
          isLoader={isLoader}         
          toastMessage={toastMessage}
        />
      )}
      {showModalMonthly && (
        <ModifyMonthly
          openModal={showModalMonthly}
          closeModal={closeModalMonthly}
          eventName={eventName}
          isLoader={isLoader}
        />
      )}
      {showModalYearly && (
        <ModifyYearly
          openModal={showModalYearly}
          closeModal={closeModalYearly}
          eventName={eventName}
          isLoader={isLoader}
        />
      )}
    </Modal>
  );
};
