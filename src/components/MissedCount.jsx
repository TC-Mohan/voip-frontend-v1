// MissedCount.jsx
import React from "react";
import "./CallSummary.css"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function MissedCount({ data, isLoading }) {
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
          <MissedCallIcon style={{ marginRight: "8px", color: "red" }} />
          Missed Calls: {isLoading ? <Skeleton width={50} height={20} /> : data?.missed?.count}
        </p>
      </div>
    </div>
  );
}

export default MissedCount;