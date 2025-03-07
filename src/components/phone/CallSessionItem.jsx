import React, { useEffect, useState } from "react";
import { SessionState } from "sip.js";
import { useSessionCall, SessionDirection } from "react-sipjs";
import { Typography, Paper } from "@mui/material";
import { CallTimer } from "./CallTimer";
import ringtone from "./ringtone.mp3";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { CallGETAPI } from "../../helper/Constants";
import { useSelector } from "react-redux";
import IncomingCallModal from "../models/IncomingCallModal";
export const  CallSessionItem = (props) => {
  const { sessionId, setShowHistory, setRecordings, showHistory, fetchCallHistory, fetchRecordings } = props;
  const {
    isMuted,
    decline,
    hangup,
    mute,
    answer,
    session,
    unmute,
    direction,
    timer,
  } = useSessionCall(sessionId);

  const [audio] = useState(new Audio(ringtone));
  const sip = useSelector((state) => state.wallet.extension_number);
  const [showIncomingCallPopup, setShowIncomingCallPopup] = useState(false); // State for showing incoming call popup




  useEffect(() => {
    if (
      session &&
      session.state === SessionState.Initial &&
      direction === SessionDirection.INCOMING
    ) {
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
      setShowIncomingCallPopup(true); // Show popup when there's an incoming call
    } else {
      audio.pause();
      audio.currentTime = 0;
      setShowIncomingCallPopup(false); // Hide popup when call ends
    }
    // fetchCallHistory();
    // fetchRecordings();
  }, [session, direction, audio, session?.state]);

  return session && session.state !== SessionState.Terminated ? (
    <>
      {/* <Paper
        elevation={3}
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "24px",
          padding: "20px",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", minWidth: "0", gap: "16px" }}>
          <div
            style={{
              flex: "none",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#B2B8BD",
              backgroundImage: 'url("assets/img/messages-3.jpg")',
              backgroundPosition: "center",
              backgroundSize: "47px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div style={{ minWidth: "0", flex: "1" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "1.5px",
                color: "#374151",
                textAlign: "left",
              }}
            >
              Session ID:{" "}
              {session.id.length > 4 ? session.id.substring(0, 10) : session.id}
              ......
            </Typography>
            {/* <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "1.5px",
                color: "#374151",
                textAlign: "left",
              }}
            >
              Name: {session.request.from?.displayName || "Unknown"}
            </Typography> */}
            {/* <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "1.5px",
                color: "#374151",
                textAlign: "left",
              }}
            >
              Number: {session.request.from?.uri?.user || "Unknown"}
            </Typography>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              {session.state && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6B7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {session.state}
                </Typography>
              )}

              {session.state === SessionState.Initial &&
                direction === SessionDirection.INCOMING && (
                  <div style={{ display: "flex", gap: "15px" }}>
                    <ImPhone
                      className="phone-icon"
                      style={{
                        color: "green",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={answer}
                    />
                    <ImPhoneHangUp
                      className="phone-icon"
                      style={{
                        color: "red",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={decline}
                    />
                  </div>
                )}

              {session.state === SessionState.Initial ||
                (session.state === SessionState.Establishing &&
                  direction === SessionDirection.OUTGOING && (
                    <div onClick={hangup}>
                      <ImPhoneHangUp
                        className="phone-icon"
                        style={{
                          color: "red",
                          width: "40px",
                          height: "40px",
                          borderRadius: "40px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ))}

              {session.state === SessionState.Established && (
                <div onClick={hangup}>
                  <ImPhoneHangUp
                    className="phone-icon"
                    style={{
                      color: "red",
                      width: "40px",
                      height: "40px",
                      borderRadius: "40px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}

              {session.state === SessionState.Established && (
                <div onClick={isMuted ? unmute : mute}>
                  {isMuted ? (
                    <FaMicrophoneSlash
                      className="phone-icon"
                      style={{
                        color: "gray",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <FaMicrophone
                      className="phone-icon"
                      style={{
                        color: "gray",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: "0",
            flexShrink: "0",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#374151", marginTop: "10px" }}
          >
            Duration:{" "}
            {timer?.answeredAt && (
              <CallTimer
                isEnd={session.state === "Terminated"}
                startAt={timer.answeredAt}
              />
            )}
            {!timer?.answeredAt && <span>N/C</span>}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "4px",
            }}
          >
            <div
              style={{
                flex: "none",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "rgba(46, 204, 113, 0.2)",
                padding: "4px",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#2ECC71",
                }}
              ></div>
            </div>
            <Typography variant="caption" sx={{ color: "#6B7280" }}>
              {direction === SessionDirection.INCOMING
                ? "Incoming Call"
                : "Outgoing Call"}
            </Typography>
          </div>
        </div>
      </Paper> */} 
      {/* <IncomingCallModal
        show={showIncomingCallPopup}
        callerName={session?.request?.from?.displayName || "Unknown"}
        callerNumber={session?.request?.from?.uri?.user || "Unknown"}
        onAccept={() => {
          answer();
          // setShowIncomingCallPopup(false);
        }}
        onReject={() => {
          decline();
          setShowIncomingCallPopup(false);
        }}
      /> */}
    </>
  ) : null;
};
