import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getHolidayList, deleteHoliday } from "../../services/HolidayService.js";
// import { getHolidayList, deleteHoliday, bindDesignation, updateEmployeesStatus } from "../../services/HolidayService.js";
import AddEditHoliday from './AddEditHoliday.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function Holiday() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentHolidayId, setCurrentHolidayId] = useState(null);
  const [holidayList, setHolidayList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);

  const [holidayId,setHolidayId] = useState(null);
  const [toDate, setToDate] = useState(new Date().getFullYear() + 1 + "-05-01");
  const [fromDate, setFromDate] = useState(new Date().getFullYear() + "-04-30");

  const { setLoading } = useLoading();
  const [status, setStatus] = useState({ label: "All", value: "0" });

  const statusData = [
    { label: "All", value: "0" },
    { label: "Active", value: "1" },
    { label: "In-Active", value: "2" }
  ];

  
  function StatusHandler(e) {
    setStatus(e);
  }

  function FromDateHandler(e){
    debugger;
    let item = e.target.value;
    
    setFromDate(item)
  }

  function ToDateHandler(e){
    let item = e.target.value;
    setToDate(item)
  }

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteHoliday(currentHolidayId).then(res => { message = res });
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
      setCurrentHolidayId(null);
      setLoading(false);
    }
    getHolidayDataList();
  }


  async function handleConfirmStatus() {
    let message = '';
    setShowConfirmStatus(false);
    debugger;
    setLoading(true);
    try {
    //   await updateEmployeesStatus(employeeId,status).then(res => { message = res });
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
      setHolidayId(null);
      setLoading(false);
    }
    getHolidayDataList();
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
    setToDate(new Date().getFullYear() + 1 + "-05-01");
    setFromDate(new Date().getFullYear() + "-04-30");
    setStatus({ label: "All", value: "0" });

    await getHolidayList("", "","").then(res => { setHolidayList(res) });
  }

  async function getHolidayDataList() {
    setLoading(true);
    try {
      await getHolidayList(fromDate, toDate,status.value).then(res => {
        setHolidayList(res)
      });
    //   await bindDesignationList();
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
      Notification('Holiday saved successfully!', 'SUCCESS')
      getHolidayDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "holidayId",
      text: "Holiday Id",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "holidayName",
      text: "Holiday Name",
      sort: true,
      style: {
        width: '10%',
      }
    },
    {
      dataField: "holidayDate",
      text: "Holiday Date",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {
        width: '5%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          {
            columns.status == 1 ? (<span style={{ borderRadius: "3px", border: "none", backgroundColor: "green", color: "white", margin: "5px", padding: "5px" }} >Active</span>) :
              <span style={{ borderRadius: "3px", border: "none", backgroundColor: "red", color: "white", margin: "5px", padding: "5px" }}>In-Active</span>
          }
        </div>
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
          <a href={holidayList.value} style={{ display: 'inline-flex' }} >
            <button title="Edit" type="button" onClick={() => { setCurrentHolidayId(columns.holidayId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentHolidayId(columns.holidayId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
            <button title='check' type="button" onClick={() => { setCurrentHolidayId(columns.holidayId); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
          </a>
        </div>
      )
    },
  ]



  return (
    <>
      {show && <AddEditHoliday onDataSave={onDataSave} holidayId={currentHolidayId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Holiday </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentHolidayId(0); handleShow() }} >+ Add Holiday</Button></Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col className='display-inline pl-0' style={{ width: '280px', marginLeft: '0px' }}>
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
                </Col>

                <Col className='display-inline pl-2' style={{ width: '280px', marginLeft: '-20px' }}>
                  <Form.Label className='display-inline search-label'>Status</Form.Label>
                  <Form.Group className='defaultWidth' style={{ width: "350px" }}>
                    <Select style={{ width: "60px" }}
                      value={status}
                      options={statusData.map(({ label, value }) => ({ label: label, value: value }))}
                      onChange={StatusHandler}
                      defaultMenuIsOpen={false}
                      id="statusid">
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
              keyField={'holidayId'}
              id='tbl_holiday'
              data={holidayList}
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
        message={"Are you sure you want to delete this holiday?"}
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



