import React, { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

import "./NewEngagementRequest.css";

export default class NewEngagementRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        o6plgrd: { type: "STRING", value: "" },
        gNyqknj: {
          type: "MULTI_PICKLIST",
          value: [],
        },
        LgnNkad: { type: "STRING", value: "" },
        "5LDlaAA": { type: "STRING", value: "" },
        dgP98v3: { type: "STRING", value: "" },
        XMEm9Wg: {
          type: "MULTI_PICKLIST",
          value: [],
        },
        "1e1RdLl": { type: "STRING", value: "" },
        LaonMN2: { type: "STRING", value: "" },
        vLNEwre: { type: "STRING", value: "" },
        rkoPWZP: { type: "STRING", value: "" },
        EQ1v55l: { type: "STRING", value: "" },
        MeOjkkJ: { type: "STRING", value: "" },
        EMAIL_RECEIPT: { type: "STRING", value: "" },
      },
      submissionToken: "",
      formDisplay: "block",
      emailDisplay: "none",
      formMsgDisplay: "none",
      formSuccessMsg: "",
      isRequired: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailCheckbox = this.handleEmailCheckbox.bind(this);
  }

  componentDidMount() {
    this.props.clickEvent({
      pageName: "NewEngagementRequest",
      headerText: "NEW ENGAGEMENT REQUEST",
      subHeaderText: "GLOBAL",
    });

    setTimeout(() => {
      var multipleCancelButton = new window.Choices(
        "#choices-multiple-remove-button",
        {
          removeItemButton: true,
          maxItemCount: 10,
          searchResultLimit: 5,
          renderChoiceLimit: 10,
          itemSelectText: "",
          // placeholder: true,
          // placeholderValue: "Select",
        }
      );

      // disable past dates

      window.jQuery(function () {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10) month = "0" + month.toString();
        if (day < 10) day = "0" + day.toString();

        var minDate = year + "-" + month + "-" + day;

        window.jQuery("#inputDate").attr("min", minDate);
      });
    }, 50);

    var serviceNames = [];

    this.props.setPersonaHandler(serviceNames);

    /* axios.request({
      baseURL: TOKEN_URL,
      method: "GET",
      responseType: "text",
      transformResponse: (response) => {
        const body = response;

        const tokenRegexResult = TOKEN_REGEX.exec(body);

        console.log("Tokenfromreg: ", tokenRegexResult);

        if (!tokenRegexResult || tokenRegexResult.length !== 2) {
          throw new Error("Failed to refresh submission token");
        }
        this.state.submissionToken = tokenRegexResult[1];
        console.log("SubToken: ", this.state.submissionToken);
      },
    }); */
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    var valueOptions = [];
    var currentFormData = Object.assign({}, this.state.formData);

    if (target.multiple === true) {
      var options = target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          valueOptions.push(options[i].value);
        }
      }
    }

    currentFormData[name].value =
      valueOptions.length > 0 ? valueOptions : value;

    this.setState({
      formData: currentFormData,
    });
  }

  handleEmailCheckbox(event) {
    const target = event.target;

    if (target.checked) {
      this.setState({
        emailDisplay: "block",
        isRequired: true,
      });
    } else {
      var currentFormData = Object.assign({}, this.state.formData);
      currentFormData.EMAIL_RECEIPT.value = "";
      this.setState({
        formData: currentFormData,
        emailDisplay: "none",
        isRequired: false,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      formDisplay: "none",
      formMsgDisplay: "block",
    });

    /* const dataJson = JSON.stringify(this.state.formData);
    const dataBlob = new Blob([dataJson], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("data", dataBlob);

    const submissionToken = this.state.submissionToken; */

    /*    const postForm = axios
      .request({
        baseURL: `${this.props.baseURL}`,
        url: `${this.props.path}`,
        method: "POST",
        data: formData,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Bearer " + `${this.props.authToken}`,

          "x-smar-submission-token": submissionToken,
          "x-smar-forms-version": APP_VERSION,
          "x-smar-is-user": "false",
        },
      })
      .then((response) => {
        this.setState({
          formSuccessMsg: response.data.confirmation.message,
        });
        console.log("Successful Post: ", response);
      })
      .catch((error) => {
        console.log("Form Error: ", error);
        this.setState({
          formSuccessMsg: "Unsuccessful",
        });
      }); */

    const dataJson = Object.assign({}, this.state.formData);

    dataJson.parent = "1d045bab-bf8e-4719-8634-1d7bc9b6ab80";
    dataJson.name = "New Engagement Request";
    /*  const apiEndPoint = BASEURL + this.props.baseUrl + "formdata-" + uuidv4() */
    const apiEndPoint = this.props.baseUrl + "formdata-" + uuidv4();

    fetch(apiEndPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authToken,
      },
      body: JSON.stringify(dataJson),
    }).then((response) => {
      this.setState({
        formSuccessMsg: "Successful",
      });
    });
  }

  // istanbul ignore next

  render() {
    return (
      <Fragment>
        <div className="container-lg w-100 p-3 borderStyle">
          <div
            className="container post-submit-msg text-center"
            style={{ display: this.state.formMsgDisplay }}
          >
            <h5>{this.state.formSuccessMsg}</h5>
          </div>
          <form
            className="form-container"
            style={{ display: this.state.formDisplay }}
            onSubmit={this.handleSubmit}
          >
            <div className="form-row">
              <div className="form-group required col-md-6">
                <label className="control-label" htmlFor="inputTitle">
                  Title
                </label>
                <input
                  type="text"
                  name="o6plgrd"
                  className="form-control "
                  id="inputTitle"
                  placeholder=""
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputDate">Planned Go-Live</label>
                <input
                  type="date"
                  name="LgnNkad"
                  className="form-control "
                  id="inputDate"
                  onChange={this.handleInputChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="choices-multiple-remove-button">
                Primary Technology
              </label>
              <select
                id="choices-multiple-remove-button"
                type="multi-select"
                className="form-control"
                name="gNyqknj"
                onChange={this.handleInputChange}
                multiple
              >
                <option defaultValue></option>
                <option>ThreadConnect</option>
                <option>EnterpriseConnect</option>
                <option>DIVE</option>
                <option>OIC</option>
                <option>Boomi</option>
                <option>SOA</option>
                <option>Globascape</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputProbState">Problem Statement</label>
                <input
                  type="text"
                  name="5LDlaAA"
                  className="form-control "
                  id="inputProbState"
                  onChange={this.handleInputChange}
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputBusiBenefit">Business Benefit</label>
                <input
                  type="text"
                  name="dgP98v3"
                  className="form-control "
                  id="inputBusiBenefit"
                  onChange={this.handleInputChange}
                  placeholder=""
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="choices-multiple-remove-button">
                  Benefit Type
                </label>
                <select
                  id="choices-multiple-remove-button"
                  name="XMEm9Wg"
                  type="multi-select"
                  className="form-control"
                  onChange={this.handleInputChange}
                  multiple
                >
                  <option defaultValue></option>
                  <option>Cost Avoidance</option>
                  <option>Cost Reduction</option>
                  <option>Cloud Migration</option>
                  <option>Revenue Generation</option>
                  <option>Productivity</option>
                  <option>Security/Compliance</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCTQ">CTQ</label>
                <input
                  type="text"
                  name="1e1RdLl"
                  onChange={this.handleInputChange}
                  className="form-control "
                  id="inputCTQ"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputImpact">Impact</label>
                <input
                  type="text"
                  name="LaonMN2"
                  onChange={this.handleInputChange}
                  className="form-control "
                  id="inputImpact"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPriority">Priority</label>
                <select
                  id="inputPriority"
                  onChange={this.handleInputChange}
                  name="vLNEwre"
                  className="form-control "
                >
                  <option defaultValue></option>
                  <option>High</option>
                  <option>Low</option>
                  <option>Medium</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputSPOC">Customer SPOC</label>
                <input
                  type="text"
                  name="rkoPWZP"
                  onChange={this.handleInputChange}
                  className="form-control "
                  id="inputSPOC"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputBusiness">Business</label>
                <select
                  id="inputBusiness"
                  onChange={this.handleInputChange}
                  name="EQ1v55l"
                  className="form-control "
                >
                  <option defaultValue></option>
                  <option>Power - Gas Power</option>
                  <option>Power - PC</option>
                  <option>Power - Nuclear</option>
                  <option>Power - HQ</option>
                  <option>Aviation</option>
                  <option>Capital</option>
                  <option>Renewables</option>
                  <option>GED</option>
                  <option>Corporate Global Functions</option>
                  <option>Corp Easter</option>
                  <option>Corp Finance IT</option>
                  <option>Corp Data & Analytics</option>
                  <option>Healthcare</option>
                  <option>Healthcare ES</option>
                  <option>Webtec</option>
                  <option>Global Operations</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputAnnualOutcome">Annual Outcome</label>
                <input
                  type="text"
                  name="MeOjkkJ"
                  onChange={this.handleInputChange}
                  className="form-control "
                  id="inputAnnualOutcome"
                />
              </div>
            </div>
            <div
              className="form-row"
              style={{ display: this.state.emailDisplay }}
            >
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail">Email address</label>
                <input
                  type="email"
                  name="EMAIL_RECEIPT"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  onChange={this.handleInputChange}
                  placeholder="Enter email"
                  required={this.state.isRequired ? "required" : ""}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  onChange={this.handleEmailCheckbox}
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Send me a copy of my responses
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}
