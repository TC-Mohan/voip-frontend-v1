import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import { Provider } from "./MultiStepFormContext";
import Details from "./StepOne";
import Address from "./StepTwo";
import Links from "./StepThree";
import Save from "./StepFour";
// Destructuring Steps component from antd
const { Step } = Steps;

// Initial state values for user details, address details and links details
const detailsInitialState = {
  campaignname: "",
  country: "",
};

const addressInitialState = {
  TollFreeNumber: "",
  Publisher_id: "",
};

const linksDetailsInitialState = {
  target_id: "",
  name: "",
  number: "",
  trackingrevenue: "",
  duplicatecalls: "",
  filterrepeatcaller: "",
  anonymouscall: "",
  recordcalls: "",
  waittoanswer: "",
  trimsilence: "",
  targetdialattempts: "",
  timezone: "",
  selectedOption: "selectTarget",
};

// Main component
const MultiStepForm = () => {
  // Initializing state for user details, address details, links details and current step
  const [details, setDetails] = useState(detailsInitialState);
  const [address, setAddress] = useState(addressInitialState);
  const [linksDetails, setLinksDetails] = useState(linksDetailsInitialState);
  const [currentStep, setCurrentStep] = useState(0);
  // Function to navigate to the next step
  const next = () => {

    if (currentStep === 4) {
      // Resetting state values and going back to the first step after submitting the form
      setCurrentStep(0);
      setDetails(detailsInitialState);
      setAddress(addressInitialState);
      setLinksDetails(linksDetailsInitialState);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  // Function to navigate to the previous step
  const prev = () => setCurrentStep(currentStep - 1);
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          {/* <h1>Create campaigns</h1> */}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Create Campaigns</a>
              </li>
              <li className="breadcrumb-item active"></li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body">
              <h1></h1>
              {/* Bordered Tabs Justified */}
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                >
                  <div className="card" style={{ boxShadow: "none" }}>
                    <div
                      className="card-body"
                      style={{ padding: 0, overflowX: "auto" }}
                    ></div>
                  </div>
                </div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="card" style={{ boxShadow: "none" }}>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="App">
                        {/* <h1>React multi step</h1> */}
                        {/* Providing state values to the MultiStepFormContext provider */}
                        <Provider
                          value={{
                            details,
                            setDetails,
                            next,
                            prev,
                            address,
                            setAddress,
                            linksDetails,
                            setLinksDetails,
                          }}
                        >
                          <Steps current={currentStep}>
                            <Step title={"Setup Your Campaign"} />
                            <Step title={"Tracking Number"} />
                            <Step title={"Add a Target"} />
                            {/* <Step title={"Review"} /> */}
                            <Step title={"Set it Live!"} />
                          </Steps>
                          {/* Rendering current step */}
                          <main>{renderStep(currentStep)}</main>
                        </Provider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      {/* <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer> */}
    </>
  );
};
// Function to render current step
const renderStep = (step) => {
  switch (step) {
    case 0:
      return <Details />;
    case 1:
      return <Address />;
    case 2:
      return <Links />;
    case 3:
    // return <Review />;
    case 4:
      return <Save />;
    default:
      return null;
  }
};

export default MultiStepForm;
