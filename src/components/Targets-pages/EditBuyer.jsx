import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const EditBuyer = ({
  editValues,
  onEditChange,
  onCancel,
  onSave,
  show,
  setShow,
}) => {
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      {/* <Button variant="primary">Launch demo modal</Button> */}

      <Modal 
      show={show} onHide={handleClose} className={"modal-xl"}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Buyer</Modal.Title>
        </Modal.Header>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-9">
              <form method="post">
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label  d-flex justify-content-end  "
                    id="title1"
                    htmlFor="Field1"
                  >
                    Buyer Name :
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      // className={`form-control ${isBuyerNameValid ? '' : 'is-invalid'}`}
                      className="form-control"
                      id=""
                      placeholder=""
                      required=""
                      value={editValues.buyername}
                      onChange={(e) =>
                        onEditChange("buyername", e.target.value)
                      }
                      name="buyername"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end "
                    id="title3"
                    htmlFor="Field3"
                  >
                    Allow Buyer To Pause Targets :
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={editValues.pausetarget}
                        onChange={(e) =>
                          onEditChange("pausetarget", e.target.checked)
                        }
                        name="pausetarget"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Allow Buyer To Set Target Concurrency :
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={editValues.targetconcurrency}
                        onChange={(e) =>
                          onEditChange("targetconcurrency", e.target.checked)
                        }
                        name="targetconcurrency"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Allow Buyer To Dispute Call Conversions :
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={editValues.callconversions}
                        onChange={(e) =>
                          onEditChange("callconversions", e.target.checked)
                        }
                        name="callconversions"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Limit Revenue :
                  </label>
                  <div className="col-sm-6">
                    <div className="form-check form-switch ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={editValues.limitrevenue}
                        onChange={(e) =>
                          onEditChange("limitrevenue", e.target.checked)
                        }
                        name="limitrevenue"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      ></label>
                    </div>
                  </div>
                </div>
                {/* <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Ristrict Duplicates :
                  </label>
                  <div className="col-sm-6">
                    <select
                      class="form-select"
                      id="sel1"
                      name="sellist1"
                      value={editValues.ristrictduplicates}
                      onChange={(e) =>
                        onEditChange("ristrictduplicates", e.target.value)
                      }
                    >
                      <option>Not Ristrict</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Ristrict After :
                  </label>
                  <div className="col-sm-6">
                    <select
                      class="form-select"
                      id="sel1"
                      name="sellist1"
                      value={editValues.ristrictafter}
                      onChange={(e) =>
                        onEditChange("ristrictafter", e.target.value)
                      }
                    >
                      <option>Converted</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    className="desc col-sm-6 col-form-label d-flex justify-content-end"
                    id="title3"
                    htmlFor="Field3"
                  >
                    Type :
                  </label>
                  <div className="d-flex justify-content-start  col-sm-6">
                    <div className="btn-group">
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="radio7"
                        autoComplete="off"
                        value={editValues.type}
                        onChange={(e) => onEditChange("type", e.target.value)}
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="radio7"
                      >
                        Always
                      </label>
                      <input
                        type="radio"
                        className="btn-check"
                        name="options"
                        id="radio8"
                        autoComplete="off"
                        defaultChecked=""
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor="radio8"
                      >
                        Time Limit
                      </label>
                    </div>
                  </div>
                </div> */}
                <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
              </form>
            </div>
          </div>
        </div>
       
      </Modal>
    </>
  );
};

export default EditBuyer;
