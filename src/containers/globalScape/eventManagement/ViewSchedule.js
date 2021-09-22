import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import {ViewScheduleDaily} from "./ViewScheduleDaily.js";
import {ViewScheduleOnce} from "./ViewScheduleOnce.js";

export const ViewSchedule = ({ closeModal, toastMessage, openModal, eventName }) => {
  const [scheduleTime, setScheduleTime] = useState('');
  // const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDaily, setShowModalDaily] = useState(false);
  const [showModalOnce, setShowModalOnce] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState('');
  const onEnablebuttonClick = () => {
    closeModal();
    toastMessage(true, 'View schedule saved');
  };
  const viewScheduleDailyFun = (evntName) => {
    setShowModal(true);
    setSelectedEventName(evntName);
  }
  const viewScheduleOnceFun = (evntName) => {
    setShowModalOnce(true);
    setSelectedEventName(evntName);
  };
  return (
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>View Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="gs_eve-name">Event Name*</label>
          <div className="col-sm-8"><input className="form-control form-control-sm" type="text" id="" name="" value={eventName} disabled />  </div>
        </div>
        <div className="form-group row">
          
            
          
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onEnablebuttonClick}>
          Save Changes
        </Button>
      </Modal.Footer>
      {showModal && (
            <ViewScheduleDaily
              openModal={showModal}
              closeModal={closeModal}
              eventName={selectedEventName}
              // toastMessage={updatedToastMessage}
            />
          )}
          {showModalOnce && (
            <ViewScheduleOnce
              openModal={showModalOnce}
              closeModal={closeModal}
              eventName={selectedEventName}
              // toastMessage={this.updatedToastMessage}
            />
          )}
    </Modal>
  );
};