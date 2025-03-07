import React, { useEffect, useState } from "react";
import { CallSessionItem } from "../phone/CallSessionItem"; // Import CallSessionItem component

import {
  RegisterStatus,
  CONNECT_STATUS,
  useSIPProvider,
  useSessionCall,
  SessionDirection,
} from "react-sipjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faInfoCircle,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { CallGETAPI } from "../../helper/Constants";
import { BASE_DOMAIN } from "../phone/constant";
import IncomingCallModal from "../models/IncomingCallModal";
import { SessionState } from "sip.js";
import ringtone from "../phone/ringtone.mp3";
// /components/phone/ringtone.mp3

function HandleCallCenter() {
  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();

  // const sessionId = Object.keys(sessions)?.reverse()[0];

  const sessionId = Object.keys(sessions)?.reverse()[0] || "";
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
  // const [audio] = useState(new Audio(ringtone));
  const [sip, setSip] = useState("");
  const [showIncomingCallPopup, setShowIncomingCallPopup] = useState(false);
  // const [showDialIcon, setShowDialIcon] = useState(true);
  const [showHistory, setShowHistory] = useState([]);
  const [sipData, setSipData] = useState([]);
  const [showDialIcon, setShowDialIcon] = useState(false);
  const [showConnectIcon, setShowConnectIcon] = useState(false); // State to control showing connect icon
  const fetchRecords = async () => {
    try {
      const response = await CallGETAPI("api/get-user-extension");
      if (response.status) {
        const result = response.data;
        setSipData([result.data]); // Update state with the fetched data
        if (result.data && result.data.id) {
          setSip(result.data.id); // Set the default SIP ID
          setShowConnectIcon(true);
        }
      } else {
        console.error("Error fetching records:", response.message);
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
    }
  };

  useEffect(() => {
    if (sip !== "") {
      handleConnect();
    }
  }, [sip]); // Watch the SIP state for changes and trigger connection accordingly

  const fetchCallHistory = async () => {
    try {
      if(!sip){
        return "";
      }
      const response = await CallGETAPI(
        `api/call-history-v2/?extension=${sip}`
      );
      // const result = response?.data?.cdr;
      const result = response?.data;
      if (response.status) {
        setShowHistory(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConnect = async () => {
    if (sip === "") {
      toast.error("No SIP ID set!");
      return;
    }
    const selectedSip = sipData[0];
    await connectAndRegister({
      username: selectedSip?.username,
      password: selectedSip?.password,
    });
    setShowConnectIcon(false);
  };

  // const handleConnect = (e) => {
  //   e.preventDefault();
  //   if (sip === "") {
  //     toast.error("No SIP ");
  //     return;
  //   }

  //   // Move connect function into useEffect to execute it when SIP ID is set
  //   useEffect(() => {
  //     if (sip !== "") {
  //       handleConnect();
  //     }
  //   }, [sip]);

  //   // const selectedSip = sipData.find((sipItem) => sipItem.id === sip);
  //   const selectedSip = sipData[0];
  //   connectAndRegister({
  //     username: selectedSip?.username,
  //     password: selectedSip?.password,
  //   });
  //   setShowConnectIcon(false);
  // };

  const handleDisconnect = (e) => {
    sessionManager?.disconnect();
    setPhoneNumber("");
    setSip("");
    setShowDialIcon(true);
    // setShowHistory([]);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const numberToAlphabetMap = {
    1: "",
    2: "ABC",
    3: "DEF",
    4: "GHI",
    5: "JKL",
    6: "MNO",
    7: "PQRS",
    8: "TUV",
    9: "WXYZ",
    0: " ",
  };

  const handleKeyPress = (key) => {
    setPhoneNumber((prevNumber) => prevNumber + key);
  };

  const handleBackspace = () => {
    setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleKeyboardInput = (event) => {
    const { key } = event;

    if (/^[0-9*#]$/.test(key)) {
      handleKeyPress(key);
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (/[A-Za-z]/.test(key)) {
      const mappedNumber = Object.keys(numberToAlphabetMap).find((num) =>
        numberToAlphabetMap[num].includes(key.toUpperCase())
      );

      if (mappedNumber) {
        handleKeyPress(mappedNumber);
      }
    }
  };

  // const fetchRecords = async () => {
  //   try {
  //     const response = await CallGETAPI("api/getAll-records");
  //     if (response.status) {
  //       const result = response.data;
  //       setSipData(result.combinedRecords);
  //     } else {
  //       console.error("Error fetching records:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching records:", error.message);
  //   }
  // };

  useEffect(() => {
    fetchRecords();
    window.addEventListener("keydown", handleKeyboardInput);
    return () => {
      window.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);

  const [formData, setFormData] = useState({
    Voicemail: "History", // default value
  });

  const onEditChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCall = async () => {
    if (connectStatus !== CONNECT_STATUS.CONNECTED) {
      toast.error("You do not connect with any sip.");
      return;
    }
    await sessionManager?.call(`sip:${phoneNumber}@${BASE_DOMAIN}`, {});
  };

  // bargeCall,whisperCall,listenCall
  const BargeCall = async (ext) => {
    if (connectStatus !== CONNECT_STATUS.CONNECTED) {
      toast.error("You do not connect with any sip.");
      return;
    }
    // console.log(`sip:552${ext}@${BASE_DOMAIN}`);
    await sessionManager?.call(`sip:552${ext}@${BASE_DOMAIN}`, {});
  };

  const WhisperCall = async (ext) => {
    if (connectStatus !== CONNECT_STATUS.CONNECTED) {
      toast.error("You do not connect with any sip.");
      return;
    }
    await sessionManager?.call(`sip:553${ext}@${BASE_DOMAIN}`, {});
  };

  const ListenCall = async (ext) => {
    if (connectStatus !== CONNECT_STATUS.CONNECTED) {
      toast.error("You do not connect with any sip.");
      return;
    }
    await sessionManager?.call(`sip:551${ext}@${BASE_DOMAIN}`, {});
  };

  const handleChangeSip = (e) => {
    if (connectStatus === CONNECT_STATUS.CONNECTED) {
      toast.error("You already connect with other sip!");
      return;
    }
    setSip(e.target.value);
    setShowDialIcon(true); // Set showDialIcon to true when dropdown value changes
  };

  // HANDLE Incomming calls

  // useEffect(() => {
  //   if (
  //     session &&
  //     session.state === SessionState.Initial &&
  //     direction === SessionDirection.INCOMING
  //   ) {
  //     audio
  //       .play()
  //       .catch((error) => console.error("Error playing audio:", error));
  //     setShowIncomingCallPopup(true); // Show popup when there's an incoming call
  //   } else {
  //     audio.pause();
  //     audio.currentTime = 0;
  //     // setShowIncomingCallPopup(false); // Hide popup when call ends
  //   }
  //   // fetchCallHistory();
  // }, [session, direction, audio, session?.state]);
  return (
    <>
      {sessionId ? (
        <IncomingCallModal
          // show={showIncomingCallPopup}
          // sessionId={sessionId}
          // callerName="Mr. Rahul" // Replace with actual caller name
          // callerNumber="9630728860" // Replace with actual caller number
          // onAccept={() => {
          //   // console.log('accept call')
          //   answer();
          //   // setShowIncomingCallPopup(false);
          // }}
          // onReject={() => {
          //   decline();
          //   setShowIncomingCallPopup(false);
          // }}

          sessionId={sessionId}
          setShowHistory={setShowHistory}
          showHistory={showHistory}
          fetchCallHistory={fetchCallHistory}
          //  fetchRecordings={fetchRecordings}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default HandleCallCenter;
