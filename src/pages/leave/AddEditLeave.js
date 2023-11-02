import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getLeavesDetail, addLeave } from "../../services/LeaveService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../layouts/Notification.js'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

export default function AddEditLeave(props) {

    const [show, setShow] = useState(true);
    const currentLeaveId = props.leaveId;
    const [leaveSubject, setLeaveSubject] = useState("");
    const [leaveReason, setLeaveReason] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");
    const [remainingLeaves, setRemainingLeaves] = useState("");
    const [totalLeaves, setTotalLeaves] = useState("");
    const [startDateErr, setStartDateErr] = useState(false);
    const [endDateErr, setEndDateErr] = useState(false);
    const handleClose = () => setShow(false);
    const { loading, setLoading } = useLoading();
    const [dataLoading, setDataLoading] = useState(false);


    const navigate = useNavigate();

    let token = localStorage.getItem('accessToken')
    let employeeId;
    if (token) {
      const cryptoEmail = localStorage.getItem('email')
      employeeId = localStorage.getItem('employeeId')
    }
    
    useEffect(() => {
        if (!show) {
            props.onDataSave(false);
        }

    }, [show])

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                setDataLoading(true);
                if (currentLeaveId != null && currentLeaveId != 0) {
                    await getLeavesDetail(currentLeaveId).then(res => {
                        setLeaveSubject(res.leaveSubject)
                        setLeaveReason(res.leaveReason)
                        setStartDate(res.startDate)
                        setEndDate(res.endDate)
                    
                    });
                }
            }
            catch (error) {
            }
            finally {
                setTimeout(() => {
                    setDataLoading(false);
                    setLoading(false);
                }, 1200);
            }
        })();
    }, [currentLeaveId])

    function LeaveSubjectHandler(e) {
        let item = e.target.value;
        if (item == null || item == "") {
            // setHolidayNameErr(true)
        } else {
            // setHolidayNameErr(false)
        }
        setLeaveSubject(item);
    }

    function LeaveReasonHandler(e) {
        let item = e.target.value;
        if (item == null || item == "") {
            //   setHolidayNameErr(true)
        } else {
            //  setHolidayNameErr(false)
        }
        setLeaveReason(item);
    }

    function startDateHandler(e) {
        let item = e.target.value;
        if (item == null || item == "") {
            setStartDateErr(true)
        } else {
            setStartDateErr(false)
        }
        setStartDate(item);
    
    }

    function endDateHandler(e) {
        let item = e.target.value;
        if (item == null || item == "") {
            setEndDateErr(true)
        } else {
            setEndDateErr(false)
        }
        setEndDate(item);
        setTimeout(() => {
            CalcNumberOfDays(item);

        }, 1200);
    }

    function CalcNumberOfDays(date) {
            var date1 = new Date(startDate);
            var date2 = new Date(date);

        if (date1 != null && date1 != undefined) {
            var Difference_In_Time = date2.getTime() - date1.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            setNumberOfDays(Difference_In_Days + 1);
        }
    }


    async function SaveHoliday(e) {
        e.preventDefault();
        setLoading(true);
        let message = '';

        let validate = true;

        try {
            if (leaveSubject == undefined || leaveSubject.trim() == null || leaveSubject.trim() == "") {
                validate = false;
                //    setHolidayNameErr(true);
            }
            else {
                //   setHolidayNameErr(false);
            }

            if (leaveReason == undefined || leaveReason.trim() == null || leaveReason.trim() == "") {
                validate = false;
                //  setHolidayNameErr(true);
            }
            else {
                // setHolidayNameErr(false);
            }

            if (startDate == undefined || startDate == null || startDate == "") {
                validate = false;
                setStartDateErr(true);
            }
            else {
                setStartDateErr(false);
            }

            if (endDate == undefined || endDate == null || endDate == "") {
                validate = false;
                setEndDateErr(true);
            }
            else {
                setEndDateErr(false);
            }

            await addLeave(currentLeaveId, leaveSubject, leaveReason, startDate, endDate, employeeId).then(res => {
                message = res.toString();
            });
        }
        catch (error) {
            message = error.message;
        }
        finally {
            setLoading(false);
            if (validate) {
                if (message == "SUCCESS") {
                    props.onDataSave(true, message);
                }
                else {
                    Notification(message, 'ERROR')
                }
            }
        }
    }

    return (
        <>
            <Modal
                show={show && !dataLoading}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="main-class"
            >
                <Modal.Header closeButton>
                    {currentLeaveId == null || currentLeaveId == 0 ? <Modal.Title>Add Leave</Modal.Title> : <Modal.Title>Update Leave</Modal.Title>}
                </Modal.Header>
                <Form onSubmit={SaveHoliday}>
                    <Modal.Body>

                    {/* <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">EmployeeId</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="employeeId" id="employeeId"
                                value={employeeId}  />
                        </Form.Group> */}

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">Leave Subject</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="leaveSubject" id="leaveSubject"
                                value={leaveSubject}  onChange={LeaveSubjectHandler} />{startDateErr ? <span style={{ color: 'red' }}>Please enter leave subject</span> : null}
                        </Form.Group>
                        {/* //disabled={leaveStatus == null || currentFuelTypeId == 0 ? false : true} */}
                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">Leave Reason</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="leaveReason" id="leaveReason"
                                value={leaveReason} onChange={LeaveReasonHandler} />{startDateErr ? <span style={{ color: 'red' }}>Please enter leave reason</span> : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">Start Date</Form.Label>
                            <Form.Control type="date" autoComplete="off" name="startDate" id="startDate"
                                value={startDate?.replace("/", "-")?.substring(0, 10)} onChange={startDateHandler} />{startDateErr ? <span style={{ color: 'red' }}>Please enter start date</span> : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">End Date</Form.Label>
                            <Form.Control type="date" autoComplete="off" name="endDate" id="endDate"
                                value={endDate?.replace("/", "-")?.substring(0, 10)} onChange={endDateHandler} />{endDateErr ? <span style={{ color: 'red' }}>Please enter end date</span> : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1" hidden={currentLeaveId == null || currentLeaveId == 0 ? false : true}>Number Of Days</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="numberOfDays" id="numberOfDays"
                                value={numberOfDays} disabled={currentLeaveId == null || currentLeaveId == 1 ? false : true}  hidden={currentLeaveId == null || currentLeaveId == 0 ? false : true}/>
                        </Form.Group>

                        {/*  <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">Remaining Leaves</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="remainingLeaves" id="remainingLeaves"
                                value={remainingLeaves} disabled={currentLeaveId == null || currentLeaveId == 0 ? false : true} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 required">Total Leaves</Form.Label>
                            <Form.Control type="text" autoComplete="off" name="totalLeaves" id="totalLeaves"
                                value={totalLeaves} disabled={currentLeaveId == null || currentLeaveId == 0 ? false : true} />
                        </Form.Group> */}

                    </Modal.Body>

                    <Modal.Footer>
                        <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
                        <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}