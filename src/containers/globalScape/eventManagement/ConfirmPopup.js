import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
const ConfirmPopup = (props) => {
  const [smShow, setSmShow] = useState(true);

  const OnCancelButtonClick = () => {
    props.onClose();
    setSmShow(false);
  };

  const onSaveButtonClick = () => {
    if (props.selectedOption == "enable") {
      props.onEnable();
    } else if (props.selectedOption == "disable") {
      props.onDisable();
    } else if (props.selectedOption == "run now") {
      props.onRunNow();
    }
    props.onClose();
  };

  return (
    <Modal size="sm" show={smShow} onHide={OnCancelButtonClick}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Confirmation Box
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please confirm {props.confirmBoxMsg} of this event.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={OnCancelButtonClick}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveButtonClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPopup;
