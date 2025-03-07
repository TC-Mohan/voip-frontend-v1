import React from "react";
import "./CallSummary.css";
import CallIcon from "@mui/icons-material/Call";
import CallSplitIcon from "@mui/icons-material/CallSplit"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed"; 
import Skeleton from "react-loading-skeleton";



function CallSummary({ data,isLoading }) {
  if (!data && !isLoading) {
    return (
      <div className="call-summary">
        Loading call summary...
      </div>
    );
  }

  // Calculate totals from the array of daily data
  const totalCalls = !isLoading && data ? data.reduce((sum, day) => sum + (parseInt(day.Answere) || 0) + (parseInt(day.misscalls) || 0), 0) : 0;
  const totalAnsweredCalls = !isLoading && data ? data.reduce((sum, day) => sum + (parseInt(day.Answere) || 0), 0) : 0;
  const totalCanceledCalls = !isLoading && data ? data.reduce((sum, day) => sum + (parseInt(day.misscalls) || 0), 0) : 0;

  return (
    <div className="call-summary">
      <div className="summary-header">
        <i className="tio-user-big"></i>
        <h4 style={{ fontSize: "18px" }}>Call Summary</h4>
      </div>

      <div className="table-row header-row data">
        {/* <p className="data1">{totalCalls}</p>
        <p className="data2">{totalAnsweredCalls}</p>
        <p>{totalCanceledCalls}</p> */}

     <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CallIcon  style={{ marginRight: "8px", color: "green" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : totalCalls}
        </p>
        {/* <p>Answered</p> */}
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CallSplitIcon  style={{ marginRight: "8px", color: "green" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : totalAnsweredCalls}
        </p>
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <MissedCallIcon style={{ marginRight: "8px", color: "red" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : totalCanceledCalls}
        </p>
      </div>
      <div className="table-row">
      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center",color:"#0dcaf0",backgroundColor:"white" }}>
          Total Calls
        </p>
        {/* <p>Answered</p> */}
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center",color:"green" }}>
          Answered
        </p>
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center",color:"red" }}>
          Missed
        </p>
      </div>
    </div>
  );
}

// Add default props
// CallSummary.defaultProps = {
//   data: []
// };

export default CallSummary;