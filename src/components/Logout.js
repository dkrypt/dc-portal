import React, { Component } from "react";

const timoutWarning = 60000; //840000; // Display warning in 14 Mins.
const timoutNow = 30000; // Warning has been shown, give the user 1 minute to interact
const logoutUrl =
  window.location.origin + window.location.pathname.replace("/", "/logout"); // /[dcsc]+\b.*/gm URL to logout page.
var warningTimer;
var timeoutTimer;
export default class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.startWarningTimer();
    window.onmousemove = this.resetTimeOutTimer();
    window.onmousedown = this.resetTimeOutTimer();
    window.onclick = this.resetTimeOutTimer();
    window.onscroll = this.resetTimeOutTimer();
    window.onkeypress = this.resetTimeOutTimer();
  }

  startWarningTimer() {
    console.log("timoutWarning: ", timoutWarning);
    warningTimer = setTimeout(this.idleWarning(), timoutWarning);
  }

  // Reset timers.
  resetTimeOutTimer() {
    console.log("resetTimeOutTimer");
    clearTimeout(timeoutTimer);
    clearTimeout(warningTimer);
    this.startWarningTimer();
  }

  // Show idle timeout warning dialog.
  idleWarning() {
    console.log("IdleWarning: ", timoutNow);
    clearTimeout(warningTimer);
    timeoutTimer = setTimeout(this.idleTimeout(), timoutNow);
    window.jQuery("#logoutWarningModal").modal("show");
  }

  // Logout the user.
  idleTimeout() {
    localStorage.clear();
    console.log("Logout called");
    // window.location.href = logoutUrl;
  }

  hideLogoutWarningModal() {
      
    console.log("Logout hide");
    window.jQuery("#logoutWarningModal").modal("hide");
  }

  forceLogout() {
    this.IdleTimeout();
  }

  /* istanbul ignore next */
  continueSession() {
      
    console.log("continue");
    this.hideLogoutWarningModal();
    this.resetTimeOutTimer();
  }

  render() {
    return (
      <div
        className="modal fade logoutWarningModal"
        id="logoutWarningModal"
        role="dialog"
        data-backdrop="static"
        data-keyboard="false"
        style={{display:"none"}}
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content rounded-0">
            <div className="modal-header rounded-0">
              <h6 className="modal-title">Auto logout for inactivity</h6>
            </div>
            <div className="modal-body">
              <p>
                Your session will end in a minute. Do you want to continue your
                session?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                onClick={this.forceLogout.bind(this)}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-default customize-view-btn"
                onClick={this.continueSession.bind(this)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
