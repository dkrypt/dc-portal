// import React from 'react';
import axios from "axios";

let Host = "https://dev-threadconnect.apps.ge.com/v1/api";

let createTcNewProvisioningUrl = `${Host}/tc/`;
let updateBulkUrl = `${Host}/tc/bulk-update`;

let ProjectNameListUrl = `${Host}/tc/project-names`;
let ProjectNameExistUrl = `${Host}/tc/find/project-name`;
let createNewInstanceUrl = `${Host}/tc/upgrade`;
let FindProjectInfoUrl = `${Host}/tc/project-names`;
let projectDataUrl = `${Host}/tc/projects`;

let productListUrl = `${Host}/subscription/products`;
let NewsubscriptionUrl = `${Host}/subscription`;
let listOrgUrl = `${Host}/subscription/orgs/`;
let listSpaceUrl = `${Host}/subscription/orgs/`;
let updatesubscriptionDataUrl = `${Host}/subscription/`;
let updatesubscriptionUrl = `${Host}/subscription/`;
let ssoSearchUrl = `${Host}/user/sso/search`;
let userRoleListUrl = `${Host}/user/roles`;
let userListUrl = `${Host}/user`;
let getUserRoleListDataUrl = `${Host}/user`;
let bucAdnValidateUrl = `${Host}/services/buc-adn-validation`;
let helmVersionListUrl = `${Host}/services/helm-version`;

// dev-threadconnect.apps.ge.com/v1/api/subscription/orgs/1
// const token = localStorage.getItem("token");
//dev-threadconnect.apps.ge.com/v1/api/services/buc-adn-validation

// console.log(token)
axios.defaults.headers.common = {
  //   Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
// tc/project-names/13/dev'
const Api = {
  createTcNewProvisioning: (data) =>
    axios({
      method: "POST",
      url: createTcNewProvisioningUrl,
      data: data,
    }),
  UpdateTcNewProvisioning: (data) =>
    axios({
      method: "PUT",
      url: updateBulkUrl,
      data: data,
    }),
  singleTcNewProvisioning: (data) =>
    axios({
      method: "PUT",
      url: createTcNewProvisioningUrl,
      data: data,
    }),
  checkProjectNameExist: (data) =>
    axios({
      method: "POST",
      url: ProjectNameExistUrl,
      data: data,
    }),
  ProjectNameList: (data) =>
    axios({
      method: "POST",
      url: ProjectNameListUrl,
      data: data,
    }),
  createNewInstance: (data) =>
    axios({
      method: "PUT",
      url: createNewInstanceUrl,
      data: data,
    }),
  FindProjectInfo: (id, env) =>
    axios({
      method: "GET",
      url: FindProjectInfoUrl + "/" + `${id}` + "/" + `${env}`,
      // data: data,
    }),
  projectData: (data) =>
    axios({
      method: "POST",
      url: projectDataUrl,
      data: data,
    }),
  productList: () =>
    axios({
      method: "GET",
      url: productListUrl,
      // data: data,
    }),
  getOrgList: () =>
    axios({
      method: "GET",
      url: listOrgUrl,
      // data: data,
    }),
  getSpaceList: (orgId) =>
    axios({
      method: "GET",
      url: listSpaceUrl + `${orgId}`,
      // data: data,
    }),
  getUpdatesubscriptionData: (orgId, spaceId) =>
    axios({
      method: "GET",
      url: updatesubscriptionDataUrl + `${orgId}` + "/" + `${spaceId}`,
      // data: data,
    }),

  newSubscription: (data) =>
    axios({
      method: "POST",
      url: NewsubscriptionUrl,
      data: data,
    }),
  updatesubscriptionData: (data) =>
    axios({
      method: "PUT",
      url: updatesubscriptionUrl,
      data: data,
    }),
  ssoSearch: (data) =>
    axios({
      method: "POST",
      url: ssoSearchUrl,
      data: data,
    }),
  getUserRoleList: () =>
    axios({
      method: "GET",
      url: userRoleListUrl,
      // data: data,
    }),
  userRole: (data) =>
    axios({
      method: "POST",
      url: userListUrl,
      data: data,
    }),
  getUserRoleListData: (id) =>
    axios({
      method: "GET",
      url: getUserRoleListDataUrl + "/" + `${id}`,
      // data: data,
    }),

  bucAdnValidate: (data) =>
    axios({
      method: "POST",
      url: bucAdnValidateUrl,
      data: data,
    }),
  getHelmVersion: () =>
    axios({
      method: "GET",
      url: helmVersionListUrl,
      // data:data
    }),
};

export default Api;
