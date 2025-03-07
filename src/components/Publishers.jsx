import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import EditPublishers from "./EditPublishers";
import axios from "axios";
import ReactLoading from "react-loading";
import { BASE_API, CallPOSTAPI, CallGETAPI } from "../helper/Constants";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreatPublisher from "./publisher/CreatPublisher";
import "./Datatable.css";
import { tableCustomStyles } from "../helper/utils";
import { paginationConfig } from "./global/paginationUtils";
function Publishers() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [savepublisher, setSavePublisher] = useState({ data: [] });
  const [editValues, setEditValues] = useState({
    name: "",
    numbercreation: false,
    blockcalls: "",
    accesstorecordings: "",
  });

  const onEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const [editId, setEditId] = useState(null);

  const onCancel = () => {
    setEditId(null);
    setEditValues({
      name: "",
      numbercreation: false,
      blockcalls: "",
      accesstorecordings: "",
    });
  };

  const onSave = async () => {
    try {
      setIsLoading(true);
      if (!editId) {
        console.error("Invalid editId:", editId);
        return;
      }
      //Send a PUT request to update the data on the server
      const response = await CallPOSTAPI(
        `api/update-publisher/${editId}`,
        editValues
      );

      // console.log("PUT Response:", response);

      setShowEditModal(false);
      fetchData();
      //Update the row in your local state

      setEditId(null);
      setEditValues({
        name: "",
        numbercreation: false,
        blockcalls: "",
        accesstorecordings: "",
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-publisher");
      // console.log({ response });
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Edit modal handling
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleEditModal = (id, row) => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setEditId(id);
      setEditValues({
        name: row.name,
        numbercreation: row.numbercreation, // Change as per your data
        blockcalls: row.blockcalls,
        accesstorecordings: row.accesstorecordings,
      });
    } else {
      setEditId(null);
      setEditValues({
        name: "",
        numbercreation: false,
        blockcalls: "",
        accesstorecordings: "",
      });
    }
  };

  const columns = [
    {
      name: "ACTION",
      center: true,
      sortable: false,
      // selector: "null",
      selector: row => row.null,

      cell: (row) => [
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          onClick={() => handleToggleEditModal(row.publisher_id, row)}
        >
          <i class="fa-regular fa-pen-to-square"></i>
        </button>,
        <button type="submit" class="btn btn-sm btn-outline-warning">
          <i class="fa-regular fa-user"></i>
        </button>,
        <button
          type="submit"
          className="btn btn-sm btn-outline-warning"
          onClick={() => deleteTarget(row.publisher_id)}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>,
      ],
    },

    { name: "Name",
    //  selector: "name", 
       selector: row => row.name,
    
    
     sortable: true 
    },
    {
      name: "Create Number",
      sortable: true,
      // selector: "numbercreation",
      selector: row => row.numbercreation,

      cell: (row) => (row.numbercreation ? "Yes" : "No"),
    },
    { name: "ID", 
    // selector: "uid",
    selector: row => row.uid,
    
     sortable: true },
    // {
    //   name: "Reacording",
    //   sortable: true,
    //   selector: "accesstorecordings",
    //   style: {
    //     whiteSpace: "normal",
    //   },
    // },
    {
      name: "Block Calls",
      sortable: true,
      // selector: "blockcalls",
    selector: row => row.blockcalls,

    },
   
    {
      name: "Hour",
      // selector: "hourlyInput",
    selector: row => row.hourlyInput,

      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.hourlyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },

    {
      name: "Day",
      // selector: "dailyInput",
    selector: row => row.dailyInput,

      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.dailyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },
    {
      name: "Month",
      // selector: "monthlyInput",
    selector: row => row.monthlyInput,

      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.monthlyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },
    // { name: "Total", selector: "" },
    {
      name: "Status",
      // selector: "status",
    selector: row => row.status,

      sortable: true,
      cell: (row) => (
        <span
          style={{
            color: row.status ? "green" : "red",
            fontSize: "3rem",
            lineHeight: 0,
          }}
        >
          &bull;
        </span>
      ),
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    numbercreation: false,
    blockcalls: "", // Include this in your formData
    accesstorecordings: "", // Include this in your formData
  });
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form Data:", formData);
    try {
      const response = await CallPOSTAPI("api/create-publisher", formData);
      // console.log({ response });
      // const response = await axios.post(
      //   BASE_API + "api/create-publisher",
      //   formData
      // );
      // console.log("Data sent:", response.data);
      toast.success("Publisher Added Successfully");
      fetchData();

      // Optionally, perform actions after successful submission
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle error scenarios
    }
  };

  const [publishersTarget, setPublishersTarget] = useState([]);
  const deleteTarget = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this campaigns !",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes ",
        didOpen: () => {
          const swalPopup = document.querySelector('.swal2-popup');
          const swalTitle = document.querySelector('.swal2-title');
          const swalContent = document.querySelector('.swal2-content');
      
          // Apply inline styles to make the Swal popup smaller
          if (swalPopup) {
            swalPopup.style.width = '380px';
            swalPopup.style.height = '200px';
            swalPopup.style.padding = '5px';
          }
        }      
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log("Attempting to delete item with ID:", id);

          const response = await CallGETAPI(`api/delete-publisher/${id}`);
          // console.log("DELETE Response:", response);
          fetchData();
          Swal.fire({
            title: "Deleted!",
            text: "Your Publisher has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data?.data?.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">Publishers</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h1></h1>
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
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                      <button type="submit" class="btn btn-primary rounded-0">
                        <i class="fa fa-search"></i>
                      </button>
                    </li>
                  </div>
                  <div className="col-6 d-flex justify-content-end ">
                    <div className="d-grid col-6">
                      <button
                        type="button"
                        className="btn btn-primary rounded-0"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal2"
                      >
                        Add Publisher
                      </button>
                      {/* add Publicher btn */}
                      <CreatPublisher fetchData={fetchData} />
                      {/* add Publicher btn */}
                    </div>
                    <div>
                      <button type="button" class="btn border-light ">
                        <i class="fa-solid fa-gear"></i>
                      </button>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-end">
                    <div className="pl-2"></div>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-4 text-center">
                <div className="row">
                  <div className="col-12">
                    <h5 className="text-left">Publishers</h5>
                  </div>
                </div>
              </div>
              {isLoading && (
                <div
                  className="d-flex justify-content-center my-5"
                  style={{ marginTop: "20px" }}
                >
                  <ReactLoading
                    type="spokes"
                    color="grey"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              {!isLoading && (
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
                              <div>
                                {/* <h1>Your Data Table</h1> */}
                                {/* {JSON.stringify(data?.DataTable)} */}
                                {/* {JSON.stringify(columns)} */}
                              </div>

                              <div className="datatable">
                                <DataTable
                                  columns={columns}
                                  data={filteredData}
                                  noHeader
                                  defaultSortField="id"
                                  // sortIcon={<SortIcon />}
                                  defaultSortAsc={true}
                                  pagination
                                  highlightOnHover
                                  // dense
                                  overflowY
                                  customStyles={tableCustomStyles}
                                  {...paginationConfig()}

                                  // customStyle={tableCustomStyles}
                                />
                                {editId !== null && (
                                  <EditPublishers
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
                              {/* </DataTableExtensions> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Repeat the above code for the other tabs */}
                    </div>
                  </div>
                </div>
              )}
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
      </main>
      {/* <footer footer id="footer" class="footer">
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

export default Publishers;
