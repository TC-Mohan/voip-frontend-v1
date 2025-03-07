import React, { useEffect, useState } from "react";
import { CallGETAPI } from "../helper/Constants";


const OverViewProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isdata, setisdata] = useState({});

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await CallGETAPI("api/get-user-profile");
      // console.log("Data from API:", response.data.data);
      const result = response.data.data;
      setisdata(result);
      // console.log(isdata);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        className="tab-pane fade show active profile-overview"
        id="profile-overview"
      >
        <h5 className="card-title mt-5">About</h5>
        <p className="small fst-italic">{isdata.about}</p>
        <h5 className="card-title m-5">Profile Details</h5>
        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Full Name</div>
          <div className="col-lg-9 col-md-8">{isdata.first_name} {isdata.last_name}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Company</div>
          <div className="col-lg-9 col-md-8">{isdata.company}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Job</div>
          <div className="col-lg-9 col-md-8">{isdata.job}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Country</div>
          <div className="col-lg-9 col-md-8">{isdata.country}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Address</div>
          <div className="col-lg-9 col-md-8">{isdata.address}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Phone</div>
          <div className="col-lg-9 col-md-8">{isdata.phone}</div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 label">Email</div>
          <div className="col-lg-9 col-md-8">{isdata.email}</div>
        </div>
      </div>
    </>
  );
};

export default OverViewProfile;
