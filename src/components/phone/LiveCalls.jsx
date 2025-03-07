import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CallGETAPI } from "../../helper/Constants";
import { paginationConfig } from "../global/paginationUtils";

function LiveCallsReporting() {
  const [isData, setIsData] = useState();
  const fetchLiveCalls = async () => {
    try {
      const connect = await CallGETAPI("api/connect");
      const response = await CallGETAPI("api/live-calls");
      // console.log("Data from API:", response.data.liveCalls);
      const result = response.data.liveCalls;
      setIsData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLiveCalls();
    // console.log(">>>>>>>>>>", isData);
  }, []);

  const callhistorycolumns = [
    {
      name: "",
      selector: "",
      sortable: true,
      cell: (d) => <p class=""></p>,
    },
    {
      name: "Live Call",
      selector: "",
      sortable: true,
      cell: (d) => (
        <p class="align-text-bottom text-nowrap">
          <div
            style={{
              flex: "none",
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: "rgba(46, 204, 113, 0.2)",
              padding: "4px",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#2ECC71",
              }}
            ></div>
          </div>
        </p>
      ),
    },
    {
      name: "Customer Care",
      selector: "",
      sortable: true,
      width: "15%",
      // cell: (d) => (
      //     <p class="align-text-bottom text-nowrap">
      //         {d.id}
      //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
      //     </p>
      // )
      // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
      name: "USER",
      selector: "user",
      sortable: true,
    },
    {
      name: "Whisper",
      selector: "call",
      sortable: true,
      compact: true,
      cell: (d) => (
        <p class="align-text-bottom text-nowrap">
          {d.id}
          <button type="submit" class=" btn btn-sm">
            <i class="fa-solid fa-phone"></i>
          </button>
        </p>
      ),
    },
  ];

  const callhistorydata = [
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
    {
      arrow: "",
      contact: "+1 814-854-7548",
      call: "",
      phoneline: "plivoau",
      user: "-",
      duration: "-",
      time: "10 hours ago",
    },
  ];

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Phone</a>
              </li>
              <li className="breadcrumb-item active">Live Call</li>
            </ol>
            
          </nav>
        </div>
        <section className="section dashboard">
          <div className="card">
            <div className="card-body mt-3">
              <h3>
                <strong className="border-bottom border-3 pb-2">
                  Live Calls
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
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div className="main">
                        <DataTable
                          className="border-top border-1 mt-4"
                          columns={callhistorycolumns}
                          data={callhistorydata}
                          searchable
                          noHeader
                          defaultSortField="id"
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
        </section>
      </main>
    </>
  );
}

export default LiveCallsReporting;
