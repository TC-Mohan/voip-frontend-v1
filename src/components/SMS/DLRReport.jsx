import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { DLRcolumns, DLRdata } from "./SMSData";
import { CSVLink } from "react-csv";
import { paginationConfig } from "../global/paginationUtils";
// import { BASE_API } from "../../helper/Constants";

function DLRReport() {
  const [dlrData, SetDlrData] = useState(DLRdata);

  const handleExportClick = () => {
    //Export logic here
    // console.log("Exporting data:", dlrData);
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dlr Report</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong>DLR Report</strong>
              </h3>
              <hr />
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
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div>
                        <div className="m-4">
                          <form action="post">
                            <div className="container-fluid ">
                              <div className="row">
                                <div className="mb-3 col-md-2">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Start Date"
                                  />
                                </div>

                                <div className="mb-3 col-md-2">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="End Date"
                                  />
                                </div>

                                <div className="mb-3 col-md-4">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <select
                                    className="form-select"
                                    id="sel1"
                                    name="sellist1"
                                  >
                                    <option>Status</option>
                                    <option>SMPP Not Connected</option>
                                    <option>Failed</option>
                                    <option>Rejected</option>
                                    <option>Pending</option>
                                    <option>Undeliverable</option>
                                    <option>Expired</option>
                                    <option>Unknown</option>
                                    <option>Delivered</option>
                                    <option>Acknowledged</option>
                                    <option>Accepted</option>
                                    <option>DND</option>
                                    <option>Processing</option>
                                  </select>
                                </div>
                                <div className="mb-3 col-md-2">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <button type="button" class="btn btn-primary">
                                    View DLR Report
                                  </button>
                                </div>
                                <div className="mb-3 col-md-2">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <CSVLink
                                    data={dlrData}
                                    filename="dlr_data.csv"
                                    className="btn btn-primary"
                                    onClick={handleExportClick}
                                  >
                                    Download Excel
                                  </CSVLink>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-3 col-md-4">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
                            <DataTable
                              columns={DLRcolumns}
                              data={DLRdata}
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
  );
}

export default DLRReport;
