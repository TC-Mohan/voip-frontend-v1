import React from "react";
import { Typography } from "@mui/material";
import moment from "moment-timezone";
import CallMadeIcon from "@mui/icons-material/CallMade"; 
import CallReceivedIcon from "@mui/icons-material/CallReceived"; 
import MissedCallIcon from "@mui/icons-material/PhoneMissed"; 

const formatDuration = (duration) => {
  if (duration === 0) {
    return <span>N/C</span>;
  } else if (duration < 60) {
    return <span>{duration} sec</span>;
  } else {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} hr `;
    }
    if (minutes > 0 || hours > 0) {
      formattedDuration += `${minutes} min `;
    }
    formattedDuration += `${seconds} sec`;

    return <span>{formattedDuration.trim()}</span>;
  }
};

const formatDateTime = (dateTimeString) => {
  const [year, month, day, time] = dateTimeString.split("-");
  const date = `${day}/${month}/${year}`;
  const [hours, minutes, seconds] = time.split(":");
  let formattedHours = hours % 12 || 12; 
  const amPm = hours >= 12 ? "PM" : "AM"; 
  const formattedTime = `${formattedHours}:${minutes} ${amPm}`;
  return `${date} ${formattedTime}`;
};


const getCallIcon = (data) => {
  if (data.direction === "inbound" && (data.status === "CANCEL" || data.status === "NOANSWER" || data.status === "CHANUNAVAIL")) {
    return <MissedCallIcon style={{ color: "red" }} />; // Missed inbound call
  } else if (data.direction === "inbound") {
    return <CallReceivedIcon style={{ color: "blue" }} />; // Answered incoming call
  } else if (data.direction === "outbound") {
    return <CallMadeIcon style={{ color: "green" }} />; // Outgoing call
  }
  return null; 
};



const TableComponent1 = (props) => {
  const { data  } = props; // Assuming  is passed as a prop
  const formattedDate = data?.start_time ? formatDateTime(data.start_time) : "";
  const getDisplayNumber = () => {
    return data.direction === "outbound" ? data.call_to : data.call_from;
  };

  return data ? (
    <div className="table-container">
      <table className="table">
        <tbody>
          <tr>
            <td className="text-start">
            <div className="text-#FFFF fw-bold">{getDisplayNumber()}</div>
              <Typography
                variant="body2"
                sx={{ color: "#374151", marginTop: "5px" }}
              >
                {formatDuration(data.dur)}
              </Typography>
            </td>
            <td className="text-end">
              <div
                style={{
                  display: "flex",
                  flexGrow: "0",
                  flexShrink: "0",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {getCallIcon(data, )}
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    {data.direction}
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  sx={{ color: "#374151", marginTop: "5px" }}
                >
                <strong>{formattedDate}</strong>

                </Typography>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;
};

export default TableComponent1;
