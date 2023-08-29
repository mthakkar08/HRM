import logo from '../assets/images/logo.png';
import { Navbar, Badge, Nav, Form, NavDropdown, NavItem } from 'react-bootstrap';

import { Dropdown } from 'react-bootstrap';
import { ImUser, ImKey } from "react-icons/im";
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { RxGear, RxStack } from 'react-icons/rx';
import { BsFileEarmarkText, BsFileEarmarkCode } from "react-icons/bs";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { RiHome2Line } from "react-icons/ri";
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MdMessage } from "react-icons/md";

export default function Header() {

  return (
    <>
      <Navbar style={{ backgroundColor: "#51438d" }}>
        <Navbar.Brand href="#home" style={{ marginLeft: '20px', display: "inline-flex" }}>
          <img src={logo} width="25" height="25" className="d-inline-block align-top mt-2" alt="React Bootstrap logo" style={{ margin: '5px' }} />
          <h3 style={{ color: "white", marginTop: "3px", marginLeft: "5px" }}>HR Manangement</h3>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
        </Navbar.Collapse>
        < MdMessage color="white" fontSize="20px" marginTop="7px" />
        <Badge bg="danger" style={{ marginTop: "-18px" }}>9</Badge>

        <Dropdown style={{ marginRight: "20px" }}>
          <Dropdown.Toggle variant="bg-primary" id="dropdown-basic" className='action-top' >
            <Badge bg="primary" className='img-cricle' >BS</Badge>
            <span>Bhoomi Sapariya</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "106px", marginTop: "0px", borderRadius: "inherit", fontSize: "13px" }}>
            <Dropdown.Item as={Link}><AiOutlineLogout style={{ marginRight: "6px" }} /> Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>

      {/* <div className="container-fluid" style={{ padding: '0px' }}>
        <Navbar className="navbar-menu" variant="dark">

        </Navbar>
      </div> */}

    </>
  );
}