import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getLeavesList, deleteLeave } from "../../services/LeavesService.js";
// import AddEditLeaves from './AddEditLeaves.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import LeavePolicy from './LeavePolicy';

export default function MyLeave() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [leaveList, setLeaveList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);
  const [leaveSubject, setLeaveSubject] = useState("");

  const [leaveDate, setLeaveDate] = useState("");

  const [leaveId, setLeaveId] = useState(null);


  const { setLoading } = useLoading();
  const [status, setStatus] = useState({ label: "All", value: "-1" });

  const statusData = [
    { label: "All", value: "-1" },
    { label: "Active", value: "0" },
    { label: "In-Active", value: "1" }
  ];
  const [leaveStatus, setLeaveStatus] = useState("");
  const [defaultLeaveStatus, setDefaultLeaveStatus] = useState("");


  const leaveStatusData = [
    { label: "Pending", value: "1" },
    { label: "Approved", value: "2" },
    { label: "Rejected", value: "3" },
    { label: "canceled", value: "4" }
  ];

  const navigate = useNavigate();

  const LeavePolicy = () => {
    navigate('../LeavePolicy');
  }

  function StatusHandler(e) {
    setStatus(e);
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
        Notification('Holiday deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentLeaveId(null);
      setLoading(false);
    }
    getHolidayDataList();
  }


  async function handleConfirmStatus() {
    let message = '';
    setShowConfirmStatus(false);
    setLoading(true);
    try {
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Status update holiday successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setLeaveId(null);
      setLoading(false);
    }
    getHolidayDataList();
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
    getHolidayDataList();
  };

  useEffect(() => {
    getHolidayDataList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();

    setStatus({ label: "All", value: "-1" });

    await getLeavesList("", "", "", "").then(res => { setLeaveList(res) });
  }

  async function getHolidayDataList() {
    setLoading(true);
    try {
      await getLeavesList(leaveSubject, leaveStatus, status.value, leaveDate).then(res => {
        debugger;
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
      getHolidayDataList();
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
            columns.status == 1 ? (<span style={{ borderRadius: "3px", border: "none", backgroundColor: "#0d6efd", color: "white", margin: "5px", padding: "5px" }} >Pending</span>) :
            columns.status == 2 ? <span style={{ borderRadius: "3px", border: "none", backgroundColor: "green", color: "white", margin: "5px", padding: "5px" }}>Approved</span> :
            columns.status == 3 ? <span style={{ borderRadius: "3px", border: "none", backgroundColor: "orange", color: "white", margin: "5px", padding: "5px" }}>Rejected</span> :
              <span style={{ borderRadius: "3px", border: "none", backgroundColor: "red", color: "white", margin: "5px", padding: "5px" }}>canceled</span>
          }
        </div>
      )
    },
    {
      dataField: "approvedBy",
      text: "Approved By",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "approvedMessage",
      text: "Approved Message",
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
            <button title="Edit" type="button" onClick={() => { setCurrentLeaveId(columns.leaveId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentLeaveId(columns.leaveId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
          </a>
        </div>
      )
    },
  ]

  return (
    <>
      {/* {show && <AddEditLeaves onDataSave={onDataSave} leaveId={currentLeaveId} />} */}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> My Leave</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { LeavePolicy() }} >Leave Policy</Button></Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class" style={{textAlign:"center", color:"black"}}>

                <Card style={{ width: '26rem', marginRight:'20px'}}>
                  <Card.Body>
                    <Card.Title>Total Leave</Card.Title>
                    <Card.Text>15</Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ width: '26rem', marginRight:'20px'}}>
                  <Card.Body>
                    <Card.Title>Total Entitle Leave </Card.Title>
                    <Card.Text>4</Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ width: '26rem', marginRight:'20px'}}>
                  <Card.Body>
                    <Card.Title>Used Leave</Card.Title>
                    <Card.Text>3</Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ width: '26rem'}}>
                  <Card.Body>
                    <Card.Title>Compoff Leave</Card.Title>
                    <Card.Text>6</Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              
            </Form>
          </Card>


          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                {/* <Col className='display-inline pl-0' style={{ width: '280px', marginLeft: '0px' }}>
                <Form.Label className="mb-1">From Date</Form.Label>
                <Form.Group className='defaultWidth' style={{ width: '320px', marginLeft: '26px' }} >
                <Form.Control type="date" autoComplete="off" name="fromDate" id="fromDate"
                  value={fromDate} onChange={FromDateHandler}  dateFormat="yyyy/MM/DD"  />
                    </Form.Group>
                </Col>

                <Col className='display-inline pl-0' style={{ width: '280px', marginLeft: '0px' }} >
                <Form.Label className="mb-1">To Date</Form.Label>
                <Form.Group className='defaultWidth' style={{ width: '320px', marginLeft: '26px' }}>
                <Form.Control type="date" autoComplete="off" name="toDate" id="toDate"
                  value={toDate} onChange={ToDateHandler}  dateFormat="yyyy/MM/DD" />
                   </Form.Group>
                </Col> */}

<Col className='display-inline pl-2' style={{ width: '280px', marginLeft: '0px' }}>
                <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1 required'>Leave Status</Form.Label>
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
                {/* 
                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Email</Form.Label>
                  <Form.Control className='defaultWidth' style={{ width: "250px" }} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col> */}

                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '16px' }} >
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
        message={"Are you sure you want to change this status?"}
        onSuccess={handleConfirmStatus}
        onCancel={bootboxCloseStatus}
        onClose={bootboxCloseStatus}
      />

    </>
  )
}


