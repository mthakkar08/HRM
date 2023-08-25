import hrmLogo from '../assets/images/hrmLogo.png';
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


export default function Header() {

  return (
   <>
        <Navbar bg="light">
          <Navbar.Brand href="#home" style={{ marginLeft: '20px' }}>
            <img src={hrmLogo} width="130" height="40" className="d-inline-block align-top mt-2" alt="React Bootstrap logo" style={{ margin: '5px' }} />
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
          <Dropdown style={{ marginRight: "20px" }}>
            <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "106px", marginTop: "0px", borderRadius: "inherit", fontSize: "13px" }}>

              {/* <Dropdown.Item as={Link} onClick={logout}><AiOutlineLogout style={{ marginRight: "6px" }} /> Logout</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        <div className="container-fluid" style={{ padding: '0px' }}>
          <Navbar className="navbar-menu" variant="dark">
         
           </Navbar>
        </div>
      </>
  );
}