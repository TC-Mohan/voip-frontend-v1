import React from 'react'
import DataTable from "react-data-table-component";
import { refundcolumns, refunddata } from './SMSData';
import { paginationConfig } from '../global/paginationUtils';

function RefundReport() {
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Sms Refund History</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body mt-3">
              <h3><strong>SMS Refund History</strong></h3>
              <hr />
              {/* Bordered Tabs Justified */}
              <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                <div
                  className="tab-pane fade show active"
                  id="bordered-justified-campaign"
                  role="tabpanel"
                  aria-labelledby="campaign-tab"
                >
                </div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div >
                        <div className="m-4">
                          <form action="post">
                            <div className="container-fluid ">
                              <div className="row">
                                <div className="mb-3 col-md-4">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input type="text" className="form-control" placeholder="Search" />
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
                            <DataTable
                              columns={refundcolumns}
                              data={refunddata}
                              searchable
                              noHeader
                              defaultSortField="id"
                              // sortIcon={<SortIcon />}
                              defaultSortAsc={true}
                              pagination
                              highlightOnHover
                              dense
                              {...paginationConfig()}

                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  )
}
export default RefundReport