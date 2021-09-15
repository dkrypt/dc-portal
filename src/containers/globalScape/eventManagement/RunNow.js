import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import AxiosInstance from "../api/api.js";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default class RunNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runNowData: "",
      loaded: false,
    };
    this.onEnablebuttonClick = this.onEnablebuttonClick.bind(this);
  }
 
  onEnablebuttonClick() {
    this.setState({ loaded: true });
    axios
      .post(
        "/02/SelfServicePortal/ASYNCExecuteEvent?EventRuleName=MFT_Admin_TestTransfer&ID=12345"
      )
      .then((response) => {
        this.setState({ runNowData: response.data });       
        this.props.closeModal();
        this.props.toastMessage(true, this.state.runNowData);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  render() {
    return (
      <Modal show={this.props.openModal} onHide={this.props.closeModal}>
        <Modal.Body>
          <p className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="gs_eve-name">
              Event Name*
            </label>
            <div className="col-sm-8">
              <i className="fa fa-user icon"></i>             
              <input
                className="form-control form-control-sm"
                type="text"
                id="gs_eve-name"
                name="gs_eve-name"
                value={this.props.eventName}
              />
            </div>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onEnablebuttonClick}>
            {!this.state.loaded ? (
              "Execute Event"
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
  }
}
