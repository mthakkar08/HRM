// import React, { useState, useEffect } from "react";
// import { Button, Form, Modal } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import { getLeavesDetail, addLeave } from "../../services/LeavesService.js";
// import { useLoading } from '../../LoadingContext.js';
// import { Notification } from '../../components/Notification.js'
// import Select from 'react-select';
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";

// export default function AddEditLeaves(props) {

//   const [show, setShow] = useState(true);
//   const currentLeaveId = props.leaveId;
//   const [leaveSubject, setLeaveSubject] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");
//   const [leaveStatus, setLeaveStatus] = useState("");
//   const [approvedBy, setApprovedBy] = useState("");
//   const [approvedMessage, setApprovedMessage] = useState("");
//   const [status, setStatus] = useState(1);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [holidayDate, setHolidayDate] = useState("");
//   const [description, setDescription] = useState("");


//   const [holidayNameErr, setHolidayNameErr] = useState(false);
//   const [startDateErr, setStartDateErr] = useState(false);
//   const handleClose = () => setShow(false);
//   const { loading, setLoading } = useLoading();
//   const [dataLoading, setDataLoading] = useState(false);

//   useEffect(() => {
//     if (!show) {
//       props.onDataSave(false);
//     }
//   }, [show])

//   useEffect(() => {
//     (async function () {
//       try {
//         setLoading(true);
//         setDataLoading(true);
//         if (currentLeaveId != null && currentLeaveId != 0) {
//           await getLeavesDetail(currentLeaveId).then(res => {
//             debugger;
//             setLeaveSubject(res.leaveSubject)
//             setLeaveReason(res.leaveReason)
//             setLeaveStatus(res.leaveStatus)
//             setApprovedBy(res.approvedBy)
//             setApprovedMessage(res.approvedMessage)
//             setHolidayDate(res.holidayDate)
//             setDescription(res.description)
//             setStatus(res.status)
//             setStartDate(res.startDate)
//             setEndDate(res.endDate)
//           });
//         }
//       }
//       catch (error) {
//       }
//       finally {
//         setTimeout(() => {
//           setDataLoading(false);
//           setLoading(false);
//         }, 1200);
//       }
//     })();
//   }, [currentLeaveId])

//   function LeaveSubjectHandler(e) {
//     let item = e.target.value;
//     if (item == null || item == "") {
//       setHolidayNameErr(true)
//     } else {
//       setHolidayNameErr(false)
//     }
//     setLeaveSubject(item);
//   }

//   function LeaveReasonHandler(e) {
//     let item = e.target.value;
//     if (item == null || item == "") {
//       setHolidayNameErr(true)
//     } else {
//       setHolidayNameErr(false)
//     }
//     setLeaveReason(item);
//   }

//   function leaveStatusHandler(e) {
//     debugger;
//     let item = e.value;
//     if (item == null || item == "") {
//      // setDesignationErr(true);
//     } else {
//     //  setDesignationErr(false)
//     }
//     //setDesignationId(item);

//     // const DesignationData = designationList?.find(x => x.value === item);
//     // if (DesignationData) {
//     //   setDesignationName(DesignationData);
//     // }
//   }
  
//   function startDateHandler(e) {
//     let item = e.target.value;
//     if (item == null || item == "") {
//    //   setHolidayDateErr(true)
//     } else {
//     //  setHolidayDateErr(false)
//     }
//     setHolidayDate(item);
//   }

//   async function SaveHoliday(e) {
//     e.preventDefault();
//     setLoading(true);
//     let message = '';

//     let validate = true;

//     try {
//       if (leaveSubject == undefined || leaveSubject.trim() == null || leaveSubject.trim() == "") {
//         validate = false;
//         setHolidayNameErr(true);
//       }
//       else {
//         setHolidayNameErr(false);
//       }

//       if (leaveReason == undefined || leaveReason.trim() == null || leaveReason.trim() == "") {
//         validate = false;
//         setHolidayNameErr(true);
//       }
//       else {
//         setHolidayNameErr(false);
//       }

