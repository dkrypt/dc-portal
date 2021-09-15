import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "../containers/mainDashboard/Dashboard.js";
import ThreadConnect from "../containers/threadConnect/ThreadConnect.js";
import EnterpriseConnect from "../containers/enterpriseConnect/EnterpriseConnect.js";
import Dive from "../containers/dive/Dive.js";
import DivePower from "../containers/dive/DivePower.js";
import NewEngagementRequest from "../containers/engagementRequest/NewEngagementRequest.js";
import TCDashboard from "../containers/threadConnect/Dashboard.js";
import GlobalScape from "../containers/globalScape/GlobalScape.js";
import Manage from "../containers/manage/Manage.js";
import ManageTC from "../containers/manage/threadConnect/ManageTC.js";
import ManageSubscription from "../containers/manage/subscription/ManageSubscription.js";
import ManageUser from "../containers/manage/user/ManageUser.js";
import EventList from "../containers/globalScape/eventManagement/EventList.js";
import EnableAccount from "../containers/globalScape/EnableAccount.js";
import DelegatePriToSso from "../containers/globalScape/DelegatePriToSso.js";
import RevokeSso from "../containers/globalScape/RevokeSso.js";
import ModifyEventNsg from "../containers/globalScape/ModifyEventNsg.js";
import RemoveIP from "../containers/globalScape/RemoveIP.js";
import AssignGroup from "../containers/globalScape/AssignGroup.js";
import DisableAccount from "../containers/globalScape/DisableAccount.js";
import ManageEc from "../containers/manage/enterpriseConnect/ManageEc.js";

export default function Router(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/threadconnect">
        <ThreadConnect
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/enterpriseconnect">
        <EnterpriseConnect
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/dive">
        <Dive
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/divepower">
        <DivePower
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/newengagementrequest">
        <NewEngagementRequest
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/threadconnect/dashboard">
        <TCDashboard
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape">
        <GlobalScape
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage">
        <Manage
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/manage/managetc">
        <ManageTC
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/manage/manage_ec">
        <ManageEc
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/manage/managesubscription">
        <ManageSubscription
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/manage/manageuser">
        <ManageUser
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/eventmanagement">
        <EventList
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/delegatepriviledgestosso">
        <DelegatePriToSso
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/revokesso">
        <RevokeSso
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/enableaccount">
        <EnableAccount
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/modifyeventfornsg">
        <ModifyEventNsg
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/removeip">
        <RemoveIP
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/assigngroup">
        <AssignGroup
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>

      <Route exact path="/globalscape/disableaccount">
        <DisableAccount
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
    </Switch>
  );
}
