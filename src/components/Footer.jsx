import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        {/* <div className="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div> */}
         <div className="btm-footer-text text-center">
          <p>
            2024 © Designed and Developed by{" "}
            <Link href="https://livepbx.us/">Livepbx</Link>
          </p>
        </div>
      </footer>
      
    </>
  );

};

export default Footer;
