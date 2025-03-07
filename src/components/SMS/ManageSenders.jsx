import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import EditManageSender from "./EditManageSender";
import { BASE_API } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";
function ManageSenders() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    senderid: "",
    smscontent: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(BASE_API + "api/create-addbuyer", formData);
      // console.log(response.data);

      setFormData({
        country: "",
        senderid: "",
        smscontent: "",
      });

      // Fetch updated data after adding new data
      fetchData();
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  const fetchData = () => {
    axios
      .get(BASE_API + "api/get-addbuyer")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (id, values) => {
    setEditId(id);
    setEditValues(values);
    setShowEditModal(true);
  };

  const handleEditSave = async (editedData) => {
    try {
      // Make a PUT request to update the edited data
      await axios.post(BASE_API + `api/update-addbuyer/${editId}`, editedData);
      // Fetch updated data after editing
      fetchData();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };
  const columns = [
    {
      name: "Action",
      selector: "null",
      sortable: true,
      width: "7%",
      cell: (row) => [
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          onClick={() => handleEditClick(row.id, row)}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>,
      ],
    },
    {
      name: "#",
      selector: "id",
      sortable: true,
      compact: true,
      width: "5%",
      // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      width: "9%",
    },
    {
      name: "Country",
      selector: "country",
      sortable: true,
      width: "10%",
    },
    {
      name: "Sender ID",
      selector: "senderid",
      sortable: true,
      width: "8%",
    },
    {
      name: "Header ID",
      selector: "headerid",
      width: "9%",
    },
    {
      name: "Entity ID",
      selector: "entityid",
      width: "10%",
    },
    {
      name: "Entity Name",
      selector: "entityname",
      width: "10%",
    },
    {
      name: "Admin Remark",
      selector: "none",
      width: "7%",
    },
    {
      name: "Created",
      selector: "createdAt",
      width: "16%",
    },
    {
      name: "Approved",
      selector: "updatedAt",
      width: "16%",
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
              <li className="breadcrumb-item active">Sender ID Manager</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h4>Sender ID Manager</h4>
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
                        + Create New Sender ID Request
                      </button>
                      {/* add buyer */}
                      <div className="modal" id="myModal">
                        <div className="modal-dialog modal-md">
                          <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                              <h4 className="modal-title">
                                Create New Sender Id Request
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
                                    <form onSubmit={(e) => e.preventDefault()}>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          Country :
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control "
                                            placeholder=""
                                            required=""
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          Sender Id :
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control "
                                            placeholder=""
                                            required=""
                                            name="senderid"
                                            value={formData.senderid}
                                            onChange={handleChange}
                                          />
                                        </div>
                                      </div>
                                      <div className="row mb-3">
                                        <label
                                          className="desc col-sm-4 col-form-label  d-flex justify-content-end  "
                                          id="title1"
                                          htmlFor="Field1"
                                        >
                                          SMS Content :
                                        </label>
                                        <div className="col-sm-8">
                                          <input
                                            type="text"
                                            className="form-control "
                                            placeholder=""
                                            required=""
                                            name="smscontent"
                                            value={formData.smscontent}
                                            onChange={handleChange}
                                          />
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
                                          onClick={handleSubmit}
                                        >
                                          Create New Sender ID Request
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
                              // data={data?.data || []}
                              data={data}
                              noHeader
                              defaultSortField="id"
                              // sortIcon={<SortIcon />}
                              defaultSortAsc={true}
                              pagination
                              highlightOnHover
                              dense
                              {...paginationConfig()}

                            />
                            
      <EditManageSender
        show={showEditModal}
        setShow={setShowEditModal}
        editId={editId}
        editValues={editValues}
        onSave={handleEditSave}
      />
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

export default ManageSenders;
