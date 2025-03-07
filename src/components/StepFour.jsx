import { Button, Col, message, Row } from "antd";
import React, { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { CallPOSTAPI } from "../helper/Constants";
import { toast } from "react-toastify";
import Links from "./StepThree";
import Details from "./StepOne";
import Address from "./StepTwo";
import { useSelector } from "react-redux";

const Save = () => {
  const navigate = useNavigate();
  const {
    linksDetails,
    setLinksDetails,
    next,
    prev,
    details,
    address,
    setAddress,
    setDetails,
  } = useContext(MultiStepFormContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const user_id = useSelector((state) => state.wallet.userId);

  const handleSave = async () => {
    setIsLoading(true);

    let campaignPayload;
    if (linksDetails?.selectedOption === "createNew") {
      campaignPayload = {
        campaignname: details?.campaignname || "",
        country: details?.country?.code || "",
        countryName: details?.country?.name || "",
        tollfreenumber: address?.TollFreeNumber || "",
        publisher_id: address?.Publisher_id || "",
        user_id: "",
        name: linksDetails?.name || "",
        number: linksDetails?.number || "",
        trackingrevenue: linksDetails?.trackingrevenue || false,
        duplicatecalls: linksDetails?.duplicatecalls || false,
        filterrepeatcaller: linksDetails?.filterrepeatcaller || false,
        targetoption: linksDetails?.selectedOption,
        anonymouscall: linksDetails?.anonymouscall || false,
        recordcalls: linksDetails?.recordcalls || false,
        waittoanswer: linksDetails?.waittoanswer || false,
        trimsilence: linksDetails?.trimsilence || false,
        targetdialattempts: linksDetails?.targetdialattempts || "",
        priority: linksDetails?.priority || "",
        weight: linksDetails?.weight || "",
        status: linksDetails?.status || "",
      };
    } else {
      campaignPayload = {
        campaignname: details?.campaignname || "",
        country: details?.country?.code || "",
        countryName: details?.country?.name || "",
        tollfreenumber: address?.TollFreeNumber || "",
        publisher_id: address?.Publisher_id || "",
        user_id: "",
        target_id: linksDetails?.target_id || "",
        trackingrevenue: linksDetails?.trackingrevenue || false,
        duplicatecalls: linksDetails?.duplicatecalls || false,
        filterrepeatcaller: linksDetails?.filterrepeatcaller || false,
        anonymouscall: linksDetails?.anonymouscall || false,
        recordcalls: linksDetails?.recordcalls || false,
        waittoanswer: linksDetails?.waittoanswer || false,
        trimsilence: linksDetails?.trimsilence || false,
        targetdialattempts: linksDetails?.targetdialattempts || "",
        priority: linksDetails?.priority || "",
        weight: linksDetails?.weight || "",
        status: linksDetails?.status || "",
      };
    }

    try {
      const campaignResponse = await CallPOSTAPI("api/create-campaign", campaignPayload);
      if (!campaignResponse.status) {
        toast.error("Failed to create campaign");
        return;
      }

      const { campaign_id, publisher_entry } = campaignResponse.data;

      const callRoutingPayload = {
        target_id: linksDetails?.target_id || publisher_entry.target_id,
        priority: linksDetails?.priority || "",
        weight: linksDetails?.weight || "",
        status: linksDetails?.status || "",
        user_id: user_id,
        campaign_id: campaign_id
      };

      const callRoutingResponse = await CallPOSTAPI("api/create-call-routing", callRoutingPayload);
      if (!callRoutingResponse.status) {
        toast.error("Failed to create call routing entry");
        return;
      }

      toast.success("Campaign, Publisher, and Call Routing Entries Created Successfully");

      setAddress({});
      setDetails({});
      setLinksDetails({});
      navigate("/manage-campaigns");

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (showAll) {
      message.success("Details submitted successfully!");
      next();
    }
  };

  const handleView = () => {
    setShowAll(true);
  };

  return (
    <div className={"details__wrapper"}>
      <div>
        <h1 className="review__header m-4" style={{ textAlign: "center" }}>
          Confirm Details
        </h1>
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center my-5" style={{ marginTop: "20px" }}>
          <ReactLoading type="spokes" color="grey" height={50} width={50} />
        </div>
      )}
      {!isLoading && (
        <>
          <Row gutter={[16, 16]}>
            {showAll && (
              <div>
                <Col span={24}>
                  <h2 className="review__header">Campaign Details</h2>
                  <div className="review__details">
                    <p className="review__item"><strong>Campaign Name:</strong> {details?.campaignname}</p>
                    <p className="review__item"><strong>Country:</strong> {details?.country?.name}</p>
                  </div>
                </Col>
                <Col span={24}>
                  <h2 className="review__header">Address Details</h2>
                  <div className="review__details">
                    <p className="review__item"><strong>Phone:</strong> {address?.phone}</p>
                    <p className="review__item"><strong>Address:</strong> {address?.address1}</p>
                    <p className="review__item"><strong>Country:</strong> {address?.country}</p>
                    <p className="review__item"><strong>State:</strong> {address?.state}</p>
                    <p className="review__item"><strong>City:</strong> {address?.city}</p>
                  </div>
                </Col>
                <Col span={24}>
                  <h2 className="review__header">Links Details</h2>
                  <div className="review__details">
                    <p className="review__item"><strong>Portfolio Link:</strong> {linksDetails?.portfolio}</p>
                    <p className="review__item"><strong>Github Link:</strong> {linksDetails?.github}</p>
                    <p className="review__item"><strong>Website Link:</strong> {linksDetails?.website}</p>
                  </div>
                </Col>
              </div>
            )}
            <Col span={22}>
              <Details is_final={true} />
            </Col>
            <Col span={22}>
              <Address is_final={true} />
            </Col>
            <Col span={22}>
              <Links is_final={true} />
            </Col>
            <Col span={24}>
              <div className={"form_item button_items d-flex justify-content-between"}>
                <Button type={"default"} onClick={prev}>
                  Back
                </Button>
                <Button type={"primary"} onClick={handleSave} disabled={isLoading}>
                  Confirm
                  {isLoading ? " Loading ..." : ""}
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Save;