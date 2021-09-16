import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';

export const RevokeSso = ({clickEvent, eventName}) => {
  useEffect(() => {
    clickEvent({
      pageName: "RevokeSso",
      headerText: "REVOKE SSO",
      subHeaderText: "GLOBAL",
    });
  }, []);
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5">
    <h5>Revoke SSO</h5>
    <form>
      <div className="form-group row">
        <label for="inputPassword" className="col-sm-2 col-form-label">SSO ID</label>
        <div className="col-sm-10">
          <i className="fa fa-user icon"></i>
          <input className="form-control form-control-sm" type="text" id="gs_eve-name" name="gs_eve-name" value={eventName} />
        </div>
      </div>
      <div className="form-group row">
      <div className="col-sm-10 text-center">
        <Button variant="primary" onClick="">
          Revoke Privileges
        </Button>
        </div>
      </div>
    </form>
  </div>
  );
};