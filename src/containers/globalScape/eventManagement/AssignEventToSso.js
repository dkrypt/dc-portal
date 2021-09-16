import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";
import { Spinner } from "react-bootstrap";

export const AssignEventToSso = ({closeModal, openModal, toastMessage }) => {
  const [runNowData, setRunNowData] = useState('');
  const [loaded, setLoaded] = useState(false);
  const onEnablebuttonClick = () => {
    setLoaded(true);
    axios.post('/02/SelfServicePortal/ADD_REMOVE_EVENTS_NSG_GROUPS?EventRuleName=MFT_Admin_TestTransfer&NSG=APP_GE016000000_GE_Read&Request_Mode=ADD')
      .then((res) => {
        setRunNowData(res.data);
        closeModal();
        toastMessage(true, runNowData);
      })
      .catch((err) => console.log(err));
  }
  return (  
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Body>
        <p className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="gs_eve-name">Event Name*</label>
          <div className="col-sm-8"><i className="fa fa-user icon"></i>
            <input className="form-control form-control-sm" type="text" id="gs_eve-name" name="gs_eve-name" />    </div>
        </p>
        <p className="form-group row">
          <label className="col-sm-4 col-form-label" htmlFor="gs_eve-sso">New SSO ID</label>
          <div className="col-sm-8"><i className="fa fa-user icon"></i>
            <input className="form-control form-control-sm" type="text" id="gs_eve-sso" name="gs_eve-sso" /></div>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onEnablebuttonClick}>            
        {
          !loaded ?
          "Assign" : 
          (
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
          )
        }
      </Button>
      </Modal.Footer>
    </Modal>
  );
};
