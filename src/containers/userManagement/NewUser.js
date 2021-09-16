import React, { Link } from "react";

import "./UserManagement.css";

export default function NewUser() {
  return (
    <div className="container-lg new-user">
      {/* <div className="col-12">
        <img className="img-fluid GE-Logo" alt="LOGO" src={""} />
      </div> */}
      <div className="col-12 msg">
        <p className="m-0 text-center">
          <b>
            Oops! It seems that you do not have access to Digital Connect Self
            Service Portal. Please contact your ORG Administrator/SPOC
          </b>
        </p>
      </div>
    </div>
  );
}
