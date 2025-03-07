import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CallPostFileUpload } from "../../helper/Constants";
import { toast } from "react-toastify";

const UpdateGreetings = ({ show, onHide, greeting, onUpdate }) => {
  const [formData, setFormData] = useState({
    greeting_name: "",
    greeting_audio: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (greeting) {
      setFormData({
        greeting_name: greeting.greeting_name || "",
        greeting_audio: greeting.greeting_audio || "",
      });
    }
  }, [greeting]);

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

  const handleUpdateGreeting = async () => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("greeting_name", formData.greeting_name);
      formDataToSend.append("greeting_audio", formData.greeting_audio);

      // Call your update API here
      const response = await CallPostFileUpload(
        `api/update-greeting/${greeting.id}`,
        formDataToSend
      );

      if (response.status) {
        toast.success(response.message || "Greeting Updated Successfully !");
        onUpdate();
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update greeting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Greeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Input for greeting name */}
        <div className="row">
          <label htmlFor="greeting_name" className="col-lg-6">
            Enter Greeting Name:
          </label>
          <input
            className="col-lg-6 form-control"
            type="text"
            id="greeting_name"
            placeholder="Enter greeting name..."
            value={formData.greeting_name}
            onChange={handleNameChange}
          />
        </div>
        <br />
        <div className="row">
          <label className="col-6">Upload Greeting Audio:</label>
          <div className="col-lg-6 d-flex justify-content-start">
            <input
              type="file"
              id="greetingAudio"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {formData.greeting_audio && (
              <div className="col-lg-6 justify-content-start">
                {formData.greeting_audio.name}{" "}
                <Button
                  variant="primary"
                  onClick={() =>
                    document.getElementById("greetingAudio").click()
                  }
                  disabled={loading}
                >
                  Upload File
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleUpdateGreeting}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Greeting"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateGreetings;
