import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEmployeesList, deleteEmployee } from "../../services/EmployeeServices.js";
import AddEditEmployee from './AddEditEmployee.js'
import Bootbox from 'bootbox-react';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default function Employee() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentemployeeId, setCurrentemployeeId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  
  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
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
    setDesignation("");
    setStatus("");
    setEmail("");
    await getEmployeesList(employeeName, designation, status, email).then(res => { setEmployeeList(res) });
  }

  async function getEmployeeDataList() {
debugger;
    try {
      await getEmployeesList(employeeName, designation, status, email).then(res => {
        debugger;
        setEmployeeList(res)
      });
    }
    catch (error) {
    }
    finally {
    
    }
  }

  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == "SUCCESS") {
      Notification('Employee saved successfully!', 'SUCCESS')
      getEmployeeDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "employeeId",
      text: "employeeId ",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "employeeName",
      text: "Employee Name",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "dob",
      text: "Dob",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "password",
      text: "Password",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "designation",
      text: "Designation",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "experience",
      text: "Experience",
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
      }
    },
    {
      dataField: "hiringDate",
      text: "Hiring Date",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "joiningDate",
      text: "Joining Date",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "terminationDate",
      text: "Termination Date",
      sort: true,
      style: {
        width: '8%'
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
          </a>
        </div>
      )
    },
  ]



  return (
    <>
{show && <AddEditEmployee onDataSave={onDataSave} employeeId={currentemployeeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Employee </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' variant="warning" type='button' size="sm" onClick={() => { setCurrentemployeeId(0); handleShow() }} >+ Add Employee</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Employee</Form.Label>
                  <Form.Control type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
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
              cellEdit={ cellEditFactory({ mode: 'click',
              blurToSave: true }) }
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

</>
  )
}



