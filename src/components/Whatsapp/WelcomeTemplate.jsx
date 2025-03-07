import React, { useState } from 'react'
import DataTable from "react-data-table-component";
import EditWelcomeTemplate from './EditWelcomeTemplate';
import { paginationConfig } from '../global/paginationUtils';

function WelcomeTemplate() {

  const [selectedOption, setSelectedOption] = useState('text');

  const [editValues, setEditValues] = useState({
    type: "",
    instance: "",
    name: "",
    message: "",
  });

  const [editId, setEditId] = useState(null);

  const onCancel = () => {
    setEditId(null);
    setEditValues({
      type: "",
      instance: "",
      name: "",
      message: "",
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
        name: "",
        message: "",

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
        name: row.name,
        message: row.message,

      });
    } else {
      setEditId(null);
      setEditValues({
        type: "",
        instance: "",
        name: "",
        message: "",

      });
    }
  };

   const welcomecolumns = [
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
      name: "NAME",
      selector: "name",
      sortable: true,
    },
    {
      name: "TYPE",
      selector: "type",
      sortable: true,
    },
    {
      name: "MESSAGE",
      selector: "message",
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
          onClick={() => handleToggleEditModal(row.editwelcometemplate_id, row)}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>, <button type="submit" class="btn btn-sm btn-outline-warning">
          <i class="fa-solid fa-trash"></i>
        </button>,
      ],
    },
  
  ];
  const welcomedata = [
    {
      srno: "1",
      instance: "6U1Pkztk3W(Deepak Singh)",
      name: "tushar",
      type: "text",
      message: "How are you",
      preview: "No",
  
    },
    {
      srno: "2",
      instance: "6U1Pkztk3W(Deepak Singh)",
      name: "deepak",
      type: "text",
      message: "How are you",
      preview: "No",
  
    },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Welcome Template</li>
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
                                  <h3><strong>Add Welcome Template</strong></h3>
                                </div>
                                <div className="mb-3 col-md-8 text-end">
                                  <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#myModalWelcome"><i class="fa-solid fa-plus"></i> Add Welcome Template</button>
                                  <div className="modal" id="myModalWelcome">
                                    <div className="modal-dialog modal-lg">
                                      <div className="modal-content">
                                        {/* Modal Header */}
                                        <div className="modal-header">
                                          <h4 className="modal-title">
                                            Add Welcome Template
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
                                                      <select className="form-select">
                                                        <option>6U1kz(Deepak)</option>
                                                      </select>
                                                    </div>
                                                  </div>

                                                  <div className="row mb-4">
                                                    <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                      Name *
                                                    </label>
                                                    <div className="col-sm-8">
                                                      <input type="text" className="form-control" placeholder="Name *" />
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
                              columns={welcomecolumns}
                              data={welcomedata}
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
                              <EditWelcomeTemplate
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

export default WelcomeTemplate