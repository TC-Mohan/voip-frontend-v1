import React, { useEffect, useState } from "react";
import { SessionState } from "sip.js";
import { useSessionCall, SessionDirection } from "react-sipjs";
import { Typography, Paper } from "@mui/material";

import ringtone from "../phone/ringtone.mp3";
import { ImPhone, ImPhoneHangUp } from "react-icons/im";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { CallTimer } from "../phone/CallTimer";
import { useDispatch, useSelector } from "react-redux";
import { updateCallBalance, updatedMoney } from "../../slices/WalletSlice";

const IncomingCallModal = (props) => {
  const { sessionId } = props;
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
  const [showIncomingCallPopup, setShowIncomingCallPopup] = useState(false);
  const dispatch = useDispatch(); 
  const userBalance = useSelector((state) => state.wallet.balance);

  useEffect(() => {
    if (
      session &&
      session.state === SessionState.Initial &&
      direction === SessionDirection.INCOMING
    ) {
      audio.play().catch((error) => console.error("Error playing audio:", error));
      setShowIncomingCallPopup(true);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setShowIncomingCallPopup(false);
    }
  }, [session, direction, audio, session?.state]);


// <----- OUTGOING call pr wallet se amount subtruct krne ke liye functionalities add  ki he ------>

  useEffect(() => {
    let intervalId;

    const handleCallEstablish = () => {
      if (session && session.state === SessionState.Established && direction === SessionDirection.OUTGOING) {
        intervalId = setInterval(async () => {
          const cost = 1; // $1 per 30 seconds
          if (userBalance >= cost) {
            const newBalance = await dispatch(updateCallBalance({ amount: cost })).unwrap();
            await dispatch(updatedMoney(newBalance));
          } else {
            hangup(); 
          }
        }, 30000); // 30 seconds interval
      }
    };

    if (session && session.state === SessionState.Established) {
      // handleCallEstablish();
    }

    return () => clearInterval(intervalId);
  }, [session, dispatch, userBalance, hangup]);



  const getDisplayNumber = () => {
    if (direction === SessionDirection.OUTGOING) {
      return session.request.to?.uri?.user || "Unknown";
    } else {
      return session.request.from?.uri?.user || "Unknown";
    }
  };
  return session && session.state !== SessionState.Terminated ? (
    <div className="call-modal">
      <Paper elevation={3} className="call-modal-content">
        <div className="call-modal-left">
          <div
            className="call-modal-avatar"
            style={{ backgroundImage: 'url("assets/img/messages-3.jpg")' }}
          ></div>
          <div className="call-modal-info" style={{padding:"0%",margin:"-5px"}}>
            <Typography variant="subtitle1">
              Session ID: {session.id.length > 4 ? session.id.substring(0, 10) : session.id}
              ......
            </Typography>
            {/* <Typography variant="subtitle1" style={{display:"flex"}}>
              Number: {session.request.from?.uri?.user || "Unknown"}
            </Typography> */}
            <Typography variant="subtitle1" style={{display:"flex"}}>
  Number: {getDisplayNumber()}
</Typography>
            <div className="call-modal-actions">
              {session.state && (
                <Typography variant="body2">{session.state}</Typography>
              )}
              {session.state === SessionState.Initial &&
                direction === SessionDirection.INCOMING && (
                  <div className="call-modal-actions">
                    <ImPhone
                      className="call-modal-action-icon"
                      style={{ color: "green" }}
                      onClick={answer}
                    />
                    <ImPhoneHangUp
                      className="call-modal-action-icon"
                      style={{ color: "red" }}
                      onClick={decline}
                    />
                  </div>
                )}
              {(session.state === SessionState.Initial ||
                session.state === SessionState.Establishing) &&
                direction === SessionDirection.OUTGOING && (
                  <ImPhoneHangUp
                    className="call-modal-action-icon"
                    style={{ color: "red" }}
                    onClick={hangup}
                  />
                )}
              {session.state === SessionState.Established && (
                <>
                  <ImPhoneHangUp
                    className="call-modal-action-icon"
                    style={{ color: "red" }}
                    onClick={hangup}
                  />
                  <div onClick={isMuted ? unmute : mute}>
                    {isMuted ? (
                      <FaMicrophoneSlash
                        className="call-modal-action-icon"
                        style={{ color: "gray", }}
                      />
                    ) : (
                      <FaMicrophone
                        className="call-modal-action-icon"
                        style={{ color: "gray",height:"20px",width:"15px" }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="call-modal-right">
          <Typography variant="body2" className="call-modal-duration">
            Duration:{" "}
            {timer?.answeredAt && (
              <CallTimer
                isEnd={session.state === "Terminated"}
                startAt={timer.answeredAt}
              />
            )}
            {!timer?.answeredAt && <span>N/C</span>}
          </Typography>
          <div className="call-modal-status">
            <div className="call-modal-status-indicator">
              <div className="call-modal-status-indicator-inner"></div>
            </div>
            <Typography variant="caption">
              {direction === SessionDirection.INCOMING ? "Incoming Call" : "Outgoing Call"}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  ) : null;
};

export default IncomingCallModal;
