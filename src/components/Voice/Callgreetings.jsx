import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { CallGETAPI, CallPostFileUpload, FILE_BASE } from "../../helper/Constants";
import UpdateGreetings from "../phone/UpdateGreetings";
import ReactLoading from "react-loading";
import { tableCustomStyles } from "../../helper/utils";
import Swal from "sweetalert2";
import { Link } from "@mui/material";
import { paginationConfig } from "../global/paginationUtils";

function Callgreetings() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [greetingsData, setGreetingsData] = useState([]);
  const [savingData, setSavingData] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedGreeting, setSelectedGreeting] = useState(null);

  useEffect(() => {
    fetchGreetingsData();
    // setLoading(false);
  }, []);

  const fetchGreetingsData = async () => {
    try {
      setLoading(true);
      // console.log("Fetching greetings data...");
      const response = await CallGETAPI("api/greetings");
      if (response.status === true) {
        setGreetingsData(response.data.data || []);
      } else {
        console.error("Error fetching records:", response.message);
      }
    } catch (error) {
      console.error("Error fetching records:", error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleEdit = (greeting) => {
    setSelectedGreeting(greeting);
    setShowUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setSelectedGreeting(null);
    setShowUpdateModal(false);
  };

  const handleUpdateSuccess = () => {
    handleUpdateModalClose();
    fetchGreetingsData();
  };

  const [formData, setFormData] = useState({
    greeting_name: "",
    greeting_audio: "",
  });

  const handleClose = () => {
    setShow(false);
    setFormData({
      greeting_name: "",
      greeting_audio: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      greeting_name: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      greeting_audio: file,
    }));
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this Call Greeting !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // console.log("Attempting to delete item with ID:", id);

          const response = await CallGETAPI(`api/delete-greeting/${id}`);
          // console.log("DELETE Response:", response);
          fetchGreetingsData();
          Swal.fire({
            title: "Deleted!",
            text: "Your Call Greeting has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      if (!formData.greeting_name.trim() || !formData.greeting_audio) {
        toast.error("Please enter a greeting name and select an audio file.");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("greeting_name", formData.greeting_name);
      formDataToSend.append("greeting_audio", formData.greeting_audio);

      setSavingData(true);

      const response = await CallPostFileUpload(
        "api/create-greeting",
        formDataToSend
      );

      if (response.status) {
        handleClose();
        toast.success(response.msg || "Greeting Created Successfully !");
        fetchGreetingsData();
      } else {
        throw new Error(
          response.msg || "something went wrong please try after some time"
        );
      }
    } catch (error) {
      toast.error(error.msg);
    } finally {
      setLoading(false);
      setSavingData(false);
    }
  };

  const callgreetingscolumns = [
    {
      name: "ACTION",
      center: true,
      sortable: false,
      cell: (row) => (
        <>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning me-2"
            onClick={() => handleEdit(row)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-warning"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa-regular fa-trash-alt"></i>
          </button>
        </>
      ),
    },

    {
      name: "Callgreetings Name",
      selector: "greeting_name",
      sortable: true,
    },
    {
      name: "Callgreetings Audio",
      selector: "greeting_audio",
      sortable: true,
      cell: (row) => (
        <>
        <audio controls>
          <source src={FILE_BASE+'audio/'+row.greeting_audio}  />
          Your browser does not support the audio element.
        </audio>
        </>
      ),
    },
  ];

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active">Callgreetings</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong className="border-bottom border-3 pb-2">
                  Callgreetings
                </strong>
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
              <div className="mb-3 col-md-12 text-end mt-4">
                <button
                  type="button"
                  onClick={handleShow}
                  className="btn btn-primary"
                >
                  <i className="fa-solid fa-upload"></i> Upload Call Greetings
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Upload Call Greetings</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      {/* Input for greeting name */}
                      <div className="row">
                        <label className="col-6">Enter Greeting Name:</label>
                        <input
                          className="col-6 form-control"
                          type="text"
                          id="greeting_name"
                          placeholder="Enter greeting name..."
                          value={formData.greeting_name}
                          onChange={handleNameChange}
                          required
                        />
                      </div>
                      <br />
                      {/* Upload Greeting Audio */}
                      <div className="row">
                        <label className="col-6">Upload Greeting Audio:</label>
                        <div className="col-lg-6 d-flex justify-content-start">
                          <input
                            type="file"
                            id="greetingAudio"
                            accept="audio/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            required
                          />
                          <Button
                            onClick={() =>
                              document.getElementById("greetingAudio").click()
                            }
                          >
                            Choose File
                          </Button>
                          {formData.greeting_audio && (
                            <span>
                              {formData.greeting_audio.name.length > 20
                                ? `${formData.greeting_audio.name.slice(
                                    0,
                                    10
                                  )}...`
                                : formData.greeting_audio.name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      {loading && (
                        <div className="d-flex justify-content-center my-5">
                          <ReactLoading
                            type="spokes"
                            color="grey"
                            height={50}
                            width={50}
                          />
                        </div>
                      )}

                      {!loading && (
                        <div className="main">
                          {greetingsData.length > 0 ? (
                            <DataTable
                              className="border-top border-1 mt-4"
                              columns={callgreetingscolumns}
                              data={greetingsData}
                              searchable
                              noHeader
                              defaultSortField="id"
                              defaultSortAsc={true}
                              pagination
                              highlightOnHover
                              dense
                              customStyles={tableCustomStyles}
                              {...paginationConfig()}

                            />
                          ) : (
                            <div>No greetings available</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UpdateGreetings
        show={showUpdateModal}
        onHide={handleUpdateModalClose}
        greeting={selectedGreeting}
        onUpdate={handleUpdateSuccess}
      />
    </>
  );
}

export default Callgreetings;
