import React from "react";
import callCenterImage from '../assets/img/call-center-4340936-3605739.gif';
import callCenterImag from '../assets/img/call-center-7245803-5902426.gif';
// import LiveChat from './LiveChat';
function Support() {
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Support</li>
                        </ol>
                    </nav>
                </div>
                <section>
                    <div className="card">
                        <div className="card-body mt-3">
                            <div className="row">
                                <div className="col-6">
                                <h3 className="m-3" >Toll Free Number</h3>
                                   <img className="img-fluid" style={{height:300 }} src={callCenterImage} alt="Card image cap" />
                                        <div className="card-body">
                                            <a href="#" className="btn  btn-success mt-4 px-3"> <i class="fa-solid fa-phone"></i> +18134630312</a>
                                        </div>
                                </div>
                                <div className="col-6">
                                <h3 className="m-3" > Email Support</h3>
                                      <img className="img-fluid" style={{height:300 }} src={callCenterImag} alt="Card image cap" />
                                        <div className="card-body">
                                            <a href="#" className="btn  btn-success mt-4 px-3">  Support@livepbx.us</a>
                                        </div>
                                </div>
                                {/* <div className="col-3">
                                <LiveChat />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright 2023{" "}
                    <strong>
                        <span>Live PBX</span>
                    </strong>
                    . All Rights Reserved
                </div>
            </footer> */}
        </>
    );
}

export default Support;