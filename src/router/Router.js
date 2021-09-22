import React from "react";
import { Switch, Route } from "react-router-dom";

import { Dashboard as MainDashboard } from "../containers/mainDashboard/Dashboard.js";
import { ThreadConnect } from "../containers/threadConnect/ThreadConnect.js";
import {EnterpriseConnect} from "../containers/enterpriseConnect/EnterpriseConnect.js";
import {Dive} from "../containers/dive/Dive.js";
import {DivePower} from "../containers/dive/DivePower.js";
import {NewEngagementRequest} from "../containers/engagementRequest/NewEngagementRequest.js";
import {Dashboard as TCDashboard} from "../containers/threadConnect/Dashboard.js";
import {GlobalScape} from "../containers/globalScape/GlobalScape.js";
import Manage from "../containers/manage/Manage.js";
import ManageTC from "../containers/manage/threadConnect/ManageTC.js";
import ManageSubscription from "../containers/manage/subscription/ManageSubscription.js";
import ManageUser from "../containers/manage/user/ManageUser.js";
import {EventList} from "../containers/globalScape/eventManagement/EventList.js";
import {EnableAccount} from "../containers/globalScape/EnableAccount.js";
import {DelegatePriToSso} from "../containers/globalScape/DelegatePriToSso.js";
import {RevokeSso} from "../containers/globalScape/RevokeSso.js";
import {RemoveIP} from "../containers/globalScape/RemoveIP.js";
import MaintainGroup from "../containers/globalScape/MaintainGroup.js";
import ManageAccount from "../containers/globalScape/ManageAccount.js";
import ManageEc from "../containers/manage/enterpriseConnect/ManageEc.js";
import NewUser from "../containers/userManagement/NewUser.js";
import NoSubscriptions from "../containers/userManagement/NoSubscriptions.js";

export default function Router(props) {
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
      <Route exact path="/no-subscriptions">
        <NoSubscriptions
          clickEvent={props.clickEvent}
          isLoader={props.isLoader}
          changeUsername={props.changeUsername}
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
      <Route exact path="/manage/managetc">
        <ManageTC
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manage_ec">
        <ManageEc
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/managesubscription">
        <ManageSubscription
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/manage/manageuser">
        <ManageUser
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/eventmanagement">
        <EventList
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/delegatepriviledgestosso">
        <DelegatePriToSso
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/revokesso">
        <RevokeSso
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>
      <Route exact path="/globalscape/enableaccount">
        <EnableAccount
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>      
      <Route exact path="/globalscape/removeip">
        <RemoveIP
          clickEvent={props.clickEvent}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
          isLoader={props.isLoader}
        />
      </Route>    

      <Route exact path="/globalscape/maintaingroup">
        <MaintainGroup
          clickEvent={props.clickEvent.bind(this)}
          persona={props.persona}
          setPersonaHandler={props.setPersonaHandler.bind(this)}
          baseUrl={props.baseUrl}
          authToken={props.authToken}
        />
      </Route>
      <Route exact path="/globalscape/manageaccount">
        <ManageAccount
          clickEvent={props.clickEvent.bind(this)}
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
