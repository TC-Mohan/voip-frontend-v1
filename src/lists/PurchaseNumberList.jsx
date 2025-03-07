import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";
import EditExtension from "../components/models/EditExtension";
import { ToastContainer } from "react-toastify";
import { paginationConfig } from "../components/global/paginationUtils";
 
const PurchaseNumberList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedExtension, setSelectedExtension] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CallGETAPI("api/get-purchase-number");
      if (response.status) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch data:", response.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const handleEditExtension = (index) => {
    const selectedItem = data[index];
    setSelectedItem(selectedItem);
    setSelectedExtension(selectedItem.ext_number);
  };

  const handleExtensionChange = (event) => {
    setSelectedExtension(event.target.value);
  };

  const handleClose = () => {
    setSelectedExtension(null);
  };

  const handleSave = async () => {
    try {
      const response = await CallPOSTAPI("api/edit-extension", {
        number: selectedItem.number,
        ext_number: selectedExtension,
      });
      if (response.status) {
        toast.success(response.msg);
        handleClose();
        fetchData();
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      toast.error("Error updating extension:", error.message);
    }
  };

  const handleDeleteClick = async (numberId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      didOpen: () => {
        const swalPopup = document.querySelector('.swal2-popup');
        if (swalPopup) {
          swalPopup.style.width = '380px';
          swalPopup.style.height = '200px';
          swalPopup.style.padding = '5px';
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CallGETAPI(`api/delete-purchase-number/${numberId}`);
          if (response.status) {
            fetchData();
            Swal.fire("Deleted!", "The number has been deleted.", "success");
          } else {
            toast.error("Something went wrong.");
          }
        } catch (error) {
          console.error("Error deleting number:", error.message);
          toast.error("Error deleting number");
        }
      }
    });
  };

  const columns = [
    {
      name: "Extension Number",
      // selector: "ext_number",
      selector: row => row.ext_number,

      sortable: true,
      compact: true,
    },
    {
      name: "Number",
      // selector: "number",
      selector: row => row.number,

      sortable: true,
      compact: true,
    },
    {
      name: "Company",
      // selector: "company",
      selector: row => row.company,

      sortable: true,
      compact: true,
    },
    {
      name: "Campaign",
      // selector: "campaign",
      selector: row => row.campaign,

      sortable: true,
      compact: true,
    },
    {
      name: "Target",
      // selector: "target",
      selector: row => row.target,

      sortable: true,
      compact: true,
    },
    {
      name: "Status",
      // selector: "status",
      selector: row => row.status,

      sortable: true,
      compact: true,
      cell: (row) => (
        <span className={row.status ? "text-success" : "text-danger"}>
          {row.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Actions",
      center: true,
      sortable: false,
      width: "20%",
      cell: (row, index) => (
        <>
          <Button variant="outline-warning" size="sm" onClick={() => handleEditExtension(index)}>
            <i className="fa fa-edit"></i>
          </Button>
          <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDeleteClick(row.id)}>
            <i className="fa fa-trash"></i>
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <main id="main" className="main">
       
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginTop: "10px" }}>
                      <h5 className="mb-0">Purchase Number List</h5>
                      <Link to="/add-purchase-number">
                        <Button className="btn btn-primary">Add Purchase Number</Button>
                      </Link>
                    </div>
                    <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  {isLoading ? (
                    <div className="d-flex justify-content-center my-5">
                      <ReactLoading type="spokes" color="grey" height={50} width={50} />
                    </div>
                  ) : (
                     <DataTable
                      columns={columns}
                      data={data}
                      pagination
                      highlightOnHover
                      dense
                      {...paginationConfig()}

                    /> 
                  )}
                </div>
              </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </section>
    
      </main>

      {selectedExtension && (
        <EditExtension
          show={true}
          handleClose={handleClose}
          extNumber={selectedExtension}
          handleSave={handleSave}
          handleExtensionChange={handleExtensionChange}
        />
      )}
    </>
  );
};

export default PurchaseNumberList;
