import React, { useEffect, useState } from "react";
import "./Dialpad.css";
import "react-h5-audio-player/lib/styles.css";
import { SIPProvider } from "react-sipjs";
import { CallCenter } from "./CallCenter";
import { BASE_DOMAIN } from "./constant";
import { Link } from "react-router-dom";
// import LiveCallTbl from "./LiveCallTbl";
import { CallGETAPI } from "../../helper/Constants";
import { useSelector } from "react-redux";

const containerStyle = {
  padding: "1.25rem",
};

const Dialpad = () => {
  const [LiveData, setLiveData] = useState([]);
  const [is_loading, setIsLoading] = useState(false);
  const [resetPage, setResetPage] = useState(false);
  const liveCalls = useSelector((state) => state.wallet.liveCalls);

  const fetchLiveCalls = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/live-calls-v2");
      // console.log("live call fetch", response);
      const result = response?.data?.liveCalls || [];
      // Filter out disconnected calls
      const filteredLiveCalls = result.filter(call => call.state !== 'DISCONNECTED');
      setLiveData(filteredLiveCalls);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
   
    // fetchLiveCalls();
    // const intervalId = setInterval(fetchLiveCalls, 5000);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if(resetPage) {
      setIsLoading(true);
      setTimeout(()=> {
        setIsLoading(false);
      }, 1000);
    }

  },[resetPage])

  const handleResetPage = () => {
    setResetPage(true);
    setTimeout(()=> {
      setResetPage(false);
    })
  };
  

  return (
    <>
      <main id="main" className="main">
        {/* Page Title */}
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Phone</li>
            </ol>
          </nav>
        </div>

        <div className="iframe-container">
          {/* Dialpad Container */}
          <div style={containerStyle}>
            {!is_loading ? <CallCenter handleResetPage={handleResetPage} /> : "Loading...."}
          </div>
        </div>

        {/* <div className="main">
          <div className="accordion mt-4" id="accordionExample">
            <div className="accordion-item mt-4 mx-2">
              <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Live Calls
                  </button>
                </h2>
                <button className="btn btn-info" onClick={fetchLiveCalls}>Fetch Calls</button>
              </div>

              
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Dialpad;
