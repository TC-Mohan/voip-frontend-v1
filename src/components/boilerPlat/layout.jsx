import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import EndSidebar from "../EndSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, fetchSipUserData, incrementLiveCalls, decrementLiveCalls } from "../../slices/WalletSlice";
import HandleCallCenter from "./HandleCallCenter";
import { BASE_DOMAIN } from "../phone/constant";
import { SIPProvider } from "react-sipjs";
// import { UseLiveCallUpdates } from "../live-calls/UseLiveCallUpdates";
import { io } from "socket.io-client";
import Footer from "../Footer";
import SSEListener from "../../components/SSEListener"
import { DecryptToken } from "../../helper/Constants";
// import { Footer } from "antd/es/layout/layout";
// Import the custom hook

const Layout = (props) => {
  const dispatch = useDispatch();
  const [openNav, setOpenNav] = useState(false);
  const [totalLiveCalls, setTotalLiveCalls] = useState(0);  
  const sip = useSelector((state) => state.wallet.extension_number);
  const userId = useSelector((state) => state.wallet.userId);
  const userToken = localStorage.getItem("psx_token");
  const decodedToken = DecryptToken(userToken);

  
  // UseLiveCallUpdates('', setTotalLiveCalls); 

  const OpenNavHandler = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (openNav) {
      body.classList = "toggle-sidebar";
    } else {
      body.classList = "";
    }
  }, [openNav]);

  useEffect(() => {
    dispatch(fetchBalance());
    dispatch(fetchSipUserData());
  }, []);

  // useEffect(() => {
  //   let socket;

  //   if (sip) {
  //     socket = io(window.FRONT_WEB_SOCKET_URL);

  //     socket.on("newCall", (callInfo) => {
  //       dispatch(incrementLiveCalls({ userId: callInfo.userId }));
  //     });

  //     socket.on("disconnectCall", (callInfo) => {
  //       dispatch(decrementLiveCalls({ userId: callInfo.userId }));
  //     });

  //     return () => {
  //       socket.off("newCall");
  //       socket.off("disconnectCall");
  //       socket.disconnect();
  //     };
  //   }
  // }, [dispatch, sip]);

  return (
    <>
      <SIPProvider options={{ domain: BASE_DOMAIN, webSocketServer: window.VOIP_WS_URL }}>
        {/* Pass totalLiveCalls to Header */}
        <SSEListener />
        {/* <Header userId={userId} openNav={openNav} navHandler={OpenNavHandler} totalLiveCalls={totalLiveCalls} sip={sip} /> */}
        {decodedToken?.user_id ? <Header openNav={openNav} navHandler={OpenNavHandler} user_id={decodedToken?.user_id} /> :""}
        <Sidebar openNav={openNav} navHandler={OpenNavHandler} />
        <EndSidebar openNav={openNav} navHandler={OpenNavHandler} />
        <HandleCallCenter />
        <div className="">
          {props.children}
        </div>
        <Footer />
      </SIPProvider>
     
    </>
  );
};

export default Layout;
