import React, { useState } from 'react'

const AddNumberCampaign = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleToggleChange = () => {
        setIsChecked(!isChecked);
        // You can perform additional actions here based on the state change
    };

    const [checkToggle, setCheckToggle] = useState(false);

    const checkToggleChange = () => {
        setCheckToggle(!checkToggle);
    }

    const [showBasicTable, setShowBasicTable] = useState(true);

    const handleCheckChange = (event) => {
        setShowBasicTable(event.target.id === "radio10");
    };

    const [showFixed, setShowFixed] = useState(false);

    const handleCheckFixed = (event) => {
        setShowFixed(event.target.id === "radio2");
        // You can perform additional actions here based on the state change
    };

    const [showTimeLimit, setTimeLimit] = useState(false);

    const handleCheckLimit = (event) => {
        setTimeLimit(event.target.id === "radio6");
        // You can perform additional actions here based on the state change
    };

    const [isCheckMonth, setIsCheckMonth] = useState(false);

    const handleToggleMonthly = () => {
        setIsCheckMonth(!isCheckMonth);
        // You can perform additional actions here based on the state change
    };

    const [isCheckDay, setIsCheckDay] = useState(false);

    const handleToggleDaily = () => {
        setIsCheckDay(!isCheckDay);
        // You can perform additional actions here based on the state change
    };

    const [isCheckHour, setIsCheckHour] = useState(false);

    const handleToggleHour = () => {
        setIsCheckHour(!isCheckHour);
        // You can perform additional actions here based on the state change
    };

    const [isCheckGlobal, setIsCheckGlobal] = useState(false);

    const handleToggleGlobal = () => {
        setIsCheckGlobal(!isCheckGlobal);
        // You can perform additional actions here based on the state change
    };

    const [isCheckRevenue, setIsCheckRevenue] = useState(false);

    const handleToggleRevenue = () => {
        setIsCheckRevenue(!isCheckRevenue);
        // You can perform additional actions here based on the state change
    };

    const [isCheckMonthRevenue, setIsCheckMonthRevenue] = useState(false);

    const handleToggleMonthRevenue = () => {
        setIsCheckMonthRevenue(!isCheckMonthRevenue);
        // You can perform additional actions here based on the state change
    };

    const [isCheckDayRevenue, setIsCheckDayRevenue] = useState(false);

    const handleToggleDayRevenue = () => {
        setIsCheckDayRevenue(!isCheckDayRevenue);
        // You can perform additional actions here based on the state change
    };

    const [isCheckHourRevenue, setIsCheckHourRevenue] = useState(false);

    const handleToggleHourRevenue = () => {
        setIsCheckHourRevenue(!isCheckHourRevenue);
        // You can perform additional actions here based on the state change
    };


    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">

                </div>
                <section>
                    <div className="card">
                        <div className="card-body">
                            <h1></h1>
                            {/* Bordered Tabs Justified */}
                            <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="bordered-justified-campaign"
                                    role="tabpanel"
                                    aria-labelledby="campaign-tab"
                                >
                                    <div className="card" style={{ boxShadow: "none" }}>
                                        <div className="card-body" style={{ padding: 0, overflowX: "auto" }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" class="h5">Assign Number to Campaign</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* Repeat the above code for the other tabs */}
                            </div>
                            <div className="card" style={{ boxShadow: "none" }}>
                                <div className="card-body" style={{ padding: 0 }}>
                                    <div className="container-fluid d-flex justify-content-center">
                                        <div className="w-100">
                                            <div >
                                                <div className="m-4">
                                                    <form method="post" >
                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                Phone Number :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <select class="form-select w-100" id="sel1" name="buyer"
                                                                >
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                Publisher :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <select class="form-select w-100" id="sel1" name="buyer"
                                                                >
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                Payout Type :
                                                            </label>
                                                            <div className="d-flex justify-content-start col-sm-6">
                                                                <div className="btn-group">
                                                                    <input
                                                                        type="radio"
                                                                        className="btn-check"
                                                                        id="radio1"
                                                                        autoComplete="off"
                                                                        name="payout-type"
                                                                        onChange={handleCheckFixed}
                                                                        checked={!showFixed}
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor="radio1">
                                                                        None
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        className="btn-check"
                                                                        name="payout-type"
                                                                        id="radio2"
                                                                        autoComplete="off"
                                                                        defaultChecked=""
                                                                        onChange={handleCheckFixed}
                                                                        checked={showFixed}
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor="radio2">
                                                                        Fixed Payout
                                                                    </label>
                                                                </div>

                                                            </div>
                                                            <div className="col-sm-12 mt-4">
                                                                {showFixed ? (
                                                                    <>
                                                                        <div className="row mb-3">
                                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                                Payout Trigger :
                                                                            </label>
                                                                            <div className="col-sm-6">
                                                                                <select class="form-select w-100" id="sel1" name="buyer"
                                                                                >
                                                                                    <option></option>
                                                                                    <option></option>
                                                                                    <option></option>
                                                                                    <option></option>
                                                                                </select>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row mb-3">
                                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                                Payout Amount :
                                                                            </label>
                                                                            <div className="col-sm-6">
                                                                                <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                            </div>
                                                                        </div>
                                                                    </>

                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                Max Concurrency :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title3" htmlFor="Field3">
                                                                Time Zone :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <select class="form-select w-100" id="sel1" name="buyer"
                                                                >
                                                                    <option>Asia/Kolkata</option>
                                                                    <option></option>
                                                                    <option></option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                Payout Hours :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox"
                                                                        name="operation"
                                                                        onChange={handleToggleChange}
                                                                        checked={isChecked}
                                                                        role="switch" id="flexSwitchCheckDefault" />
                                                                </div>
                                                            </div>
                                                            {isChecked && (
                                                                <div className="col-sm-12 mt-4">
                                                                    <div className="btn-group">
                                                                        <input
                                                                            type="radio"
                                                                            className="btn-check "
                                                                            name="options"
                                                                            id="radio9"
                                                                            checked={!showBasicTable}
                                                                            onChange={handleCheckChange}
                                                                            autoComplete="off"
                                                                        />
                                                                        <label className="btn btn-outline-primary" htmlFor="radio9">
                                                                            BASIC
                                                                        </label>
                                                                        <input
                                                                            type="radio"
                                                                            className="btn-check"
                                                                            name="options"
                                                                            id="radio10"
                                                                            checked={showBasicTable}
                                                                            onChange={handleCheckChange}
                                                                            autoComplete="off"
                                                                        />
                                                                        <label className="btn btn-outline-primary" htmlFor="radio10">
                                                                            ADVANCED
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-sm-12 mt-4">
                                                                        {showBasicTable ? (
                                                                            /* Render the basic table */
                                                                            <div className="col-sm-12 mt-4 d-flex justify-content-between">
                                                                                <div className="col-sm-12">
                                                                                    <table class="table  w-100 text-left ">
                                                                                        <tr className="border-bottom">
                                                                                            <td className="w-25">Days</td>
                                                                                            <td className="w-25">Open</td>
                                                                                            <td className="w-50">Time Slot</td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Sunday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Monday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Tuesday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Wednesday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Thursday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Friday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Saturday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            /* Render the advanced table */
                                                                            <div className="col-sm-12 mt-4 d-flex justify-content-center">
                                                                                <div className="col-sm-12  mt-4 d-flex justify-content-center ">
                                                                                    <table class="table  w-100 ">
                                                                                        <tr className="border-bottom">
                                                                                            <td className="w-25">Days</td>
                                                                                            <td className="w-25">Open</td>
                                                                                            <td className="w-50">Time Slot</td>
                                                                                        </tr>
                                                                                        <tr className="border-bottom">
                                                                                            <td scope="row">Monday-Sunday
                                                                                            </td>
                                                                                            <td>
                                                                                                <div className="d-flex justify-content-around">
                                                                                                    <div className="form-check form-switch ml-2">
                                                                                                        <input className="form-check-input" type="checkbox"
                                                                                                            name="recording"
                                                                                                            role="switch"
                                                                                                            id="flexSwitchCheckDefault" />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="" >
                                                                                                <div className="d-flex">
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" />
                                                                                                    <input type="time" className="form-control" placeholder="Enter Email" /></div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label className="desc col-sm-4 col-form-label d-flex d-flex justify-content-end d-flex d-flex justify-content-end" id="title4" htmlFor="Field4">
                                                                Duplicate Payout :
                                                            </label>
                                                            <div className="d-flex justify-content-start col-sm-6">
                                                                <div className="btn-group">
                                                                    <input
                                                                        type="radio"
                                                                        className="btn-check"
                                                                        id="radio4"
                                                                        autoComplete="off"
                                                                        name="duplicate-payout"
                                                                        onChange={handleCheckLimit}
                                                                        checked={!showTimeLimit}
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor="radio4">
                                                                        Disable
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        className="btn-check"
                                                                        name="duplicate-payout"
                                                                        id="radio5"
                                                                        autoComplete="off"
                                                                        defaultChecked=""
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor="radio5">
                                                                        Enable
                                                                    </label>
                                                                    <input
                                                                        type="radio"
                                                                        className="btn-check"
                                                                        name="duplicate-payout"
                                                                        id="radio6"
                                                                        autoComplete="off"
                                                                        onChange={handleCheckLimit}
                                                                        checked={showTimeLimit}
                                                                    />
                                                                    <label className="btn btn-outline-primary" htmlFor="radio6">
                                                                        Time Limit
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 mt-4">
                                                                {showTimeLimit ? (
                                                                    <>
                                                                        <div className="col-sm-1 mx-auto d-block">
                                                                            <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" placeholder='days'/>
                                                                        </div>

                                                                    </>

                                                                ) : (
                                                                    <></>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                Limit Payout :
                                                            </label>
                                                            <div className="col-sm-6">
                                                                <div className="form-check form-switch">
                                                                    <input className="form-check-input" type="checkbox"
                                                                        name="operation"
                                                                        onChange={checkToggleChange}
                                                                        checked={checkToggle}
                                                                        role="switch" id="flexSwitchCheckDefault" />
                                                                </div>
                                                            </div>
                                                            {checkToggle && (
                                                                <>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Global Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleGlobal}
                                                                                    check={isCheckGlobal}
                                                                                />
                                                                                {isCheckGlobal && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Monthly Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleMonthly}
                                                                                    check={isCheckMonth}
                                                                                />
                                                                                {isCheckMonth && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Daily Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="daily"
                                                                                    onChange={handleToggleDaily}
                                                                                    check={isCheckDay}
                                                                                />
                                                                                {isCheckDay && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Hourly Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox"
                                                                                    name="hourly"
                                                                                    onChange={handleToggleHour}
                                                                                    chech={isCheckHour}
                                                                                    role="switch" id="flexSwitchCheckDefault" />
                                                                                {isCheckHour && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Global Revenue Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleRevenue}
                                                                                    check={isCheckRevenue}
                                                                                />
                                                                                {isCheckRevenue && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Monthly Revenue Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleMonthRevenue}
                                                                                    check={isCheckMonthRevenue}
                                                                                />
                                                                                {isCheckMonthRevenue && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Daily Revenue Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleDayRevenue}
                                                                                    check={isCheckDayRevenue}
                                                                                />
                                                                                {isCheckDayRevenue && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-3">
                                                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label d-flex d-flex justify-content-end">
                                                                            Hourly Revenue Cap :
                                                                        </label>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input" type="checkbox" role="switch"
                                                                                    name="monthly"
                                                                                    onChange={handleToggleHourRevenue}
                                                                                    check={isCheckHourRevenue}
                                                                                />
                                                                                {isCheckHourRevenue && (
                                                                                    <>
                                                                                        <input type="number" id="typeNumber" class="form-control" htmlFor="flexSwitchCheckDefault" />
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-6 ">
                                                            </div>
                                                            <div className="col-sm-6 d-flex justify-content-start ">
                                                                <button type="submit" className="btn btn-primary"
                                                                >
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
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

export default AddNumberCampaign