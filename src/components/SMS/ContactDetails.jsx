import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { BASE_API } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";

const ContactDetails = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [Data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get(BASE_API+"api/get-contact-by-contactlistid/2")
      .then((response) => setData(response.data)) // Use response.data instead of response.Data
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // Define DataTable columns based on your API response structure
  const columns = [
    {
      name: "ACTION",
      selector: "action",
      sortable: true,
      cell: (row) => [
        <button type="submit" class="btn btn-sm btn-outline-warning">
          <i class="fa-solid fa-trash"></i>
        </button>,
      ],
    },
    { name: "#", selector: "id", sortable: true },
    { name: "Name", selector: "name", sortable: true },
    { name: "Number", selector: "number", sortable: true },
  ];

  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const addNewContact = async () => {
    // Prepare the data to be sent to the API
    const newData = {
      contactlistid: "2",
      name: contactName,
      number: contactNumber,
    };

    try {
      // Make an API request using Axios
      const response = await axios.post( (BASE_API+'api/add-single-contact'), newData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });      

      // Handle the response
      if (response.status === 200) {
        // console.log("Contact added successfully");
        // You can also update your local state or perform other actions after successful API call
      } else {
        console.error("Error adding contact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Contact List Manager</a>
              </li>
              <li className="breadcrumb-item active">
                Contact List Number Manager
              </li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <h3>
                <strong>Contact List Number Manager</strong>
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
                                <div className="mb-3 col-md-12 text-end">
                                  <button
                                    type="button"
                                    class="btn btn-primary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                  >
                                    <i class="fa-solid fa-gear"></i> Bulk Action
                                  </button>
                                  <ul class="dropdown-menu">
                                    <li>
                                      <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                        accept=".csv, .xlsx"
                                        class="dropdown-item"
                                        // style={{ display: 'none' }}
                                      />
                                    </li>
                                    <li>
                                      <a class="dropdown-item" href="#">
                                        Delete Selected Contact List
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="container">
                                <div className="row">
                                  <div className="mb-3 col-md-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Contact Name"
                                      value={contactName}
                                      onChange={(e) =>
                                        setContactName(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3 col-md-3 text-end">
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter Contact Number"
                                      value={contactNumber}
                                      onChange={(e) =>
                                        setContactNumber(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-3 col-md-2">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={addNewContact}
                                    >
                                      Add New Contact
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-3 col-md-3">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                  />
                                </div>
                                <div className="mb-3 col-md-8 text-end"></div>
                              </div>
                            </div>
                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
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
};

export default ContactDetails;
