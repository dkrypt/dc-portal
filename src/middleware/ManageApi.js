// import React from 'react';
import axios from "axios";

let Host = "https://dev-threadconnect.apps.ge.com/v1/api";

let createTcNewProvisioningUrl = `${Host}/tc/`;
let ProjectNameListUrl = `${Host}/tc/project-names`;
let ProjectNameExistUrl = `${Host}/tc/find/project-name`;
let createNewInstanceUrl = `${Host}/tc/upgrade`;
let FindProjectInfoUrl = `${Host}/tc/project-names`;
let projectDataUrl = `${Host}/tc/projects`;

// const token = localStorage.getItem("token");

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
};

export default Api;
