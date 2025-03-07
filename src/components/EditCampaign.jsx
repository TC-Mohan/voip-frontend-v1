import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import AssignNumberForm from "./AssignNumberForm";
import {
  CallGETAPI,
  CallPOSTAPI,
  DecryptToken,
  DeleteCRTByPkId,
} from "../helper/Constants";
import ReactLoading from "react-loading";
import { useContext } from "react";
import { Country, City } from "country-state-city";
import ReactDOM from "react-dom";
import TimezoneSelect from "react-timezone-select";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";


import { GetCountry, GetTimeZoneById, tableCustomStyles } from "../helper/utils";
import "./Datatable.css";
import EditPublisherModal from "./models/EditPublisherModal";
import { paginationConfig } from "./global/paginationUtils";

function filterRoutingData(targets, callRoutingTbls) {
  console.log({ targets, callRoutingTbls });
  const targetIds = targets.map((target) => target.target_id);
  const filteredData = callRoutingTbls.filter(
    (row) => !targetIds.includes(row.target_id)
  );
  return filteredData;
}
function EditCampaign() {
  const [showSecondSelect, setShowSecondSelect] = useState(false);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [buyersList, setBuyersList] = useState([]);
  const [user_id, setUserId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState("");
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [formdata, setFormdata] = useState([]);
  const [editData, setEditData] = useState([]);
  const [manageCampaign, setManageCampaign] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const [isCountryError, setIsCountryError] = useState(false);
  // const [countries, setCountries] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState(null);
  // const [campaignId, setCampaignId] = useState(1);

  const [editId, setEditId] = useState(null);

  const [editValues, setEditValues] = useState({
    name: "",
    buyer_id: "",
    type: "",
    number: "",
    timeout: "",
    ivr: "",
    recording: false,
    timezone: "",
    operation: "",
    capon: "",
    callcap: "",
    monthly: "",
    monthlyInput: "",
    daily: "",
    hourly: "",
    max: "",
    maxInput: "",
    dailyInput: "",
    hourlyInput: "",
    restrictAfter: "",
    duplicate: "0"
    // duplicate: ""
  });

  const handleUnlimitedChange = () => {
    setIsUnlimited(!isUnlimited);
    setCreateTarget((prevState) => ({
      ...prevState,
      unlimited: !isUnlimited,
      monthlyInput: !isUnlimited ? "0" : prevState.monthlyInput,
      dailyInput: !isUnlimited ? "0" : prevState.dailyInput,
      hourlyInput: !isUnlimited ? "0" : prevState.hourlyInput,
      monthly: !isUnlimited ? false : prevState.monthly,
      daily: !isUnlimited ? false : prevState.daily,
      hourly: !isUnlimited ? false : prevState.hourly,
    }));
  };


  useEffect(() => {
    const fetchCountries = async () => {
      const resultCountry = await GetCountry();
      setCountries(resultCountry || []);
 
    };

    fetchCountries();
  }, []);

  const handleCountrySelect =async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData || []);
    // Use a timeout to ensure the state is updated before checking
    setTimeout(() => {
      if (!countryId) {
        setIsCountryError(true);
      } else {
        setIsCountryError(false);
      }
    }, 0);
  };

  const handleFirstSelectChange = (e) => {
    if (e.target.value === "option2") {
      setShowSecondSelect(true);
    } else {
      setShowSecondSelect(false);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const [apiData, setApiData] = useState([]);

  const { id } = useParams();
  const campaignId = id;
  

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    // You can perform additional actions here based on the state change
  };
  const [isCheck, setIsCheck] = useState(false);

  const handleTogglemonthly = () => {
    setIsCheck(!isCheck);
    // You can perform additional actions here based on the state change
  };

  const [isCheckd, setIsCheckd] = useState(false);

  const handleToggleDaily = () => {
    setIsCheckd(!isCheckd);
    // You can perform additional actions here based on the state change
  };

  const [isCheckh, setIsCheckh] = useState(false);

  const handleToggleHour = () => {
    setIsCheckh(!isCheckh);
    // You can perform additional actions here based on the state change
  };
  const [isCheckm, setIsCheckm] = useState(false);

  const handleTogglemax = () => {
    setIsCheckm(!isCheckm);
    // You can perform additional actions here based on the state change
  };

  const [showBasicTable, setShowBasicTable] = useState(true);

  const handleCheckChange = (event) => {
    setShowBasicTable(event.target.id === "radio10");
  };

  const [createTarget, setCreateTarget] = useState({
    name: "",
    buyer: "",
    number: "",
    timeout: "",
    ivr: "",
    recording: false,
    timezone: "",
    operation: false,
    monthly: false,
    daily: false,
    hourly: false,
    max: false,
    maxInput: "",
    monthlyInput: "",
    hourlyInput: "",
    dailyInput: "",
    user_id: "",
    buyer_id: "",
    days: [],
    unlimited: false,
    duplicate: "0"
  });

  // console.log({ createTarget });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isTimeoutValid, setIsTimeoutValid] = useState(true);
  const [isIvrValid, setIsIvrValid] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

 const handleInputChange = (e, index) => {
  const SR = [...selectedRows];
  
  if (e.target.name === 'priority') {
    let inputValue = e.target.value;
    
    // Block zero input completely
    if (inputValue === '0') {
      // If user tries to enter 0, keep the previous value
      return; // Don't update state at all
    }
    
    if (inputValue === '') {
      // Allow empty temporarily (for editing purposes)
      SR[index][e.target.name] = inputValue;
    } else {
      // For any other input, convert to number
      const numValue = parseInt(inputValue);
      
      // Only accept valid positive numbers
      if (!isNaN(numValue) && numValue > 0) {
        SR[index][e.target.name] = numValue;
      } else if (!isNaN(numValue) && numValue <= 0) {
        // If they somehow enter a negative or zero, change to 1
        SR[index][e.target.name] = 1;
      } else {
        // If not a valid number, don't update
        return;
      }
    }
  } else {
    // Handle other fields normally
    SR[index][e.target.name] = e.target.value;
  }
  
  console.log({ SR });
  setSelectedRows(SR);
}

// Handle when input loses focus
const handlePriorityBlur = (index) => {
  const SR = [...selectedRows];
  
  // Get current priority value
  let currentValue = SR[index].priority;
  
  // If empty or invalid, set to 1
  if (currentValue === '' || parseInt(currentValue) < 1) {
    SR[index].priority = 1;
    setSelectedRows(SR);
  }
}



  const routingcolumns = [
    {
    name: "PRIORITY",
    selector: "priority",
    sortable: true,
    width: "30%",
    cell: (d, index) => (
      <p class="align-text-bottom text-nowrap">
        <input
          type="number"
          id="typeNumber"
          class="form-control"
          name="priority"
          value={d.priority}
          htmlFor="flexSwitchCheckDefault"
          onChange={(e) => handleInputChange(e, index)}
          onBlur={() => handlePriorityBlur(index)}
          min="1" // HTML5 attribute to prevent values below 1
          onKeyDown={(e) => {
            // Prevent the key press if the field is empty and they press 0
            if (e.target.value === '' && e.key === '0') {
              e.preventDefault();
            }
            // Also prevent other invalid inputs
            if (!/[0-9]|\Backspace|\ArrowLeft|\ArrowRight|\Tab|\Delete/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </p>
    ),
  },
   
    {
      name: "NAME",
      selector: "name",
      sortable: true,
      width: "15%",
    },
    {
      name: "DESTINATION",
      selector: "number",
      sortable: true,
      width: "20%",
    },
   
  
   
    {
      name: "STATUS",
      selector: "status",
      width: "15%",
      cell: (d) => (
        <p class="align-text-bottom text-nowrap">
          {d.recording}
          <svg height={24}>
            <circle cx="12" cy="12" r="5" fill="green" />
          </svg>
        </p>
      ),
    },
    {
      name: "ACTION",
      center: true,
      sortable: false,
      selector: "null",
      cell: (d) => [
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          onClick={() => removeItemInSelectedRow(d)}
        >
          <i class="fa-regular fa-trash-can"></i>
        </button>,
      ],
    },
  ];

  // Validation functions
  // const validateName = (value) => value.trim() !== '';
  // const validateNumber = (value) => value.trim() !== '';
  const validateTimeout = (value) => value.trim() !== "";
  const validateIvr = (value) => value.trim() !== "";

  const validateName = (value) => {
    const errorMessage = {};

    if (!value) {
      errorMessage.value = "Name is required";
    }
    const trimmedValue = value.trim();
    const isValid = trimmedValue !== "";
    // const errorMessage = isValid ? '' : 'Please enter a name';

    return {
      isValid,
      errorMessage,
    };
  };
  const validateNumber = (value) => {
    const trimmedValue = value.trim();
    const isValid =
      /^\d*\.?\d+$/.test(trimmedValue) && parseFloat(trimmedValue) >= 0;
    const errorMessage = isValid ? "" : "Please enter a non-negative number";

    return {
      isValid,
      errorMessage,
    };
  };
  // Event handlers
  const handleNameChange = (event) => {
    const newName = event.target.value;
    const validation = validateName(newName);
    // Check if the field is empty

    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      name: newName,
    }));

    setIsNameValid(validation.isValid);
    setErrorMsg(validation.errorMessage.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);

    const countryId = parseInt(e.target.value);
    const countryCities = City.getCitiesOfCountry(countryId);
    setCities(countryCities);
  };

  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    // const isPositiveNumber = /^\d*\.?\d+$/.test(newNumber) && parseFloat(newNumber) >= 0;
    const validation = validateNumber(newNumber);
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      number: newNumber,
    }));

    setIsNumberValid(validation.isValid);
    setErrorMsg(validation.errorMessage);
  };


  const handleTimeoutToggle = (isEnabled) => {
  setCreateTarget((prev) => ({
    ...prev,
    isTimeoutEnabled: isEnabled,
    timeout: isEnabled ? prev.timeout : "", // Reset timeout if unchecked
  }));
};


  const handleTimeoutChange = (event) => {
    const newTimeout = event.target.value;
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      timeout: newTimeout,
    }));
    setIsTimeoutValid(validateTimeout(newTimeout));
  };

  const handleIvrChange = (event) => {
    const newIvr = event.target.value;
    setCreateTarget((prevCreateTarget) => ({
      ...prevCreateTarget,
      ivr: newIvr,
    }));
    setIsIvrValid(validateIvr(newIvr));
  };

  const defaultRow = {
    target_id: null,
    priority: 1,
    weight: 0,
    type: "",
    revenue: "",
    name: "test",
    number: "123456789",
    status: "active",
    campaign_id:campaignId
  };
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <>
          {/* <div className="d-flex gap-1" > */}

          <label
            className={"d-flex gap-1 cursor-pointer"}
            htmlFor={row.name + " " + row.target_id}
          >
            <input
              type="checkbox"
              id={row.name + " " + row.target_id}
              checked={selectedRows.some(
                (item) => Number(item.target_id) === Number(row.target_id)
              )}
              onChange={() => handleCheckboxChange(row)}
            />
            <span className="target-name">{row.name}</span>
          </label>
          {/* </div> */}
        </>
      ),
    },
    {
      name: "UID",
      sortable: true,
      selector: "uid",
      // cell: (row) => (row.numbercreation ? "Yes" : "No"),
    },
    {
      name: "buyer",
      selector: "buyername",
      sortable: true,

      // cell: (row) => (row.type === null || row.type === "" ? "you" : row.type),
    },
    // {
    //   name: "Type",
    //   sortable: true,
    //   selector: "type",
    //   cell: (row) =>
    //     row.type === null || row.type === "" ? "Number" : row.type,
    // },
    {
      name: "Destination",
      sortable: true,
      selector: "number",
      // cell: (row) =>
      //   row.blockcalls === null || row.blockcalls === ""
      //     ? "Account Setting"
      //     : row.blockcalls,
    },
    { name: "Live", selector: "status", sortable: true },
    //   { name: "CC", selector: "" ,
    //   // cell: (row) => {
    //   //   // Assuming monthlyInput is a number, you can customize the display here
    //   //   const value = " ";
    //   //   return value ? `${value}/∞` : '0'; // Display "value/∞" if value exists, otherwise an empty string
    //   // }
    // },
    {
      name: "Hour",
      selector: "hourlyInput",
      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.hourlyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },
    {
      name: "Day",
      selector: "hourlyInput",
      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.dailyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },
    {
      name: "Month",
      selector: "monthlyInput",
      cell: (row) => {
        // Assuming monthlyInput is a number, you can customize the display here
        const value = row.monthlyInput;
        return value ? `${value}/∞` : "0"; // Display "value/∞" if value exists, otherwise an empty string
      },
    },
    // { name: "Total", selector: "createdAt" },
    {
      name: "Status",
      selector: "activestatus",
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color: row.activestatus ? "green" : "red",
            fontSize: "3rem",
            lineHeight: 0,
          }}
        >
          &bull;
        </span>
      ),
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [routingLoading, setRoutingLoading] = useState(false);
  const updateCallRoutes = async () => {
    setRoutingLoading(true);
    const Result = await CallPOSTAPI("api/create-call-routing", selectedRows);
    if (Result.status) {

      toast.success("Call Routing Updated");
      await fetchdata();
    } else {
      toast.error(Result?.message || "Something went wrong please try again");
    }
    setRoutingLoading(false);
  };
  // call the remove api

  const removeItemInSelectedRow = async (row) => {
    setIsRoutingLoading(true);
    const obj = {
      ...defaultRow,
      name: row.name,
      number: row.number,
      target_id: row.target_id,
    };
    console.log({ row });
    if (row?.crt_id) {
      const resultCheck = await DeleteCRTByPkId(row?.crt_id);
     
    }
    // return "";
    setSelectedRows((prevRows) => {
      if (prevRows.some((item) => item.target_id === row.target_id)) {
        return prevRows.filter((item) => item.target_id !== row.target_id);
      } else {
        return [...prevRows, { ...row, ...obj }];
      }
    });
    setIsRoutingLoading(false);
  };
  const handleCheckboxChange = (row) => {
    setIsLoading(true);
    const obj = {
      ...defaultRow,
      name: row.name,
      number: row.number,
      target_id: row.target_id,
      priority: 1 // Explicitly set priority to 1
    };
    if (obj.target_id) {
      setSelectedRows((prevRows) => {
        if (prevRows.some((item) => item.target_id === row.target_id)) {
          return prevRows.filter((item) => item.target_id !== row.target_id);
        } else {
          return [...prevRows, { ...row, ...obj }];
        }
      });
    } else {
      toast.error("Invalid Toaster ID");
    }
    setIsLoading(false);
  };

  const fetchDatas = async () => {
    setLoading(true);
    try {
      const response = await CallGETAPI(`api/fetch-publisher/${campaignId}`);
      setData(
        response.data.map((item) => ({
          Mobile_number: item.Mobile_number,
          name: item.publisher.name,
          publisher_id: item.publisher_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchDatas();
    }
  }, [show]);



  const handleDeletes = async (publisher) => {
    // Check if mobile number exists
    if (!publisher.Mobile_number) {
      Swal.fire(
        'Error!',
        'Mobile number not found for this publisher.',
        'error'
      );
      return;
    }
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the publisher with number ${publisher.Mobile_number}. You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        // Call the API with mobile number instead of campaign ID
        await CallGETAPI(`api/delete-compaign-publisher/${publisher.Mobile_number}`);
        await fetchDatas(); // Refresh the data
        
        Swal.fire(
          'Deleted!',
          `The publisher with number ${publisher.Mobile_number} has been deleted.`,
          'success'
        );
      } catch (error) {
        console.error("Error deleting publisher:", error);
        Swal.fire(
          'Error!',
          'There was a problem deleting the publisher.',
          'error'
        );
      }
    }
  };



  const handleUpdate = async (updatedPublisher) => {
    setIsLoading(true);
    try {
      const updateData = {
        Mobile_number: updatedPublisher.Mobile_number,
        publisher_id: updatedPublisher.publisher_id,
        name: updatedPublisher.name
      };
      await CallPOSTAPI(`api/update-compaign-publisher/${campaignId}`, updateData);
      setShowEditModal(false);
      await fetchDatas();
      toast.success("Publisher updated successfully!");
    } catch (error) {
      console.error("Error updating publisher:", error);
      toast.error("Failed to update publisher. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (publisher) => {
    setEditingPublisher({
      Mobile_number: publisher.Mobile_number,
      name: publisher.name,
      publisher_id: publisher.publisher_id 
    });
    setShowEditModal(true);
  };



  const publishercolumns = [
    

    {
      name: "PHONE NUMBER",
      selector: "Mobile_number",
      sortable: true,
      width: "18%",
    },
    {
      name: "PUBLISHER",
      selector: "name",
      sortable: true,
      compact: true,
      width: "15%",
    },

    {
      name: "ACTION",
      center: true,
      sortable: false,
      cell: (row) => (
        <>
          <Button
            variant="outline-warning"
            size="sm"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeletes(row)}
          >
            <i className="fa-regular fa-trash-can"></i>
          </Button>
        </>
      ),
    },


  ];

  //Form field change handler
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   //Update createData with the new input value
  //   setCreateTarget({ ...createTarget, [name]: value })
  // };


  const handleCapToggle = (e) => {
    const { name, checked } = e.target;
    
    // If any cap is turned on, turn off Unlimited
    if (checked) {
      setIsUnlimited(false);
    }
    
    // Use the existing handleChange function
    handleChange(e);
  };


  const handleChange = (e) => {
    const { name, checked, value, type } = e.target;
    // console.log("handleChange called:", name, checked, value);
    setCreateTarget({
      ...createTarget,
      [name]: checked,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // Form submit handler


  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this campaigns !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Send a DELETE request to your server endpoint
          const response = await CallGETAPI(`api/delete-campaign/${id}`);
          // console.log("DELETE Response:", response);

          // Update the row in your local state
          const updatedData = manageCampaign.data.filter(
            (row) => row.target_id !== id
          );

          // Update the state with the new data
          setManageCampaign({ ...manageCampaign, data: updatedData });
          // Reload the page
          window.location.reload();
          navigate("/manage-campaigns");
          Swal.fire({
            title: "Deleted!",
            text: "Your Campaigns has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle error accordingly, e.g., show a notification to the user
    }
  };

  const handleToggleEditModal = (target_id, row) => {
    // console.log(row.buyername);
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setEditId(target_id);
      setEditValues({
        name: row.name,
        buyer_id: row.buyer_id,
        buyername: row.buyername || "",
        type: row.type,
        number: row.number,
        timeout: row.timeout,
        ivr: row.ivr,
        recording: row.recording || null,
        timezone: row.timezone,
        operation: row.operation,
        capon: row.capon,
        callcap: row.callcap,
        monthly: row.monthly || null,
        daily: row.daily,
        hourly: row.hourly,
        max: row.max,
        monthlyInput: row.monthlyInput,
        dailyInput: row.dailyInput,
        hourlyInput: row.hourlyInput,
        maxInput: row.maxInput,
      });
    } else {
      setEditId(null);
      setEditValues({
        name: "",
        buyer_id: "",
        buyername: "",
        type: "",
        number: "",
        timeout: "",
        ivr: "",
        recording: false,
        timezone: "",
        operation: "",
        capon: "",
        callcap: "",
        monthly: "",
        daily: "",
        hourly: "",
        max: "",
        monthlyInput: "",
        dailyInput: "",
        hourlyInput: "",
        maxInput: "",
      });
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const allCountries = Country.getAllCountries();
      setCountries(allCountries);
    };
    fetchCountries();

    if (selectedCountry) {
      const countryId = parseInt(selectedCountry);
      const countryCities = City.getCitiesOfCountry(countryId);
      setCities(countryCities);
    }
  }, [selectedCountry]);



  // Fetch data from the API
  // const fetchdata = async () => {
  //   try {
  //     let token = localStorage.getItem("psx_token");
  //     // console.log({ token });
  //     const user = DecryptToken(token);

  //     // Assuming you have set up state using the useState hook
  //     setUserId(user.user_id);
  //     const response = await CallGETAPI("api/get-target/");
  //     setApiData(response?.data?.data?.targetsWithBuyers || []);
  //     setSelectedRows(response?.data?.data?.CallRoutingData || []);
  //     // console.log(response.data.data);
  //     // Assuming the API response is an array of buyers
  //     // setBuyersList(response?.data?.data || []);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


  const fetchdata = async () => {
    try {
      let token = localStorage.getItem("psx_token");
      const user = DecryptToken(token);
      setUserId(user.user_id);
  
      // Get campaign_id from URL
      const campaignId = window.location.pathname.split('/').pop(); // This will get "205" from "/edit-campaign/205"
      
      // Pass campaign_id as query parameter
      const response = await CallGETAPI(`api/get-target-v1?campaign_id=${campaignId}`);
      
      setApiData(response?.data?.data?.targetsWithBuyers || []);
      setSelectedRows(response?.data?.data?.CallRoutingData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("psx_token");
        // console.log({ token });
        const user = DecryptToken(token);

        // Assuming you have set up state using the useState hook
        setUserId(user.user_id);
        const response = await CallGETAPI("api/get-buyer/");
        // console.log(response.data.data);
        // Assuming the API response is an array of buyers
        setBuyersList(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await CallGETAPI(`api/get-campaign/${id}`);
    setEditData(res?.data?.data);
    fetchdata();
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!isNameValid || !isNumberValid || !isTimeoutValid || !isIvrValid) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
  
    // Set default value for maxInput if toggle is off
    if (!createTarget.max) {
      createTarget.maxInput = "1"; // Default value
    }
  
    try {
      setIsLoading(true);
      const finalPayload = { ...createTarget };
      finalPayload.user_id = user_id;
  
      // API call to create the target
      const response = await CallPOSTAPI("api/create-target", finalPayload);
      await fetchdata();
      // Check if the target creation failed due to existing number
      if (!response.data.status) {
        
        setShowModal(false);
        if (response.data.message === "Target with this name already exists") {
          toast.error("Target with this name already exists", {
            toastId: "errorId",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error(response.data.message || "Target with this name already exists", {
            toastId: "errorId",
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        setIsLoading(false);
        return;
      }
  
      // Show success toast message
      toast.success("Target created successfully!", {
        toastId: "customId",
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Clear the form after successful submission
      setCreateTarget({
        name: "",
        buyer: "",
        number: "",
        timeout: "",
        ivr: "",
        recording: false,
        timezone: "",
        operation: false,
        monthly: false,
    daily: false,
    hourly: false,
    max: false,
    duplicate: "0",
        maxInput: "1",
        hourlyInput: "",
        monthlyInput: "",
        dailyInput: "",
        buyer_id: "",
        user_id: "",
      });
      // Close the modal using state
    setShowModal(false);

      // // Close the modal
      // const modal = document.getElementById('myModal');
      // const bootstrapModal = bootstrap.Modal.getInstance(modal);
      // if (bootstrapModal) {
      //   bootstrapModal.hide();
      // }
      
      setIsLoading(false);
      
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Error posting data: " + error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
    }
};



  const handlechange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const payload = {
    campaignId: formdata.campaignId,
    campaignname: formdata?.campaignName,
    // "country": formdata?.country,
    // "tollfreenumber": formdata?.TollFreeNumber,
    // "publisher_id": formdata?.publisher,
    // "user_id": "", // You might want to fill this with actual user ID data
    // "target_id": formdata?.SelectTarget,
    // "trackingrevenue": formdata?.TrakingRevenue,
    duplicatecalls: formdata?.duplicateCalls,
    filterAnonymousSpam: formdata.anonymouscall,
    filterrepeatcaller: formdata?.filterRepeatCaller,
    anonymouscall: formdata?.filterAnonymousSpam,
    recordcalls: formdata?.recordCalls,
    waittoanswer: formdata?.waitToAnswer,
    trimsilence: formdata?.trimSilence,
  };

  const handleSave = async (e) => {
    // console.log(formdata);
    e.preventDefault();
    const res = await CallPOSTAPI(`api/update-campaign/${id}`, payload);
    // console.log("Form Data Saved:", formdata);
    navigate("/manage-campaigns");
  };

  useEffect(() => {
    fetchData();
    fetchdata();
  }, []);

  useEffect(() => {
    if (editData) {
      const FD = {
        ...formdata,
        campaignId: editData.campaign_id,
        campaignName: editData.campaignname,
        // reportDuplicateCalls: editData.
        filterAnonymousSpam: editData.anonymouscall,
        filterRepeatCaller: editData.filterrepeatcaller,
        duplicateCalls: editData.duplicatecalls,
        recordCalls: editData.recordcalls,
        waitToAnswer: editData.waittoanswer,
        trimSilence: editData.trimsilence,
        campaignNameNumber: editData.campaignname,
      };

      setFormdata(FD);
    }
  }, [editData]);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Dashboard</a>
              </li>
              <li className="breadcrumb-item active">Targets</li>
            </ol>
          </nav>
        </div>
        <section>
          <div className="card">
            <div className="card-body mt-3">
              <h1></h1>
              {/* Bordered Tabs Justified */}
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
                          <div className="container-fluid d-flex justify-content-center">
                            <div className="w-100">
                              <div>
                                <div className="m-4">
                                  <form action="" onSubmit={handleSave}>
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                      >
                                        Campaign ID :
                                      </label>
                                      <div className="col-sm-6">
                                        <p>{formdata?.campaignId}</p>
                                      </div>
                                    </div>
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                      >
                                        Campaign Name :
                                      </label>
                                      <div className="col-sm-6">
                                        <input
                                          type="text"
                                          className="form-control w-100"
                                          id="inputEmail"
                                          name="campaignName"
                                          value={formdata.campaignName}
                                          onChange={handlechange}
                                          placeholder=""
                                          required=""
                                        />
                                      </div>
                                    </div>
                                   
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                      >
                                        Record Calls :
                                      </label>
                                      <div className="col-sm-6">
                                        <div className="form-check form-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="recordCalls"
                                            checked={formdata.recordCalls}
                                            onChange={handlechange}
                                            role="switch"
                                            id="flexSwitchCheckDefault"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                      >
                                        Wait To Answer :
                                      </label>
                                      <div className="col-sm-6">
                                        <div className="form-check form-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="waitToAnswer"
                                            checked={formdata.waitToAnswer}
                                            onChange={handlechange}
                                            role="switch"
                                            id="flexSwitchCheckDefault"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                      >
                                        Trim Silence :
                                      </label>
                                      <div className="col-sm-6">
                                        <div className="form-check form-switch">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="trimSilence"
                                            checked={formdata.trimSilence}
                                            onChange={handlechange}
                                            role="switch"
                                            id="flexSwitchCheckDefault"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="row mb-3">
                                      <label
                                        htmlFor="inputEmail"
                                        className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                      >
                                        Campaign Name :
                                      </label>
                                      <div className="col-sm-6">
                                        <input
                                          className="form-control w-100"
                                          type="number"
                                          id="campaignNameNumber"
                                          value={formdata.campaignNameNumber}
                                          onChange={handleChange}
                                        />
                                      </div>
                                    </div> */}

                                    <div className="row">
                                      <div className="col-sm-6 "></div>
                                      <div className="col-sm-6 d-flex justify-content-start ">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="accordion" id="panelsStayOpen-headingOne">
                            <div class="accordion-item">
                              <h2
                                class="accordion-header"
                                id="flush-headingOne"
                              >
                                <button
                                  class="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#flush-collapseOne"
                                  aria-expanded="false"
                                  aria-controls="flush-collapseOne"
                                  onClick={fetchDatas}
                                >
                                  Publishers
                                </button>
                              </h2>
                              <div
                                id="flush-collapseOne"
                                class="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div
                                  className="card"
                                  style={{ boxShadow: "none" }}
                                >
                                  <div
                                    className="card-body"
                                    style={{ padding: 0, overflowX: "auto" }}
                                  >
                                    <div className="main">
                                      <DataTable
                                        columns={publishercolumns}
                                        data={data || []}
                                        noHeader
                                        defaultSortField="id"
                                        defaultSortAsc={true}
                                        pagination
                                        highlightOnHover
                                        dense
                                        customStyles={{
                                          table: {
                                            style: {
                                              border: "1px solid #ccc", // Add border to the entire table
                                            },
                                          },
                                          headRow: {
                                            style: {
                                              borderBottom: "1px solid #ccc", // Add border to the header row
                                            },
                                          },
                                          rows: {
                                            style: {
                                              borderBottom: "1px solid #eee", // Add border to each row
                                            },
                                            highlightOnHoverStyle: {
                                              backgroundColor:
                                                "rgba(0, 0, 0, 0.08)",
                                              borderBottomColor: "#ccc",
                                            },
                                          },
                                        }}
                                        {...paginationConfig()}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div class="accordion-body">
                                  <div className="container">
                                    <Button
                                      variant="primary"
                                      onClick={handleShow}
                                    >
                                      Open Assign Number Form
                                    </Button>

                                    <Modal
                                      show={show}
                                      onHide={handleClose}
                                      size="lg"
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>
                                          Assign Number To Campaign
                                        </Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <AssignNumberForm
                                          onClose={handleClose}
                                          campaignId={campaignId}
                                        />{" "}
                                      </Modal.Body>
                                      <Modal.Footer>
                                        {/* <Button
                                          variant="secondary"
                                          onClick={handleClose}
                                        >
                                          Submit
                                        </Button> */}
                                      </Modal.Footer>
                                    </Modal>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <EditPublisherModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        publisher={editingPublisher}
        onUpdate={handleUpdate}
        isLoading ={isLoading}
        fetchDatas ={fetchDatas}
      />
                            
                            <div class="accordion-item">
                              <div>
                                <h2
                                  class="accordion-header"
                                  id="flush-headingTwo"
                                >
                                  <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#flush-collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="flush-collapseTwo"
                                  >
                                    Call Routing
                                  </button>
                                </h2>
                              </div>
                              <div></div>
                              <div
                                id="flush-collapseTwo"
                                class="accordion-collapse collapse"
                                aria-labelledby="flush-headingTwo"
                                data-bs-parent="#accordionFlushExample"
                              >
                                <div class="accordion-body">
                                  <div className="container ">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="d-flex  justify-content-between">
                                          <h4>Targets</h4>
                                          <div className="col-6 d-flex justify-content-end ">
                                            <div className="d-grid col-6">
                                              <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#myModal"
                                              >
                                                Add Target
                                              </button>
                                              {/* add buyer */}
                                              <div
                                                className="modal"
                                                id="myModal"
                                                style={{ display: showModal ? 'block' : 'none' }}
                                              >
                                                <div className="modal-dialog modal-xl">
                                                  <div className="modal-content">
                                                    {/* Modal Header */}
                                                    <div className="modal-header">
                                                      <h4 className="modal-title">
                                                        Add Target
                                                      </h4>
                                                      <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                      />
                                                    </div>
                                                    {/* Modal body */}
                                                    <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">
              <h1></h1>
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
                >
                  <div className="card" style={{ boxShadow: "none" }}>
                    <div
                      className="card-body"
                      style={{ padding: 0, overflowX: "auto" }}
                    >
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" class="h5">
                              Create Target
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Repeat the above code for the other tabs */}
              </div>
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
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
                    <div className="container-fluid d-flex justify-content-center">
                      <div className="w-100">
                        <div>
                          <div className="m-4">
                            <form method="post" onSubmit={handleSubmit}>
                              <div className="row mb-3 ">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                >
                                  Name :
                                </label>

                                <div className="col-sm-6">
                                  <input
                                    type="text"
                                    className={`form-control w-100 ${
                                      isNameValid ? "" : "is-invalid"
                                    }`}
                                    value={createTarget.name}
                                    onChange={handleNameChange}
                                    id="inputEmail"
                                    name="name"
                                    placeholder=""
                                    required
                                  />
                                  {!isNameValid && (
                                    <div className="invalid-feedback">
                                      {errorMsg}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end"
                                  id="title3"
                                  htmlFor="Field3"
                                >
                                  Buyer :
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-select w-100"
                                    id="sel1"
                                    name="buyer_id"
                                    value={createTarget.buyer_id}
                                    onChange={handleChange}
                                    required
                                  >
                                    <option value="" disabled>
                                      Select a buyer
                                    </option>

                                    {buyersList && buyersList.length > 0 ? (
                                      buyersList.map((buyer) => (
                                        <option
                                          key={buyer.buyer_id}
                                          value={buyer.buyer_id}
                                        >
                                          {buyer.buyername}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="">
                                        No buyers available
                                      </option>
                                    )}
                                  </select>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Number :
                                </label>
                                <div className="col-sm-6">
                                  <input
                                    className={`form-control w-100 ${
                                      isNumberValid ? "" : "is-invalid"
                                    }`}
                                    placeholder=""
                                    type="number"
                                    id="typeNumber"
                                    value={createTarget.number}
                                    onChange={handleNumberChange}
                                    required
                                  />
                                  {!isNumberValid && (
                                    <div className="invalid-feedback">
                                      {errorMsg}
                                    </div>
                                  )}
                                </div>
                              </div>
                           
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
Connection Timeout (seconds):
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch ">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="timeout"
                                      checked={createTarget.timeout}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.timeout && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          value={createTarget.timeout}
                                          name="timeout"
                                          onChange={handleChange}
                                          className="form-control w-25"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                             
                              <div>
      <div className="row mb-3">
        <label
          htmlFor="inputEmail"
          className="col-sm-4 col-form-label d-flex justify-content-end"
        >
          Time Zone:
        </label>
        <div className="col-sm-8 d-flex row">
          <select
            className="form-select w-75"
            value={selectedCountry}
            onChange={(e) => {
              handleCountrySelect(e);
            }}
            name="country"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.iso} value={country.iso}>
                {country.nicename}
              </option>
            ))}
          </select>

          {isCountryError && (
            <div
              className="col-sm-8 d-flex align-items-center justify-content-center error__feedback"
              style={{
                textAlign: 'center',
                color: 'red',
              }}
            >
              Country is required
            </div>
          )}
        </div>
      </div>

    </div>
     
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Hours of operation :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="operation"
                                      value={createTarget.operation}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </div>
                                {createTarget.operation && (
                                  <div className="col-sm-12 mt-4">
                                    <div className="btn-group">
                                      <input
                                        type="radio"
                                        className="btn-check "
                                        name="options"
                                        id="radio9"
                                        value={createTarget.type}
                                        checked={!showBasicTable}
                                        onChange={handleCheckChange}
                                        autoComplete="off"
                                      />
                                      <label
                                        className="btn btn-outline-primary"
                                        htmlFor="radio9"
                                      >
                                        BASIC
                                      </label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="options"
                                        id="radio10"
                                        value={createTarget.type}
                                        checked={showBasicTable}
                                        onChange={handleCheckChange}
                                        autoComplete="off"
                                      />
                                      <label
                                        className="btn btn-outline-primary"
                                        htmlFor="radio10"
                                      >
                                        ADVANCED
                                      </label>
                                    </div>
                                    <div className="col-sm-12 mt-4">
                                      {showBasicTable ? (
                                        /* Render the basic table */
                                        <div className="col-sm-12 mt-4 d-flex justify-content-between">
                                          <div className="col-sm-12">
                                            <table class="table  w-100 text-left ">
                                              <tr className="border-bottom">
                                                <td className="w-25">Days</td>
                                                <td className="w-25">Open</td>
                                                <td className="w-50">
                                                  Time Slot
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Sunday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.days.day
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Monday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Tuesday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Wednesday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Thursday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Friday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">Saturday</td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      ) : (
                                        /* Render the advanced table */
                                        <div className="col-sm-12 mt-4 d-flex justify-content-center">
                                          <div className="col-sm-12  mt-4 d-flex justify-content-center ">
                                            <table class="table  w-100 ">
                                              <tr className="border-bottom">
                                                <td className="w-25">Days</td>
                                                <td className="w-25">Open</td>
                                                <td className="w-50">
                                                  Time Slot
                                                </td>
                                              </tr>
                                              <tr className="border-bottom">
                                                <td scope="row">
                                                  Monday-Sunday
                                                </td>
                                                <td>
                                                  <div className="d-flex justify-content-around">
                                                    <div className="form-check form-switch ml-2">
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="recording"
                                                        value={
                                                          createTarget.recording
                                                        }
                                                        onChange={handleChange}
                                                        role="switch"
                                                        id="flexSwitchCheckDefault"
                                                      />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td className="">
                                                  <div className="d-flex">
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                    <input
                                                      type="time"
                                                      className="form-control"
                                                      placeholder="Enter Email"
                                                    />
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <hr />

                              <h5 className="m-2">Cap Settings</h5>
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  monthly Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      name="monthly"
                                      checked={createTarget.monthly}
                                      onChange={handleCapToggle}
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.monthly && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="monthlyInput"
                                          value={createTarget.monthlyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  Daily Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      name="daily"
                                      checked={createTarget.daily}
                                      onChange={handleCapToggle}
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.daily && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="dailyInput"
                                          value={createTarget.dailyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  hourly Cap :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="hourly"
                                      checked={createTarget.hourly}
                                      onChange={handleCapToggle}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.hourly && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          name="hourlyInput"
                                          value={createTarget.hourlyInput}
                                          onChange={handleCapToggle}
                                          class="form-control w-25"
                                          htmlFor="flexSwitchCheckDefault"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>


                             

                              <h5 className="m-2">Concurrency Settings</h5>
                              <div className="row mb-3">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-4 col-form-label d-flex d-flex justify-content-end"
                                >
                                  max Concurrency :
                                </label>
                                <div className="col-sm-6">
                                  <div className="form-check form-switch ">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="max"
                                      checked={createTarget.max}
                                      onChange={handleChange}
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                    />
                                    {createTarget.max && (
                                      <>
                                        <input
                                          type="number"
                                          id="typeNumber"
                                          value={createTarget.maxInput}
                                          name="maxInput"
                                          onChange={handleChange}
                                          className="form-control w-25"
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label
                                  className="desc col-sm-4 col-form-label d-flex justify-content-end"
                                  id="title3"
                                  htmlFor="Field3"
                                >
                                  Restrict Duplicates:
                                </label>
                                <div className="col-sm-6">
                                  <select
                                    className="form-select"
                                    id="restrictDuplicates"
                                    name="duplicate"
                                    value={createTarget.duplicate}
                                    onChange={handleChange}
                                  >
                                    <option value="0">Not Restricted</option>
                                    <option value="1">Target</option>
                                  </select>
                                </div>
                              </div>

                            
                              <div className="row">
                                <div className="col-sm-6 "></div>
                                <div className="col-sm-6 d-flex justify-content-start ">
                                  <button
                                     className="btn btn-success"
                                          data-bs-dismiss="modal"
                                  >
                                    Create Target
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>
        </section>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-12">
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
                                                  <div
                                                    className="card"
                                                    style={{
                                                      boxShadow: "none",
                                                    }}
                                                  >
                                                    <div
                                                      className="card-body"
                                                      style={{
                                                        padding: 0,
                                                        overflowX: "auto",
                                                      }}
                                                    >
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
                                                      <div className="main  ">
                                                        <DataTable
  columns={columns}
  data={apiData.filter((item) => {
    // Include item if:
    // 1. It has a null campaign_id OR
    // 2. It's not already in selectedRows
    return (
      item.campaign_id === null || 
      !selectedRows.some((row) => row.target_id === item.target_id)
    );
  })}
  noHeader
  defaultSortField="id"
  defaultSortAsc={true}
  pagination
  highlightOnHover
  dense
  customStyles={{
    table: {
      style: {
        border: "1px solid #ccc",
      },
    },
    headRow: {
      style: {
        borderBottom: "1px solid #ccc",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #eee",
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        borderBottomColor: "#ccc",
      },
    },
  }}
  {...paginationConfig()}
/>
                                                      </div>
                                                       )}
                                                    </div>
                                                  </div>
                                                </div>
                                                {/* Repeat the above code for the other tabs */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-lg-6">
                                        <h4 className="justify-content-start">
                                          Routing
                                          <div className="col-lg-12">
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
                                                   
                                                    <div
                                                      className="card"
                                                      style={{
                                                        boxShadow: "none",
                                                      }}
                                                    >
                                                      <div
                                                        className="card-body"
                                                        style={{
                                                          padding: 0,
                                                          overflowX: "auto",
                                                        }}
                                                      >
                                                         {isRoutingLoading && (
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
                                                         {!isRoutingLoading && (
                                                        <div className="main">
                                                          <DataTable
                                                            columns={
                                                              routingcolumns
                                                            }
                                                            data={
                                                              selectedRows || []
                                                            }
                                                            noHeader
                                                            defaultSortField="id"
                                                            defaultSortAsc={
                                                              true
                                                            }
                                                            pagination
                                                            highlightOnHover
                                                            dense
                                                            customStyles={{
                                                              table: {
                                                                style: {
                                                                  border:
                                                                    "1px solid #ccc", // Add border to the entire table
                                                                },
                                                              },
                                                              headRow: {
                                                                style: {
                                                                  borderBottom:
                                                                    "1px solid #ccc", // Add border to the header row
                                                                },
                                                              },
                                                              rows: {
                                                                style: {
                                                                  borderBottom:
                                                                    "1px solid #eee", // Add border to each row
                                                                },
                                                                highlightOnHoverStyle:
                                                                  {
                                                                    backgroundColor:
                                                                      "rgba(0, 0, 0, 0.08)",
                                                                    borderBottomColor:
                                                                      "#ccc",
                                                                  },
                                                              },
                                                            }}
                                                            {...paginationConfig()}
                                                          />
                                                          {selectedRows.length >
                                                          0 ? (
                                                            <button
                                                              type="button"
                                                              className="btn btn-primary"
                                                              onClick={
                                                                updateCallRoutes
                                                              }
                                                              disabled={
                                                                routingLoading
                                                              }
                                                            >
                                                              {routingLoading
                                                                ? "Loading..."
                                                                : "Update Routes"}
                                                            </button>
                                                          ) : null}
                                                        </div>
                                                         )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {/* Repeat the above code for the other tabs */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
    </>
  );
}

export default EditCampaign;
