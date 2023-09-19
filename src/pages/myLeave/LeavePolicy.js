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

import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import EmployeeProfile from '../employeeProfile/EmployeeProfile';

export default function LeavePolicy(props) {

  const navigate = useNavigate();




  const toComponentB = (empId) => {
    navigate('../EmployeeProfile', { state: { id: empId } });
  }

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

  const [designationId, setDesignationId] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [designationName, setDesignationName] = useState("");


  const [email, setEmail] = useState("");
  const { setLoading } = useLoading();
  const [status, setStatus] = useState({ label: "All", value: "-1" });

  const statusData = [
    { label: "All", value: "-1" },
    { label: "Active", value: "0" },
    { label: "In-Active", value: "1" }

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
    debugger;
    let message = '';
    setShowConfirmStatus(false);
    setLoading(true);
    try {
      await updateEmployeesStatus(employeeId,  status).then(res => { message = res });
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
      setStatus({ label: "All", value: "-1" });
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
    setStatus({ label: "All", value: "-1" });
    setEmail("");
    await getEmployeesList("", "",-1, "").then(res => { setEmployeeList(res) });

  }

  async function getEmployeeDataList() {
    debugger;
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
      dataField: "policyId",
      text: "policyId ",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "startFrom",
      text: "Start From",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "endTo",
      text: "End To",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: "leaveCount ",
      text: "Leave Count",
      sort: true,
      style: {
        width: '5%'
      }
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
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title="Edit" type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
            <button title='check' type="button" onClick={() => { setEmployeeId(columns.employeeId); setStatus(columns.status == 0 ? 1 : 0); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button>
            {/* <button title='view' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); handleShow() }} className="icone-button"><i className="icon-eye dark-grey"></i></button> */}
            <a className="icone-button" title='view' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); toComponentB(columns.employeeId) }} activeClassName="is-active" exact><i className="icon-eye dark-grey" style={{ paddingTop: "6px" }}></i> </a>
          </a>
        </div>
      )
    },
  ]



  return (
    <>
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Leave Policy </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
            

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
        
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



