import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const ViewScheduleOnce = ({ closeModal, openModal, toastMessage, eventName }) => {
  // const [scheduleTime, setScheduleTime] = useState('');
  // const [showCalendar, setShowCalendar] = useState(false);

  // const handleScheduleTime = (e) => {
  //   setScheduleTime(e.target.value)
  // };
  const onEnablebuttonClick = () => {
    closeModal();
    toastMessage(true, 'View schedule saved');
  };
  return (
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Modify Schedule Once Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row form-group">
          <label className="col-sm-4 col-form-label" htmlFor="gs_eve-name">
            Event Name*
          </label>
          <div className="col-sm-8">
            <input
              className="form-control form-control-sm"
              type="text"
              id=""
              name=""
              value={eventName}
              disabled
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event Recurrence"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event Date Time Start"
            />
          </div>
        </div>
        
        <div className="row form-group">
          <div className="col">
            
            <select className="custom-select custom-select-sm" id="inlineFormCustomSelect">
      <option selected>Event Time End Enabled...</option>
      <option value="1">true</option>
      <option value="2">false</option>
      
    </select>
          </div>
          <div className="col">
            
            <select className="custom-select custom-select-sm" id="inlineFormCustomSelect">
      <option selected>Event Enabled...</option>
      <option value="1">true</option>
      <option value="2">false</option>
      
    </select>
          </div>
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
    </Modal>
  );
};
