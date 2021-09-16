import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
export const ViewScheduleDaily = ({ closeModal, openModal, eventName, toastMessage }) => {
  // const [scheduleTime, setScheduleTime] = useState('');
  // const handleScheduleTime = (e) => {
  //   setScheduleTime(e.target.value);
  // }
  const onEnablebuttonClick = () => {
    closeModal();
    toastMessage(true, 'View schedule saved.');
  }
  return (
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Modify Schedule Daily Request</Modal.Title>
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
              placeholder="Event Date time Start"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event repaet enabled"
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event repeat rate"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event Repeat pattern"
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            
            <select className="custom-select custom-select-sm" id="inlineFormCustomSelect">
      <option>Event Time End Enabled...</option>
      <option value="1">true</option>
      <option value="2">false</option>
      
    </select>
          </div>
          <div className="col">
            
            <select className="custom-select custom-select-sm" id="inlineFormCustomSelect">
      <option>Event Enabled...</option>
      <option value="1">true</option>
      <option value="2">false</option>
      
    </select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event update Schedule"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event daily day period"
            />
          </div>
          
        </div>
        <div className="row form-group">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event Daily Every Week Day"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Event Date Time End"
            />
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
