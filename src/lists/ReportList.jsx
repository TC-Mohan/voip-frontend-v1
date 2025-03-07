import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { campaigncolumns, campaigndata } from "./ReportListData";
import { publishercolumns, publisherdata } from "./ReportListData";
import { buyercolumns, buyerdata } from "./ReportListData";
import { targetcolumns, targetdata } from "./ReportListData";
import Form from "react-bootstrap/Form";
import moment from "moment-timezone";
import DataTable from "react-data-table-component";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DatePicker, Space } from "antd";
import { Country, City } from "country-state-city";
import { useSelector } from "react-redux";
import { CallGETAPI, CallPOSTAPI, FILE_BASE_RECORDING, } from "../helper/Constants";
import { GetTimeZoneById } from "../helper/utils";
import { subMonths, startOfToday, format } from 'date-fns';
import dayjs from 'dayjs';

import ReactAudioPlayer from "react-audio-player";
import { CSVLink } from "react-csv";
import { paginationConfig } from "../components/global/paginationUtils";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReportList = () => {
  const { RangePicker } = DatePicker;
  
  // State variables for loading different components separately
  const [chartLoading, setChartLoading] = useState(true);
  const [campaignLoading, setCampaignLoading] = useState(true);
  const [targetLoading, setTargetLoading] = useState(true);
  const [phoneNumberLoading, setPhoneNumberLoading] = useState(true);
  const [callDataLoading, setCallDataLoading] = useState(true);
  const [countryLoading, setCountryLoading] = useState(false); // Set to false by default
  
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [callData, setCallData] = useState([]);
  const sip = useSelector((state) => state.wallet.extension_number);
  const user_id = useSelector((state) => state.wallet.userId);
  const [chartData, setChartData] = useState(null);
  const [campaignSummaryData, setCampaignSummaryData] = useState([]); 
  const [targetSummaryData, setSummaryData] = useState([]);
  const [phoneNumberData, setPhoneNumberData] = useState([]);

  const fetchPhoneSummary = async () => {
    setPhoneNumberLoading(true);
    try {
      const response = await CallGETAPI(`api/tollfreenumber-summary?user_id=${user_id}`);
      if (response.status) {
        setPhoneNumberData(response.data.data);
      } else {
        setPhoneNumberData([]);
      }
    } catch (error) {
      console.error("Error fetching phone number summary:", error);
      setPhoneNumberData([]);
    } finally {
      setPhoneNumberLoading(false);
    }
  };

  const fetchTargetSummary = async () => {
    setTargetLoading(true);
    try {
      const response = await CallGETAPI(`api/target-summary?user_id=${user_id}`);
      if (response.status) {
        setSummaryData(response.data.data);
      } else {
        setSummaryData([]);
      }
    } catch (error) {
      console.error("Error fetching target summary:", error);
      setSummaryData([]);
    } finally {
      setTargetLoading(false);
    }
  };

  const fetchCampaignSummary = async () => {
    setCampaignLoading(true);
    try {
      const response = await CallGETAPI(`api/campaign-summary?user_id=${user_id}`);
      if (response.status) {
        setCampaignSummaryData(response.data.data);
      } else {
        setCampaignSummaryData([]);
      }
    } catch (error) {
      console.error("Error fetching campaign summary:", error);
      setCampaignSummaryData([]);
    } finally {
      setCampaignLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Start all fetches in parallel
        await Promise.all([
          fetchCampaignSummary(),
          fetchTargetSummary(),
          fetchPhoneSummary(),
          fetchCountries()
        ]);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      }
    };
    
    fetchAllData();
  }, [user_id]);

  const campaignSummaryColumns = [
    {
      name: "CAMPAIGN NAME",
      selector: row => row.campaignname,
      sortable: true,
    },
    {
      name: "INCOMING",
      selector: row => row.incoming,
      sortable: true,
    },
    {
      name: "ANSWER",
      selector: row => row.answer,
      sortable: true,
    },
    {
      name: "MISSCALL",
      selector: row => row.misscall,
      sortable: true,
    },
    {
      name: "CANCELCALLS",
      selector: row => row.cancelcalls,
      sortable: true,
    },
    {
      name: "DUPLICATE",
      selector: row => row.duplicate,
      sortable: true,
    },
  ];

  const [filter, setFilter] = useState({
    did: '',
    uniqueid: '',
    call_from: '',
    call_to: '',
  });
 
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    if (startDate && endDate) {
      setChartLoading(true);
      setCallDataLoading(true);
      Promise.all([
        fetchCallDetail(),
        fetchCallDetails(startDate, endDate)
      ]).finally(() => {
        setChartLoading(false);
        setCallDataLoading(false);
      });
    }
  }, [startDate, endDate, user_id]);
  
  const fetchCallDetails = async (start, end) => {
    try {
      const formattedStartDate = start.format('YYYY-MM-DD HH:mm:ss');
      const formattedEndDate = end.format('YYYY-MM-DD HH:mm:ss');
    
      const response = await CallGETAPI(
        `api/get-cdr-Call-Processed?user_id=${user_id}&start_time=${formattedStartDate}&end_time=${formattedEndDate}`
      );
  
      const result = response?.data?.data?.calls;
  
      if (response.status && Array.isArray(result)) {
        const filteredData = result.filter(call => {
          const callDateStr = call.start_time.replace(/-(?=[^-]*$)/, 'T');
          const callDate = new Date(callDateStr);
          return callDate >= new Date(start) && callDate <= new Date(end);
        });
  
        setCallData(filteredData);
      } else {
        setCallData([]);
      }
    } catch (error) {
      setCallData([]);
    }
  };

  const fetchCallDetail = async () => {
    try {
      const formattedStartDate = startDate.format('YYYY-MM-DD HH:mm:ss');
      const formattedEndDate = endDate.format('YYYY-MM-DD HH:mm:ss');
      const response = await CallPOSTAPI(`api/get-cdr-date-Call-Processed1`, {
        start_time: formattedStartDate,
        end_time: formattedEndDate,
        user_id: user_id, 
      });
  
      if (response.status) {
        const result = response?.data?.data?.dateRange;
        // Define labels and datasets even if result is empty
        const labels = result.length ? result.map(item => item.date) : getDefaultLabels();
        const noAnswered = result.length ? result.map(item => item.NOANSWEREDCount) : labels.map(() => 0);
        const incoming = result.length ? result.map(item => item.incomingCount) : labels.map(() => 0);
        const answered = result.length ? result.map(item => item.ANSWERCount) : labels.map(() => 0);
        const canceled = result.length ? result.map(item => item.CANCELCount) : labels.map(() => 0);
  
        // Set chart data with either the fetched data or zeroed out data
        setChartData({
          labels,
          datasets: [
            {
              label: "No Answered",
              data: noAnswered,
              borderColor: "#58BF6A",
              backgroundColor: "rgba(88, 191, 106, 0.2)",
              tension: 0.4,
              pointRadius: 3,
              borderDash: [],
            },
            {
              label: "Incoming",
              data: incoming,
              borderColor: "#1E90FF", 
              backgroundColor: "rgba(30, 144, 255, 0.2)",
              tension: 0.4,
              pointRadius: 3,
              borderDash: [],
            },
            {
              label: "Answered",
              data: answered,
              borderColor: "#5AC8BB",
              backgroundColor: "rgba(90, 200, 187, 0.2)",
              tension: 0.4,
              pointRadius: 3,
              borderDash: [],
            },
            {
              label: "Canceled",
              data: canceled,
              borderColor: "#F08733",
              backgroundColor: "rgba(240, 135, 51, 0.2)",
              tension: 0.4,
              pointRadius: 3,
              borderDash: [],
            },
          ],
        });
      } else {
        const labels = getDefaultLabels();
        setChartData(getZeroedChartData(labels));
        setCallData(getDefaultTableData(labels));
      }
    } catch (error) {
      const labels = getDefaultLabels();
      setChartData(getZeroedChartData(labels));
      setCallData(getDefaultTableData(labels));
    }
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const getDefaultLabels = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => 
      format(subMonths(today, i), 'yyyy-MM-dd')
    ).reverse();
  };
  
  const getZeroedChartData = (labels) => ({
    labels,
    datasets: [
      {
        label: "No Answered",
        data: labels.map(() => 0),
        borderColor: "#58BF6A",
        backgroundColor: "rgba(88, 191, 106, 0.2)",
        tension: 0.4,
        pointRadius: 3,
        borderDash: [],
      },
      {
        label: "Incoming",
        data: labels.map(() => 0),
        borderColor: "#1E90FF", 
        backgroundColor: "rgba(30, 144, 255, 0.2)",
        tension: 0.4,
        pointRadius: 3,
        borderDash: [],
      },
      {
        label: "Answered",
        data: labels.map(() => 0),
        borderColor: "#5AC8BB",
        backgroundColor: "rgba(90, 200, 187, 0.2)",
        tension: 0.4,
        pointRadius: 3,
        borderDash: [],
      },
      {
        label: "Canceled",
        data: labels.map(() => 0),
        borderColor: "#F08733",
        backgroundColor: "rgba(240, 135, 51, 0.2)",
        tension: 0.4,
        pointRadius: 3,
        borderDash: [],
      },
    ],
  });

  const getDefaultTableData = (labels) => {
    return labels.map(label => ({
      start_time: `${label}-00:00:00`,
      end_time: `${label}-23:59:59`,
      call_from: 'N/A',
      call_to: 'N/A',
      did: 'N/A',
      uniqueid: 'N/A',
      dur: '0',
      status: 'N/A',
      record_url: null,
    }));
  };

  const csvData = callData.map(call => ({
    "CALL DATE": call.start_time ? call.start_time.split('-').slice(0, 3).join('-') : 'N/A',
    "CALL TIME": call.end_time ? call.end_time.split('-')[3] : 'N/A',
    "CALL FROM": call.call_from,
    "CALL TO": call.call_to,
    "DID": call.did,
    "UNIQUEID": call.uniqueid,
    "TIME DURATION": call.dur,
    "STATUS": call.status,
    "RECORDING LINK": call.record_url ? FILE_BASE_RECORDING + 'callforward_rec/' + call.record_url.substring(call.record_url.lastIndexOf("/") + 1) : 'No Recording Available'
  }));
  
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredCalls();
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [filter]);
  
  const fetchFilteredCalls = async () => {
    setCallDataLoading(true);
    try {
      // Create an object with non-empty filter values
      const filterParams = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== '')
      );
  
      // Convert filterParams object to query string
      const queryString = new URLSearchParams(filterParams).toString();
  
      // Make the API request with the query string
      const response = await CallGETAPI(`api/filtered-calls/${user_id}?${queryString}`);
  
      if (response.status) {
        let filteredData = response.data.data;
  
        // Apply client-side filtering for partial matches (if needed)
        filteredData = filteredData.filter(item => {
          return Object.keys(filterParams).every(key =>
            item[key].toLowerCase().includes(filterParams[key].toLowerCase())
          );
        });
  
        // Sort the filtered data
        filteredData.sort((a, b) => {
          for (const key in filterParams) {
            if (a[key].toLowerCase().includes(filterParams[key].toLowerCase()) &&
                !b[key].toLowerCase().includes(filterParams[key].toLowerCase())) {
              return -1;
            }
            if (!a[key].toLowerCase().includes(filterParams[key].toLowerCase()) &&
                b[key].toLowerCase().includes(filterParams[key].toLowerCase())) {
              return 1;
            }
          }
          return 0;
        });
  
        setCallData(filteredData);
      } else {
        setCallData([]);
      }
    } catch (error) {
      console.error("Error fetching filtered calls:", error);
      setCallData([]);
    } finally {
      setCallDataLoading(false);
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Daily Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  let chart;

  const downloadImage = () => {
    chart?.downloadImage();
  };

  const toDataURL = () => {
    // console.log(chart?.toDataURL());
  };

  const [showFilterForm, setShowFilterForm] = useState(false);

  const openFilterForm = () => {
    setShowFilterForm(true);
  };

  const closeFilterForm = () => {
    setShowFilterForm(false);
  };

  const applyFilter = () => {
    // Add logic to handle filter application
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");

  const formatSelectedDateTime = (date, timeZone) => {
    if (date) {
      return (
        <span>
          <FaCalendarAlt />{" "}
          {moment(date).tz(timeZone).format("MMMM D, YYYY h:mm A")}
        </span>
      );
    } else {
      return "Date";
    }
  };

  const callcolumns = [
    {
      name: "CALL DATE",
      selector: row => row.start_time,
      sortable: true,
      cell: row => {
        const date = row.start_time ? row.start_time.split('-').slice(0, 3).join('-') : 'N/A';
        return <span>{date}</span>;
      },
    },
    {
      name: "CALL TIME",
      selector: row => row.end_time,
      sortable: true,
      cell: row => {
        const time = row.end_time ? row.end_time.split('-')[3] : 'N/A';
        return <span>{time}</span>;
      }
    },
    {
      name: "CALLER ID",
      selector: row => row.call_from,
      sortable: true,
    },
    {
      name: "TARGET",
      selector: row => row.call_to,
      sortable: true,
    },
    {
      name: "DID",
      selector: row => row.did,
    },
    {
      name: "TIME DURATION",
      center: true,
      selector: row => row.dur,
      cell: (d) => {
        const duration = parseInt(d.dur, 10); 
    
        if (isNaN(duration) || duration === 0) {
          return <span>0 sec</span>;
        } else if (duration < 60) {
          return <span>{duration} sec</span>;
        } else {
          const hours = Math.floor(duration / 3600);
          const minutes = Math.floor((duration % 3600) / 60);
          const seconds = duration % 60;
    
          let formattedDuration = '';
          if (hours > 0) {
            formattedDuration += `${hours} hr `;
          }
          if (minutes > 0 || hours > 0) {
            formattedDuration += `${minutes} min `;
          }
          formattedDuration += `${seconds} sec`;
    
          return <span>{formattedDuration.trim()}</span>;
        }
      }
    },
    {
      name: "RECORDING",
      center: true,
      sortable: false,
      selector: row => row.record_url,
      cell: (row) => {
        const recordingUrl = row?.record_url
          ? row.record_url.substring(row.record_url.lastIndexOf("/") + 1)
          : "No Recording Available";
  
        return (
          <ReactAudioPlayer
            className="w-100"
            src={FILE_BASE_RECORDING + 'callforward_rec/' + recordingUrl}
            controls
          />
        );
      },
    },
    {
      name: "RECORDING LINK",
      center: true,
      sortable: false,
      selector: row => row.record_url,
      cell: (row) => {
        const recordingLink = row?.record_url || "";
        return (
          <>
            {recordingLink ? (
              <a
                href={recordingLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007bff" }}
              >
                Recording Link
              </a>
            ) : (
              <span>No Link Available</span>
            )}
          </>
        );
      },
    },
    {
      name: "STATUS",
      selector: row => row.status,
    },
  ];

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [timezones, setTimezones] = useState([]);
  const [isCountryError, setIsCountryError] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setCountryLoading(true);
    try {
      const response = await CallGETAPI('api/country-list');
      const countriesData = response.data.data;
      
      if (response.status && Array.isArray(countriesData)) {
        setCountries(countriesData);
      } else {
        console.error('Expected an array from API:', response);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setCountryLoading(false);
    }
  };

  const handleCountrySelect = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    const resultData = await GetTimeZoneById(countryId);
    setTimezones(resultData || []);

    setIsCountryError(!countryId);
  };

  const onChange = (value) => {
    console.log('Selected Time:', value);
  };

  const onOk = (value) => {
    console.log('onOk:', value);
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <main id="mains" className="mains">
      <section>
        <div className="card">
          <div className="card-body">
            <h3>Date Range By filter</h3>
            <div className="filter-section">
              <div className="custom-select-container">
                {selectedCountry && (
                  <Form.Select
                    className="custom-select"
                    name="timezone"
                  >
                    <option value="">Choose a Timezone</option>
                    {Array.isArray(timezones) &&
                      timezones.map((timezone) => (
                        <option key={timezone.timezone} value={timezone.timezone}>
                          {timezone.timezone}
                        </option>
                      ))}
                  </Form.Select>
                )}
                <div className="date-picker-container">
                  <Space direction="vertical" size={12}>
                    <RangePicker
                      showTime={{ format: "HH:mm" }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={handleDateRangeChange}
                      value={[startDate, endDate]}
                    />
                  </Space>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div>
              <div>TimeLine </div>
              <div style={{ width: "100%", height: "300px" }} className="canvas-handle">
              {chartLoading ? (
                <div className="chart-skeleton">
                  <Skeleton height={300} />
                </div>
              ) : chartData ? (
                <Line options={options} data={chartData} />
              ) : (
                <p>No data available for the selected date range</p>
              )}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div>
              <ul
                className="nav nav-tabs nav-tabs-bordered d-flex"
                id="borderedTabJustified"
                role="tablist"
              >
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className="nav-link w-100 active"
                    id="campaign-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bordered-justified-campaign"
                    type="button"
                    role="tab"
                    aria-controls="campaign"
                    aria-selected="true"
                  >
                    Campaign
                  </button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className="nav-link w-100"
                    id="target-tab" 
                    data-bs-toggle="tab"
                    data-bs-target="#bordered-justified-target"
                    type="button"
                    role="tab"
                    aria-controls="target"
                    aria-selected="false"
                  >
                    Target
                  </button>
                </li>

                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className="nav-link w-100"
                    id="buyer-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bordered-justified-buyer"
                    type="button"
                    role="tab"
                    aria-controls="buyer"
                    aria-selected="false"
                  >
                    Mobile Number
                  </button>
                </li>
              </ul>
            </div> 

            <div className="tab-content pt-2" id="borderedTabJustifiedContent">
              <div
                className="tab-pane fade show active"
                id="bordered-justified-campaign"
                role="tabpanel"
                aria-labelledby="campaign-tab"
              >
                <div className="card" style={{ boxShadow: "none" }}>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="main">
                      {campaignLoading ? (
                        <div className="campaign-data-skeleton">
                          <Skeleton height={40} />
                          <Skeleton count={5} height={30} />
                        </div>
                      ) : (
                        <DataTable
                          columns={campaignSummaryColumns}
                          data={campaignSummaryData}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={true}
                          pagination
                          highlightOnHover
                          dense
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade "
                id="bordered-justified-target"
                role="tabpanel"
                aria-labelledby="target-tab"
              >
                <div className="card" style={{ boxShadow: "none" }}>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="main">
                      {targetLoading ? (
                        <div className="target-data-skeleton">
                          <Skeleton height={40} />
                          <Skeleton count={5} height={30} />
                        </div>
                      ) : (
                        <DataTable
                          columns={targetcolumns}
                          data={targetSummaryData}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={true}
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

              <div
                className="tab-pane fade "
                id="bordered-justified-buyer"
                role="tabpanel"
                aria-labelledby="buyer-tab"
              >
                <div className="card" style={{ boxShadow: "none" }}>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="main">
                      {phoneNumberLoading ? (
                        <div className="phone-number-skeleton">
                          <Skeleton height={40} />
                          <Skeleton count={5} height={30} />
                        </div>
                      ) : (
                        <DataTable
                          columns={buyercolumns}
                          data={phoneNumberData}
                          noHeader
                          defaultSortField="id"
                          defaultSortAsc={true}
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
        </div>
        <div className="card">
          <div className="card-body">
            <h3>Filter Calls</h3>
            <div className="filter-section">
              <div className="row">
              <div className="col">
                  <input
                    type="text"
                    name="call_from"
                    placeholder="Filter by Call From"
                    value={filter.call_from}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="call_to"
                    placeholder="Filter by Call To"
                    value={filter.call_to}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="did"
                    placeholder="Filter by DID"
                    value={filter.did}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="uniqueid"
                    placeholder="Filter by Unique ID"
                    value={filter.uniqueid}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </div>
                <div className="col">
                              
                <div className="date-picker-container mb-3"
        style={{display:"flex",justifyContent:"end"}}
        >
        {callData.length > 0 && (
        <CSVLink
          data={csvData}
          filename={"call_details.csv"}
          className="btn btn-outline-dark"
        >
          <i className="fa-sharp fa-solid fa-download"></i> Export Call Details
        </CSVLink>
      )}
       </div>
                </div>
 
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="main">
              <h5>Call Details</h5>
              
              {/* <DataTableExtensions {...tableData}> */}

              {callDataLoading ? (
              <div className="calls-data-skeleton mt-4">
                <Skeleton height={40} />
                <Skeleton count={5} height={50} />
              </div>
            ) : (
              <DataTable
                columns={callcolumns}
                data={callData}
                noHeader
                defaultSortField="id"
                // sortIcon={<SortIcon />}
                defaultSortAsc={true}
                pagination
                highlightOnHover
                dense
                {...paginationConfig()}

              />
            )}
             
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReportList;
