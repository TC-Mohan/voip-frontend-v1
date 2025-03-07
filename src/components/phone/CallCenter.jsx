import { useState, useEffect } from "react";
import { BASE_DOMAIN } from "./constant";
import TableComponent1 from "./TableComponent1";
import "./Dialpad.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackspace,
  faInfoCircle,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { CallSessionItem } from "./CallSessionItem";
import { CallGETAPI, CallPOSTAPI, DecryptToken } from "../../helper/Constants";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import TableComponent2 from "./TableComponent2";
import { RegisterStatus, CONNECT_STATUS, useSIPProvider } from "react-sipjs";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../../slices/WalletSlice";
import ReactLoading from "react-loading";
import LiveCalls from "../live-calls/LiveCalls";

export const CallCenter = ({ handleResetPage }) => {
  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();
  const [sip, setSip] = useState("");
  const dispatch = useDispatch();
  const number = useSelector((state) => state.wallet.userId);
  
  const userToken = localStorage.getItem("psx_token");
  const decodedToken = DecryptToken(userToken);

  
  useEffect(() => {
    dispatch(fetchBalance());
    fetchRecords();
  }, [dispatch]);

  const extensionId = useSelector((state) => state.wallet.extension_number);
  const [showHistory, setShowHistory] = useState([]);
  // const [showRecording, setRecording] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sipData, setSipData] = useState([]);
  const [showDialIcon, setShowDialIcon] = useState(false);
  const [showConnectIcon, setShowConnectIcon] = useState(false); 
  const [loadingRecording, setLoadingRecording] = useState(false);
  const itemsPerPage = 10;
  const [data, setData] = useState([]);
  const [recordingData, setRecordingData] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [totalPages, settotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
    const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-purchase-number-v2");
      if (response.status) {
        setNumbers(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const updateDefaultState = async (ext)=>{
    const payload=  {
      ext: ext
    }
    const response = await CallPOSTAPI("api/update-default-ext",payload);
    // console.log({response});
  }
  const handleNumberSelect = async (event) => {
    const selectedSip = event.target.value//sipData[0];
    handleResetPage();

    // console.log({sipData,event})
    if (!selectedSip) {
      toast.error("No SIP user found!");
      return;
    }
    updateDefaultState(event.target.value);
    setSip(event.target.value);
    setShowDialIcon(true);
    setIsLoading(true);

    try {
      await connectAndRegister({
          username: selectedSip?.username,
          password: selectedSip?.password,
      });
      setShowConnectIcon(false);
  } catch (error) {
      console.error("Error connecting to SIP:", error);
      toast.error("Failed to connect to SIP!");
  } finally {
      setIsLoading(false); // Reset loading state
  }
};

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

  const handleConnect = async () => {
    if (sip === "") {
      toast.error("No SIP ID set!");
      return;
    }
    const selectedSip = sipData[0];
    // await connectAndRegister({
    //   username: selectedSip?.username,
    //   password: selectedSip?.password,
    // });
    setShowConnectIcon(false);
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


  const fetchRecording = async () => {
    try {
      setLoadingRecording(true);
      const response = await CallGETAPI(`api/fetch-recording-v2/${sip}`);
      const data = response?.data?.data;
      setRecordingData(data);
      setLoadingRecording(false);
    } catch (error) {
      console.error("Error fetching recording:", error);
      setLoadingRecording(false);
    }
  };

  const fetchCallHistory = async () => {
    try {
      
      if(!number){
        return "";
      }
      setIsLoading(true);

      const response = await CallGETAPI(
        `api/get-cdr?user_id=${number}`
      );
      const CDRData = response?.data?.cdrs || [];
      setData(CDRData);
      
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCallHistory();
  }, [number]); 

 
  const [formData, setFormData] = useState({
    Voicemail: "History", 
  });

  useEffect(() => {
    if (formData.Voicemail === "Recording") {
      fetchRecording();
    }
  }, [formData.Voicemail]);


  useEffect(() => {
    if (formData.Voicemail === "History") {
      fetchCallHistory();
    }
  }, [formData.Voicemail]);


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

    const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, data.length);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const showRecording = recordingData ? recordingData?.slice( (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage ) : false;

  // // console.log({showRecording})



  const BargeCall = async (ext) => {
    console.log({CONNECT_STATUS})
    if (connectStatus !== CONNECT_STATUS?.CONNECTED) {
      toast.error("You are not connected with any sip.");
      return;
    }
    await sessionManager?.call(`sip:552${ext}@${BASE_DOMAIN}`, {});
  };

  const WhisperCall = async (ext) => {
    if (connectStatus !== CONNECT_STATUS?.CONNECTED) {
      toast.error("You are not connected with any sip.");
      return;
    }
    await sessionManager?.call(`sip:553${ext}@${BASE_DOMAIN}`, {});
  };

  const ListenCall = async (ext) => {
    if (connectStatus !== CONNECT_STATUS?.CONNECTED) {
      toast.error("You are not connected with any sip.");
      return;
    }
    await sessionManager?.call(`sip:551${ext}@${BASE_DOMAIN}`, {});
  };


  return (
    <div>
      {/* <Header sip={sip} /> */}
      <div
        style={{
          width: "100%",
          marginTop: "25px",
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CallSessionItem
          sessionId={Object.keys(sessions)?.reverse()[0]}
          setShowHistory={setShowHistory}
          showHistory={showHistory}
          // setRecording={setRecording}
          // showRecording={showRecording}
          // fetchCallHistory={fetchCallHistory}
          // fetchRecording={fetchRecording}
        />
      </div>

      {/* Conditional rendering of the dial pad */}
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div className="card" style={{ width: "95%" }}>
          <div className="card-body phone-body mt-3">
            <div className="container">
              <div className="row d-flex justify-content-around">
                {/* Left column for Voicemail options */}
                <div className="col-6 border custom-style">
                  <div className=" justify-content-center mt-4 col-sm-12">
                    <div className="btn-group">
                      {/* Radio buttons for Voicemail options */}
                      <input
                        type="radio"
                        className="btn-check"
                        name="Voicemail"
                        id="radio1"
                        autoComplete="off"
                        value="History"
                        checked={formData.Voicemail === "History"}
                        onChange={() => onEditChange("Voicemail", "History")}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="radio1"
                      >
                        History
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="Voicemail"
                        id="radio2"
                        autoComplete="off"
                        value="Recording"
                        checked={formData.Voicemail === "Recording"}
                        onChange={() => onEditChange("Voicemail", "Recording")}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="radio2"
                        style={{borderRadius:"5px"}}
                      >
                        Recording
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="Voicemail"
                        id="radio3"
                        autoComplete="off"
                        value="Block"
                        checked={formData.Voicemail === "Block"}
                        onChange={() => onEditChange("Voicemail", "Block")}
                      />
                      {/* <label
                        className="btn btn-outline-primary"
                        htmlFor="radio3"
                      >
                        Voice Mail
                      </label> */}
                    </div>

                    <div className="custom-height">
                      {isLoading && (
                        <div className="d-flex justify-content-center my-5">
                          <ReactLoading
                            type="spokes"
                            color="grey"
                            height={50}
                            width={50}
                          />
                        </div>
                      )}

                      {!isLoading && (
                        <div>
                          {formData?.Voicemail === "History" && (
                            <div
                              className="container"
                              style={{ marginTop: "30px" }}
                            >
                              {/* Render CallSessionItem for call history */}
                              {currentItems?.length > 0 ? (
                                currentItems.map((item) => (
                                  <TableComponent1 key={item.id} data={item} />
                                ))
                              ) : (
                                <div className="text-center mt-3">
                                  No history found
                                </div>
                              )}
                               {data.length > itemsPerPage && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                  // marginTop: "-40px",
                                }}
                              >
                                {/* <Typography
                                  color="primary"
                                 
                                  variant="body2"
                                >{`Showing ${startEntry} to ${endEntry} of ${data.length} entries`}</Typography> */}
                                <Pagination
                                  count={Math.ceil(data.length / itemsPerPage)}
                                  page={currentPage}
                                  onChange={handlePageChange}
                                  color="primary"
                                />
                              </div>
                              )}

                            </div>
                          )}
                        </div>
                      )}

                      {/* Ye Recording ke liye Loading */}

                      {loadingRecording && (
                        <div className="d-flex justify-content-center my-5">
                          <ReactLoading
                            type="spokes"
                            color="grey"
                            height={50}
                            width={50}
                          />
                        </div>
                      )}

                      {!loadingRecording && (
                        <div>
                          {formData.Voicemail === "Recording" && (
                            <div className="container">
                              {currentItems && currentItems.length > 0 ? (
                                currentItems.map((item) => (
                                  // <TableComponent2
                                  //   key={item.id}
                                  //   item={item}
                                  // />
                                  <TableComponent2 key={item.id} data={item} />
                                ))
                              ) : (
                                <div className="text-center mt-3">
                                  No recording found
                                </div>
                              )}
                               {data?.length > itemsPerPage && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                  // marginTop: "-40px",
                                }}
                              >
                                {/* <Typography
                                  color="primary"
                                  // margin="10px"
                                  variant="body2"
                                >{`Showing ${startEntry} to ${endEntry} of ${recordingData?.length} entries`}</Typography> */}
                                <Pagination
                                  count={Math.ceil(data?.length / itemsPerPage)}
                                  page={currentPage}
                                  onChange={handlePageChange}
                                  color="primary"
                                />
                              </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {/* {formData.Voicemail === "Block" && (
                      <div className="container">
                       
                        <TableComponent3 />
                      </div>
                    )} */}
                  </div>
                </div>

                {/* Right column for dial pad */}
                <div className="col-12 col-md-4 col-sm-12">
                  {/* <div
                    style={{
                      color: "#4B5563",
                      textAlign: "center",
                      fontSize: "smaller",
                      fontWeight: "bolder",
                    }}
                  >
                    SIP Credential
                  </div> */}
                  <div className="container mt-4 text-center">
                    {/* Input field for phone number */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <div>
                        <form onSubmit={handleConnect}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            gap="5px"
                            alignItems="center"
                            border={1}
                            p={2}
                            borderRadius={5}
                          >
                            {/* <FormControl fullWidth>
                            
                              <Typography variant="body1">
                                {sip ? `Sip User:- ${sip}` : "No SIP "}
                              </Typography>
                            </FormControl> */}

                            {/* <div className="container mt-3">
         <Typography variant="body1">
          {sip ? `Sip User:- ${sip}` : "No SIP "}
         </Typography>
          </div> */}

                            <div className="container mt-3">
                              <FormControl fullWidth>
                                <select className="form-control"  
                                  onChange={handleNumberSelect}
                                >
                                  <option value=""> -- Select --</option>
                                  {numbers.map((it)=>(
                                    <option value={it.ext_number} selected={Number(sip)===Number(it.ext_number)} >{it.number}</option>
                                  ))}
                                </select>
                              </FormControl>
                              {isLoading && (
                <div className="d-flex justify-content-center my-3">
                    <ReactLoading type="spokes" color="grey" height={50} width={50} />
                </div>
            )}
                            </div>
                          </Box>
                        </form>

                        {numbers.length===0 ? 
                              <div className="text-danger" >
                                  <p>Please Purchase Mobile Number to use Dial-Pad</p>
                              </div>
                              : 
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1.5px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: "none",
                                              borderRadius: "9999px",
                                              border: "none",
                                              backgroundColor: connectStatus === CONNECT_STATUS.CONNECTED ? "#6EE7B7" : "#FBBF24",
                                              padding: "3px",
                                              marginRight: "4px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                height: "1.5px",
                                                width: "1.5px",
                                                borderRadius: "9999px",
                                                backgroundColor:
                                                  connectStatus === CONNECT_STATUS.CONNECTED
                                                    ? "#6EE7B7"
                                                    : "#FBBF24",
                                              }}
                                            ></div>
                                          </div>
                                          <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                                            Connect Status: {connectStatus}
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1.5px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: "none",
                                              borderRadius: "9999px",
                                              backgroundColor:
                                                registerStatus === RegisterStatus.REGISTERED
                                                  ? "#6EE7B7"
                                                  : "#FBBF24",
                                              padding: "3px",
                                              marginRight: "4px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                height: "1.5px",
                                                width: "1.5px",
                                                borderRadius: "9999px",
                                                backgroundColor:
                                                  registerStatus === RegisterStatus.REGISTERED
                                                    ? "#6EE7B7"
                                                    : "#FBBF24",
                                              }}
                                            ></div>
                                          </div>
                                          <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>
                                            Register Status: {registerStatus}
                                          </p>
                                        </div>
                                      </div>
                                }
                      </div>

                    </div>
                    <div className="mb-1 mt-3 position-relative">
                      <input
                        className="form-control"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ width: "100%" }}
                      />
                      {/* Backspace button */}
                      {phoneNumber.length > 0 && (
                        <button
                          className="btn btn-danger position-absolute backspace "
                          onClick={handleBackspace}
                        >
                          <FontAwesomeIcon icon={faBackspace} />
                        </button>
                      )}
                    </div>

                    {/* Render dial pad buttons */}
                    <div className="row row-cols-3 p-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((key) => (
                        <div key={key} className="col">
                          <button
                            className="btn btn-light rounded-circle btn-md number-button"
                            onClick={() => handleKeyPress(key.toString())}
                          >
                            {key}
                            <div className="alphabet">
                              {numberToAlphabetMap[key]}
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                      
                    {/* Call button */}
                    <div className="row ">
                      <div className="col">
                        <button
                          className="btn btn-success phone rounded-circle"
                          onClick={handleCall}
                          disabled={phoneNumber.trim() === "" || numbers.length === 0}
                        >
                          <FontAwesomeIcon icon={faPhoneVolume} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>


        
      </section>



      <main id="" className="main">
            <section>
              <div className="card">
                <div className="card-body">

                        <LiveCalls  
                        
                          sipData={sipData?.[0]}
                        userId={decodedToken?.user_id}
                          userType={2}
                            onTotalLiveCallsUpdate={(returnData)=>{
                              console.log({returnData})
                            }}


                            BargeCall={BargeCall}
                            WhisperCall={WhisperCall}
                            ListenCall={ListenCall}
                          />
          </div>
          </div>
          </section>
          </main>
    </div>
  );
};

