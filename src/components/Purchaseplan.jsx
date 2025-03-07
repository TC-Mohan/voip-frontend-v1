import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API } from "../helper/Constants";
import ReactLoading from "react-loading";
const Purchaseplan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleBuyClick = async () => {
    try {
      setIsLoading(true);
      // console.log("njhbhg");
      const body = {
        itemName: "shoes",
        itemSKU: "001",
        itemPrice: "300.00",
        itemCurrency: "USD",
        itemQuantity: 2,
      };
      const response = await axios.post(BASE_API + "pay", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      window.location.href = response.data.redirect_url;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <main id="main" className="main" style={{ display: "flex", flexWrap: "wrap" }}>
      {isLoading && (
        <div
          className="d-flex justify-content-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <ReactLoading type="spokes" color="grey" height={50} width={50} />
        </div>
      )}
      {!isLoading && (
        <div className="row">
        <div className="col-md-3">
            <div
              className="purchase-card"
              style={{ border: "1px solid #ccc", marginBottom: "20px" }}
            >
              <div className="card-body"style={{ paddingBottom: "1128px" }}>
                <p className="pricing-plan-title"  style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Extension Pricing</p>
                <h3 className="pricing-plan" style={{ fontSize: '24px', marginBottom: '5px' }}>$35</h3>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>per user/month</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>Billed annually</p>
                <p className="pricing-plan-subtitle text-danger" style={{ fontSize: '24px', marginBottom: '5px' }}>$3500 <br />

(20% OFF)</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>User 5 users minimum</p>
                <button
                  className="btn btn-primary custom-button"
                  onClick={handleBuyClick}
                >
                  Get Started
                </button>
                <ul className="pricing-plan-features"  style={{ listStyleType: "none", paddingLeft: "0", textAlign: "left",paddingTop:"15%"}}>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Outbound calling</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited inbound calling</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Number Purchase</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Local Numbers</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Toll-free Numbers</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Settings</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Inbound Caller ID</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Greetings</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Masking</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Hold Music Customization</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Ringtone Customisation</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>SIP Connections</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Agent Statuses</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Notifications</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Desktop Notifications</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Controls</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Notes</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Parallel Calling</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Forward to Phone</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pause Recording</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Conference Calling</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording Opt-Out</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Reports and Analytics</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Metrics</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pre-built Reports</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Metrics Export</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call transcripts & summary</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team performance analytics</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Summary Report</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Summary Report</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Health Report</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Reports</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Schedule Reports</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Advanced Call Metrics</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Activity Report</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Lifecycle</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Monitoring</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Report</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Ring group</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Escalations</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Transfer</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Queue Transfer</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Warm Transfer</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemails</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Drop</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Transcription</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Live Dashboard</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Queue Visibility</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Agent Activity</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Monitoring</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Scoping</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Volume Analysis</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Barging</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contacts</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Management</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Account Management</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Lifecycle Stages</li>
                  <li> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Activity Timeline</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="purchase-card"
              style={{ border: "1px solid #ccc", marginBottom: "20px" }}
            >
              <div className="card-body" style={{ paddingBottom: "1992px" }}>
                <i
                  className="mdi mdi-cube-outline pricing-plan-icon"
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                />
                <p className="pricing-plan-title"  style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Standard</p>
                <h3 className="pricing-plan" style={{ fontSize: '24px', marginBottom: '5px' }}>$150</h3>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>per user/month</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>Billed annually</p>
                <p className="pricing-plan-subtitle text-danger" style={{ fontSize: '24px', marginBottom: '5px' }}>$1440 <br />

(20% OFF)</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>User1 user minimum</p>
                <button
                  className="btn btn-primary custom-button mb-3"
                  onClick={handleBuyClick}
                >
                  Get Started
                </button>
                <ul className="pricing-plan-features" style={{ listStyleType: "none", paddingLeft: "0", textAlign: "left",paddingTop:"15%"}}>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited inbound calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic call analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic calling features</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Number Purchase</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Local Numbers</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Settings</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Inbound Caller ID</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Ringtone</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Desktop Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>73 credits</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>$0.04 USD per min</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call forwarding from Toll-Free to Toll-Free Only</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Wait Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>External Number Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Controls</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Forward to Phone</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Conference Calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Metrics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Summary Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Ring group</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemails</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Drop</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Transcription</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contacts</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Account Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Lifecycle Stages</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Activity Timeline</p>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="purchase-card"
              style={{ border: "1px solid #ccc", marginBottom: "20px" }}
            >
              <div className="card-body" style={{ paddingBottom: "170px" }}>
                <i
                  className="mdi mdi-cube-outline pricing-plan-icon"
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                />
                <p className="pricing-plan-title"  style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Premium</p>
                <h3 className="pricing-plan" style={{ fontSize: '24px', marginBottom: '5px' }}>$250</h3>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>per user/month</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>Billed annually</p>
                <p className="pricing-plan-subtitle text-danger" style={{ fontSize: '24px', marginBottom: '5px' }}>$2400 <br /> (20% OFF)</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>User2 users minimum</p>
                <button
                  className="btn btn-primary custom-button"
                  onClick={handleBuyClick}
                >
                  Get Started
                </button>
                <ul className="pricing-plan-features "  style={{ listStyleType: "none", paddingLeft: "0", textAlign: "left",paddingTop:"15%"}}>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Everything in Essentials</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Outbound calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited inbound calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic call analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic calling features</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Number Purchase</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Local Numbers</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Toll-free Numbers</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Bring Your Own Carrier (BYOC)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Settings</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Inbound Caller ID</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Greetings</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Masking</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Hold Music Customization</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Ringtone Customisation</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>SIP Connections</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Agent Statuses</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>IVR / Call menus</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Desktop Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Controls</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Notes</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Parallel Calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Forward to Phone</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pause Recording</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Conference Calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording Opt-Out</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Reports and Analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Metrics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pre-built Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Metrics Export</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call transcripts & summary</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team performance analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Summary Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Summary Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Health Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Schedule Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Advanced Call Metrics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Activity Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Lifecycle</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Monitoring</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Ring group</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Escalations</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Queue Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Warm Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>132 credits</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>$0.03 USD per min</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>
                    Call forwarding free from Toll-Free to Toll-Free & Toll-Free
                    to DID
                  </p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Option to choose number</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Wait Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>External Number Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Business Hours</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>IVR (Phone Trees)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Advanced Call Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Escalations</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Non-Business Hours Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Holiday Calendar</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Holiday Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Queue Callback (Virtual Hold)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Routing Automation</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Speech Enabled IVR (beta)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Answer Bot (beta)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemails</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Drop</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Transcription</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Live Dashboard</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Queue Visibility</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Agent Activity</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Monitoring</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Scoping</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Volume Analysis</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Barging</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contacts</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Account Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Lifecycle Stages</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Activity Timeline</p>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="purchase-card"
              style={{ border: "1px solid #ccc", marginBottom: "20px" }}
            >
              <div className="card-body" style={{ paddingBottom: "20px" }}>
                <i
                  className="mdi mdi-cube-outline pricing-plan-icon"
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                />
                <p className="pricing-plan-title"  style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Unlimited</p>
                <h3 className="pricing-plan" style={{ fontSize: '24px', marginBottom: '5px' }}>$800</h3>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>per user/month</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>Billed annually</p>
                <p className="pricing-plan-subtitle text-danger" style={{ fontSize: '24px', marginBottom: '5px' }}>$7680 <br /> (20% OFF)</p>
                <p className="pricing-plan-subtitle" style={{ fontSize: '14px', marginBottom: '5px' }}>User 1 users minimum</p>
                <button
                  className="btn btn-primary custom-button"
                  onClick={handleBuyClick}
                >
                  Get Started
                </button>
                <ul className="pricing-plan-features"  style={{ listStyleType: "none", paddingLeft: "0", textAlign: "left",paddingTop:"15%"}}>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Outbound calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited inbound calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Sales dialer - Auto dialer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic call analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic calling features</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Number Purchase</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Local Numbers</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Buy Toll-free Numbers</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Bring Your Own Carrier (BYOC)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Settings</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Inbound Caller ID</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Greetings</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Masking</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Hold Music Customization</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Ringtone Customisation</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>SIP Connections</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Agent Statuses</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>IVR / Call menus</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Desktop Notifications</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Controls</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Notes</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Parallel Calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Forward to Phone</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pause Recording</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Conference Calling</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Recording Opt-Out</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Reports and Analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Metrics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Pre-built Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Metrics Export</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call transcripts & summary</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team performance analytics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Summary Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Summary Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Center Health Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Custom Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Schedule Reports</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Advanced Call Metrics</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Activity Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Lifecycle</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Monitoring</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Service Level Report</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Ring group</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Escalations</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Queue Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Warm Transfer</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited credits</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Unlimited minutes</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>
                    Call forwarding free from Toll-Free to Toll-Free & Toll-Free
                    to DID
                  </p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Option to choose number (TFN charges applied)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Note: 5 Buckets only*</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Call Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Basic Wait Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>External Number Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Business Hours</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>IVR (Phone Trees)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Advanced Call Queues</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Agent Extensions</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Escalations</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Non-Business Hours Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Holiday Calendar</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Holiday Routing</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Queue Callback (Virtual Hold)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Routing Automation</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Speech Enabled IVR (beta)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Smart Answer Bot (beta)</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemails</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Drop</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Voicemail Transcription</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Live Dashboard</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Queue Visibility</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Real-Time Agent Activity</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Monitoring</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Team Scoping</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Volume Analysis</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Call Barging</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contacts</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Account Management</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Contact Lifecycle Stages</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Activity Timeline</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Premium support</p>
                  <p> <i className="bi bi-check2-circle" style={{ color: "green" }}></i>Dedicated success manager</p>
                </ul>
              </div>
            </div>
          </div>
       
        </div>
      )}
    </main>
  );
};

export default Purchaseplan;
