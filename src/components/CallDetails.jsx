import React from "react";
import "./CallSummary.css"; 
import CallIcon from "@mui/icons-material/Call";
import Skeleton from 'react-loading-skeleton';

function CallDetails({ data, isLoading }) {
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
          <CallIcon style={{ marginRight: "8px", color: "green" }} />
          Total Calls: {isLoading ? <Skeleton width={50} height={20} /> : data?.total?.count}
        </p>
      </div>
    </div>
  );
}

export default CallDetails;