import React from "react";
import { BASE_API } from "../../helper/Constants";
export const manageSenders = [
  {
    name: "Action",
    selector: "null",
    sortable: true,
    width: "10%",
    cell: (d) => [
      <button type="submit" class="btn btn-sm btn-outline-warning">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>,
    ],
  },
  {
    name: "#",
    selector: "idcode",
    sortable: true,
    compact: true,
    width: "8%",
    // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    width: "10%",
  },
  {
    name: "Country",
    selector: "country",
    sortable: true,
    width: "11%",
  },
  {
    name: "Sender ID",
    selector: "senderid",
    sortable: true,
    width: "8%",
  },
  {
    name: "Header ID",
    selector: "headerid",
    width: "9%",
  },
  {
    name: "Entity ID",
    selector: "entityid",
    width: "10%",
  },
  {
    name: "Entity Name",
    selector: "entityname",
    width: "10%",
  },
  {
    name: "Admin Remark",
    selector: "adminremark",
    width: "7%",
  },
  {
    name: "Created",
    selector: "created",
    width: "16%",
  },
  {
    name: "Approved",
    selector: "approved",
    width: "16%",
  },
];
export const manageSendersdata = [
  {
    idcode: "2893712",
    status: "Approved",
    country: "India",
    senderid: "HDTSMS",
    headerid: "",
    entityid: "",
    entityname: "",
    adminremark: "None",
    created: "2024-01-02 07:22:41",
    approved: "2024-01-02 07:22:41 ",
  },
  {
    idcode: "2893712",
    status: "Approved",
    country: "India",
    senderid: "HDTSMS",
    headerid: "",
    entityid: "",
    entityname: "",
    adminremark: "None",
    created: "2024-01-02 07:22:41",
    approved: "2024-01-02 07:22:41 ",
  },
];

export const manageTemplate = [
  {
    name: "Action",
    selector: "null",
    sortable: true,
    width: "8%",
    cell: (d) => [
      <button type="submit" class="btn btn-sm btn-outline-warning">
          <i class="fa-solid fa-trash"></i>
      </button>,
    ],
  },
  {
    name: "Template Id",
    selector: "templateid",
    sortable: true,
    compact: true,
    width: "8%",
    // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    width: "10%",
  },
  {
    name: "DLT Template ID",
    selector: "dlttemplateid",
    sortable: true,
    width: "11%",
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    width: "8%",
  },
  {
    name: "Test",
    selector: "text",
    width: "12  %",
    height: "auto",
  },
  {
    name: "Reason",
    selector: "reason",
    width: "10%",
  },
  {
    name: "Created",
    selector: "created",
    width: "12%",
  },
  {
    name: "Approved",
    selector: "approved",
    width: "12%",
  },
];
export const manageTemplatedata = [
  {
    templateid: "2893712",
    status: "Approved",
    dlttemplateid: "***************5250",
    name: "BSP-DEMO",
    text: "THIS IS TEST MESSAGE TO START BULK SMS SERVICE WITH {#var#} HENCE DIGITAL",
    reason: "",
    created: "2024-01-02 07:22:41",
    approved: "2024-01-02 07:22:41",
  },
  {
    templateid: "2893712",
    status: "Approved",
    dlttemplateid: "***************5250",
    name: "BSP-DEMO",
    text: "THIS IS TEST MESSAGE TO START BULK SMS SERVICE WITH {#var#} HENCE DIGITAL",
    reason: "",
    created: "2024-01-02 07:22:41",
    approved: "2024-01-02 07:22:41",
  },
];

export const pricingCoverage = [
  {
    name: "#",
    selector: "idcode",
    sortable: true,
  },
  {
    name: "Country",
    selector: "country",
    sortable: true,
  },
  {
    name: "Operator",
    selector: "operator",
    sortable: true,
  },
  {
    name: "SMS Type",
    selector: "smstype",
  },
  {
    name: "Rate",
    selector: "rate",
  },
];
export const pricingCoveragedata = [
  {
    idcode: "2893712",
    country: "France",
    operator: "For All Operators",
    smstype: "SMPP",
    rate: "0.035",
  },
  {
    idcode: "16079",
    country: "South Sudan (Republic of)",
    operator: "For All Operators",
    smstype: "Promotional",
    rate: "0.2",
  },
];

//     {
//         name: "NAME",
//         selector: "name",
//         sortable: true,
//         width: "15%",
//         // cell: (d) => (
//         //     <p class="align-text-bottom text-nowrap">
//         //         {d.id}
//         //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
//         //     </p>
//         // )
//         // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
//     },
//     {
//         name: "TYPE",
//         selector: "type",
//         sortable: true,
//         width: "20%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.id}
//                 <i class="fa-solid fa-phone"></i>
//             </p>
//         )
//     },
//     {
//         name: "DESTINATION",
//         selector: "destination",
//         sortable: true,
//         width: "25%"
//     },
//     {
//         name: "STATUS",
//         selector: "status",
//         sortable: true,
//         width: "20%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.recording}
//                 <svg height={24}>
//                     <circle cx="12" cy="12" r="5" fill="green" />
//                 </svg>
//             </p>
//         )
//     },

//     {
//         name: "ADD",
//         selector: "add",
//         width: "20%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.id}
//                 <i class="fa-solid fa-arrow-right"></i>
//             </p>
//         )
//     }
// ];

// export const targetdata = [
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
//         {
//             name: 'test',
//             type: "",
//             destination: "123456789",
//             status: "",
//             add: "",
//         },
// ];

//Routing
// export const routingcolumns = [
//     {
//         name: "PRIORITY",
//         selector: "priority",
//         sortable: true,
//         width: "20%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.id}
//                 <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
//             </p>
//         )
//         // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
//     },
//     {
//         name: "WEIGHT",
//         selector: "weight",
//         sortable: true,
//         compact: true,
//         width: "15%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.id}
//                 <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
//             </p>
//         )

//     },
//     {
//         name: "NAME",
//         selector: "name",
//         sortable: true,
//         width: "15%"
//     },
//     {
//         name: "DESTINATION",
//         selector: "destination",
//         sortable: true,
//         width: "20%"
//     },
//     {
//         name: "TYPE",
//         selector: "type",
//         sortable: true,
//         width: "15%",

//     },

//     {
//         name: "REVENUE",
//         selector: "revenue",
//         width: "15%",

//     },
//     {
//         name: "STATUS",
//         selector: "status",
//         width: "15%",
//         cell: (d) => (
//             <p class="align-text-bottom text-nowrap">
//                 {d.recording}
//                 <svg height={24}>
//                     <circle cx="12" cy="12" r="5" fill="green" />
//                 </svg>
//             </p>
//         )
//     },
//     {
//         name: "ACTION",
//         center: true,
//         sortable: false,
//         selector: "null",
//         cell: (d) => [
//             <button type="submit" class="btn btn-sm btn-outline-warning" ><i class="fa-regular fa-pen-to-square"></i></button>,
//             <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-trash-can"></i></button>
//         ]
//     }
// ];

// export const routingdata = [
//         {
//             priority: '1',
//             weight: "1",
//             name: "test",
//             destination: "123456789",
//             type: "Call Successfully",
//             revenue: "$ 0",
//             status: ""

//         },
//         {
//             priority: '1',
//             weight: "1",
//             name: "test",
//             destination: "123456789",
//             type: "Call Successfully",
//             revenue: "$ 0",
//             status: ""

//         },
// ];
//
