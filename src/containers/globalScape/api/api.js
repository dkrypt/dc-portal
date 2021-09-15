import axios from "axios";
 const AxiosInstance = axios.create({
    baseURL: 'https://tc-eng-portal-aws.digitalconnect.apps.ge.com/api/02/SelfServicePortal',
    timeout: 100000
  });

  export default AxiosInstance;

  // Run now   https://tc-eng-portal-aws.digitalconnect.apps.ge.com/api/02/SelfServicePortal/ASYNCExecuteEvent?EventRuleName=MFT_Admin_TestTransfer&ID=12345
