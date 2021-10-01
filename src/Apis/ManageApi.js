import axios from "axios";
let createTcNewProvisioningUrl = `/tc/`;
let updateBulkUrl = `/tc/bulk-update`;
let ProjectNameListUrl = `/tc/project-names`;
let ProjectNameExistUrl = `/tc/find/project-name`;
let createNewInstanceUrl = `/tc/upgrade`;
let FindProjectInfoUrl = `/tc/project-names`;
let projectDataUrl = `/tc/projects`;
let productListUrl = `/subscription/products`;
let NewsubscriptionUrl = `/subscription`;
let listOrgUrl = `/subscription/orgs/`;
let listSpaceUrl = `/subscription/orgs/`;
let updatesubscriptionDataUrl = `/subscription/`;
let updatesubscriptionUrl = `/subscription/`;
let ssoSearchUrl = `/user/sso/search`;
let userRoleListUrl = `/user/roles`;
let userListUrl = `/user`;
let getUserRoleListDataUrl = `/user`;
let bucAdnValidateUrl = `/services/buc-adn-validation`;
let helmVersionListUrl = `/services/helm-version`;
let userInstancelistUrl = `/subscription/instance-names`;
let userListUrlData = `/user`;

axios.defaults.headers.common = {
  //   Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
const commonApicall = (method, url, data = {}) => {
  return axios({
    method: method,
    url: url,
    data: data,
  });
};
let baseUrl = sessionStorage.getItem("operationBaseUrl");
const Api = {
  createTcNewProvisioning: (data) =>
    commonApicall("POST", `${baseUrl}${createTcNewProvisioningUrl}`, data),
  UpdateTcNewProvisioning: (data) =>
    commonApicall("PUT", `${baseUrl}${updateBulkUrl}`, data),
  singleTcNewProvisioning: (data) =>
    commonApicall("PUT", `${baseUrl}${createTcNewProvisioningUrl}`, data),
  checkProjectNameExist: (data) =>
    commonApicall("POST", `${baseUrl}${ProjectNameExistUrl}`, data),
  ProjectNameList: (data) =>
    commonApicall("POST", `${baseUrl}${ProjectNameListUrl}`, data),
  createNewInstance: (data) =>
    commonApicall("PUT", `${baseUrl}${createNewInstanceUrl}`, data),
  FindProjectInfo: (id, env) =>
    axios({
      method: "GET",
      url: `${baseUrl}${FindProjectInfoUrl}` + "/" + `${id}` + "/" + `${env}`,
      // data: data,
    }),
  projectData: (data) =>
    commonApicall("POST", `${baseUrl}${projectDataUrl}`, data),
  productList: () =>
    axios({
      method: "GET",
      url: `${baseUrl}${productListUrl}`,
      // data: data,
    }),
  getOrgList: () => commonApicall("GET", `${baseUrl}${listOrgUrl}`, {}),
  getSpaceList: (orgId) =>
    axios({
      method: "GET",
      url: `${baseUrl}${listSpaceUrl}` + `${orgId}`,
      // data: data,
    }),
  getUpdatesubscriptionData: (orgId, spaceId) =>
    axios({
      method: "GET",
      url:
        `${baseUrl}${updatesubscriptionDataUrl}` +
        `${orgId}` +
        "/" +
        `${spaceId}`,
      // data: data,
    }),
  newSubscription: (data) =>
    commonApicall("POST", `${baseUrl}${NewsubscriptionUrl}`, data),
  updatesubscriptionData: (data) =>
    commonApicall("PUT", `${baseUrl}${updatesubscriptionUrl}`, data),
  ssoSearch: (data) => commonApicall("POST", `${baseUrl}${ssoSearchUrl}`, data),
  getUserRoleList: () =>
    commonApicall("GET", `${baseUrl}${userRoleListUrl}`, {}),
  userRole: (data) => commonApicall("POST", `${baseUrl}${userListUrl}`, data),
  getUserRoleListData: (id) =>
    axios({
      method: "GET",
      url: `${baseUrl}${getUserRoleListDataUrl}` + "/" + `${id}`,
      // data: data,
    }),
  bucAdnValidate: (data) =>
    commonApicall(
      "POST",
      `${baseUrl}${bucAdnValidateUrl}`,

      data
    ),
  getHelmVersion: () =>
    axios({
      method: "GET",
      url: `${baseUrl}${helmVersionListUrl}`,
      // data:data
    }),
  userInstancenameList: (id) =>
    axios({
      method: "GET",
      url: `${baseUrl}${userInstancelistUrl}` + "/" + `${id}`,
    }),
  userList: (id, instanceId) =>
    axios({
      method: "GET",
      url:
        `${baseUrl}${userListUrlData}` + "/" + `${id}` + "/" + `${instanceId}`,
    }),
};

export default Api;
