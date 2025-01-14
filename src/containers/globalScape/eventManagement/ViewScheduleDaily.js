import React, { useState } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { Modal, Button } from "react-bootstrap";
import Api from "../apiLayer/api.js";
export const ViewScheduleDaily = ({
  closeModal,
  openModal,
  eventName,
  toastMessage,
  
  isLoader,
}) => {
  // const [scheduleTime, setScheduleTime] = useState('');
  // const handleScheduleTime = (e) => {
  //   setScheduleTime(e.target.value);
  // }
  
  const [onceData, setOnceData] = useState("");
  const [eventRecu, setEventRecu] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventEnable, setEventEnable] = useState("");
  const [tt, settt] = useState("");
  const [selectedTime, setSelectedTime] = useState("Hours");
  const [endTimeEnable, setEndTimeEnable] = useState("false"); 
  const [repeatEnable, setRepeatEnable] = useState("false");
 
  const changeSelectOptionHandler = (event) => {
    setSelectedTime(event.target.value);
  };
const endTimeEnableToggle = () =>{
  setEndTimeEnable(!endTimeEnable);  
}
const repeatEnableToggle = () =>{
  setRepeatEnable(!repeatEnable);
}
  const onEnablebuttonClick = () => {
    closeModal();
    // toastMessage(true, "Modify schedule saved");
    console.log("event", eventDate);
    onceCall();
  };
  
  // const url = "/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=503142021==DescTEST==FromGE_to==EP_DomainTEST==TEST&EventParams=event_Recurrence=5;event_DateTimeStart=2035%2C%2001%2C%2011%2C%2011%3A11%3A11;event_Enabled=true";
  const url2 = `/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=${eventName}&EventParams=event_Recurrence=${eventRecu};event_DateTimeStart=${tt};event_Enabled=${eventEnable}`;
  const url3 = `/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=503142021==DescTEST==FromGE_to==EP_DomainTEST==TEST&EventParams=event_Recurrence=5;event_DateTimeStart=2035%2C%2001%2C%2011%2C%2011%3A11%3A11;event_Enabled=true`;
  const onceCall = () => {
    // isLoader(true);
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
  const changeDate = (date) => {
    settt(encodeURIComponent(moment(date).format("yyyy, MM, DD, hh:mm:ss")));
    console.log(tt, moment(date).format("yyyy, MM, DD, hh:mm:ss"));
  };
  const defaultValue = new Date(2000, 2, 10, 13, 30, 0);
  return (
    <Modal show={openModal} onHide={closeModal} size="">
      <Modal.Header>
        <Modal.Title>Modify Schedule Daily Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>       
        <div className="row form-group">
          <label className="col-sm-4 col-form-label col-form-label-sm">
            Daily day period:
          </label>
          <div className="col-sm-8">
            <span className="col-form-label col-form-label-sm">
              Recur every
            </span>
            <input
              type="Number"
              className="form-control form-control-sm gs-sm-input"
              placeholder="2"
              min="1"
              max="29"
            />
            <span>day(s) </span>
          </div>
        </div>      

        <div className="row form-group">
          <label className="col-sm-4 col-form-label col-form-label-sm">
            Starting date and time:
          </label>
          <div className="col-sm-8">
            <DateTimePicker
              format={"yyyy-MM-dd hh:mm:ss a"}
              onChange={changeDate}
              value={eventDate}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-4">
            <label className=" col-form-label col-form-label-sm">
              Ending date and time:
            </label>
          </div>
          <div className="col-sm-8">
            <div className="form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"              
                value={endTimeEnable}
                onChange={endTimeEnableToggle}
              />
              <label
                className="col-form-label col-form-label-sm"
                htmlFor="inlineCheckbox1"
              >
                End time enable
              </label>
            </div>
            <div className="gs-inner-row">
              <DateTimePicker
                format={"yyyy-MM-dd hh:mm:ss a"}
                onChange={changeDate}
                value={eventDate}
               className={endTimeEnable ? "react-datetime-picker--disabled" : "react-datetime-picker--enabled"}
              />
            </div>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-4">
            <label className=" col-form-label col-form-label-sm">
              Repeat Enabled:
            </label>
          </div>
          <div className="col-sm-8">
            <div className="form-check-inline gs-checkbox">
              <input
                className="form-check-input"
                type="checkbox"
                value={repeatEnable}
                onChange={repeatEnableToggle}
              />
            </div>
            <div className="gs-gutter">
              <span className="col-form-label col-form-label-sm">
                Repeat Every
              </span>
              {selectedTime === "Hours" ? (
                <input
                  type="Number"
                  className={`form-control form-control-sm gs-sm-input ${repeatEnable ? 'gs-disabled' : ''}`}
                  placeholder="1"
                  min="1"
                  max="23" 
                />
              ) : (
                <input
                  type="Number"
                  className={`form-control form-control-sm gs-sm-input ${repeatEnable ? 'gs-disabled' : ''}`}
                  placeholder="10"
                  min="10"
                  max="59"
                />
              )}
              <div className="btn-group">                
                <select
                  className=
                  {`btn btn-sm dropdown-toggle gs-dropdown ${repeatEnable ? 'gs-disabled' : ''}`}
                  onChange={changeSelectOptionHandler}
                >
                  <option>Hours</option>
                  <option>Minute</option>
                </select>
              </div>
            </div>
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
