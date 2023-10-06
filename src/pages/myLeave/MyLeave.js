import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getLeavesList, deleteLeave, getLeaveBalance, updateLeaveStatus } from "../../services/LeaveService.js";

import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import AddEditLeave from './AddEditLeave';

export default function MyLeave() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [leaveList, setLeaveList] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(true);

  const [leaveSubject, setLeaveSubject] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [leaveDate, setLeaveDate] = useState("");

  const [leaveId, setLeaveId] = useState(null);

  const { setLoading } = useLoading();
  const [status, setStatus] = useState({ label: "All", value: "-1" });
  const [totalLeave, setTotalLeave] = useState("");
  const [totalEntilteLeave, setTotalEntitleLeave] = useState("");
  const [usedLeave, setUsedLeave] = useState("");
  const [compoffLeave, setCompoffLeave] = useState("");
  const statusData = [
    { label: "All", value: "-1" },
    { label: "Active", value: "0" },
    { label: "In-Active", value: "1" }
  ];
  const [leaveStatus, setLeaveStatus] = useState(null);
  const [defaultLeaveStatus, setDefaultLeaveStatus] = useState("");

  const [approvedBy, setApprovedBy]  = useState("");
  const [approvedMessage, setApprovedMessage]  = useState("");

  const leaveStatusData = [
    { label: "Pending", value: "1" },
    { label: "Approved", value: "2" },
    { label: "Rejected", value: "3" },
    { label: "canceled", value: "4" }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);

        await getLeaveBalance(employeeId).then(res => {
          setTotalLeave(res.totalLeave)
          setTotalEntitleLeave(res.totalEntitleLeave)
          setUsedLeave(res.usedLeave)
          setCompoffLeave(res.compoffLeave)
        });
      }
      catch (error) {
      }
      finally {
        setTimeout(() => {
          setLoading(false);
        }, 1200);
      }
    })();
  }, [EmployeeId])

  let token = localStorage.getItem('accessToken')
  let employeeId;
  if (token) {
    const cryptoEmail = localStorage.getItem('email')
    employeeId = localStorage.getItem('employeeId')
  }

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteLeave(currentLeaveId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Leave deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentLeaveId(null);
      setLoading(false);
    }
    getLeaveDataList();
  }

  async function handleConfirmStatus() {
    debugger;
    let message = '';
    setShowConfirmStatus(false);
    setLoading(true);
    try {
      await updateLeaveStatus(currentLeaveId, approvedBy, approvedMessage, 4).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Leave status update successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentLeaveId(null);
      setLoading(false);

    }
     getLeaveDataList();
  }

  function leaveStatusHandler(e) {
    let item = e.value;
    setLeaveStatus(item);
    const leavedata = leaveStatusData?.find(x => x.value === item);
    if (leavedata) {
      setDefaultLeaveStatus(leavedata);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getLeaveDataList();
  };

  useEffect(() => {
    getLeaveDataList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();

    setLeaveStatus("");
    await getLeavesList("", "", "", employeeId).then(res => { setLeaveList(res) });
  }

  async function getLeaveDataList() {
    setLoading(true);

    try {
      await getLeavesList(leaveSubject, leaveStatus, leaveDate, employeeId).then(res => {
        setLeaveList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }



  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == 'SUCCESS') {
      Notification('Leave saved successfully!', 'SUCCESS')
      getLeaveDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "leaveId",
      text: "Leave Id",
      sort: true,
      hidden: true,
      style: {
        width: '12%',
        textAlign: 'left'
      }
    },
    {
      dataField: "leaveSubject",
      text: "Leave Subject",
      sort: true,
      style: {
        width: '15%',
      }
    },
    {
      dataField: "leaveReason",
      text: "Leave Reason",
      sort: true,
      style: {
        width: '15%',
        textAlign: 'left'
      }
    },
    {
      dataField: "leaveStatus",
      text: "Leave Status",
      sort: true,
      style: {
        width: '7%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          {
            columns.leaveStatus == 1 ? (<span style={{ borderRadius: "3px", border: "none", backgroundColor: "#0d6efd", color: "white", margin: "5px", padding: "5px" }} >Pending</span>) :
              columns.leaveStatus == 2 ? <span style={{ borderRadius: "3px", border: "none", backgroundColor: "green", color: "white", margin: "5px", padding: "5px" }}>Approved</span> :
                columns.leaveStatus == 3 ? <span style={{ borderRadius: "3px", border: "none", backgroundColor: "	#DC5D02", color: "white", margin: "5px", padding: "5px" }}>Rejected</span> :
                  <span style={{ borderRadius: "3px", border: "none", backgroundColor: "red", color: "white", margin: "5px", padding: "5px" }}>canceled</span>
          }
        </div>
      )
    },
     {
      dataField: "reportingEmployee",
      text: "Responded By",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "respondBy",
      text: "Response Message",
      sort: true,
      style: {
        width: '13%'
      }
    }
    ,
    {
      dataField: "startDate",
      text: "Start Date",
      sort: true,
      style: {
        width: '10%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        columns.startDate?.replace("/", "-")?.substring(0, 10)
      )
    },
    {
      dataField: "endDate",
      text: "End Date",
      sort: true,
      style: {
        width: '10%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        columns.endDate?.replace("/", "-")?.substring(0, 10)
      )
    },
    {
      dataField: "createdDate",
      text: "Requested Date",
      sort: true,
      style: {
        width: '10%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        columns.endDate?.replace("/", "-")?.substring(0, 10)
      )
    },
    {
      dataField: 'Action',
      text: 'Action',
      style: {
        padding: '3px',
        margin: '0px',
        width: '8%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>        
          <a href={leaveList.value} style={{ display: 'inline-flex' }} >
            {
            columns.leaveStatus !== 4 ? (<button title="calcel" type="button" onClick={() => { debugger; setCurrentLeaveId(columns.leaveId); setShowConfirmStatus(true) }} size="sm" className="icone-button"><i className="icon-cross2 dark-grey"></i></button>
            ) :
            <div style={{ minHeight: "30px", minWidth: "20px" }}>-</div>
          }
            {
            columns.leaveStatus == 1 ? (<button title="Edit" type="button" onClick={() => { setCurrentLeaveId(columns.leaveId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            ) :
             <></>
          }
            {
            columns.leaveStatus == 1 ? ( <button title='Delete' type="button" onClick={() => { setCurrentLeaveId(columns.leaveId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>) :
             <></>
          }
          </a>
          
        </div>
      )
    },
  ]

  return (
    <>
      {show && <AddEditLeave onDataSave={onDataSave} leaveId={currentLeaveId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> My Leave</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                {/* <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { LeavePolicy() }} >Leave Policy</Button></Navbar.Brand> */}
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentLeaveId(0); handleShow() }} >+  Apply Leave</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">


            <div>
              <Row className="main-class" style={{ textAlign: "center", color: "black" }}>
                <Col> <Card style={{ marginRight: '20px' }}>
                  <Card.Body>
                    <Card.Title>Total Leave</Card.Title>
                    <Card.Text>{totalLeave}</Card.Text>
                  </Card.Body>
                </Card>
                </Col>
                <Col> <Card style={{ marginRight: '20px' }}>
                  <Card.Body>
                    <Card.Title>Total Entitle Leave </Card.Title>
                    <Card.Text>{totalEntilteLeave}</Card.Text>
                  </Card.Body>
                </Card>
                </Col>

                <Col>
                  <Card style={{ marginRight: '20px' }}>
                    <Card.Body>
                      <Card.Title>Used Leave</Card.Title>
                      <Card.Text>{usedLeave}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Compoff Leave</Card.Title>
                      <Card.Text>{compoffLeave}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>


          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              {/* <Row className="main-class">

                <Col className='display-inline pl-0' >
                <Form.Label className='mb-1'>Leave Status</Form.Label>
                  <Form.Group className='defaultWidth'  style={{ width: '320px', marginLeft: '26px' }}>
                    <Select
                      value={defaultLeaveStatus}
                      options={leaveStatusData.map(({ label, value }) => ({ label: label, value: value }))}
                      onChange={leaveStatusHandler}
                      defaultValue={defaultLeaveStatus}
                      defaultMenuIsOpen={false}
                      id="leaveStatusId">
                    </Select>
                  </Form.Group>
                </Col>

                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '16px' }} >
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row> */}
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Leave Status</Form.Label>
                  <Form.Group className='defaultWidth' style={{ width: '320px' }}>
                    <Select
                      value={defaultLeaveStatus}
                      options={leaveStatusData.map(({ label, value }) => ({ label: label, value: value }))}
                      onChange={leaveStatusHandler}
                      defaultValue={defaultLeaveStatus}
                      defaultMenuIsOpen={false}
                      id="leaveStatusId">
                    </Select>
                  </Form.Group>
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'leaveId'}
              id='tbl_leave'
              data={leaveList}
              columns={columns}
              // cellEdit={ cellEditFactory({ mode: 'click',
              // blurToSave: true }) }
              striped
              hover
              condensed
              noDataIndication="No records found"
              pagination={paginationFactory({
                sizePerPageList: [10, 20, 30, 50]
              })}
            />
          </div>

        </ListGroup.Item>
      </ListGroup>


      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this leave?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />

       <Bootbox show={showConfirmStatus}
        type={"confirm"}
        successLabel={"Cancel"}
   // type={ <Button variant="primary">Test</Button> }
        message={"Are you sure you want to change this Leave?"}
        onSuccess={handleConfirmStatus}
        onCancel={bootboxCloseStatus}
        onClose={bootboxCloseStatus}
        
      /> 

    </>
  )
}



