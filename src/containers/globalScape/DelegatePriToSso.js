import React, {useEffect} from "react";
import { Button } from 'react-bootstrap';
import { useStoreState, useStoreActions } from "easy-peasy";
export const DelegatePriToSso = ({clickEvent, eventName}) => {
  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);
  useEffect(() => {
    setPageTitle("DELEGATE SSO");   
  }, []);

  return (   
    <div className="container-lg w-100 p-3 borderStyle mb-5">
      <h5>Delegate page</h5>
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">SSO To Delegate Privileges</label>
          <div className="col-sm-10">
            <i className="fa fa-user icon"></i>
            <input className="form-control form-control-sm" type="text" id="gs_eve-name" name="gs_eve-name" value={eventName} />
          </div>
        </div>
        <div className="form-group row">
        <div className="col-sm-10 text-center">
          <Button variant="primary" >
            Delegate Privileges
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
