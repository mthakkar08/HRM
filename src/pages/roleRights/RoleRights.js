import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEmployeesList, deleteEmployee, bindDesignation, updateEmployeesStatus } from "../../services/EmployeeService.js";
import AddEditEmployee from './AddEditEmployee.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';

export default function RoleRights() {

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    // console.log(token)
    if (!token) {
      navigate('/login');
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentemployeeId, setCurrentemployeeId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);


  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);

  const [employeeId, setEmployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [designationName, setDesignationName] = useState("");


  const [email, setEmail] = useState("");
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

  async function bindDesignationList() {
    setLoading(true);
    try {
      await bindDesignation().then(res => {
        setDesignationList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function designationHandler(e) {
    let item = e.value;

    setDesignationId(item);
    setDesignationName(designationList?.find(x => x.value === item))
  }



  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteEmployee(currentemployeeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Employee deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentemployeeId(null);
      setLoading(false);
    }
    getEmployeeDataList();
  }


  async function handleConfirmStatus() {
    let message = '';
    setShowConfirmStatus(false);
    setLoading(true);
    try {
      await updateEmployeesStatus(employeeId, status).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Status update employee successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setEmployeeId(null);

      setLoading(false);
    }
    getEmployeeDataList();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getEmployeeDataList();
  };

  useEffect(() => {
    getEmployeeDataList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setEmployeeName("");
    setDesignationName("");
    setStatus({ label: "All", value: "0" });
    setEmail("");
    await getEmployeesList("", "", "", "").then(res => { setEmployeeList(res) });

  }

  async function getEmployeeDataList() {
    setLoading(true);
    try {
      await getEmployeesList(employeeName, designationId, status.value, email).then(res => {
        // debugger;
        setEmployeeList(res)
      });
      await bindDesignationList();
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
      Notification('Employee saved successfully!', 'SUCCESS')
      getEmployeeDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "roleId",
      text: "roleId ",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "employeeName",
      text: "Role Name",
      sort: true,
      style: {
        width: '40%',
        textAlign: 'left'
      }
    },
    {
      dataField: "view",
      text: "View",
      sort: true,
      style: {
        padding: '3px',
        margin: '0px',
        width: '15%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title='check' type="button" onClick={() => { setEmployeeId(columns.employeeId); setStatus(columns.status == 1 ? 2 : 1); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
          </a>
        </div>
      )
    },
    {
      dataField: "create",
      text: "Create",
      sort: true,
      style: {
        padding: '3px',
        margin: '0px',
        width: '15%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title='check' type="button" onClick={() => { setEmployeeId(columns.employeeId); setStatus(columns.status == 1 ? 2 : 1); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
          </a>
        </div>
      )
    },
    {
      dataField: "edit",
      text: "Edit",
      sort: true,
      style: {
        padding: '3px',
        margin: '0px',
        width: '15%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title='check' type="button" onClick={() => { setEmployeeId(columns.employeeId); setStatus(columns.status == 1 ? 2 : 1); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
          </a>
        </div>
      )
    },
    {
      dataField: "delete",
      text: "Delete",
      sort: true,
      style: {
        padding: '3px',
        margin: '0px',
        width: '15%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title='check' type="button" onClick={() => { setEmployeeId(columns.employeeId); setStatus(columns.status == 1 ? 2 : 1); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
          </a>
        </div>
      )
    }
  ]



  return (
    <>
      {show && <AddEditEmployee onDataSave={onDataSave} employeeId={currentemployeeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Role Rights </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentemployeeId(0); handleShow() }} >+ Add Role Rights</Button></Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
            <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Role Name</Form.Label>
                  <Form.Control type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}  />
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>


            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'employeeId'}
              id='tbl_employee'
              data={employeeList}
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
        message={"Are you sure you want to delete this employee?"}
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



