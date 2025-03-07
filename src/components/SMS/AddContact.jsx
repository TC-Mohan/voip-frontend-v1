import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import EditContactList from "./EditContactList";
import { Modal, Button } from "react-bootstrap";
import { BASE_API } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";
function AddContact() {

  // Creact contactList Name 

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        BASE_API + "api/create-contactlist",
        formData
      );
      // console.log(response.data);
      // Reset the form data after successful submission
      setFormData({ name: "" });
      // Close the modal after successful submission
      setShowModal(false);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  // Get Contantlist Data

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_API + "api/get-coantactlist")
      .then((response) => {
        // console.log("Contact List Data:", response.data.data);
        if (response.data.status) {
          setContactList(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const contactColumns = [
    {
      name: "ACTION",
      sortable: true,
      cell: (row) => (
        <div>
          <button type="submit" className="btn btn-sm btn-outline-warning mr-2">
            <CSVLink
              data={contactList}
              filename={`contact_list_${row.contactlistid}.csv`}
            >
              <i className="fa-solid fa-download"></i>
            </CSVLink>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning mr-2"
            onClick={() => handleToggleEditModal(row.contactlistid, row)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-outline-warning mr-2"
            onClick={() => handleDelete(row.contactlistid,row)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button type="submit" className="btn btn-sm btn-outline-warning">
            <Link to="/contact-details">
              <i className="fa-regular fa-eye"></i>
            </Link>
          </button>
        </div>
      ),
    },
    {
      name: "#",
      selector: "contactlistid",
      sortable: true,
      compact: true,
    },
    {
      name: "NAME",
      selector: "name",
      sortable: true,
    },
    {
      name: "TOTAL NUMBERS",
      selector: "numberCount", 
      sortable: true,
    },
  ];

// Delete ContactList Data 
const handleDelete = (id) => {
  setEditId(id);
  const newList = contactList.filter((item) => item.id !== id);
  setContactList(newList);
};

  
 //// Edit ContactList Data ////
  

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [editValues, setEditValues] = useState({
    name: "",
  });

  const [editId, setEditId] = useState(null);

  const onCancel = () => {
    setEditId(null);
    setEditValues({
      name: "",
    });
  };
  const onEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const onSave = (id) => {
    const newList = contactList.map((item) =>
      item.id === id ? { ...item, name: editValues.name } : item
    );
    setContactList(newList);
    setShowEditModal(false);
    setEditId(null);
  };
  // Edit modal handling
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleEditModal = (id, row) => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setEditId(id);
      setEditValues({
        name: row.name,
      });
    } else {
      setEditId(null);
      setEditValues({
        name: "",
      });
    }
  };

  const [formData, setFormData] = useState({
    name: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const uploadData = new FormData();
      uploadData.append("file", selectedFile);

      // Add your file upload logic here (e.g., using fetch or an API library)
    } else {
      console.error("No file selected.");
    }
  };
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    // axios
    //   .get("https://api.example.com/data")
    //   .then((response) => setApiData(response.data))
    //   .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Contact List Manager</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <h3>
                <strong>Contact List Manager</strong>
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
                              <div className="row  d-flex justify-content-end">
                                <div className="mb-3 col-md-7 d-flex justify-content-between">
                                  <button type="button" class="btn btn-primary">
                                    <i class="fa-solid fa-plus"></i> Merge
                                    Contact List
                                  </button>

                                  <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModalBulkContact"
                                  >
                                    <i class="fa-solid fa-plus"></i> Upload Bulk
                                    Contact List
                                  </button>
                                  <div
                                    className="modal"
                                    id="myModalBulkContact"
                                  >
                                    <div className="modal-dialog modal-lg">
                                      <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                          <h4 className="modal-title">
                                            Upload Bulk Contact List
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
                                                <form>
                                                  <div className="row mb-4">
                                                    <label
                                                      htmlFor="inputEmail"
                                                      className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                                    >
                                                      SMS Type *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select className="form-select">
                                                        {apiData.map(
                                                          (item, index) => (
                                                            <option key={index}>
                                                              {item.name}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                    </div>
                                                  </div>
                                                  <div className="row d-flex justify-content-center">
                                                    <div className="col-8">
                                                      <input
                                                        type="file"
                                                        id="fileInput"
                                                        onChange={
                                                          handleFileChange
                                                        }
                                                        accept=".csv, .xlsx"
                                                        // style={{ display: 'none' }}
                                                      />
                                                      {/* <button type="submit">Upload</button> */}
                                                    </div>
                                                  </div>

                                                  <div className="row">
                                                    <div className="col-sm-4 "></div>
                                                    <div className="col-sm-8 text-end">
                                                      <button
                                                        type="button"
                                                        class="btn btn-basic"
                                                        data-bs-dismiss="modal"
                                                      >
                                                        Close
                                                      </button>
                                                      <span> </span>
                                                      <button
                                                        type="submit"
                                                        class="btn btn-primary"
                                                      >
                                                        Create Bulk Contact List
                                                      </button>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                              <div className="col-2"></div>
                                            </div>
                                          </div>
                                        </div>
                                        {/* Modal footer */}
                                        <div className="modal-footer"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="fa-solid fa-plus"></i> Add New
                                    Contact List
                                  </button>

                                  <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Add New Contact List
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <form
                                        onSubmit={(e) => e.preventDefault()}
                                        id="my-form"
                                      >
                                        <div className="row mb-4">
                                          <label
                                            htmlFor="inputEmail"
                                            className="col-sm-4 col-form-label d-flex justify-content-end"
                                          >
                                            Name *
                                          </label>
                                          <div className="col-sm-8">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Name *"
                                              value={formData.name}
                                              onChange={handleChange}
                                              name="name"
                                            />
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-sm-4"></div>
                                          <div className="col-sm-8 text-end">
                                            <Button
                                              variant="secondary"
                                              onClick={() =>
                                                setShowModal(false)
                                              }
                                            >
                                              Close
                                            </Button>
                                            <span> </span>
                                            <Button
                                              variant="primary"
                                              onClick={handleSubmit}
                                            >
                                              Create New Contact List
                                            </Button>
                                          </div>
                                        </div>
                                      </form>
                                    </Modal.Body>
                                    {/* Modal footer */}
                                    <Modal.Footer></Modal.Footer>
                                  </Modal>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-3 col-md-4">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={searchTerm}
                                  />
                                </div>
                                <div className="mb-3 col-md-8 text-end">
                                  <label
                                    htmlFor="text"
                                    className="form-label"
                                  ></label>
                                  <CSVLink
                                    data={contactList}
                                    filename="dlr_data.csv"
                                    className="btn btn-primary"
                                    // onClick={handleExportClick}
                                  >
                                    Download Sample
                                  </CSVLink>
                                </div>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
                            {/* contactList */}
                            <DataTable
                               columns={contactColumns}
                      data={contactList || []}
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
                      <EditContactList
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

export default AddContact;
