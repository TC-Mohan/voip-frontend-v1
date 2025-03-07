import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { BASE_API, CallPOSTAPI, CallGETAPI } from "../../helper/Constants";
import { RingGroupOption } from "../../helper/utils";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
const EditRingGroup = ({
  editValues,
  onEditChange,
  onCancel,
  onSave,
  show,
  setShow,
  editId,
  strategyOptions,
  fetchData1,
  phoneNumbers  
}) => {
  const handleClose = () => setShow(false);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [strategyOptions, setstrategyOptions] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    // name: "",
    // virtualExtensionNumber: [],
    // strategy: "",
    // ringTime: "",
    queue_name: "",
    strategy: "",
    timeout: "",
    ext_list: [],
    mobile_number : "",
  });
  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhoneNumberChange = (selectedOption) => {
    onEditChange("mobile_number", selectedOption ? selectedOption.value : "");
    setFormData({
      ...formData,
      mobile_number: selectedOption ? selectedOption.value : "",
    });
  };
  const handleEditRingGroup = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const extList = formData.ext_list.map((item) => item.value).join(",");
      const editedData = { ...formData, ext_list: extList };

      const response = await CallPOSTAPI(
        `api/asterisk/update-ring-group/${editId}`,
        editedData
      );
      // console.log("PUT Response:", response);
      if (response.status) {
        toast.success("Ring group updated successfully");
        fetchData1();
        setShow(false);
      } else {
        toast.error("Failed to update ring group");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating ring group:", error.message);
      toast.error("An error occurred while updating ring group");
    }
  };

  // console.log(editValues);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await CallGETAPI("api/asterisk/fetch_all_ring_groups");
      if (response.status) {
        setData(response.data.data);
        const extensionOptions = response.data.data.flatMap((group) =>
          group.QueueMembers.map((member) => ({
            value: member.interface.split("/")[1],
            label: member.interface.split("/")[1],
          }))
        );
        setSelectedStrategies(extensionOptions);
      } else {
        toast.error("Failed to load data");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editValues) {
      const SelectValues2 = editValues?.ext_list?.map((it) => ({
        value: it,
        label: it,
      }));
      const FD = {
        ...formData,
        queue_name: editValues.queue_name,
        ext_list: SelectValues2,
        strategy: editValues.strategy,
        timeout: editValues.timeout,
        mobile_number : editValues.mobile_number || "",
      };

      setFormData(FD);
      //   fetchData();
    }
  }, [editValues]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-lg"  backdrop="static">
        <Modal.Header closeButton style={{fontSize:"30px"}}>
          <Modal.Title> Edit RingGroup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post">
            <div className="row mb-3 ">
              <label
                htmlFor="inputName"
                className="col-sm-4 col-form-label d-flex justify-content-end"
              >
                Name:
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control w-100"
                  id="inputName"
                  name="queue_name"
                  value={formData?.queue_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="row mb-3 ">
              <label
                htmlFor="inputNumber"
                className="col-sm-4 col-form-label d-flex justify-content-end"
              >
                Number:
              </label>
              <div className="col-sm-6">
                {/* <input
                  type="inputNumber"
                  className="form-control w-100"
                  id="inputNumber"
                  name="number"
                  value={formData?.mobile_number }
                  onChange={handleInputChange}
                  required
                /> */}
               <Select
                  options={phoneNumbers}
                  value={
                    phoneNumbers.find(
                      (phoneNumber) => phoneNumber.value === formData.mobile_number
                    ) || ""
                  }
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </div>

            <div className="row mb-3 ">
              <label
                htmlFor="inputVirtualExtensionNumber"
                className="col-sm-4 col-form-label d-flex justify-content-end"
              >
                Virtual Extension Number:
              </label>
              <div className="col-sm-6">
                <Select
                  options={strategyOptions}
                  isMulti
                  value={formData?.ext_list}
                  onChange={(selectedOptions) => {
                    setFormData({
                      ...formData,
                      ext_list: selectedOptions,
                    });
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputstrategy"
                className="col-sm-4 col-form-label d-flex justify-content-end"
              >
                Ring Strategy:
              </label>
              <div className="col-sm-6">
                <select
                  className="form-select w-100"
                  id="inputstrategy"
                  name="strategy"
                  value={formData?.strategy}
                  onChange={handleInputChange}
                  required
                >
                  {/* <option value="">Select Ring Strategy</option> */}

                  <option value="">---- Select One----</option>
                  {RingGroupOption.map((ptp)=>(
                    <option value={ptp.value} >{ptp.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="inputRingTime"
                className="col-sm-4 col-form-label d-flex justify-content-end"
              >
                Ring Time:
              </label>
              <div className="col-sm-6">
                {/* <input
                  className="form-control w-100"
                  placeholder=""
                  type="number"
                  id="inputRingTime"
                  name="timeout"
                  value={formData?.timeout}
                  onChange={handleInputChange}
                  min="15"
                  max="30"
                  required
                /> */}

<Box sx={{ width: 300 }}>
          <Slider
            value={formData.timeout}
            min={1}
            max={30}
            aria-label="Ring Time"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => {
              setFormData({ ...formData, timeout: newValue });
            }}
          />
        </Box>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleEditRingGroup}
            disabled={isLoading}
          >
            {isLoading ? "Edit..." : "Edit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditRingGroup;
