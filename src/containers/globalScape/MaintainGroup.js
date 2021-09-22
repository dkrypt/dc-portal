import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import {ModifyEventNsg} from "./ModifyEventNsg.js";
import {AssignGroup} from "./AssignGroup.js";
function MaintainGroup(props) {
  const [key, setKey] = useState('enableA');
  useEffect(()=>{
    props.clickEvent({
      pageName: "MaintainGroup",
      headerText: "MAINTAIN GROUP",
      subHeaderText: "GLOBAL",
    })
  }, [])
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5">     
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="enableA" title="Assign Group">
      <AssignGroup />
      </Tab>
      <Tab eventKey="disableA" title="Modify Event For Group">
        {/* <div>Modify Event for NSG</div> */}
        <ModifyEventNsg />
      </Tab>      
    </Tabs>
    </div>
  );
}
export default MaintainGroup;
