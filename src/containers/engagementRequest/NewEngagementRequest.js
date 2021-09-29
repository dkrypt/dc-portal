import React, { Fragment, useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";

import "./NewEngagementRequest.css";

export const NewEngagementRequest = (props) => {
  const formDataInitialState = {
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
  };

  const [formData, setFormData] = useState(formDataInitialState);
  const [formDisplay, setFormDisplay] = useState("block");
  const [emailDisplay, setEmailDisplay] = useState("none");
  const [formMsgDisplay, setFormMsgDisplay] = useState("none");
  const [formSuccessMsg, setFormSuccessMsg] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const setPageTitle = useStoreActions((actions) => actions.setPageTitle);

  useEffect(() => {
    setPageTitle("NEW ENGAGEMENT REQUEST");

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
  }, []);

  const handleInputChange = (event) => {
    console.log("event: ", event);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("Name: ", name, " target: ", target);
    var valueOptions = [];
    var currentFormData = Object.assign({}, formData);
    console.log("multiple: ", target.multiple);
    if (target.multiple === true) {
      var options = target.options;
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          valueOptions.push(options[i].value);
          console.log("Name: ", name, " value: ", valueOptions);
        }
      }
    }

    currentFormData[name].value =
      valueOptions.length > 0 ? valueOptions : value;

    setFormData(currentFormData);
  };

  const handleEmailCheckbox = (event) => {
    const target = event.target;

    if (target.checked) {
      setEmailDisplay("block");
      setIsRequired(true);
    } else {
      var currentFormData = Object.assign({}, formData);
      currentFormData.EMAIL_RECEIPT.value = "";

      setFormData(currentFormData);
      setEmailDisplay("none");
      setIsRequired(false);
    }
  };

  // istanbul ignore next

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormDisplay("none");
    setFormMsgDisplay("block");

    const dataJson = Object.assign({}, formData);

    dataJson.parent = "1d045bab-bf8e-4719-8634-1d7bc9b6ab80";
    dataJson.name = "New Engagement Request";
    /*  const apiEndPoint = BASEURL + props.baseUrl + "formdata-" + uuidv4() */
    const apiEndPoint = props.baseUrl + "formdata-" + uuidv4();

    fetch(apiEndPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.authToken,
      },
      body: JSON.stringify(dataJson),
    }).then((response) => {
      setFormSuccessMsg("Successful");
    });
  };

  return (
    <Fragment>
      <div className="container-lg w-100 p-3 borderStyle">
        <div
          className="container post-submit-msg text-center"
          style={{ display: formMsgDisplay }}
        >
          <h5>{formSuccessMsg}</h5>
        </div>
        <form
          className="form-container"
          style={{ display: formDisplay }}
          onSubmit={handleSubmit}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="form-control "
                id="inputCTQ"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputImpact">Impact</label>
              <input
                type="text"
                name="LaonMN2"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="form-control "
                id="inputAnnualOutcome"
              />
            </div>
          </div>
          <div className="form-row" style={{ display: emailDisplay }}>
            <div className="form-group col-md-6">
              <label htmlFor="exampleInputEmail">Email address</label>
              <input
                type="email"
                name="EMAIL_RECEIPT"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                onChange={handleInputChange}
                placeholder="Enter email"
                required={isRequired ? "required" : ""}
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
                onChange={handleEmailCheckbox}
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
};
