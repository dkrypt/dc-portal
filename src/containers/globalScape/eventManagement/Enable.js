import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import AxiosInstance from "../api/api.js";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export const Enable = ({closeModal, openModal, eventName, toastMessage }) => {
  const [runNowData, setRunNowData] = useState('');
  const [loaded, setLoaded] = useState(false);
  const onEnablebuttonClick = () => {
    setLoaded(true);
    axios
      .post("/02/SelfServicePortal/ENE_SYNC_ENABLE_EVENT?EventRuleName=MFT_Admin_TestTransfer&event_Enabled=true")
      .then((response) => {
        setRunNowData(response.data);
        closeModal();
        toastMessage(true, runNowData);
      })
      .catch((e) => console.error(e));
  }
  return (
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Body>
        <p className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="gs_eve-name">Event Name*</label>
          <div className="col-sm-8"><i className="fa fa-user icon"></i>
            <input className="form-control form-control-sm" type="text" id="gs_eve-name" name="gs_eve-name" value={eventName} />  
          </div>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onEnablebuttonClick}>            
          {!loaded ? (
            "Enable"
          ) : (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
