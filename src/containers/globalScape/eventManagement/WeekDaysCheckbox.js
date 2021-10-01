import React, { useEffect, useState } from "react";

export const WeekDaysCheckbox = ({weeklyData}) => {
  const [selection,setSelection] = useState([false,false,false,false,false,false,false]);
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const days = ["event_WeeklySunday","event_WeeklyMonday","event_WeeklyTuesday","event_WeeklyWednesday","event_WeeklyThursday","event_WeeklyFriday","event_WeeklySaturday"]

  useEffect(()=>{
    let selectedStr = "";
    for(var i=0; i < days.length;i++){
      selectedStr+= `${days[i]}=${selection[i]};`;
    }
    // console.log(selectedStr);
    weeklyData(selectedStr);
  },[selection]);

  const toggleCheckBox = (value,callback,name)=>{
    const selectedValues = [...selection];
    const index = days.indexOf(name);
    selectedValues[index] = !value;
    setSelection(selectedValues)
    callback(!value);
  }
  return (
    <div className="row form-group">
      <label className="col-sm-4 col-form-label col-form-label-sm">
        Weekly Days:
      </label>
      <div className="col-sm-8">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(sunday,setSunday,'event_WeeklySunday')}
            value={sunday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Sun
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(monday,setMonday,'event_WeeklyMonday')}
            value={monday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Mon
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(tuesday,setTuesday,'event_WeeklyTuesday')}
            value={tuesday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox3">
            Tues
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(wednesday,setWednesday,'event_WeeklyWednesday')}
            value={wednesday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Wed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(thursday,setThursday,'event_WeeklyThursday')}
            value={thursday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Thur
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(friday,setFriday,'event_WeeklyFriday')}
            value={friday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox1">
            Fri
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={()=>toggleCheckBox(saturday,setSaturday,'event_WeeklySaturday')}
            value={saturday}
          />
          <label className="form-check-label" htmlFor="inlineCheckbox2">
            Sat
          </label>
        </div>
      </div>
    </div>
  );
};
