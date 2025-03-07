
// IncomingCount.jsx
import React from "react";
import "./CallSummary.css";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function IncomingCount({ data, isLoading }) {
  if (!data && !isLoading) {
    return <div>No Call</div>; 
  }

  return (
    <div className="call-summary">
      <div className="summary-header">
        <i className="tio-user-big"></i>
      </div>

      <div className="table-row">
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <CallReceivedIcon style={{ marginRight: "8px", color: "blue" }} />
          Incoming Calls: {isLoading ? <Skeleton width={50} height={20} /> : data?.incoming?.count}
        </p>
      </div>
    </div>
  );
}

export default IncomingCount;
