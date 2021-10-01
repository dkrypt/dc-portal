import React, { useState } from "react";
import moment from 'moment';
import { Modal, Button } from "react-bootstrap";
import Api from "../apiLayer/api.js";
import DateTimePicker from "react-datetime-picker";



export const ViewScheduleOnce = ({
  closeModal,
  openModal,
  toastMessage,
  eventName,
  isLoader,
}) => {
  const [onceData, setOnceData] = useState("");
  const [eventRecu, setEventRecu] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventEnable, setEventEnable] = useState("");
  const [tt, settt] = useState('');

  const onEnablebuttonClick = () => {
    closeModal();
    // toastMessage(true, "Modify schedule saved");
    console.log("event", eventDate);
    onceCall();
  };
  // const url = "/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=503142021==DescTEST==FromGE_to==EP_DomainTEST==TEST&EventParams=event_Recurrence=5;event_DateTimeStart=2035%2C%2001%2C%2011%2C%2011%3A11%3A11;event_Enabled=true";
  const url2 = `/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=${eventName}&EventParams=event_Recurrence=${eventRecu};event_DateTimeStart=${tt};event_Enabled=${eventEnable}`
  const url3 = `/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=503142021==DescTEST==FromGE_to==EP_DomainTEST==TEST&EventParams=event_Recurrence=5;event_DateTimeStart=2035%2C%2001%2C%2011%2C%2011%3A11%3A11;event_Enabled=true`
  const onceCall = () => {
    isLoader(true);
    // AxiosInstance.post(url3)
    //   .then((response) => {
    //     setOnceData(response.data);
    //     // isLoader(false);
    //     // updatedToastMessage(true, response.data);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //     alert(e);
    //     isLoader(false);
    //   });
  };

  const handleEventRecuChange = (e) => {
    setEventRecu(e.target.value);
  };

  const handleEventEnableChange = (e) => {
    setEventEnable(e.target.value);
  };
  const changeDate = (date)=>{
    settt(encodeURIComponent(moment(date).format("yyyy, MM, DD, hh:mm:ss")))
    console.log(tt, moment(date).format("yyyy, MM, DD, hh:mm:ss"));

  }
  const defaultValue = new Date(2000, 2, 10, 13, 30, 0);
  return (
    <Modal show={openModal} onHide={closeModal} size="lg">
      <Modal.Header>
        <Modal.Title>Modify Schedule Once Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row form-group">
          <label className="col-sm-2 col-form-label" htmlFor="gs_eve-name">
            Event Name*
          </label>
          <div className="col-sm-10">
            <input
              className="form-control form-control-sm"
              type="text"
              value={eventName}
              disabled
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            <input
              type="Number"
              className="form-control form-control-sm"
              placeholder="Event Recurrence"
              onChange={handleEventRecuChange}
            />
          </div>
          <div className="col">
            <DateTimePicker
              format={"yyyy-MM-dd hh:mm:ss"}              
              onChange={changeDate}
              value={eventDate}         
            />
          </div>
        </div>

        <div className="row form-group">
          <div className="col">
            <select
              className="custom-select custom-select-sm"
              id="inlineFormCustomSelect"
              onChange={handleEventEnableChange}            >
              <option>Event Enabled...</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
          <div className="col"></div>
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
