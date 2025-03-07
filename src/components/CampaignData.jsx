import React from "react";
// const handleClick = (title) => {
//     // console.log(`You clicked me! ${title}`);
// }
export const columns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
    width: "20%",
    cell: (d) => (
      <p class="align-text-bottom text-nowrap">
        {d.id}
        <button type="submit" class=" btn btn-sm btn-outline-warning">
          <i class="fa-regular fa-copy "></i>
        </button>
      </p>
    ),
    // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
  },
  {
    name: "STATUS",
    selector: "status",
    sortable: true,
    compact: true,
    width: "6%",
    cell: (d) => (
      <div
        style={{
          backgroundColor: "rgb(135, 208, 104)",
          color: "white",
          fontWeight: "bold",
          padding: "3px",
        }}
      >
        {d.status}
      </div>
    ),
  },
  {
    name: "NAME",
    selector: "name",
    sortable: true,
    width: "8%",
  },
  {
    name: "COUNTRY",
    selector: "country",
    sortable: true,
    width: "10%",
  },
  {
    name: "RECORDING",
    selector: "recording",
    sortable: true,
    width: "9%",
    cell: (d) => (
      <p class="align-text-bottom text-nowrap">
        {d.recording}
        <svg height={24}>
          <circle cx="12" cy="12" r="5" fill="green" />
        </svg>
      </p>
    ),
  },

  {
    name: "LIVE",
    selector: "live",
    width: "8%",
  },
  {
    name: "HOUR",
    selector: "hour",
    width: "8%",
  },
  {
    name: "DAY",
    selector: "day",
    width: "8%",
  },
  {
    name: "MONTH",
    selector: "month",
    width: "7%",
  },
  {
    name: "TOTAL",
    selector: "total",
    width: "7%",
  },
  {
    name: "ACTION",
    center: true,
    sortable: false,
    selector: "null",
    cell: (d) => [
      <button type="submit" class="btn btn-sm btn-outline-warning">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>,
      <button type="submit" class="btn btn-sm btn-outline-warning">
        <i class="fa-solid fa-grip-lines fa-rotate-90"></i>
      </button>,
      <button type="submit" class="btn btn-sm btn-outline-warning">
        <i class="fa-solid fa-xmark"></i>
      </button>,
      // <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-copy "></i></button>,
      // <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-trash-can"></i></button>
    ],
  },
];

export const data = [
  {
    id: 1,
    id: "aeERdnroTSEfYu",
    status: "Active",
    name: "nov-27",
    country: "US",
    recording: "",
    live: "0 /",
    hour: "0 /",
    day: "0 /",
    month: "93",
    total: "93",
  },
  {
    id: 2,
    id: "beERdnroTSEfYu",
    status: "Active",
    name: "nov-28",
    country: "US",
    recording: "",
    live: "0 /",
    hour: "0 /",
    day: "0 /",
    month: "93",
    total: "93",
  },
  {
    id: 3,
    id: "zeERdnroTSEfYu",
    status: "Active",
    name: "nov-29",
    country: "US",
    recording: "",
    live: "0 /",
    hour: "0 /",
    day: "0 /",
    month: "93",
    total: "93",
  },
];
