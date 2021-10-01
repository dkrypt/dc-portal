import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard as MainDashboard } from "../containers/mainDashboard/Dashboard.js";
import { ThreadConnect } from "../containers/threadConnect/ThreadConnect.js";
import { EnterpriseConnect } from "../containers/enterpriseConnect/EnterpriseConnect.js";
import { Dive } from "../containers/dive/Dive.js";
import { DivePower } from "../containers/dive/DivePower.js";
import { NewEngagementRequest } from "../containers/engagementRequest/NewEngagementRequest.js";
import { Dashboard as TCDashboard } from "../containers/threadConnect/Dashboard.js";
import { GlobalScape } from "../containers/globalScape/GlobalScape.js";
import Manage from "../containers/manage/Manage.js";
import ManageTC from "../containers/manage/threadConnect/ManageTC.js";
import ManageSubscription from "../containers/manage/subscription/ManageSubscription.js";
import ManageUser from "../containers/manage/user/ManageUser.js";
import { EventList } from "../containers/globalScape/eventManagement/EventList.js";
import { DelegatePriToSso } from "../containers/globalScape/DelegatePriToSso.js";
import { RevokeSso } from "../containers/globalScape/RevokeSso.js";
import { RemoveIP } from "../containers/globalScape/RemoveIP.js";
import MaintainGroup from "../containers/globalScape/MaintainGroup.js";
import ManageAccount from "../containers/globalScape/ManageAccount.js";
import ManageEc from "../containers/manage/enterpriseConnect/ManageEc.js";
import NewUser from "../containers/userManagement/NewUser.js";
import NoSubscriptions from "../containers/userManagement/NoSubscriptions.js";
import { useStoreState, useStoreActions } from "easy-peasy";

export default function Router(props) {
  const baseUrl = useStoreState(
    (state) => state.dataStore.operations.dataset.manageUrl
  );
  useEffect(() => {
    sessionStorage.setItem("operationBaseUrl", baseUrl);
  }, [baseUrl]);

  return (
    <Switch>
      <Route exact path="/new-user">
        <NewUser />
      </Route>
      <Route exact path="/">
        <MainDashboard
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/user-management">
        <NoSubscriptions
          clickEvent={props.clickEvent}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/thread-connect">
        <ThreadConnect
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/enterprise-connect">
        <EnterpriseConnect
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/dive">
        <Dive
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/dive-power">
        <DivePower
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/new-engagement-request">
        <NewEngagementRequest
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/thread-connect/dashboard">
        <TCDashboard
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape">
        <GlobalScape
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage">
        <Manage
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manage-tc">
        <ManageTC
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manage-ec">
        <ManageEc
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manage-subscription">
        <ManageSubscription
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manage-user">
        <ManageUser
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/event-management">
        <EventList
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/delegate-priviledges">
        <DelegatePriToSso
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/revoke-sso">
        <RevokeSso
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/remove-ip">
        <RemoveIP
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>

      <Route exact path="/globalscape/maintain-group">
        <MaintainGroup
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/manage-account">
        <ManageAccount
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
    </Switch>
  );
}
