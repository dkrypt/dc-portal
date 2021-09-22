import React, { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";
//import "./SearchModal.css";
let SearchModal = (props) => {
  const [intialValue, setIntialValue] = useState([
    { Id: 503135030, Mail: "vinay@ge.com" },
    { Id: 503260579, Mail: "chittaranjan@ge.com" },
    { Id: 503125032, Mail: "srinivas@ge.com" },
    { Id: 503270680, Mail: "asraf@ge.com" },
  ]);
  const [Admin, setAdmin] = useState({});
  const [show, setShow] = useState(false);
  //Close Modal
  const handleClose = () => {
    setShow(false);
  };
  //HandleAdd
  const handleAdd = () => {
    props.addAdmin(Admin);
    handleClose();
    props.clearSSO();
  };
  //Show Modal
  const handleShow = () => {
    setShow(true);
    console.log("IN Search Modal ", props.sso);
    Searchsso();
  };

  //Search SSO
  const Searchsso = () => {
    console.log("Call API");
  };
  //Handle Checked
  const handleChecked = (event, admin) => {
    // let AdminList = Admin;
    console.log("Old Admin", Admin);
    if (event.target.checked) {
      setAdmin(admin);
    } else {
    }
  };

  return (
    <Fragment>
      <Button
        onClick={handleShow}
        style={{ height: "38px", display: "inline" }}
      >
        <img
          src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
          alt=""
        />
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>SSO Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="SSOtable">
            <thead style={{ textAlign: "center" }}>
              <tr>
                <td></td>
                <td> SSO</td>
                <td> Mail-ID</td>
              </tr>
            </thead>
            <tbody>
              {intialValue.map((element, i) => {
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        padding: "10px",
                      }}
                    >
                      <input
                        type="radio"
                        id={element.Id}
                        value={element.Mail}
                        onChange={(e) => handleChecked(e, element)}
                      />
                    </td>
                    <td style={{ padding: "10px" }}>{element.Id}</td>
                    <td style={{ padding: "10px" }}>{element.Mail}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default SearchModal;
