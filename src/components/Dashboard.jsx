import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { BarChart } from '@mui/x-charts/BarChart';
import CallSummary from "./CallSummary";
import CallDetails from "./CallDetails";
import { Link } from "react-router-dom";
import { CallGETAPI, CallPOSTAPI, DecryptToken } from "../helper/Constants";
import { useSelector } from "react-redux";
import ExtensionSummary from "./ExtensionSummary";
import IncomingCount from "./IncomingCount";
import OutgoingCount from "./OutgoingCount";
import MissedCount from "./MissedCount";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  

function Dashboard() {
  const [muiChartData, setMuiChartData] = useState(null);
  const [muiExtensionChartData, setMuiExtensionChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_id = useSelector((state) => state.wallet.userId);
  const [extensionData, setExtensionData] = useState(null);
  const [callsData, setcallsData] = useState(null);
  const [callSummaryData, setCallSummaryData] = useState(null);
  const [campaignSummaryData, setCampaignSummaryData] = useState([]); 
  const [totalDuplicateSum, setTotalDuplicateSum] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userToken = localStorage.getItem("psx_token");
        const decodedToken = DecryptToken(userToken);

        if (decodedToken) {
          setUserEmail(decodedToken.email);
          setUserType(decodedToken.user_type);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchCampaignSummary = async () => {
      try {
        const response = await CallGETAPI(`api/campaign-summary?user_id=${user_id}`);
        if (response.status) {
          setCampaignSummaryData(response.data.data);
          
          // Calculate the total sum of the 'duplicate' field
          const sum = response.data.data.reduce((acc, item) => acc + (parseInt(item.duplicate) || 0), 0);
          setTotalDuplicateSum(sum);
        } else {
          setCampaignSummaryData([]);
          setTotalDuplicateSum(0);
        }
      } catch (error) {
        console.error("Error fetching campaign summary:", error);
        setCampaignSummaryData([]);
        setTotalDuplicateSum(0);
      }
    };

    if (user_id) {
      fetchCampaignSummary();
    }
  }, [user_id]);

  const fetchCallSummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await CallGETAPI(`api/get-all-cdr-count`);
      if (response?.data?.success) {
        setCallSummaryData(response?.data?.data);
      } else {
        setError("Failed to fetch call summary data");
      }
    } catch (err) {
      setError("Failed to fetch call summary data");
    } finally {
      setSummaryLoading(false);
      setLoading(false);
    }
  };

  const fetchCallDetail = async () => {
    setChartsLoading(true);
    try {
      const response = await CallPOSTAPI(`api/get-cdr-date-Call-Processed`, {});

      if (response?.status) {
        const result = response?.data?.data?.dateRange;
        setcallsData(result);
        
        // Transform data for MUI BarChart - adding index for categorical x-axis
        const transformedData = result.map((item, index) => ({
          index,
          date: item.date,
          totalCalls: parseInt(item.TotalCallCounts || 0),
          answeredCalls: parseInt(item.Answere || 0),
          missedCalls: parseInt(item.misscalls || 0)
        }));
        setMuiChartData(transformedData);
      } else {
        setError('Failed to fetch chart data');
      }
    } catch (err) {
      setError('Failed to fetch chart data');
    }
  };

  const fetchExtensionData = async () => {
    try {
      const response = await CallPOSTAPI(`api/get-cdr-date-Call-Extension`);
      const result = response?.data?.data;
      if (response.status) {
        setExtensionData(result);
        
        // Transform data for MUI BarChart - adding index for categorical x-axis
        const transformedData = result.dateRange.map((item, index) => ({
          index,
          date: item.date,
          totalCalls: parseInt(item.TotalCallCounts || 0),
          answeredCalls: parseInt(item.Answere || 0),
          missedCalls: parseInt(item.misscalls || 0)
        }));
        setMuiExtensionChartData(transformedData);
      } else {
        setExtensionData([]);
      }
    } catch (error) {
      setError('Failed to fetch bar chart data');
    } finally {
      setChartsLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchCallDetail(), fetchExtensionData()])
      .catch(() => setChartsLoading(false));
  }, [user_id]);

  useEffect(() => {
    if (user_id) {
      fetchCallSummary();
    }
  }, [user_id]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <ToastContainer />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-6">
              <div className="App">
                <CallDetails 
                  data={callSummaryData}
                  isLoading={summaryLoading} 
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="App">
                <IncomingCount 
                  data={callSummaryData}
                  isLoading={summaryLoading} 
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="App">
                <OutgoingCount 
                  data={campaignSummaryData}
                  isLoading={summaryLoading}  
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="App">
                <MissedCount 
                  data={callSummaryData}
                  isLoading={summaryLoading} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Combined row for CallSummary and ExtensionSummary */}
        <section className="section dashboard">
          <div className="row">
            <div className={`col-lg-${userType === 4 ? "12" : "6"}`}>
              <div className="App">
                <CallSummary 
                  data={callsData} 
                  isLoading={chartsLoading}
                />
              </div>
            </div>
            {userType !== 4 && (
            <div className="col-lg-6">
              <div className="App">
                <ExtensionSummary 
                  data={extensionData?.dateRange} 
                  total={extensionData?.total}
                  isLoading={chartsLoading} 
                />
              </div>
            </div>
            )}
          </div>
        </section>

        {/* Combined row for all charts */}
        <section className="section dashboard">
          <div className="row">
            {/* Call Statistics Chart */}
            <div className={`col-lg-${userType === 4 ? "12" : "6"}`}>
              <div className="App" style={{ background: "white", padding: "10px", borderRadius: "5px" }}>
                <h5 style={{ textAlign: "center", marginBottom: "15px" }}>Call Statistics</h5>
                {chartsLoading ? (
                  <Skeleton height={450} />
                ) : muiChartData && (
                  <BarChart
                    yAxis={[{ 
                      scaleType: 'linear', 
                      labelStyle: {
                        fontSize: 14,
                        padding: 20
                      },
                      tickSize: 5,
                      tickPadding: 8
                    }]}
                    xAxis={[
                      { 
                        scaleType: 'band', 
                        data: muiChartData.map(item => item.date),
                        tickLabelStyle: {
                          angle: 45,
                          textAnchor: 'start',
                          fontSize: 12
                        }
                      }
                    ]}
                    series={[
                      { 
                        data: muiChartData.map(item => item.totalCalls),
                        label: 'Total Calls',
                        color: '#4bc0c0'
                      },
                      { 
                        data: muiChartData.map(item => item.answeredCalls),
                        label: 'Answered Calls',
                        color: 'green'
                      },
                      { 
                        data: muiChartData.map(item => item.missedCalls),
                        label: 'Canceled Calls',
                        color: '#FF0000'
                      }
                    ]}
                    height={450}
                    margin={{ top: 60, right: 30, bottom: 90, left: 50 }}
                    slotProps={{
                      legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'middle' },
                        padding: 10
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Extension Statistics Chart - only shows if user type is not 4 */}
            {userType !== 4 && (
              <div className="col-lg-6">
                <div className="App" style={{ background: "white", padding: "10px", borderRadius: "5px" }}>
                  <h5 style={{ textAlign: "center", marginBottom: "15px" }}>Extension Statistics</h5>
                  {chartsLoading ? (
                    <Skeleton height={450} />
                  ) : muiExtensionChartData && (
                    <BarChart
                      yAxis={[{ scaleType: 'linear' }]}
                      xAxis={[
                        { 
                          scaleType: 'band', 
                          data: muiExtensionChartData.map(item => item.date),
                          tickLabelStyle: {
                            angle: 45,
                            textAnchor: 'start',
                            fontSize: 12
                          }
                        }
                      ]}
                      series={[
                        { 
                          data: muiExtensionChartData.map(item => item.totalCalls),
                          label: 'Total Calls',
                          color: '#4bc0c0'
                        },
                        { 
                          data: muiExtensionChartData.map(item => item.answeredCalls),
                          label: 'Answered Calls',
                          color: 'green'
                        },
                        { 
                          data: muiExtensionChartData.map(item => item.missedCalls),
                          label: 'Missed Calls',
                          color: '#FF0000'
                        }
                      ]}
                      height={450}
                      margin={{ top: 60, right: 30, bottom: 90, left: 50 }}
                      slotProps={{
                        legend: {
                          direction: 'row',
                          position: { vertical: 'top', horizontal: 'middle' },
                          padding: 10
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;