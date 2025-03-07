// Call Details
import { IoMdCheckmarkCircle } from "react-icons/io"; 
import { toast } from "react-toastify";
export const Sipdatacolumn = [
  {
    name: "",
    selector: "",
    sortable: true,
    cell: (d) => (
      <p class="align-text-bottom text-nowrap">
        {d.id}
        <button type="submit" class=" btn btn-sm">
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue
            id="flexCheckDefault"
          />
        </button>
      </p>
    ),
  },
  {
    name: "Name",
    selector: "user",
    sortable: true,
  },
  {
    name: "USER",
    selector: "name",
    sortable: true,
  },
  {
    name: "Password",
    selector: "password",
  },
];
export const sipdat = [
  {
    hosting: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "dsfdsf",
  },
  {
    hosting: "+1 814-854-7548",
    name: "lio",
    user: "21342",
    password: "werew",
  },
  {
    hosting: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "xcvxvc",
  },
  {
    hosting: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "ewrwer",
  },
];

export const recentcallcolumns = [
  {
    name: " ",
    selector: "arrow",
    sortable: true,
    cell: (d) => (
      <p class="align-text-bottom text-nowrap">
        {d.id}
        <button type="submit" class=" btn btn-sm">
          <i
            class="bi bi-arrow-up-right-circle-fill mb-5"
            style={{ fontSize: "1.5rem" }}
          ></i>
        </button>
      </p>
    ),
  },
  {
    name: "CONTACT",
    selector: "contact",
    sortable: true,
    width: "10%",
    // cell: (d) => (
    //     <p class="align-text-bottom text-nowrap">
    //         {d.id}
    //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
    //     </p>
    // )
    // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
  },
  {
    name: " ",
    selector: "call",
    sortable: true,
    compact: true,
    cell: (d) => (
      <p class="align-text-bottom text-nowrap">
        {d.id}
        <button type="submit" class=" btn btn-sm">
          <i class="fa-solid fa-phone"></i> Call
        </button>
      </p>
    ),
  },
  {
    name: "PHONE LINE",
    selector: "phoneline",
    sortable: true,
  },
  {
    name: "USER",
    selector: "user",
    sortable: true,
  },
  {
    name: "DURATION",
    selector: "duration",
    sortable: true,
    // cell: (d) => (
    //     <p class="align-text-bottom text-nowrap">
    //         {d.recording}
    //         <svg height={24}>
    //             <circle cx="12" cy="12" r="5" fill="green" />
    //         </svg>
    //     </p>
    // )
  },

  {
    name: "TIME",
    selector: "time",
  },
];

export const Sipdatacolumns = [
  {
    name: "Name",
    selector: "Domain",
    sortable: true,
  },

  {
    name: "Extension Number",
    selector: "user",
    sortable: true,
  },
  {
    name: "Ring Strategy",
    selector: "password",
  },
  {
    name: "Ring Time",
    selector: "password",
    // cell: (d) => (
    //   <div className="form-check form-switch">
    //     <input
    //       className="form-check-input"
    //       type="checkbox"
    //       role="switch"
    //       id="flexSwitchCheckDefault"
    //     />
    //   </div>
    // ),
  },

  {
    name: "ACTION",
    center: true,
    sortable: false,
    cell: (row) => (
      <>
        <button
          type="button"
          className="btn btn-sm btn-outline-warning me-2"
          // onClick={() => handleShowEditPasswordModal(row.id, row.password)}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-warning"
          // onClick={() => handleDeleteExtension(row.id)} // Call handleDeleteExtension function on delete icon click
        >
          <i className="fa-regular fa-trash-alt"></i>
        </button>
      </>
    ),
  },
];
export const sipdata = [
  {
    Domain: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "8742131",
  },
  {
    Domain: "+1 814-854-7548",
    name: "lio",
    user: "21342",
    password: "21342",
  },
  {
    Domain: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "21342",
  },
  {
    Domain: "+1 814-854-7548",
    name: "liao",
    user: "21342",
    password: "21342",
  },
];

export const recentcalldata = [
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
// Call history

export const callhistorydata = [
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

export const Phonedatacolumns = [
  {
    name: "Phone line name",
    selector: "number",
    sortable: true,
    compact: true,
  },
  {
    name: "Number",
    selector: "number",
    sortable: true,
    compact: true,
    // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: (row) => (row.status ? "Active" : "Inactive"),
  },
  {
    name: "Caller ID Add",
    selector: "settings",
    sortable: true,
    cell: (d) => (
      <div className="position-relative">
        <input type="text" className="form-control" value={d.id} readOnly />
        <button className="btn btn-primary position-absolute top-0 end-0 ">
          Save
        </button>
      </div>
    ),
  },
];
export const Phonedata = [
  {
    phonelinename: "plivoau",
    number: "+1878-888-2622",
    status: "Active",
    settings: "",
  },
  {
    phonelinename: "plivoau",
    number: "+1878-888-2622",
    status: "Active",
    settings: "",
  },
];



 export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};