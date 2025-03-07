import React from "react";
import DataTable from "react-data-table-component";
import { campaignreportcolumns, campaignreportdata } from "./CampaignData";
import { paginationConfig } from "../global/paginationUtils";

function CampaignReport() {
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Campaign Report</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div>
                        <div className="m-4">
                          <form action="post">
                            <div className="container-fluid ">
                              <div className="row  d-flex justify-content-end"></div>

                              <div className="row">
                                <div className="mb-3 col-md-3 text-start">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <h3>
                                    <strong>Campaign Report</strong>
                                  </h3>
                                </div>
                                <div className="mb- col-md-1 text-end">
                                  <label for="birthday">Start</label>
                                </div>
                                <div className="mb-3 col-md-3">
                                  <input
                                    type="date"
                                    value=""
                                    class="form-control"
                                    name="start_date"
                                    style={{ height: "35px" }}
                                  />
                                </div>
                                <div className="mb-3 col-md-1 text-end">
                                  <label for="birthday">End</label>
                                </div>
                                <div className="mb-3 col-md-3">
                                  <input
                                    type="date"
                                    value=""
                                    class="form-control"
                                    name="start_date"
                                    style={{ height: "35px" }}
                                  />
                                </div>
                                <div className="mb-3 col-md-1 text-end">
                                  <button type="button" class="btn btn-primary">
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
                            <DataTable
                              columns={campaignreportcolumns}
                              data={campaignreportdata}
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

export default CampaignReport;
