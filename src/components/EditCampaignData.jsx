import React from "react";

// Publisher
export const columns = [
    {
        name: "PUBLISHER",
        selector: "publisher",
        sortable: true,
        width: "9%",
        // cell: (d) => (
        //     <p class="align-text-bottom text-nowrap">
        //         {d.id}
        //         <button type="submit" class=" btn btn-sm btn-outline-warning"><i class="fa-regular fa-copy "></i></button>
        //     </p>
        // )
        // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
        name: "PHONE NUMBERS",
        selector: "phonenumber",
        sortable: true,
        compact: true,
        width: "10%",
        // cell: (d) => <div style={{ backgroundColor: "rgb(135, 208, 104)", color: 'white', fontWeight: 'bold', padding: '3px' }}>{d.status}</div>


    },
    {
        name: "PAYOUT TYPE",
        selector: "payouttype",
        sortable: true,
        width: "10%"
    },
    {
        name: "PAYOUT AMOUNT",
        selector: "payoutamount",
        sortable: true,
        width: "11%"
    },
    {
        name: "HOUR REVENUE",
        selector: "hourrevenue",
        sortable: true,
        width: "11%",
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
        name: "DAY REVENUE",
        selector: "dayrevenue",
        width: "9%",

    },
    {
        name: "MONTH REVENUE",
        selector: "monthrevenue",
        width: "10%",
        
    },
    {
        name: "TOTAL REVENUE",
        selector: "totalrevenue",
        width: "10%",

    },
    {
        name: "HOUR",
        selector: "hour",
        width: "7%",

    },
    {
        name: "DAY",
        selector: "day",
        width: "7%",

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
            // <button type="submit" class="btn btn-sm btn-outline-warning" ><i class="fa-regular fa-pen-to-square"></i></button>,
            // <button type="submit" class="btn btn-sm btn-outline-warning">
            //     <i class="fa-solid fa-grip-lines fa-rotate-90"></i></button>,
            // <button type="submit" class="btn btn-sm btn-outline-warning"><i class="fa-solid fa-xmark"></i></button>
            // <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-copy "></i></button>,
            // <button type="submit" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-trash-can"></i></button>
        ]
    }
];
export const data = [
    {
        publisher: '',
        phonenumber: "",
        payouttype: "",
        payoutamount: "",
        hourrevenue: "",
        dayrevenue: "",
        monthrevenue: "",
        totalrevenue: '',
        hour: "",
        day: "",
        month: "",
        total: ""
    },
    {
        publisher: '',
        phonenumber: "",
        payouttype: "",
        payoutamount: "",
        hourrevenue: "",
        dayrevenue: "",
        monthrevenue: "",
        totalrevenue: '',
        hour: "",
        day: "",
        month: "",
        total: ""
    },
    {
        publisher: '',
        phonenumber: "",
        payouttype: "",
        payoutamount: "",
        hourrevenue: "",
        dayrevenue: "",
        monthrevenue: "",
        totalrevenue: '',
        hour: "",
        day: "",
        month: "",
        total: ""
    },
];

//Target
export const targetcolumns = [
    {
        name: "NAME",
        selector: "name",
        sortable: true,
        width: "15%",
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
        width: "20%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.id}
                <i class="fa-solid fa-phone"></i>
            </p>
        )
    },
    {
        name: "DESTINATION",
        selector: "destination",
        sortable: true,
        width: "25%"
    },
    {
        name: "STATUS",
        selector: "status",
        sortable: true,
        width: "20%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.recording}
                <svg height={24}>
                    <circle cx="12" cy="12" r="5" fill="green" />
                </svg>
            </p>
        )
    },


    {
        name: "ADD",
        selector: "add",
        width: "20%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.id}
                <i class="fa-solid fa-arrow-right"></i>
            </p>
        )
    }
];

export const targetdata = [
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
        {
            name: 'test',
            type: "",
            destination: "123456789",
            status: "",
            add: "",
        },
];

//Routing
export const routingcolumns = [
    {
        name: "PRIORITY",
        selector: "priority",
        sortable: true,
        width: "20%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.id}
                <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
            </p>
        )
        // cell: (d) => <div className="fw-bold" style={{}}>{d.name}</div>
    },
    {
        name: "WEIGHT",
        selector: "weight",
        sortable: true,
        compact: true,
        width: "15%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.id}
                <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
            </p>
        )
        


    },
    {
        name: "NAME",
        selector: "name",
        sortable: true,
        width: "15%"
    },
    {
        name: "DESTINATION",
        selector: "destination",
        sortable: true,
        width: "20%"
    },
    {
        name: "TYPE",
        selector: "type",
        sortable: true,
        width: "15%",
        
    },


    {
        name: "REVENUE",
        selector: "revenue",
        width: "15%",

    },
    {
        name: "STATUS",
        selector: "status",
        width: "15%",
        cell: (d) => (
            <p class="align-text-bottom text-nowrap">
                {d.recording}
                <svg height={24}>
                    <circle cx="12" cy="12" r="5" fill="green" />
                </svg>
            </p>
        )
    },
    {
        name: "ACTION",
        center: true,
        sortable: false,
        selector: "null",
        cell: (d) => [
            <button type="button" class="btn btn-sm btn-outline-warning "><i class="fa-regular fa-trash-can"></i></button>
        ]
    }
];

export const routingdata = [
        {
            priority: '1',
            weight: "1",
            name: "test",
            destination: "123456789",
            type: "Call Successfully",
            revenue: "$ 0",
            status: ""
          
        },
        {
            priority: '1',
            weight: "1",
            name: "test",
            destination: "123456789",
            type: "Call Successfully",
            revenue: "$ 0",
            status: ""
          
        },
];
//

export const TypeDataList = [{
    id: "TYPE-1",
    value: "Type-1",
},
{
    id: "TYPE-2",
    value: "Type-2",
},
{
    id: "TYPE-3",
    value: "Type-3",
}
]

export const StatusTypeList = [
    {
        id: "active",
        value: "Active",
    },
    {
        id: "deactived",
        value: "De-Activated",
    },
    {
        id: "pending",
        value: "pending",
    },
];