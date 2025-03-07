import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";


const EditAutoReply = ({
    editValues,
    onEditChange,
    onCancel,
    onSave,
    show,
    setShow,
    editId,
}) => {

    const handleClose = () => setShow(false);

    const [formData, setFormData] = useState({
        type: "",
        instance: "",
        name: "",
        message: "",

    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(`API_URL/${editId}`, editValues);
        // console.log("PUT Response:", response);
        // Reload the page
        window.location.reload();
    };

    // console.log(editValues)

    useEffect(() => {
        if (editValues) {
            const FD = {
                ...formData,
                type: editValues.type,
                instance: editValues.instance,
                name: editValues.name,
                message: editValues.message,

            };

            setFormData(FD);
        }
    }, [editValues]);
    return (
        <>
            <Modal show={show} onHide={handleClose} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact List</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} id="my-form">

                    <div className="row mb-4">
                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                            Message Type *                                                  </label>
                        <div className="col-sm-8">
                            <select className="form-select" value={formData.type}
                                onChange={(e) => onEditChange("type", e.target.value)}
                                name='type' >
                                <option value="text">Text</option>
                                <option value="quickReplyButton">Quick Reply Button</option>
                                <option value="callActionButton">Call To Action Button</option>
                                <option value="listMenu">List/Menu</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                            Instance *
                        </label>
                        <div className="col-sm-8">
                            <select className="form-select" value={formData.instance}
                                onChange={(e) => onEditChange("instance", e.target.value)}
                                name='instance'>
                                <option>6U1kz(Deepak)</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                            Name *
                        </label>
                0        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder="Name *"  value={formData.name}
                                onChange={(e) => onEditChange("name", e.target.value)}
                                name='name' />
                            {/* <textarea className="form-control" rows="5" id="" name="text"></textarea> */}
                        </div>
                    </div>

                    <div className="row mb-4">
                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                            Message *
                        </label>
                        <div className="col-sm-8">
                            <textarea className="form-control" rows="5" id="" value={formData.message}
                                onChange={(e) => onEditChange("message", e.target.value)}
                                name='message'></textarea>
                            <p style={{ color: "red" }}></p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4 ">
                        </div>
                    </div>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCancel}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditAutoReply