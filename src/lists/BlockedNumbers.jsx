import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";
import AddBlockedNumberModal from "./AddBlockedNumberModal";
import EditBlockedNumberModal from "./EditBlockedNumberModal";
import ReactLoading from "react-loading";
import { paginationConfig } from "../components/global/paginationUtils";

const BlockedNumbers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blockedNumbers, setBlockedNumbers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);

  const [newNumber, setNumberError] = useState("");

  useEffect(() => {
    fetchBlockedNumbers();
    setIsLoading(true);
  }, []);

  const fetchBlockedNumbers = async () => {
    try {
      const response = await CallGETAPI("api/get-all-block-number");
      if (response.status) {
        setBlockedNumbers(response?.data?.data || []);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsLoading(false);
    }
  };

  const handleAddNumber = async (newNumber) => {
    try {
      const blockNumber = newNumber.block_number;

      setIsLoading(true);
      const response = await CallPOSTAPI("api/block-number", { block_number: blockNumber });
      setIsLoading(false);
      if (response.status) {
        fetchBlockedNumbers();
        toast.success("Number blocked successfully");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error adding number:", error.message);
      toast.error("Error adding number");
      setIsLoading(false);
    }
  };

  const handleEditClick = (number) => {
    setSelectedNumber(number);
    setShowEditModal(true);
  };

  const handleUpdateNumber = async (updatedNumber) => {
    try {
      setIsLoading(true);
      const response = await CallPOSTAPI(`api/update-block-number/${updatedNumber.id}`, updatedNumber);
      setIsLoading(false);
      if (response.status) {
        fetchBlockedNumbers();
        toast.success("Number updated successfully");
        setShowEditModal(false);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating number:", error.message);
      toast.error("Error updating number");
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async (numberId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CallGETAPI(`api/delete-block-number/${numberId}`);
          if (response.status) {
            fetchBlockedNumbers();
            Swal.fire('Deleted!', 'The number has been deleted.', 'success');
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
      name: "Blocked Number",
      selector: "block_number",
      sortable: true,
      compact: true,
    },
    {
      name: "Actions",
      center: true,
      sortable: false,
      width: "20%",
      cell: (row) => (
        <>
          <Button variant="outline-warning" size="sm" onClick={() => handleEditClick(row)}>
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
      <main id="main" className="main">
        <section className="section dashboard">
          <div className="card">
            <div className="card-body ">
              <div className="d-flex justify-content-between align-items-center mb-3" style={{ marginTop: "10px" }}>
                <h5 className="mb-0">Blocked Numbers</h5>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                  Add Block Number
                </Button>
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
                      data={blockedNumbers}
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
        </section>
      </main>
      <AddBlockedNumberModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAddNumber={handleAddNumber}
        isLoading={isLoading}
        newNumber={newNumber}
      />
      <EditBlockedNumberModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        numberData={selectedNumber}
        onUpdateNumber={handleUpdateNumber}
        isLoading={isLoading}
      />
    </>
  );
};

export default BlockedNumbers;
