import React from "react";

export const campaigncolumns = [
    {
        name: "CAMPAIGN NAME",
        selector: "campignname",
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
        name: "INCOMING",
        selector: "imcoming",
        sortable: true,
        compact: true,
        
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "ANSWER",
        selector: "answer",
        sortable: true,
            },
    {
        name: "MISSCALL",
        selector: "misscall",
        sortable: true,
            },
   

    
    {
        name: "DUPLICATE",
        selector: "duplicate",
        
    },
   
   
];
export const campaigndata = [
    {
        campaignname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
       
    },
    {
        campaignname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
    {
        campaignname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
];

// export const publishercolumns = [
//     {
//         name: "PUBLISHER NAME",
//         selector: "publishername",
//         sortable: true,
//                 // cell: (d) => (
//         //     <p class="align-text-bottom text-nowrap">
//         //         {d.id}
//         //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
//         //     </p>
//         // )
//         // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
//     },
//     {
//         name: "INCOMING",
//         selector: "imcoming",
//         sortable: true,
//         compact: true,
        
//         // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


//     },
//     {
//         name: "ANSWER",
//         selector: "answer",
//         sortable: true,
//             },
//     {
//         name: "MISSCALL",
//         selector: "misscall",
//         sortable: true,
//             },
//     {
//         name: "BLOCK",
//         selector: "block",
//         sortable: true,
        
//         // cell: (d) => (
//         //     <p class="align-text-bottom text-nowrap">
//         //         {d.recording}
//         //         <svg height={24}>
//         //             <circle cx="12" cy="12" r="5" fill="green" />
//         //         </svg>
//         //     </p>
//         // )
//     },

    
//     {
//         name: "DUPLICATE",
//         selector: "duplicate",
        
//     },
//     {
//         name: "TCL",
//         selector: "tcl",
        
        
//     },
//     {
//         name: "ACL",
//         selector: "ACL",
        

//     },
   
// ];
export const publisherdata = [
    {
        publishername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
       
    },
    {
        publishername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
    {
        publishername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
];

export const buyercolumns = [
    {
        name: "PHONE NUMBER",
        selector: "did_number",
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
        name: "INCOMING",
        selector: "incoming",
        sortable: true,
        compact: true,
        
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "ANSWER",
        selector: "answer",
        sortable: true,
            },
    {
        name: "MISSCALL",
        selector: "misscall",
        sortable: true,
            },
    {
        name: "CANCELED CALL",
        selector: "cancelcalls",
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
        name: "DUPLICATE",
        selector: "duplicate",
        
    },
    // {
    //     name: "TCL",
    //     selector: "tcl",
        
        
    // },
    // {
    //     name: "ACL",
    //     selector: "ACL",
        

    // },
   
];
export const buyerdata = [
    {
        buyername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
       
    },
    {
        buyername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
    {
        buyername: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
];

export const targetcolumns = [
    {
        name: "TARGET NAME",
        // selector: "targetname",
        selector: row => row.targetname,
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
        name: "INCOMING",
        // selector: "imcoming",
        selector: row => row.incoming,
        sortable: true,
        compact: true,
        
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "ANSWER",
        // selector: "answer",
        selector: row => row.answer,

        sortable: true,
            },
    {
        name: "MISSCALL",
        // selector: "misscall",
        selector: row => row.misscall,
        sortable: true,
            },

            {
                name: "CANCELCALL",
                // selector: "misscall",
                selector: row => row.cancelcalls,
                sortable: true,
                    },
   

    
    {
        name: "DUPLICATE",
        // selector: "duplicate",
        selector: row => row.duplicate,

        
    },
   
   
];
export const targetdata = [
    {
        targetname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
       
    },
    {
        targetname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
    {
        targetname: '',
        incoming: "",
        answer: "",
        misscall: "",
        block: "",
        duplicate: "",
        tcl: "",
        acl: '',
    },
];







export const callcolumns = [
    {
        name: "CALL DATE",
        selector: "calldate",
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
        name: "CALL TIME",
        selector: "calltime",
        sortable: true,
        compact: true,
        
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "PUBLISHER",
        selector: "publisher",
        sortable: true,
            },
    {
        name: "TARGET NAME",
        selector: "targetname",
        sortable: true,
            },
    {
        name: "TARGET NUMBER",
        selector: "targetnumber",
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
        name: "BUYER",
        selector: "buyer",
        
    },
    {
        name: "INBOUND CALL ID",
        selector: "inboundcallid",
        
        
    },
    {
        name: "CALLER ID",
        selector: "callerid",
        

    },
    {
        name: "NUMBER",
        selector: "NUMBER",
        
    },
    {
        name: "TIME DURATION",
        selector: "timeduration",
        // differance between start time and end time
    },
    {
        name: "RCORDING",
        center: true,
        sortable: false,
        selector: "null",
        cell: () => [
          <button type="submit" class="btn btn-sm btn-outline-warning">
            <i class="fa-solid fa-grip-lines fa-rotate-90"></i></button>,
          <button type="submit" class="btn btn-sm btn-outline-warning" >
          <i class="fa-regular fa-copy "></i>
          </button>
          
        ]
      },
    {
        name: "ACTION",
        center: true,
        sortable: false,
        selector: "null",
        cell: () => [
          <button type="submit" class="btn btn-sm btn-outline-warning">
              <i class="fa-solid fa-xmark"></i>
            </button>,
          
        ]
        // ACTION FOR DICONNECT LIVE CALL AT A TIME
      }
   
];
export const calldata = [
    {
        calldate: '',
        calltime: "",
        publisher: "",
        target: "",
        targetnumber: "",
        buyer: "",
        inboundcallid: "",
        callerid: '',
        number: '',
        timeduration: '',

       
    },
    {
        calldate: '',
        calltime: "",
        publisher: "",
        target: "",
        targetnumber: "",
        buyer: "",
        inboundcallid: "",
        callerid: '',
        number: '',
        timeduration: '',
    },
    {
        calldate: '',
        calltime: "",
        publisher: "",
        target: "",
        targetnumber: "",
        buyer: "",
        inboundcallid: "",
        callerid: '',
        number: '',
        timeduration: '',
    },
];


