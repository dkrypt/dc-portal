import React, { useState } from "react";
import { Row, Col, Table } from "react-bootstrap";

import defaultLogo from "../../assets/images/Logo-UserProfile.jpg";

export default function APIs() {
  const tableData = [
    {
      APIName: "API-1",
      port: "8101",
      integrationName: "RACES",      
      status: "RUNNING",
    },
    {
      APIName: "API-2",
      port: "8102",
      integrationName: "POWER",      
      status: "RUNNING",
    },{
      APIName: "API-3",
      port: "8103",
      integrationName: "SAP",      
      status: "STOPPED",
    },{
      APIName: "API-4",
      port: "8104",
      integrationName: "RACES",      
      status: "DISABLED",
    },
  ];


  return (
    <>     
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>API Name</th>
            <th>Port</th>
            <th>Integration Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            return (
              <tr key={index}>
                <td>
                  <div className="row">
                    <div className="col-12">
                      <p>{data.APIName}</p>                      
                    </div>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                    <p>{data.port}</p>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                  <p>{data.integrationName}</p>
                  </div>
                </td>
                <td>
                  <div className="col-12">
                  <p>{data.status}</p>
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
