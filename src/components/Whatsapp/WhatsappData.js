import React from "react";


export const autoreplycolumns = [
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
    cell: (d) => [
      <button type="submit" class="btn btn-sm btn-outline-warning">
        <i class="fa-solid fa-pencil"></i>
      </button>,<button type="submit" class="btn btn-sm btn-outline-warning">
      <i class="fa-solid fa-trash"></i>
      </button>,
    ],
  },

];
export const autoreplydata = [
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


export const welcomecolumns = [
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
  },

];
export const welcomedata = [
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

export const templatecolumns = [
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
    name: "NAME",
    selector: "name",
    sortable: true,
    compact: true,
    width: "15%"
    // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
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
    name: "Preview",
    selector: "preview",
    sortable: true,
  },
  {
    name: "ACTION",
    selector: "action",
  },

];
export const templatedata = [
  {
    srno: "1",
    name: "tushar",
    type: "text",
    message: "How are you",
    preview: "No",

  },
  {
    srno: "2",
    name: "deepak",
    type: "text",
    message: "How are you",
    preview: "No",

  },
]

export const sendreportcolumns = [
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
    name: "NUMBER",
    selector: "number",
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
    sortable: true,
  },
  {
    name: "IS AUTO REPLY",
    selector: "isautoreply",
    sortable: true,
  },
  {
    name: "STATUS",
    selector: "status",
    sortable: true,
  },
  {
    name: "TIME",
    selector: "time",
  },

];
export const sendreportdata = [
  {
    srno: "1",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    type: "Text",
    message: "hello",
    preview: "",
    isautoreply: "No",
    status: "Failed",
    time: "08/01/2024 17:31PM",
  },
  {
    srno: "2",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    type: "Text With Media",
    message: "hello",
    preview: "",
    isautoreply: "No",
    status: "Failed",
    time: "08/01/2024 17:31PM",
  },
  {
    srno: "3",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    type: "Text With Media",
    message: "hello",
    preview: "",
    isautoreply: "No",
    status: "Success",
    time: "08/01/2024 17:31PM",
  },
]

export const receivereportcolumns = [
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
    name: "NUMBER",
    selector: "number",
    sortable: true,
  },
  {
    name: "MESSAGE",
    selector: "message",
    sortable: true,
  },
  {
    name: "TIME",
    selector: "time",
  },

];
export const receivereportdata = [
  {
    srno: "1",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    message: "hello",
    time: "08/01/2024 17:31PM",
  },
  {
    srno: "2",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    message: "hello",
    time: "08/01/2024 17:31PM",
  },
  {
    srno: "3",
    instance: "S8tJgq4hkM",
    number: "6266422598",
    message: "hello",
    time: "08/01/2024 17:31PM",
  },
]