import React, { useState } from "react";
import { Row, Col, Table, Dropdown } from "react-bootstrap";

import defaultLogo from "../../assets/images/Logo-UserProfile.jpg";

export default function IntegrationVersions() {
  const [integration, setIntegration] = useState("");
  const [integrationArr, setIntegrationArr] = useState([]);

  const tableData = {
    Integration1: [
      {
        flowName: "Flow-1",
        version: "2",
        date: "06/26/21",
        comment: "initial commit",
      },
      {
        flowName: "Flow-2",
        version: "2",
        date: "06/23/21",
        comment: "version2 commit",
      },
      {
        flowName: "Flow-3",
        version: "2",
        date: "06/22/21",
        comment: "version3 commit",
      },
    ],
    Integration2: [
      {
        flowName: "Flow-4",
        version: "2",
        date: "06/24/21",
        comment: "initial commit",
      },
      {
        flowName: "Flow-5",
        version: "2",
        date: "06/25/21",
        comment: "version2 commit",
      },
      {
        flowName: "Flow-6",
        version: "2",
        date: "06/26/21",
        comment: "version3 commit",
      },
      {
        flowName: "Flow-7",
        version: "2",
        date: "06/26/21",
        comment: "version3 commit",
      },
    ],
    Integration3: [
      {
        flowName: "Flow-8",
        version: "2",
        date: "06/23/21",
        comment: "initial commit",
      },
      {
        flowName: "Flow-9",
        version: "2",
        date: "06/23/21",
        comment: "version2 commit",
      },
      {
        flowName: "Flow-10",
        version: "2",
        date: "06/23/21",
        comment: "version3 commit",
      },
    ],
  };

  const handleIntegration = (value) => {
    setIntegration(value);
    var tempArr = Object.assign([],tableData[value]);
    setIntegrationArr(tempArr);
  };

  return (
    <>
      <select
        className="col-4 borderStyle mb-2"
        name="role"
        onChange={(e) => handleIntegration(e.target.value)}
        placeholder="Select a Role"
        required
      >
        <option defaultValue>Select a Integration</option>
        <option>Integration1</option>
        <option>Integration2</option>
        <option>Integration3</option>
      </select>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Flow Name</th>
            <th>Version Number</th>
            <th>Date</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {integrationArr.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="row">
                    <div className="col-12">
                      <p>{data.flowName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <p>{data.version}</p>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <p>{data.date}</p>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <p>{data.comment}</p>
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
