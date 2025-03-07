import React from 'react';
import DataTable from "react-data-table-component";
import { CSVLink } from 'react-csv';
import { receivereportdata, receivereportcolumns } from '../WhatsappData';
import { paginationConfig } from '../../global/paginationUtils';

function ReceivedMessageReport() {
  return (
    <>
    <main id="main" className="main">
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Receive Message Report</li>
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
                    <div >
                      <div className="m-4">
                       
                        <form action="post">
                          <div className="container-fluid ">
                            <div className="row  d-flex justify-content-end">
                            </div>

                            <div className="row">
                              <div className="mb-3 col-md-4 text-start">
                                {/* <label htmlFor="text" className="form-label"></label> */}
                                <h3><strong>All Messages</strong></h3>
                              </div>
                              <div className="mb-3 col-md-8 text-end">
                              <CSVLink
                                    data={receivereportdata}
                                    filename="dlr_data.csv"
                                    className="btn btn-primary"
                                  // onClick={handleExportClick}
                                  >
                                    Export
                                  </CSVLink>
                               
                              </div>
                            </div>
                          </div>

                        </form>
                        <hr />
                        <div className="main">
                          {/* <DataTableExtensions {...tableData}> */}
                          <DataTable
                            columns={receivereportcolumns}
                            data={receivereportdata}
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

export default ReceivedMessageReport