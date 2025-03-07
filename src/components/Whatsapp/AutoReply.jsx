import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import EditAutoReply from './EditAutoReply';
import { paginationConfig } from '../global/paginationUtils';

function AutoReply() {

  const [selectedOption, setSelectedOption] = useState('text');

  const [editValues, setEditValues] = useState({
    type: "",
    instance: "",
    keyword: "",
    response: "",
  });

  const [editId, setEditId] = useState(null);

  const onCancel = () => {
    setEditId(null);
    setEditValues({
      type: "",
      instance: "",
      keyword: "",
      response: "",
    });
  };
  const onEditChange = (field, value) => {
    setEditValues({
      ...editValues,
      [field]: value,
    });
  };

  const onSave = async () => {
    try {
      if (!editId) {
        console.error("Invalid editId:", editId);
        return;
      }

      setEditId(null);
      setEditValues({
        type: "",
        instance: "",
        keyword: "",
        response: "",

      });
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle error accordingly
    }
  };

  // Edit modal handling
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleEditModal = (id, row) => {
    setShowEditModal(!showEditModal);
    if (!showEditModal) {
      setEditId(id);
      setEditValues({
        type: row.type,
        instance: row.instance,
        keyword: row.keyword,
        response: row.response,

      });
    } else {
      setEditId(null);
      setEditValues({
        type: "",
        instance: "",
        keyword: "",
        response: "",

      });
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const autoreplycolumns = [
    {
      name: "SR NO.",
      selector: "srno",
      sortable: true,
      //   cell: (d) => [
      //     <button type="submit" class="btn btn-sm btn-outline-warning">
      //       <i class="fa-regular fa-pen-to-square"></i>
      //     </button>,
      //   ],
    },
    {
      name: "INSTANCE",
      selector: "instance",
      sortable: true,
      compact: true,
      width: "15%"
      // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
    },
    {
      name: "KEYWORD",
      selector: "keyword",
      sortable: true,
    },
    {
      name: "TYPE",
      selector: "type",
      sortable: true,
    },
    {
      name: "RESPONSE",
      selector: "response",
      sortable: true,
    },
    {
      name: "PREVIEW",
      selector: "preview",
    },
    {
      name: "ACTION",
      selector: "action",
      cell: (row) => [
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          onClick={() => handleToggleEditModal(row.editautoreply_id, row)}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>, <button type="submit" class="btn btn-sm btn-outline-warning">
          <i class="fa-solid fa-trash"></i>
        </button>,
      ],
    },

  ];
  const autoreplydata = [
    {
      srno: "1",
      instance: "6U1Pkztk3W(Deepak Singh)",
      keyword: "tushar",
      type: "Quick Reply Button",
      response: "Good Morning",
      preview: "Send",

    },
    {
      srno: "2",
      instance: "6U1Pkztk3W(Deepak Singh)",
      keyword: "tushar",
      type: "Text With Media",
      response: "Good Morning",
      preview: "Send",

    },
  ];

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Auto Reply</li>
            </ol>
          </nav>
        </div>
        <section>
          {/* {!isLoading && ( */}
          <div className="card">
            <div className="card-body">

              <div className="card" style={{ boxShadow: "none" }}>
                <div className="card-body" style={{ padding: 0 }}>

                  <div className="container-fluid d-flex justify-content-center">
                    <div className="w-100">
                      <div >
                        <div className="m-4">
                          <form action="post">
                            <div className="container-fluid ">
                              <div className="row  d-flex justify-content-end">
                              </div>

                              <div className="row">
                                <div className="mb-3 col-md-4 text-start">
                                  {/* <label htmlFor="text" className="form-label"></label> */}
                                  <h3><strong>Auto Reply</strong></h3>
                                </div>
                                <div className="mb-3 col-md-8 text-end">
                                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#myModalAutoReply"><i class="fa-solid fa-plus"></i> Add Auto Reply</button>
                                  <div className="modal" id="myModalAutoReply">
                                    <div className="modal-dialog modal-lg">
                                      <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                          <h4 className="modal-title">
                                            Add Auto Reply
                                          </h4>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                          />
                                        </div>
                                        {/* Modal body */}
                                        <div className="modal-body">
                                          <div className="container-fluid">
                                            <div className="row">
                                              <div className="col-12">
                                                <form >

                                                  <div className="row mb-4">
                                                    <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                      Message Type *                                                  </label>
                                                    <div className="col-sm-8">
                                                      <select className="form-select" onChange={handleOptionChange}>
                                                        <option value="text">Text</option>
                                                        <option value="textWithMedia">Text With Media</option>
                                                        <option value="quickReplyButton">Quick Reply Button</option>
                                                        <option value="quickReplyButtonMedia">Quick Reply Button with Media</option>
                                                        <option value="callActionButton">Call To Action Button</option>
                                                        <option value="callActionButtonMedia">Call To Action Button With Media</option>
                                                        <option value="listMenu">List/Menu</option>
                                                        <option value="pollMessage">Poll Message</option>
                                                        <option value="pollMessageMedia">Poll Message With Media</option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                      Instance *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <select className="form-select">
                                                        <option>6U1kz(Deepak)</option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                      Keyword *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <input type="text" className="form-control" placeholder="Keyword *" />
                                                      {/* <textarea className="form-control" rows="5" id="" name="text"></textarea> */}
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                      Message *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <textarea className="form-control" rows="5" id="" name="text"></textarea>
                                                      <p style={{ color: "red" }}>You Can Add Name In Response By Add Variable : %name%</p>
                                                    </div>
                                                  </div>

                                                  <div className="row">
                                                    <div className="col-sm-4 ">
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                              <div className="col-2"></div>
                                            </div>
                                          </div>
                                        </div>


                                        {selectedOption === 'textWithMedia' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Media
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >
                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className='col-8 text-start'>
                                                          <p style={{ color: "red" }}>*support jpg,png,gif,pdf,mp3,mp4. Max 1 Mb</p>
                                                          <input
                                                            type="file"
                                                            id="fileInput"
                                                          // onChange={handleFileChange}
                                                          // accept=".csv, .xlsx"
                                                          // style={{ display: 'none' }}
                                                          />
                                                          {/* <button type="submit">Upload</button> */}
                                                        </div>

                                                        {/* <div className="col-sm-8">
                                                      <select className="form-select">
                                                        <option>Contact List</option>
                                                      </select>
                                                    </div> */}
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Caption (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Caption If Any *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'quickReplyButton' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Quick Reply Button
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 1 *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 2 (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 3 (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Footer *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Footer Text * " />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'quickReplyButtonMedia' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Quick Reply Button
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 1 *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 2 (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button 3 (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Footer *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Footer Text * " />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Media
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >
                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className='col-8 text-start'>
                                                          <p style={{ color: "red" }}>*support jpg,png,gif,pdf,mp3,mp4. Max 1 Mb</p>
                                                          <input
                                                            type="file"
                                                            id="fileInput"
                                                          // onChange={handleFileChange}
                                                          // accept=".csv, .xlsx"
                                                          // style={{ display: 'none' }}
                                                          />
                                                          {/* <button type="submit">Upload</button> */}
                                                        </div>

                                                        {/* <div className="col-sm-8">
                                                      <select className="form-select">
                                                        <option>Contact List</option>
                                                      </select>
                                                    </div> */}
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Caption (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Caption If Any *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'callActionButton' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Call To Action Button
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Call Button *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Call Button Text *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Calling Number *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder=" Calling Number *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Web URL Button *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder=" Web URL Button Text* " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Web URL *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="https:// " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Footer *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Footer *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'callActionButtonMedia' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Call To Action Button
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Call Button *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Call Button Text *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Calling Number *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder=" Calling Number *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Web URL Button *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder=" Web URL Button Text* " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Web URL *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="https:// " />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Footer *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Footer *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Media
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >
                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className='col-8 text-start'>
                                                          <p style={{ color: "red" }}>*support jpg,png,gif,pdf,mp3,mp4. Max 1 Mb</p>
                                                          <input
                                                            type="file"
                                                            id="fileInput"
                                                          // onChange={handleFileChange}
                                                          // accept=".csv, .xlsx"
                                                          // style={{ display: 'none' }}
                                                          />
                                                          {/* <button type="submit">Upload</button> */}
                                                        </div>

                                                        {/* <div className="col-sm-8">
                                                      <select className="form-select">
                                                        <option>Contact List</option>
                                                      </select>
                                                    </div> */}
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Caption (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Caption If Any *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'listMenu' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                List/Menu Message
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Middle Text                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Middle Text" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Footer Text *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Footer Text *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Button Text *                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Button Text * " />
                                                        </div>
                                                      </div>



                                                      <div className="row mb-4">
                                                        <div className="col-sm-12 text-end">
                                                          {/* <button type="button" class="btn btn-primary">Add Menu</button> */}
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Menus
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Menu 1 Title *                                                       </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Title" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Menu 1 Description (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Description" />
                                                        </div>
                                                      </div>

                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'pollMessage' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Poll Message
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Poll Question *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Question *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Multi Select *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          {/* <input type="text" className="form-control" placeholder="Button Text " /> */}
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className="col-sm-8 text-end">
                                                          {/* <button type="button" class="btn btn-primary">Add Menu</button> */}
                                                        </div>
                                                      </div>

                                                      <div className="modal-header">
                                                        <h5 className="modal-title">
                                                          Poll Options
                                                        </h5>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Option 1 *
                                                        </label>
                                                        <div className="col-sm-6">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Option * " />
                                                        </div>
                                                        <div className='col-sm-2'>
                                                          <button type="button" class="btn btn-danger">Remove</button>
                                                        </div>
                                                      </div>


                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Option 2 *
                                                        </label>
                                                        <div className="col-sm-6">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Option * " />
                                                        </div>
                                                        <div className='col-sm-2'>
                                                          <button type="button" class="btn btn-danger">Remove</button>
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}

                                        {selectedOption === 'pollMessageMedia' && (
                                          <>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Poll Message
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Poll Question *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Question *" />
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Multi Select *
                                                        </label>
                                                        <div className="col-sm-8">
                                                          {/* <input type="text" className="form-control" placeholder="Button Text " /> */}
                                                        </div>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className="col-sm-8 text-end">
                                                          {/* <button type="button" class="btn btn-primary">Add Menu</button> */}
                                                        </div>
                                                      </div>

                                                      <div className="modal-header">
                                                        <h5 className="modal-title">
                                                          Poll Options
                                                        </h5>
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Option 1 *
                                                        </label>
                                                        <div className="col-sm-6">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Option * " />
                                                        </div>
                                                        <div className='col-sm-2'>
                                                          <button type="button" class="btn btn-danger">Remove</button>
                                                        </div>
                                                      </div>


                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Option 2 *
                                                        </label>
                                                        <div className="col-sm-6">
                                                          <input type="text" className="form-control" placeholder="Enter Poll Option * " />
                                                        </div>
                                                        <div className='col-sm-2'>
                                                          <button type="button" class="btn btn-danger">Remove</button>
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="modal-header">
                                              <h4 className="modal-title">
                                                Media
                                              </h4>
                                            </div>
                                            <div className="modal-body">
                                              <div className="container-fluid">
                                                <div className="row">
                                                  <div className="col-12">
                                                    <form >
                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                        </label>
                                                        <div className='col-8 text-start'>
                                                          <p style={{ color: "red" }}>*support jpg,png,gif,pdf,mp3,mp4. Max 1 Mb</p>
                                                          <input
                                                            type="file"
                                                            id="fileInput"
                                                          // onChange={handleFileChange}
                                                          // accept=".csv, .xlsx"
                                                          // style={{ display: 'none' }}
                                                          />
                                                          {/* <button type="submit">Upload</button> */}
                                                        </div>

                                                        {/* <div className="col-sm-8">
                                                      <select className="form-select">
                                                        <option>Contact List</option>
                                                      </select>
                                                    </div> */}
                                                      </div>

                                                      <div className="row mb-4">
                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                          Caption (Optional)
                                                        </label>
                                                        <div className="col-sm-8">
                                                          <input type="text" className="form-control" placeholder="Caption If Any *" />
                                                        </div>
                                                      </div>

                                                      <div className="row">
                                                        <div className="col-sm-4 ">
                                                        </div>

                                                      </div>
                                                    </form>
                                                  </div>
                                                  <div className="col-2"></div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        {/* Modal footer */}
                                        <div className="modal-footer">
                                          <div className="col-sm-8 text-end">
                                            <button type="button" class="btn btn-basic" data-bs-dismiss="modal">Discard</button>
                                            <span>  </span>
                                            <button type="button" class="btn btn-primary">Add</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </form>
                          <hr />
                          <div className="main">
                            {/* <DataTableExtensions {...tableData}> */}
                            <DataTable
                              columns={autoreplycolumns}
                              data={autoreplydata}
                              searchable
                              noHeader
                              defaultSortField="id"
                              // sortIcon={<SortIcon />}
                              defaultSortAsc={true}
                              pagination
                              highlightOnHover
                              dense
                              {...paginationConfig()}

                            />
                            {editId !== null && (
                              <EditAutoReply
                                editValues={editValues}
                                onEditChange={onEditChange}
                                onSave={onSave}
                                show={showEditModal}
                                setShow={setShowEditModal}
                                onCancel={onCancel}
                                editId={editId}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              {/* End Bordered Tabs Justified */}
            </div>
          </div>

        </section>
      </main>
      <footer id="footer" class="footer">
        <div class="copyright">
          &copy; Copyright 2023{" "}
          <strong>
            <span>Live PBX</span>
          </strong>
          . All Rights Reserved
        </div>
      </footer>
    </>
  )
}

export default AutoReply
