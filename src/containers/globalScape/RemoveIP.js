import React, { useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useStoreState, useStoreActions } from "easy-peasy";
export const RemoveIP = ({eventName}) => {
  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);
  useEffect(() => {
    setPageTitle("REMOVE IP");  
  }, []);
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5">
    <h5>Remove IP From Ban List</h5>
    <form>
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">IP Address</label>
        <div className="col-sm-6">
          <i className="fa fa-user icon"></i>
          <input className="form-control form-control-sm" type="text" id="gs_eve-name" name="gs_eve-name" value={eventName} />
        </div>
      </div>
      <div className="form-group row">
      <div className="col-sm-10 text-center">
        <Button variant="primary" >
          Remove from Ban List
        </Button>
        </div>
      </div>
    </form>
  </div>
  );
};