//       if (startDate == undefined || startDate == null || startDate == "") {
//         validate = false;
//         setStartDateErr(true);
//       }
//       else {
//         setStartDateErr(false);
//       }
// //employeeId
//       await addLeave(currentLeaveId, leaveSubject, leaveReason, leaveStatus, approvedBy, approvedMessage, status, startDate, endDate).then(res => {
//         message = res.toString();
//       });
//     }
//     catch (error) {
//       message = error.message;
//     }
//     finally {
//       setLoading(false);
//       if (validate) {
//         if (message == "SUCCESS") {
//           props.onDataSave(true, message);
//         }
//         else {
//           Notification(message, 'ERROR')
//         }
//       }
//     }
//   }

//   return (
//     <>
//       <Modal
//         show={show && !dataLoading}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         className="main-class"
//       >
//         <Modal.Header closeButton>
//           {currentLeaveId == null || currentLeaveId == 0 ? <Modal.Title>Add Leave</Modal.Title> : <Modal.Title>Update Leave</Modal.Title>}
//         </Modal.Header>
//         <Form onSubmit={SaveHoliday}>
//           <Modal.Body>

//             <Form.Group className="mb-3">
//               <Form.Label className="mb-1 required">Leave Subject</Form.Label>
//               <Form.Control type="text" autoComplete="off" name="leaveSubject" id="leaveSubject"
//                 value={leaveSubject} onChange={LeaveSubjectHandler} />{holidayNameErr ? <span style={{ color: 'red' }}>Please enter leave subject</span> : null}
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="mb-1 required">Leave Reason</Form.Label>
//               <Form.Control type="text" autoComplete="off" name="leaveReason" id="leaveReason"
//                 value={leaveReason} onChange={LeaveReasonHandler} />{holidayNameErr ? <span style={{ color: 'red' }}>Please enter leave reason</span> : null}
//             </Form.Group>

//             <Form.Group className='defaultWidth mb-3'>
//               <Form.Label className='display-inline search-label mb-1 required'>Leave Status</Form.Label>
//               <Select
//                 //  options={designationList.map(({ designationId, designationName }) => ({ label: designationName, value: designationId }))}
//                 onChange={leaveStatusHandler}
//                 //   defaultValue={designationName}
//                 defaultMenuIsOpen={false}
//                 id="leaveStatusId">
//               </Select>
//               {/* {designationErr ? <span style={{ color: 'red' }}>Please select leave status</span> : null} */}
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="mb-1">Approved By</Form.Label>
//               <Form.Control type="text" autoComplete="off" name="approvedBy" id="approvedBy"
//                 value={approvedBy} onChange={(e) => setApprovedBy(e.target.value)} />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="mb-1">Approved Message</Form.Label>
//               <Form.Control type="text" autoComplete="off" name="approvedMessage" id="approvedMessage"
//                 value={approvedMessage} onChange={(e) => setApprovedMessage(e.target.value)} />
//             </Form.Group>
// {/* 
//             <Form.Group className="mb-3 col-md-6">
//                 <Form.Label className="mb-1">Start Date</Form.Label>
//                 <Form.Control type="date" autoComplete="off" name="startDate" id="startDate"
//                   value={startDate?.replace("/", "-")?.substring(0, 10)} onChange={startDateHandler} />{startDateErr ? <span style={{ color: 'red' }}>Please enter start date</span> : null} 
//               </Form.Group> */}

//               <Form.Group className="mb-3">
//                 <Form.Label className="mb-1">End Date</Form.Label>
//                 <Form.Control type="date" autoComplete="off" name="endDate" id="endDate"
//                   value={endDate?.replace("/", "-")?.substring(0, 10)} onChange={(e) => setEndDate(e.target.value)} />
//               </Form.Group>
            
//           </Modal.Body>

//           <Modal.Footer>
//             <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
//             <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>
//   );
// }