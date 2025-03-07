import React from "react";

const UpdateProfile = () => {
  return (
    <>
      <div className="tab-pane fade profile-edit pt-3" id="update-your-account">
        <form>
          <div className="row mb-3">
            <label
              htmlFor="company"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Company Name
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="company"
                type="text"
                className="form-control"
                id="company"
                defaultValue="Lueilwitz, "
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">
              Working Tipe
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="job"
                type="text"
                className="form-control"
                id="Job"
                defaultValue="Web Designer"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Country"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Country
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="country"
                type="text"
                className="form-control"
                id="Country"
                defaultValue="USA"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="Address"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Company Address
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="address"
                type="text"
                className="form-control"
                id="Address"
                defaultValue="A108 Adam Street, New York, NY 535022"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
              Company Phone
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="phone"
                type="text"
                className="form-control"
                id="Phone"
                defaultValue="(436) 486-3538 x29071"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">
              Company Email
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="email"
                type="email"
                className="form-control"
                id="Email"
                defaultValue="k.anderson@example.com"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="formFile"
              className="col-md-4 col-lg-3 col-form-label"
            >
              Default file input example
            </label>
            Company document upload
            <div className="col-md-8 col-lg-9">
              <input className="form-control" type="file" id="formFile" />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
        {/* End Profile Edit Form */}
      </div>
    </>
  );
};

export default UpdateProfile;
