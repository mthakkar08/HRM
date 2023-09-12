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
import AddEditEmployee from './AddEditEmployeeProfile.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';

export default function EmployeeProfile() {

  return (
    <>


      <ListGroup>
        <ListGroup.Item style={{ backgroundColor: "#51438A" }}>
          <Navbar collapseOnSelect expand="sm" variant="dark" style={{marginTop:"-8px",marginBottom:"-8px", marginRight:"20px",marginLeft:"20px"}} >
            <Nav.Link style={{ color: 'White' }}><BsFileEarmarkText /> Employee Profile </Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm"  >+ Add Employee</Button></Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>


        </ListGroup.Item>
      </ListGroup>



    </>
  )
}



