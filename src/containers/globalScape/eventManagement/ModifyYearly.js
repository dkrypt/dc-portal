import React, { useState } from "react";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";
import Api from "../apiLayer/api.js";
import DateTimePicker from "react-datetime-picker";
import {WeekDaysCheckbox} from "./WeekDaysCheckbox.js"

export const ModifyYearly = ({
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
  const [tt, settt] = useState("");
  const [selectedTime, setSelectedTime] = useState(0);
  const [endTimeEnable, setEndTimeEnable] = useState(""); 
  const [repeatEnable, setRepeatEnable] = useState("false");
  const [repeatRate, setRepeatRate] = useState('');
  const [weeklyPeriod, setWeeklyPeriod] = useState('2');
  const [weekData, setWeekData] = useState('');
  /** Function that will set different values to state variable
   * based on which dropdown is selected
   */
  const changeSelectOptionHandler = (event) => {
    event.target.value == "Hours" ? setSelectedTime(0):setSelectedTime(1);
    
  };
const endTimeEnableToggle = () =>{
  setEndTimeEnable(!endTimeEnable);  
}
const repeatEnableToggle = () =>{
  setRepeatEnable(!repeatEnable);
}
const repeatRateHandler = (e) => {
  setRepeatRate(e.target.value);  
}
const weeklyPeriodToggle = (e) => {
  setWeeklyPeriod(e.target.value);  
}
const weekDayCallback = (data) => {
  // setWeekData(e.target.value);
}

  const onEnablebuttonClick = () => {
    closeModal();
    // toastMessage(true, "Modify schedule saved");
    console.log("event", eventDate, repeatRate, selectedTime, endTimeEnable, weeklyPeriod);
    //onceCall();
  };
  
  // const url2 = `/SCHEDULE/SCHEDULE_CHANGE_ONCE?EventRuleName=${eventName}&EventParams=event_Recurrence=${eventRecu};event_DateTimeStart=${tt};event_Enabled=${eventEnable}`;
  const url3 = `/SCHEDULE/SCHEDULE_CHANGE_WEEKLY?EventRuleName=${eventName}&EventParams=event_Recurrence=2;event_DateTimeStart=2027%2C%2010%2C%2011%2C%2005%3A05%3A05;event_RepeatEnabled=${repeatEnable};event_RepeatRate=${repeatRate};event_RepeatPattern=${selectedTime};event_TimeEndEnabled=${endTimeEnable};event_Enabled=false;event_WeeklyWeekPeriod=${weeklyPeriod};event_WeeklySunday=false;event_WeeklyMonday=true;event_WeeklyTuesday=false;event_WeeklyWednesday=false;event_WeeklyThursday=true;event_WeeklyFriday=true;event_WeeklySaturday=true;event_DateTimeEnd=2028%2C%2003%2C%2011%2C%2005%3A05%3A05;event_UpdateSchedule=1`;
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
  const changeDate = (date) => {
    settt(encodeURIComponent(moment(date).format("yyyy, MM, DD, hh:mm:ss")));
    console.log(tt, moment(date).format("yyyy, MM, DD, hh:mm:ss"));
  };
  const defaultValue = new Date(2000, 2, 10, 13, 30, 0);
  const weekdayToggle = () => {

  }
  return (
    <Modal show={openModal} onHide={closeModal} size="">
      <Modal.Header>
        <Modal.Title>Modify Schedule Yearly Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>        
        <div className="row form-group">
          <label className="col-sm-4 col-form-label col-form-label-sm">
            Weekly Week Period:
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
              max="4"
              onChange={weeklyPeriodToggle}
            />
            <span>week(s) on</span>
          </div>
        </div>
        <WeekDaysCheckbox  weeklyData={weekDayCallback}/>
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
                  onChange={repeatRateHandler}
                />
              ) : (
                <input
                  type="Number"
                  className={`form-control form-control-sm gs-sm-input ${repeatEnable ? '' : 'gs-disabled'}`}
                  placeholder="10"
                  min="10"
                  max="59"
                  onChange={repeatRateHandler}
                />
              )}
              <div className="btn-group">                
                <select
                  className=
                  {`btn btn-sm dropdown-toggle gs-dropdown ${repeatEnable ? '' : 'gs-disabled'}`}
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
