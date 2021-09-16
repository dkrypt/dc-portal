import React from "react";
import { Modal } from "react-bootstrap";

import Users from "../containers/threadConnect/Users";
import APIs from "../containers/threadConnect/APIs";
import IntegrationVersions from "../containers/threadConnect/IntegrationVersions";

export default function PopUpModal(props) {
  var show = props.showModal;

  return (
    <>
      <Modal show={show} onHide={() => props.onClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalName === "Users" ? (
            <Users />
          ) : props.modalName === "APIs" ? (
            <APIs />
          ) : (
            props.modalName === "Integration Versions" ? (
            <IntegrationVersions />
          ) : (
            ""
          )
          )}
        </Modal.Body>
        {/* might need in future
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>
    </>
  );
}
