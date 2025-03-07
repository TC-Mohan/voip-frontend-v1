import React from 'react';
import QRCode from 'qrcode.react';

function Device() {
  const recipientPhoneNumber = '1234567890'; // Replace with the actual phone number

  // Create the WhatsApp Web URL
  const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${recipientPhoneNumber}`;
  return (
    <>
      <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Device</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body py-4">
              <div style={{ textAlign: "left" }}></div>
              {/* Bordered Tabs Justified */}
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                ></div>
                {/* Repeat the above code for the other tabs */}
              </div>
                <div className="container-fluid">
                  <div className="row">
                    <div  className="col-lg-6">
                       <h3>
                       For Login Whatsapp You Have To Do:
                       </h3>
                       <ul className="text-start list-group lh-lg pl-4">
                        <li className='list-group'>
                        1. Open Whatsapp On Your Phone
                        </li>
                        <li  className='list-group'>
                        2. Tap On Section or Settings And Select Linked Devices
                        </li>
                        <li  className='list-group'>
                        3. If You Haven't Joined The Multi-device Beta Yet, You Can Join First Link Tutorial Click Here
                        </li>
                        <li  className='list-group'>
                        4. Point Your Phone To This Screen To Capture The Code.
                        </li>
                        <li className="text-danger list-group">
                        Note: Multi Device BETA Login Only Works
                        </li>
                       </ul>
                    </div>
                    <div className="col-lg-6">
                              <div>
      <h2>WhatsApp Web QR Code</h2>
      <QRCode value={whatsappWebUrl} />
    </div>
                    </div>
                  </div>
                </div>
              {/* <div>
      <h2>WhatsApp Web QR Code</h2>
      <QRCode value={whatsappWebUrl} />
    </div> */}
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
    </>
    </>
   
  )
}

export default Device