import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BASE_API } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";
function ManageTemplates() {
  const [formData, setFormData] = useState({
    templatename: "",
    templateid: "",
    templatetext: "",
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        (BASE_API+"api/create-template"),
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("API Response:", response.data);
      // Add any success handling logic here
    } catch (error) {
      console.error("Error:", error);
      // Add any error handling logic here
    }
  };

  const [Data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get( BASE_API + "api/get-template")
      .then((response) => setData(response.data)) // Use response.data instead of response.Data
      .catch((error) => console.error("Error fetching data:", error));
      
  }, []);
  const [manageTarget, setManageTarget] = useState([]);
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your server endpoint
      const response = await axios.get(
        `${BASE_API}/api/delete-template/${id}`
      );
      // console.log("DELETE Response:", response);
      // Update the row in your local state
      const updatedData = manageTarget.data.filter(
        (row) => row.target_id !== id
      );

      // Update the state with the new data
      setManageTarget({ ...manageTarget, data: updatedData });
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle error accordingly, e.g., show a notification to the user
    }
  };

  // ... rest of

  const getStatusColor = (status) => {
    // Your logic to determine background color based on status
    return status === 'Approved' ? 'rgb(135, 208, 104)' : status === 'Rejected' ? 'red' : 'white';
  };
  
  const getStatusTextColor = (status) => {
    // Your logic to determine text color based on status
    return status === 'Approved' || status === 'Rejected' ? 'white' : 'black';
  };

  const columns = [
    {
      name: "Action",
      selector: "null",
      sortable: true,
      width: "8%",
      cell: (d) => [
        <button type="submit" class="btn btn-sm btn-outline-warning"
         onClick={() => handleDelete(d.id)}>
            <i class="fa-solid fa-trash"></i>
        </button>,
      ],
    },
    {
      name: "Template Id",
      selector: "templateid",
      sortable: true,
      compact: true,
      width: "8%",
      // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      width: "10%",
      cell: (d) => (
        <div style={{ backgroundColor: getStatusColor(d.status), color: getStatusTextColor(d.status), fontWeight: 'bold', padding: '3px' }}>
          {d.status}
        </div>)
    },
    {
      name: "DLT Template ID",
      selector: "id",
      sortable: true,
      width: "11%",
    },
    {
      name: "Name",
      selector: "templatename",
      sortable: true,
      width: "8%",
    },
    {
      name: "Test",
      selector: "templatetext",
      width: "12  %",
      height: "auto",
    },
    {
      name: "Reason",
      selector: "reason",
      width: "10%",
    },
    {
      name: "Created",
      selector: "createdAt",
      width: "12%",
    },
    {
      name: "Approved",
      selector: "updatedAt",
      width: "12%",
    },
  ];
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">SMS Manage</a>
              </li>
              <li className="breadcrumb-item active">Manage Templates</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h3>Manage Templates</h3>
              {/* Bordered Tabs Justified */}
              <div className="container-fluid ">
                <div className="row">
                  <div className="col-6 d-flex justify-content-start ">
                    <li
                      className="nav-item flex-fill d-flex "
                      role="presentation"
                    >
                      <input
                        className="form-control w-50 rounded-0"
                        type="text"
                        placeholder="Search"
                      />
                    </li>
                  </div>
                  <div className="col-6 d-flex justify-content-end ">
                    <div className="d-grid col-6">
                      <button
                        type="button"
                        className="btn btn-primary px-1 rounded-0"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        + Create New Template
                      </button>
                      {/* add buyer */}
                      <div className="modal" id="myModal">
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                              <h4 className="modal-title">
                                Create New Template
                              </h4>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              />
                            </div>
                            {/* Modal body */}
                            <div className="modal-body">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-12">
                                    <form onSubmit={handleFormSubmit}>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          Template Name :
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control w-100"
                                            placeholder=""
                                            required=""
                                            name="templatename"
                                            value={formData.templatename}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          Template Id :
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control w-100"
                                            placeholder=""
                                            name="templateid"
                                            value={formData.templateid}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          Template Text :
                                        </label>
                                        <div className="col-sm-8">
                                          <textarea
                                            type="text"
                                            rows="5"
                                            className="form-control w-100"
                                            placeholder=""
                                            required=""
                                            name="templatetext"
                                            value={formData.templatetext}
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <label
                                          htmlFor="inputEmail"
                                          className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                        ></label>
                                        <div className="col-sm-8 text-start">
                                          <ul class="">
                                            <li class="">Encoding: GSM_7BIT</li>
                                            <li class="">Length: 0</li>
                                            <li class="">Messages: 0</li>
                                            <li class="">Per Message: 160</li>
                                            <li class="">Remaining: 160</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                          type="submit"
                                        >
                                          Create New Template
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* add buyer */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-4 text-center">
              </div>
              <div className="container-fluid mt-4 text-left">
                <div className="row ">
                  <div
                    className="tab-content "
                    id="borderedTabJustifiedContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="bordered-justified-campaign"
                      role="tabpanel"
                      aria-labelledby="campaign-tab"
                    >
                      <div className="card" style={{ boxShadow: "none" }}>
                        <div
                          className="card-body"
                          style={{ padding: 0, overflowX: "auto" }}
                        >
                          <div className="main">
                          <DataTable
                              columns={columns}
                              data={Data?.data || []}
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
                            {/* </DataTableExtensions> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Repeat the above code for the other tabs */}
                  </div>
                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      <footer footer id="footer" class="footer">
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

export default ManageTemplates;
