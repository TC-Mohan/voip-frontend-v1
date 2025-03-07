import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toggleSidebar } from "../slices/sidebarSlice";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import "../App.css";
import { CallGETAPI, DecryptToken } from "../helper/Constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance } from "../slices/WalletSlice";
import { FaArrowRight } from "react-icons/fa";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useSIPProvider } from "react-sipjs";
import axios from "axios";
import { io } from "socket.io-client";
import PrintBalance from "../components/wallet-balance/PrintBalance";
const Header = ({ navHandler, openNav,user_id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState(null);
  const [showButton, setShowButton] = useState(true); // State to handle button visibility
  const { registerStatus, connectStatus } = useSIPProvider();
  // console.log({ connectStatus });
  const [extensionCallCounts, setExtensionCallCount] = useState(0);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalLiveCalls, setTotalLiveCalls] = useState(0);
  // Access incoming call state from Redux store
  const incomingCall = useSelector((state) => state.wallet.incomingCall);
  const liveCalls = useSelector((state) => state.wallet.liveCalls);
  const endDate = useSelector((state) => state.wallet.endDate);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userType, setUserType] = useState(null);
  // const user_id = useSelector((state) => state.wallet.userId);
  const [callCounts, setCallCounts] = useState({
    campaignCallsCount: 0,
    extensionCallsCount: 0,
    totalCallsCount: 0
  });

  const [showExpirationWarning, setShowExpirationWarning] = useState(false);
  const SOCKET_SERVER_URL = window.CAMPAIN_WWS_URL;
  const API_SERVER_URL = window.CAMPAIN_WWS_URL;
  const [userId, setUserId] = useState(null);
  const liveCallCount = liveCalls[userId] || 0;
  const showToast = (message, type = "success") => {
    toast[type](message);
  };

  // Function to format date and time
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };


  useEffect(() => {
    const eventSource = new EventSource(`${window.BASE_API}api/notifications/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received SSE event:', data);

        switch (data.type) {
          case 'init':
            console.log('Setting initial notifications:', data.data);
            setNotifications(data.data);
            setUnreadCount(data.data.filter(n => !n.isRead).length);
            break;

          case 'create':
            console.log('Adding new notification:', data.data);
            setNotifications(prevNotifications => [data.data, ...prevNotifications]);
            if (!data.data.isRead) {
              setUnreadCount(prev => prev + 1);
            }
            break;

          case 'delete':
            console.log('Deleting notification:', data.data);
            const deleteId = String(data.data.id);
            
            setNotifications(prevNotifications => {
              const updatedNotifications = prevNotifications.filter(n => String(n.id) !== deleteId);
              // Calculate new unread count based on remaining notifications
              const newUnreadCount = updatedNotifications.filter(n => !n.isRead).length;
              setUnreadCount(newUnreadCount);
              return updatedNotifications;
            });
            break;

          default:
            console.warn('Unknown event type:', data.type);
        }
      } catch (error) {
        console.error('Error processing SSE message:', error);
        setError('Failed to process notification update');
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
      setError('Connection lost. Trying to reconnect...');
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);





  // const fetchNotifications = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await CallGETAPI(`api/notifications`);
      
  //     // Check if response.data and response.data.data exist
  //     if (response.data && response.data.data) {
  //       setNotifications(response.data.data);
  //       setUnreadCount(response.data.data.filter(n => !n.isRead).length);
  //     } else {
  //       setNotifications([]);
  //       setUnreadCount(0);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching notifications:', error);
  //     setError(error.message);
  //     setNotifications([]);
  //     setUnreadCount(0);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  //   // Poll for new notifications every minute
  //   const interval = setInterval(fetchNotifications, 5000);
  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userToken = localStorage.getItem("psx_token");
        const decodedToken = DecryptToken(userToken);

        if (decodedToken) {
          setUserEmail(decodedToken.first_name);
          setUserType(decodedToken.user_type);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);



  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const userToken = localStorage.getItem("psx_token");
        const decodedToken = DecryptToken(userToken);

        if (decodedToken) {
          setUserEmail(decodedToken.first_name);
          setUserId(decodedToken.user_id);
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);
  const [userNumber, setUserNumber] = useState(null);
  const balance = useSelector((state) => state.wallet.balance);
  const sip = useSelector((state) => state.wallet.endDate);

  useEffect(() => {
    const checkExpirationWarning = () => {
      if (endDate) {
        const expirationDate = new Date(endDate);
        const today = new Date();
        const daysUntilExpiration = Math.ceil(
          (expirationDate - today) / (1000 * 60 * 60 * 24)
        );

        console.log("Current Date:", today.toISOString());
        console.log("Expiration Date:", expirationDate.toISOString());
        console.log("Days until expiration:", daysUntilExpiration);
        setShowExpirationWarning(
          daysUntilExpiration <= 10 && daysUntilExpiration > 0
        );
        console.log(
          "Show warning:",
          daysUntilExpiration <= 10 && daysUntilExpiration > 0
        );
      }
    };

    checkExpirationWarning();
    const interval = setInterval(checkExpirationWarning, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleLogout = () => {
    const userToken = localStorage.getItem("psx_token");

    if (userToken) {
      localStorage.removeItem("psx_token");
      navigate("/", { replace: true });
      showToast("Logout successfully");
    }
  };

  const openwallet = () => {
    navigate("/wallet");
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);




  // Update the event handler to manage call counts
  const handleSSEMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'update' && data.data.counts) {
        setCallCounts(data.data.counts);
      }
    } catch (error) {
      console.error('Error processing SSE message:', error);
    }
  }, []);

  // Set up SSE connection
  useEffect(() => {
    if (!user_id) return;

    const eventSource = new EventSource(
      `${API_SERVER_URL}/api/live-calls/stream?user_id=${user_id}`
    );

    eventSource.onmessage = handleSSEMessage;
    eventSource.onerror = (error) => {
      console.error('SSE Connection Error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user_id, handleSSEMessage]);


  // ----------------- fetch Live Calls
//   const fetchLiveCallsData = async () => {
//     try {
//       const response = await axios.get(`${API_SERVER_URL}/api/live-calls`, {
//         params: { user_id },
//       });
      
//       if (response.data) {
//         // Update counts from API response
//         setCallCounts(response.data.counts);
        
//         // If you still need these for other functionality
//         setCampaigns(response.data.campaignCalls);
//         setLoading(false);
//       } else {
//         console.error("Unexpected API response format:", response.data);
//         setError(true);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Error fetching live calls data:", err.response ? err.response.data : err.message);
//       setError(true);
//       setLoading(false);
//     }
//   };



// // Use interval to fetch data every 5 seconds
// useEffect(() => {
//   // fetchLiveCallsData(); // Initial fetch

//   const interval = setInterval(() => {
//     console.log("Polling API...");
//     // fetchLiveCallsData();
//   }, 5000); // 5000ms = 5 seconds

//   // Cleanup interval on component unmount
//   return () => clearInterval(interval);
// }, []);


const notificationBell = (
  <li className="nav-item dropdown">
    <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
      <i className="bi bi-bell" />
      {unreadCount > 0 && (
        <span className="badge bg-primary badge-number">{unreadCount}</span>
      )}
    </a>
    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
      <li className="dropdown-header">
        {notifications.length > 0 
          ? `You have ${notifications.length} notification${notifications.length === 1 ? '' : 's'}`
          : 'No notifications'}
      </li>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {error && (
          <li className="notification-item">
            <div>
              <p className="text-danger">{error}</p>
            </div>
          </li>
        )}
        
        {!error && notifications.length === 0 && (
          <li className="notification-item">
            <div>
              <p>No notifications found</p>
            </div>
          </li>
        )}
        
        {!error && notifications.map((notification) => (
          <li key={String(notification.id)} className="notification-item">
            <i className="bi bi-info-circle text-primary" />
            <div>
              <h4>{notification.message}</h4>
              <p>{formatDateTime(notification.createdAt)}</p>
            </div>
          </li>
        ))}
      </div>
    </ul>
  </li>
);







  

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="row w-100">
          <div className="col-lg-4 d-flex justify-content-start setter">
            <div className="d-flex align-items-center ">
              <div className="nav-link nav-icon logo d-flex align-items-center">
                <Link to="/dashboard" className="d-none d-lg-block text-nowrap">
                  <span style={{ color: "#FF7F00" }}>Live </span>
                  <span style={{ color: "#0083BE" }}>PBX</span>
                </Link>
                <i
                  className="bi bi-list toggle-sidebar-btn"
                  onClick={navHandler} // Yahan toggleSidebar function ko call karenge
                />
             {userType !== 3 && (
                  <>
                    <i
                      className="fa-solid fa-phone-volume"
                      style={{ fontSize: "20px", color: "#07a61a" }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "000000",
                        paddingLeft: "10px",
                      }}
                    >
                      {callCounts.campaignCallsCount} Campaign
                    </span>
                  </>
                )}
                {userType !== 4 && (
                  <>
                    <i
                      className="fa-solid fa-phone-volume"
                      style={{ fontSize: "20px", color: "#0083BE" }}
                    />
                    <span style={{ fontSize: "12px", color: "#000000", paddingLeft: "10px" }}>
                      {callCounts.extensionCallsCount} Extension
                    </span>
                    </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row w-100">
          <div className="col-lg-4 d-flex justify-content-start setter">
            <div className="d-flex align-items-center ">
              <p style={{  color: "rgb(0, 131, 190)" }}>
                User:-
              </p>
              <p style={{ marginLeft: "0rem", color: "rgb(0, 131, 190)" }}>
                {sip}
              </p>
              <p style={{  marginLeft: "5px", display: "inline", color: "rgb(0, 131, 190)" }}>
                {connectStatus ? "Connected" : "Disconnected"}
                {registerStatus ? "Registered" : "Un-Registered"}
              </p>
              <LibraryAddCheckIconv    
                style={{ marginLeft: "5px", color: "rgb(0, 131, 190)" }}
              />
            </div>
          </div>
        </div> */}

        {/* Display "Connect" text */}
        {/* <div className="row w-100">
          <div className="col-lg-4 d-flex justify-content-start setter">
            <div className="d-flex align-items-center ">
              <p style={{ color: "rgb(0, 131, 190)" }}>Connected</p>
            </div>
          </div>
        </div> */}

        {/* End Logo */}
        {/* <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div> */}
        {/* End Search Bar */}
        <div className="col-lg-8 d-flex justify-content-end">
          <nav className="header-nav">
            <ul className="d-flex align-items-center">
              {showExpirationWarning && (
                <li className="nav-item dropdown">
                  <a className="nav-link nav-icon">
                    <button
                      style={{
                        fontSize: "13px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                      }}
                      type="button"
                      className="btn btn-danger rounded-0"
                    >
                      Your Plan Will Expire Soon
                    </button>
                  </a>
                </li>
              )}
              {/* <Button variant="outline-danger" className="navbar-item  ">
                <span className="set ">Your</span>
              </Button>

              <Button variant="outline-dark" className="navbar-item ">
                <span className="set">
                  <strong>Expiry</strong>
                </span>
              </Button> */}
              {showButton && (
                <li className="nav-item dropdown">
                  <a className="nav-link nav-icon">
                    <span>
                      <strong style={{ fontSize: "16px" }}>
                        <p>
                          Expire Date:{" "}
                          {formatDateTime(endDate) || "Not Available"}
                        </p>
                        {/* Display endDate */}
                      </strong>
                    </span>
                  </a>
                </li>
              )}
              {/* <li className="nav-item dropdown">
                <a className="nav-link nav-icon">
                  <i className="fa fa-phone" />
                </a>
              </li> */}
              {/* <Link to="/register">Register</Link> */}
              {/* <li className="nav-item dropdown"> */}
              {/* <Link
                  to="/wallet"
                  className="nav-link nav-icon"
                  data-bs-toggle="false"
                >
                  <i className="bi bi-wallet" />

                  <span style={{ fontSize: "18px" }}>
                    <i className="bi bi-currency-dollar" />
                   
                   
                    {{ balance } < 10 && <h3>Low Credit</h3>}
                  </span>
                </Link> */}
              {/* </li> */}
              <PrintBalance userId={user_id} />
              {notificationBell}

              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link nav-icon"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <i className="bi bi-bell" />
                  <span className="badge bg-primary badge-number">4</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                  <li className="dropdown-header">
                    You have 4 new notifications
                    <a href="#">
                      <span className="badge rounded-pill bg-primary p-2 ms-2">
                        View all
                      </span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-exclamation-circle text-warning" />
                    <div>
                      <h4>Lorem Ipsum</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>30 min. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-x-circle text-danger" />
                    <div>
                      <h4>Atque rerum nesciunt</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>1 hr. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-check-circle text-success" />
                    <div>
                      <h4>Sit rerum fuga</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>2 hrs. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="notification-item">
                    <i className="bi bi-info-circle text-primary" />
                    <div>
                      <h4>Dicta reprehenderit</h4>
                      <p>Quae dolorem earum veritatis oditseno</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="dropdown-footer">
                    <a href="#">Show all notifications</a>
                  </li>
                </ul>
              </li> */}
              {/* End Notification Nav */}
              <li className="nav-item dropdown pe-3">
                <a
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <img
                    src="assets/img/profile-img.jpg"
                    alt="Profile"
                    className="rounded-circle"
                  /> */}
                  {/* <span className="d-none d-md-block dropdown-toggle ps-2">
                    K. Anderson
                  </span> */}
                  {userEmail && (
                    <span className="d-none d-md-block dropdown-toggle ps-2">
                      {/* <FaUserCircle style={{ marginRight: "5px" }} /> */}
                      <span>{`${userEmail.substring(0, 6)}...`}</span>
                    </span>
                  )}
                </a>
                {/* End Profile Iamge Icon */}
                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
                  style={{}}
                >
                  <li className="dropdown-header">
                    {/* <h6>Kevin Anderson</h6> */}
                    {userEmail && (
                      <span className="d-none d-md-block ">
                        {/* <FaUserCircle style={{ marginRight: "5px" }} /> */}
                        <span>{`${userEmail}`}</span>
                      </span>
                    )}
                    <span>Web Designer</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="bi bi-person" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/purchaseplan"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="bi bi-person" />
                      <span>Purchase Plan</span>
                    </Link>
                  </li>

                  {/* <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-person" />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    to="/need-help"
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </Link>
                </li> */}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item d-flex align-items-center"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right" />
                      <span>Sign Out</span>
                    </Link>
                  </li>
                </ul>
                {/* End Profile Dropdown Items */}
              </li>
              {/* End Profile Nav */}
            </ul>
          </nav>
        </div>
        {/* End Icons Navigation */}
      </header>
    </>
  );
};

export default Header;
