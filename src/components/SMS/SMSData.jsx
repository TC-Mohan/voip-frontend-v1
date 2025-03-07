import React from "react";
import { Link } from 'react-router-dom';

// DLR Data
export const DLRcolumns = [
    {
        name: "NUMBER",
        selector: "number",
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
        name: "SENDER ID",
        selector: "senderid",
        sortable: true,
        compact: true,
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "DLR STATUS",
        selector: "dlrstatus",
        sortable: true,
    },
    {
        name: "SMS TYPE",
        selector: "smstype",
        sortable: true,
    },
    {
        name: "ENCODING",
        selector: "encoding",
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
        name: "ERROR CODE",
        selector: "errorcode",

    },
    {
        name: "ERROR DESCRIPTION",
        selector: "errordescription",
        width: "15%"

    },
    {
        name: "CLIENT RATE",
        selector: "clientrate",

    },
    {
        name: "COUNTRY",
        selector: "country",

    },

];
export const DLRdata = [
    {
        number: '',
        senderid: "",
        dlrstatus: "",
        smstype: "",
        encoding: "",
        errorcode: "",
        errordescription: "",
        clientrate: '',
        country: "",
    }
];

//Refund Data
export const refundcolumns = [
    {
        name: "#",
        selector: "hash",
        sortable: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
        //     </p>
        // )
        // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
        name: "TYPE",
        selector: "type",
        sortable: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <i class="fa-solid fa-phone"></i>
        //     </p>
        // )
    },
    {
        name: "OLD BALANCE",
        selector: "oldbalance",
        sortable: true,
        width: "12%"
    },
    {
        name: "CREDITED",
        selector: "credited",
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
        name: "TOTAL",
        selector: "total",
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <i class="fa-solid fa-arrow-right"></i>
        //     </p>
        // )
    },
    {
        name: "CURRENCY",
        selector: "currency",
        sortable: true,
        width: "12%"

    },
    {
        name: "PAYMENT MODE",
        selector: "paymentmode",
        sortable: true,
        width: "12%"

    },
    {
        name: "TXN ID",
        selector: "txnid",
        sortable: true,
    },
    {
        name: "STATUS",
        selector: "status",
        sortable: true,
    },
    {
        name: "REMARK",
        selector: "remark",
        sortable: true,
    },
    {
        name: "CREATED",
        selector: "created",
        sortable: true,
        width: "10%"

    },
];

export const refunddata = [
    {
        hash: "",
        type: "",
        oldbalance: "",
        credited: "",
        total: "",
        currency: "",
        paymentmode: "",
        txnid: "",
        status: "",
        remark: "",
        created: "",
    },

];

//Template
export const templatecolumns = [
    {
        name: "ACTION",
        selector: "action",
        sortable: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
        //     </p>
        // )
        // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
        name: "#",
        selector: "hash",
        sortable: true,
        compact: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
        //     </p>
        // )
    },
    {
        name: "NAME",
        selector: "name",
        sortable: true,
        // width: "15%"
    }
];

export const templatedata = [
    {
        action: '',
        hash: "",
        name: "",
    },
];


//Contact
export const contactcolumns = [
    {
        name: "ACTION",
        selector: "action",
        sortable: true,
        cell: (row) => [
            <button type="submit" class="btn btn-sm btn-outline-warning">
                <i class="fa-solid fa-circle-arrow-down"></i>
            </button>,
             <button
             type="button"
             class="btn btn-sm btn-outline-warning"
            //  onClick={() => handleToggleEditModal(row.publisher_id, row)}
           >
                <i class="fa-solid fa-pencil"></i>
            </button>,
            <button type="submit" class="btn btn-sm btn-outline-warning">
                <i class="fa-solid fa-trash"></i>
            </button>,
           <button type="submit" className="btn btn-sm btn-outline-warning">
           <Link to="/contact-details">
             <i className="fa-regular fa-eye"></i>
           </Link>
         </button>
        ],
    },
    {
        name: "#",
        selector: "hash",
        sortable: true,
        compact: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
        //     </p>
        // )
    },
    {
        name: "NAME",
        selector: "name",
        sortable: true,
        // width: "15%"
    },
    {
        name: "TOTAL NUMBERS",
        selector: "totalnumbers",
        sortable: true,
        // width: "15%"
    },
    {
        name: "UPLOAD IN PROGRESS",
        selector: "uploadinprogress",
        sortable: true,
        // width: "15%"
    }
];

export const contactdata = [
    {
        action: '',
        hash: "7894",
        name: "Deepak",
        totalnumbers: "0",
        uploadinprogress: ""
    },
    {
        action: '',
        hash: "7894",
        name: "Tushar",
        totalnumbers: "0",
        uploadinprogress: ""
    },
    
];

//Contact Details
export const contactlistcolumns = [
    {
        name: <input type="checkbox" />,
        selector: "action",
        sortable: true,
        cell: (row) => <input type="checkbox" />,
    },
    {
        name: "ACTION",
        selector: "action",
        sortable: true,
        // cell: (row) => [
        //     <button type="submit" class="btn btn-sm btn-outline-warning">
        //         <i class="fa-solid fa-circle-arrow-down"></i>
        //     </button>,
        //     <button type="submit" class="btn btn-sm btn-outline-warning">
        //         <i class="fa-solid fa-pencil"></i>
        //     </button>,
        //     <button type="submit" class="btn btn-sm btn-outline-warning">
        //         <i class="fa-solid fa-trash"></i>
        //     </button>,
        //     <button type="submit" class="btn btn-sm btn-outline-warning">
        //         <i class="fa-regular fa-eye"></i>
        //     </button>
        // ],
    },
    {
        name: "#",
        selector: "hash",
        sortable: true,
        compact: true,
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
        //     </p>
        // )
    },
    {
        name: "NAME",
        selector: "name",
        sortable: true,
        // width: "15%"
    },
    {
        name: "NUMBERS",
        selector: "number",
        sortable: true,
        // width: "15%"
    },
  
];

export const contactlistdata = [
    {
        action: '',
        hash: "7894",
        name: "Deepak",
        number: "0",
    },
    {
        action: '',
        hash: "7894",
        name: "Deepak",
        number: "0",
    },
    
];