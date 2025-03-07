import React from "react";
import "./CallSummary.css";
import CallIcon from "@mui/icons-material/Call";
import CallSplitIcon from "@mui/icons-material/CallSplit"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed"; 
import Skeleton from "react-loading-skeleton";

function ExtensionSummary({ data, total,isLoading  }) {
  if ((!data || !total) && !isLoading) {
    return (
      <div className="call-summary">
        Loading call summary...
      </div>
    );
  }

  // Calculate totals from the array of daily data
  const totalCallCounts = data.reduce((sum, day) => sum + (parseInt(day.TotalCallCounts) || 0), 0);
  const totalMisscalls = data.reduce((sum, day) => sum + (parseInt(day.misscalls) || 0), 0);
  const totalAnsweredCalls = data.reduce((sum, day) => sum + (parseInt(day.Answere) || 0), 0);
  const totalDuration = data.reduce((sum, day) => sum + (parseInt(day.duration) || 0), 0);

  return (
    <div className="call-summary">
      <div className="summary-header">
        <i className="tio-user-big"></i>
        <h4 style={{ fontSize: "18px" }}>Extension Summary</h4>
      </div>

      <div className="table-row header-row data">
        {/* <p className="data1">{total.count}</p>
        <p>{total.Answere}</p>
        <p>{total.misscalls}</p> */}
         <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CallIcon  style={{ marginRight: "8px", color: "green" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : total?.count}
        </p>
        {/* <p>Answered</p> */}
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CallSplitIcon  style={{ marginRight: "8px", color: "green" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : total?.Answere}
        </p>
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <MissedCallIcon style={{ marginRight: "8px", color: "red" }} />
          {isLoading ? <Skeleton width={60} height={30} /> : total?.misscalls}
        </p>
      </div>
      <div className="table-row">
      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center",color:"#00FFFF" }}>
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
      {/* <div className="table-row">
        <p>Total Duration: {total.duration} seconds</p>
      </div> */}

      {/* <div className="summary-details">
        <h5>API Totals vs Calculated Totals</h5>
        <p>Total Calls: API {total.count} | Calculated {totalCallCounts}</p>
        <p>Answered Calls: API {total.Answere} | Calculated {totalAnsweredCalls}</p>
        <p>Missed Calls: API {total.misscalls} | Calculated {totalMisscalls}</p>
        <p>Total Duration: API {total.duration} | Calculated {totalDuration}</p>
      </div> */}
    </div>
  );
}

// Add default props
ExtensionSummary.defaultProps = {
  data: [],
  total: { count: 0, Answere: 0, misscalls: 0, duration: 0 }
};

export default ExtensionSummary;