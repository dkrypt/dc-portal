import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Icon_TC from "../../assets/images/Icon-Globalscape.svg";
const ToastMessage = ({ showToast, updateToast, toastMessage }) => {
  return (
    <Toast
      className="d-inline-block m-1 gs-toast"
      onClose={() => updateToast(false, "")}
      show={showToast}
      delay={3000}
      
    >
      <Toast.Header>
        <img src={Icon_TC} className="rounded me-2" alt="" />
        <strong className="me-auto">Alert</strong>
      </Toast.Header>
      <Toast.Body className="success text-white">{toastMessage}</Toast.Body>
      <div className="Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar--success"></div>
    </Toast>
  );
};

export default ToastMessage;
