// DuplicateCount.jsx
import React from "react";
import "./CallSummary.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DuplicateCount({ data, isLoading }) {
  if (!data && !isLoading) {
    return <div>No Data Available</div>;
  }

  // Sum up all duplicate counts from all campaigns
  const totalDuplicates = !isLoading && data ? data.reduce(
    (sum, campaign) => sum + (parseInt(campaign.duplicate) || 0),
    0
  ) : 0;

  return (
    <div className="call-summary">
      <div className="summary-header">
        <i className="tio-user-big"></i>
      </div>

      <div className="table-row">
        <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
          <ContentCopyIcon style={{ marginRight: "8px", color: "orange" }} />
          Duplicate Calls: {isLoading ? <Skeleton width={50} height={20} /> : totalDuplicates}
        </p>
      </div>
    </div>
  );
}

export default DuplicateCount;