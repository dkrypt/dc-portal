import React, { Fragment } from "react";
import ToastMessage from "../ToastMessage.js";
import EventListButtons from "./EventListButtons.js";
import AxiosInstance from "../api/api.js";

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showToastM: false,
      selectedEventName: "",
      toastMessage: "",
      searchText: "",
      eventsData: [],
      checkedItems: [],
      filteredEvents: [],
    };
    this.updatedToastMessage = this.updatedToastMessage.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }

  componentDidMount() {
    this.props.isLoader(true);

    this.props.clickEvent({
      pageName: "EventManagement",
      headerText: "EVENT MANAGEMENT",
      subHeaderText: "GLOBAL",
    });
    AxiosInstance.post("/DISP_DISPLAY_EVENT_LIST?UserID=502663088")
      .then((response) => {
        this.setState({ eventsData: response.data });
        this.props.isLoader(false);
        console.log("Event data :", this.state.eventsData);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  updatedToastMessage(value, msg) {
    this.setState({ showToastM: value, toastMessage: msg });
  }

  // viewScheduleFun(eventname) {
  //   this.setState({
  //     showModal: true,
  //     selectedEventName: eventname,
  //   });
  // }

  closeModal() {
    console.log("in close modal", this);
    this.setState({
      showModal: false,
      showSso: false,
      showEnable: false,
      showDisable: false,
      showRunNow: false,
    });
  }

  filterEvents(e) {
    const events = this.state.eventsData;
    this.setState({ searchText: e.target.value });
    if (events?.length > 0) {
      const filteredEvents = events.filter(
        ({ EVENT_NAME }) =>
          EVENT_NAME.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
      );
      this.setState({ filteredEvents: filteredEvents });
    }
  }
  render() {
    const { filteredEvents, eventsData, loading, showToastM, toastMessage } =
      this.state;
    const finalEventsList =
      this.state.searchText.length > 0 && filteredEvents?.length >= 0
        ? filteredEvents
        : eventsData;
    const searchText =
      filteredEvents?.length > 0 ? "Search Result" : "Total Records";
    return (
      <div className="container-lg w-100 p-3 borderStyle mb-5 gs-container">
        <div className="gs_event-header">
          <div className="search gs-search">
            <input
              type="text"
              name="search"
              className="round borderStyle"
              placeholder="Search"
              onChange={this.filterEvents}
              autoComplete="off"
            />
          </div>
          <span>
            {searchText}: {finalEventsList.length}
          </span>
          <input
              type="text"              
              className="round borderStyle sso"
              placeholder="Enter SSO ID"
              onChange={this.filterEvents}
              autoComplete="off"
            /> 
          {/* <div className="gs-sso"><span>Enter SSO ID</span><input
              type="text"              
              className="round borderStyle"
              placeholder="SSO ID"
              onChange={this.filterEvents}
              autoComplete="off"
            /> </div> */}
        </div>

        {finalEventsList.map(({ EVENT_NAME }, index) => {
          return (
            <div className="gs-table-row borderStyle" key={index}>
              <div className="gs-inner-row borderStyle">
                <h6>Event Name</h6>
                <div className="gs_event-col">{EVENT_NAME}</div>
              </div>
              <EventListButtons
                eventName={EVENT_NAME}
                parentCallback={this.handleCallback}
                toastMessage={this.updatedToastMessage}
                isLoader={this.props.isLoader}
              />
            </div>
          );
        })}

        {toastMessage && (
          <ToastMessage
            showToast={showToastM}
            updateToast={this.updatedToastMessage}
            toastMessage={toastMessage}
          />
        )}
      </div>
    );
  }
}
