import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { EnableAccount } from "./EnableAccount.js";
import { useStoreState, useStoreActions } from "easy-peasy";
// import DisableAccount from "./DisableAccount.js"
function ManageAccount(props) {
  const [key, setKey] = useState("enableA");
  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);
  useEffect(() => {
    setPageTitle("MANAGE ACCOUNT");
  }, []);
  return (
    <div className="container-lg w-100 p-3 borderStyle mb-5">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="enableA" title="Enable Account">
          <EnableAccount />
        </Tab>
        {/* <Tab eventKey="disableA" title="Disable Account">
        <DisableAccount />
      </Tab>       */}
      </Tabs>
    </div>
  );
}
export default ManageAccount;
