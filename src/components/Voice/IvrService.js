import React, { useState, useEffect,useRef } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
function IvrService() {
  const [text, setText] = useState("");
  const [languages] = useState([
    { code: "en-US", name: "English (United States)" },
    { code: "en-GB", name: "English (United Kingdom)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    // Add more languages as needed
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const [speechRate, setSpeechRate] = useState(1);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      fetchVoices();
    } else {
      alert("Speech synthesis not supported in your browser.");
    }
  }, []);

  const fetchVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    const maleVoices = availableVoices.filter(
      (voice) => voice.gender === "male"
    );
    const femaleVoices = availableVoices.filter(
      (voice) => voice.gender === "female"
    );
    setVoices([...maleVoices, ...femaleVoices]);

    if (maleVoices.length > 0) {
      setSelectedVoice(maleVoices[0]);
    } else if (femaleVoices.length > 0) {
      setSelectedVoice(femaleVoices[0]);
    }
  };

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.voice = selectedVoice;
      utterance.rate = parseFloat(speechRate);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech!");
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleVoiceChange = (event) => {
    const selectedVoiceIndex = event.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  const handleSpeechRateChange = (event) => {
    setSpeechRate(event.target.value);
  };

  const speechRateOptions = [];
  for (let i = 0.5; i <= 2; i += 0.1) {
    speechRateOptions.push(
      <option key={i} value={i}>
        {i.toFixed(1)}
      </option>
    );
  }

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState("UTC");
  const [deliveryTimeWindowStart, setDeliveryTimeWindowStart] = useState(
    new Date()
  );
  const [deliveryTimeWindowEnd, setDeliveryTimeWindowEnd] = useState(
    new Date()
  );
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

  const handleDeliveryTimeWindowStartChange = (event) => {
    setDeliveryTimeWindowStart(event.target.value);
  };

  const handleDeliveryTimeWindowEndChange = (event) => {
    setDeliveryTimeWindowEnd(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const [tags, setTags] = useState([
    "Amsterdam",
    "Washington",
    "Sydney",
    "Beijing",
    "Cairo",
  ]);

  const handleChange = (tags) => {
    setTags(tags);
  };
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file here
    // console.log('Uploaded file:', file);
  };
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active">IVR </li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong className="border-bottom border-3 pb-2">IVR</strong>
              </h3>
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                ></div>
              </div>
              <div className="mb-3 col-md-12 text-end mt-4">
              <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      <button type="button" className="btn btn-outline-dark" onClick={handleClick}>
        <FontAwesomeIcon icon={faFileImport} /> Import IVR File
      </button>
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div
                        class="accordion "
                        id="accordionFlushExample"
                      >
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Recipients and message
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              {" "}
                              <div className="container">
                                <div className="row mb-3">
                                  <label
                                    htmlFor="recipients"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Recipients:
                                  </label>
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      className="form-control w-100"
                                      id="sender"
                                      // value={sender}
                                      // onChange={(e) =>
                                      //   setSender(e.target.value)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="sender"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Sender:
                                  </label>
                                  <div className="col-sm-6">
                                    <input
                                      type="text"
                                      className="form-control w-100"
                                      id="sender"
                                      // value={sender}
                                      // onChange={(e) =>
                                      //   setSender(e.target.value)
                                      // }
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="message"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Message:
                                  </label>
                                  <div className="col-sm-6">
                                    <textarea
                                      className="form-control w-100"
                                      rows="4"
                                      cols="50"
                                      placeholder="Enter text..."
                                      value={text}
                                      onChange={(e) => setText(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="language"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Language:
                                  </label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-control w-100"
                                      id="language"
                                      value={selectedLanguage}
                                      onChange={handleLanguageChange}
                                    >
                                      {languages.map((language, index) => (
                                        <option
                                          key={index}
                                          value={language.code}
                                        >
                                          {language.name}
                                        </option>
                                      ))}
                                      {/* Add more language options as needed */}
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="voice"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Voice:
                                  </label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-control w-100"
                                      id="voice"
                                      value={
                                        selectedVoice ? selectedVoice.name : ""
                                      }
                                      onChange={handleVoiceChange}
                                    >
                                      {voices.map((voice, index) => (
                                        <option key={index} value={voice.name}>
                                          {voice.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    htmlFor="speechRate"
                                    className="col-sm-4 col-form-label d-flex justify-content-end"
                                  >
                                    Speech rate:
                                  </label>
                                  <div className="col-sm-6">
                                    <select
                                      className="form-control w-100"
                                      id="speechRate"
                                      value={speechRate}
                                      onChange={handleSpeechRateChange}
                                    >
                                      {speechRateOptions}
                                    </select>
                                  </div>
                                </div>
                                <button
                                  class="btn btn-outline-dark"
                                  onClick={speak}
                                >
                                  Speak
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingTwo">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              Message Scheduling
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              <Container>
                                <h2>Communication Settings</h2>
                                <Form>
                                  <Form.Group controlId="startDate">
                                    <Form.Label>Start Date:</Form.Label>
                                    <Form.Control
                                      type="date"
                                      value={startDate}
                                      onChange={handleStartDateChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="startTime">
                                    <Form.Label>Start Time:</Form.Label>
                                    <Form.Control
                                      type="time"
                                      value={startTime}
                                      onChange={handleStartTimeChange}
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="timeZone">
                                    <Form.Label>Time Zone:</Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={timeZone}
                                      onChange={handleTimeZoneChange}
                                    >
                                      <option value="UTC">UTC</option>
                                      <option value="America/New_York">
                                        America/New_York
                                      </option>
                                      <option value="Europe/London">
                                        Europe/London
                                      </option>
                                    
                                    </Form.Control>
                                  </Form.Group>
                                  <Form.Group controlId="deliveryTimeWindowStart">
                                    <Form.Label>
                                      Delivery Time Window Start:
                                    </Form.Label>
                                    <Form.Control
                                      type="time"
                                      value={deliveryTimeWindowStart}
                                      onChange={
                                        handleDeliveryTimeWindowStartChange
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="deliveryTimeWindowEnd">
                                    <Form.Label>
                                      Delivery Time Window End:
                                    </Form.Label>
                                    <Form.Control
                                      type="time"
                                      value={deliveryTimeWindowEnd}
                                      onChange={
                                        handleDeliveryTimeWindowEndChange
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="days">
                                    <Form.Label>Days:</Form.Label>
                                    <Form.Control
                                      as="select"
                                      multiple
                                      value={days}
                                      onChange={handleDaysChange}
                                    >
                                      <option value="Monday">Monday</option>
                                      <option value="Tuesday">Tuesday</option>
                                      <option value="Wednesday">
                                        Wednesday
                                      </option>
                                      <option value="Thursday">Thursday</option>
                                      <option value="Friday">Friday</option>
                                      <option value="Saturday">Saturday</option>
                                      <option value="Sunday">Sunday</option>
                                    </Form.Control>
                                  </Form.Group>
                                </Form>
                              </Container>
                            </div>
                          </div>
                        </div> */}
                        {/* <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingThree">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              Tracking and reporting
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body"></div>
                          </div>
                        </div> */}
                        {/* <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingFour">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseFour"
                              aria-expanded="false"
                              aria-controls="flush-collapseFour"
                            >
                              Accordion Item #4
                            </button>
                          </h2>
                          <div
                            id="flush-collapseFour"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingFour"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              Placeholder content for this accordion, which is
                              intended to demonstrate the{" "}
                              <code>.accordion-flush</code> class. This is the
                              fourth item's accordion body. You can customize
                              this with your own content.
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {/* <div className="main">
                        <div class="card">
                          
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default IvrService;

// import React from 'react'

// function IvrService() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default IvrService
