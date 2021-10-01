import axios from "axios";

let eventListUrl = `/DISP_DISPLAY_EVENT_LIST?UserID=`;
let runNowUrl = `/ASYNCExecuteEvent?EventRuleName=`;
let enableDisableEventUrl = `/ENE_SYNC_ENABLE_EVENT?EventRuleName=`;



const commonApicall = (method, url, data = {}) => {
  return axios({
    method: method,
    url: url,
    data: data,
  });
};
const Api = {
  getEventList: (baseUrl, id) =>
    commonApicall("POST", `${baseUrl}${eventListUrl}${id}`),

  getRunNowData: (baseUrl, eventName) =>
    commonApicall("POST", `${baseUrl}${runNowUrl}${eventName}&ID=12345`),

  getEnableEventData: (baseUrl, eventName) =>
    commonApicall("POST", `${baseUrl}${enableDisableEventUrl}${eventName}&event_Enabled=true`),

  getDisableEventData: (baseUrl, eventName) =>
    commonApicall("POST", `${baseUrl}${enableDisableEventUrl}${eventName}&event_Enabled=false`),

  getModifyWeeklyData: (
    baseUrl,
    eventName,
    repeatEnable,
    repeatRate,
    selectedTime,
    endTimeEnable,
    weeklyPeriod,
    weekData, currentDate
  ) =>
    commonApicall(
      "POST",
      `${baseUrl}/SCHEDULE/SCHEDULE_CHANGE_WEEKLY?EventRuleName=${eventName}&EventParams=event_Recurrence=2;event_DateTimeStart=${currentDate};event_RepeatEnabled=${repeatEnable};event_RepeatRate=${repeatRate};event_RepeatPattern=${selectedTime};event_TimeEndEnabled=${endTimeEnable};event_Enabled=false;event_WeeklyWeekPeriod=${weeklyPeriod};${weekData}event_DateTimeEnd=2028%2C%2003%2C%2011%2C%2005%3A05%3A05;event_UpdateSchedule=1`
    ),
};

export default Api;
