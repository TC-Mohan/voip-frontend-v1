import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import EditSmsTemplates from "./EditSmsTemplates";
import { BASE_API } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";

function SMSTemplates() {
  const [Data, setData] = useState([]);
  const [manageTarget, setManageTarget] = useState([]);
  useEffect(() => {
    // Fetch data from the API using axios

    // BASE_API+"api/get-smstemplate"

    axios
      .get(`${BASE_API}api/get-smstemplate`)
      .then((response) => setData(response.data)) // Use response.data instead of response.Data
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // Define DataTable columns based on your API response structure
  const columns = [
    {
      name: "ACTION",
      center: true,
      sortable: false,
      selector: "null",
      cell: (row) => [
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          onClick={() => handleToggleEditModal(row.contactlistid, row)}
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </button>,
        <button
          type="submit"
          className="btn btn-sm btn-outline-warning"
          onClick={() => handleDelete(row.id)}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>,
      ],
    },
    { name: "#", selector: "id", sortable: true },
    { name: "TemplateName", selector: "smstemplatename", sortable: true },
  ];

  const [formData, setFormData] = useState({
    smstemplatename: "",
    smstype: "",
    senderid: "",
    smsencoding: "",
    templateid: "",
    smstemplate: "",
  });

  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your server endpoint
      const response = await axios.get(
        `${BASE_API}api/delete-smstemplate/${id}`
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = `${BASE_API}api/update-smstemplate/${editId}`;
    // console.log("API URL:", apiUrl);

    try {
      // Use formData instead of editValues in the axios.post request
      const response = await axios.post(
        BASE_API + "api/create-smstemplate",
        formData
      );
      // console.log("PUT Response:", response);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("PUT Error:", error);
    }
  };

  const [editValues, setEditValues] = useState({
    smstemplatename: "",
    smstype: "promotional",
    senderid: "hdtsms",
    smsencoding: "text",
    templateid: "bsp-demo",
    smstemplate: "",
  });

  const onEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const [editId, seteditId] = useState(null);

  const onCancel = () => {
    seteditId(null);
    setEditValues({
      smstemplatename: "",
      smstype: "",
      senderid: "",
      smsencoding: "",
      templateid: "",
      smstemplate: "",
    });
  };

  const handleUpdate = async () => {
    const response = await axios.post(
      // Ensure if it's a PUT request for updating
      `${BASE_API}api/update-smstemplate/${editId}`,
      editValues
    );

    // Handle the response accordingly
    // console.log("PUT Response:", response);

    // Assuming smstemplate is a state variable
    const updatedData = smstemplate.data.map((row) =>
      row.publisher_id === editId ? { ...row, ...editValues } : row
    );

    setsmstemplate({ ...smstemplate, data: updatedData });
    // Reload the page
    window.location.reload();
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      if (!editId) {
        console.error("Invalid editId:", editId);
        return;
      }

      seteditId(null);
      setEditValues({
        smstemplatename: "",
        smstype: "",
        senderid: "",
        smsencoding: "",
        templateid: "",
        smstemplate: "",
      });
      setIsLoading(false);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      setIsLoading(false);
      // Handle error accordingly
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_API}api/get-smstemplate`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  // Edit modal handling
  const [showEditModal, setShowEditModal] = useState(false);

  const [smstemplate, setsmstemplate] = useState({ data: [] });
  const handleToggleEditModal = (id, row) => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      seteditId(row.id); // Make sure 'row.id' is defined and valid
      setEditValues({
        smstemplatename: row.smstemplatename,
        smstype: row.smstype,
        senderid: row.senderid,
        smsencoding: row.smsencoding,
        templateid: row.templateid,
        smstemplate: row.smstemplate,
      });
    } else {
      seteditId(null);
      setEditValues({
        smstemplatename: "",
        smstype: "",
        senderid: "",
        smsencoding: "",
        templateid: "",
        smstemplate: "",
      });
    }
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
              <li className="breadcrumb-item active">Sms Templates</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong>SMS Templates</strong>
              </h3>
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
                                <div className="mb-3 col-md-12 text-end">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <button
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModalTemplate"
                                    class="btn btn-primary"
                                  >
                                    <i class="fa-solid fa-plus"></i> Add
                                    Template
                                  </button>
                                  <div className="modal" id="myModalTemplate">
                                    <div className="modal-dialog modal-lg">
                                      <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                          <h4 className="modal-title">
                                            Add SMS Template
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
                                                <form
                                                  onSubmit={(e) =>
                                                    e.preventDefault()
                                                  }
                                                >
                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      SMS Template Name *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <input
                                                        type="text"
                                                        className="form-control w-100"
                                                        placeholder="SMS Template Name *"
                                                        name="smstemplatename"
                                                        value={
                                                          formData.smstemplatename
                                                        }
                                                        onChange={handleChange}
                                                      />
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      SMS Type *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select
                                                        className="form-select"
                                                        name="smstype"
                                                        value={formData.smstype}
                                                        onChange={handleChange}
                                                      >
                                                        <option value="promotional">
                                                          Promotional
                                                        </option>
                                                        <option value="transactional">
                                                          Transactional
                                                        </option>
                                                        <option value="otp">
                                                          OTP
                                                        </option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      Select Sender id *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select
                                                        className="form-select"
                                                        name="senderid"
                                                        value={
                                                          formData.senderid
                                                        }
                                                        onChange={handleChange}
                                                      >
                                                        <option value="hdtsms">
                                                          HDTSMS
                                                        </option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      Select SMS Encoding *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select
                                                        className="form-select"
                                                        name="smsencoding"
                                                        value={
                                                          formData.smsencoding
                                                        }
                                                        onChange={handleChange}
                                                      >
                                                        <option value="text">
                                                          Text
                                                        </option>
                                                        <option value="unicode">
                                                          Unicode
                                                        </option>
                                                        <option value="flashsms">
                                                          Flash SMS
                                                        </option>
                                                        <option value="unicodeflashsms">
                                                          Unicode Flash SMS
                                                        </option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      Select Template *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select
                                                        className="form-select"
                                                        name="templateid"
                                                        value={
                                                          formData.templateid
                                                        }
                                                        onChange={handleChange}
                                                      >
                                                        <option value="bsp-demo">
                                                          BSP-DEMO
                                                        </option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      SMS Template *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <textarea
                                                        className="form-control w-100"
                                                        rows="5"
                                                        id=""
                                                        name="smstemplate"
                                                        placeholder="THIS IS TEST MESSAGE TO START BULK SMS SERVICE WITH {#var#} HENCE DIGITAL"
                                                        value={
                                                          formData.smstemplate
                                                        }
                                                        onChange={handleChange}
                                                      ></textarea>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    ></label>
                                                    <div className="col-sm-8 text-start">
                                                      <ul>
                                                        <li>
                                                          @agent_mobile: if you
                                                          use agent mobile
                                                          number then you can
                                                          write @agent_mobile
                                                          instead of var
                                                        </li>
                                                        <li>
                                                          @caller_number: if you
                                                          use caller mobile
                                                          number then you can
                                                          write @caller_number
                                                          instead of var
                                                        </li>
                                                        <li>
                                                          @admin_mobile: if you
                                                          use your mobile number
                                                          then you can write
                                                          @admin_mobile instead
                                                          of var
                                                        </li>
                                                        <li>
                                                          @call_status: if you
                                                          use your call status
                                                          then you can write
                                                          @call_status instead
                                                          of var
                                                        </li>
                                                        <li>
                                                          @date_time: if you use
                                                          your date and time
                                                          then you can write
                                                          @date_time instead of
                                                          var
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </div>

                                                  <div className="row">
                                                    <div className="col-sm-4 "></div>
                                                    <div className="col-sm-8 text-end">
                                                      <button
                                                        type="button"
                                                        class="btn btn-basic"
                                                        data-bs-dismiss="modal"
                                                        onClick={() =>
                                                          setModalIsOpen(false)
                                                        }
                                                      >
                                                        Close
                                                      </button>
                                                      <span> </span>
                                                      <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        onClick={handleSubmit}
                                                      >
                                                        Save Template
                                                      </button>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="modal-footer"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-3 col-md-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>

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
                            {editId !== null && (
                              <EditSmsTemplates
                                editValues={editValues}
                                onEditChange={onEditChange}
                                onSave={onSave}
                                show={showEditModal}
                                setShow={setShowEditModal}
                                onCancel={onCancel}
                                editId={editId}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

export default SMSTemplates;
