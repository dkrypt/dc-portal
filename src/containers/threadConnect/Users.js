import React, { useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

import defaultLogo from "../../assets/images/Logo-UserProfile.jpg";

export default function Users() {
  const initialTableData = [
    {
      userName: "Shubham Paskanti",
      userId: "503249986",
      emailId: "Shubham.PPaskanti@ge.com",
      accessPermissions: {
        developer: true,
        admin: true,
        viewer: true,
      },
      imgSrc: "",
    },
    {
      userName: "Deepak Kumar",
      userId: "503249982",
      emailId: "Deepak.Kumar@ge.com",
      accessPermissions: {
        developer: true,
        admin: true,
        viewer: true,
      },
      imgSrc: "",
    },
    {
      userName: "Chittaranjan Sahu",
      userId: "503249983",
      emailId: "Chittaranjan.Sahu@ge.com",
      accessPermissions: {
        developer: true,
        admin: false,
        viewer: true,
      },
      imgSrc: "",
    },
    {
      userName: "Srinivas Madamshetty",
      userId: "503249984",
      emailId: "Srinivas.Madamshetty@ge.com",
      accessPermissions: {
        developer: false,
        admin: true,
        viewer: true,
      },
      imgSrc: "",
    },
    {
      userName: "Kavita Gupta",
      userId: "503249985",
      emailId: "Shubham.PPaskanti@gmail.com",
      accessPermissions: {
        developer: true,
        admin: false,
        viewer: false,
      },
      imgSrc: "",
    },
  ];

  const [emailid, setEmailid] = useState("");
  const [role, setRole] = useState("");
  const [tableData, setData] = useState(initialTableData);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    var tempData = {
      userName: emailid,
      userId: emailid,
      emailId: emailid,
      accessPermissions: {
        developer: role === "Developer" ? true : false,
        admin: false,
        viewer: role === "Viewer" ? true : false,
      },
      imgSrc: "",
    }

    var currentData = Object.assign([],tableData)

    currentData.push(tempData)

    setData(currentData)
  };

  return (
    <>
      <div className="row">
        <div className="col mb-2">
          <form id="search-form" onSubmit={handleSubmit}>
            <input
              className="col-4 borderStyle p-1"
              name="emailid"
              type="search"
              placeholder="Enter Email ID"
              onChange={(e) => setEmailid(e.target.value)}
              required
            ></input>
            <select
              className="col-4 borderStyle ml-1 tc-user-role"
              name="role"
              onChange={(e) => setRole(e.target.value)}
              placeholder="Select a Role"
              required
            >
              <option defaultValue>
                Select a Role
              </option>
              <option>Developer</option>
              <option>Viewer</option>
            </select>
            <button type="submit" className="btn-secondary ml-1 borderStyle">
              <small>Add User</small>
            </button>
          </form>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User Details</th>
            <th>Admin</th>
            <th>Developer</th>
            <th>Viewer</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="row">
                    <div className="col-2 text-center">
                      <img
                        className="img-fluid"
                        src={data.imgSrc == "" ? defaultLogo : data.imgSrc}
                        alt=""
                      />
                    </div>
                    <div className="col-10 p-0 tc-user-table">
                      <p className="m-0 p-0">{data.userName}</p>
                      <br />
                      <p className="m-0 p-0">{data.userId}</p>
                      <br />
                      <p className="m-0 p-0">
                        <a href={`mailto:${data.emailId}`}>{data.emailId}</a>
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <input
                      type="checkbox"
                      defaultChecked={
                        data.accessPermissions.admin ? "checked" : ""
                      }
                      disabled
                    />
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <input
                      type="checkbox"
                      defaultChecked={
                        data.accessPermissions.developer ? "checked" : ""
                      }
                      disabled
                    />
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <input
                      type="checkbox"
                      defaultChecked={
                        data.accessPermissions.viewer ? "checked" : ""
                      }
                      disabled
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
