import logo from '../assets/images/logo.png';
import { Navbar, Badge } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineLogout } from 'react-icons/ai';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMessage } from "react-icons/md";
import { ReactSession } from 'react-client-session';
import { decryptData } from '../services/EncryptDecrypt';

export default function Header() {
  let token = localStorage.getItem('accessToken')
  let employeeName;
  let email;

  if (token) {
    const cryptoEmail = localStorage.getItem('email')
    employeeName = localStorage.getItem('employeeName')
    email = decryptData(cryptoEmail);
  }

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    // localStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('employeeName');
    localStorage.removeItem('employeeId');
    navigate('/');
    ReactSession.remove("email")
  }



  return (!token ? (<></>) :
  <>
    <Navbar style={{ backgroundColor: "#51438d" }}>
      <Navbar.Brand href="#" style={{ marginLeft: '20px', display: "inline-flex" }}>
        <img src={logo} width="25" height="25" className="d-inline-block align-top mt-2" alt="React Bootstrap logo" style={{ margin: '5px' }} />
        <h3 style={{ color: "white", marginTop: "3px", marginLeft: "5px" }}>HR Manangement</h3>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
      </Navbar.Collapse>
      < MdMessage color="white" fontSize="20px" marginTop="7px" />
      <Badge bg="danger" style={{ marginTop: "-18px" }}>9</Badge>

      <Dropdown style={{ marginRight: "20px" }}>
        <Dropdown.Toggle variant="bg-primary" id="dropdown-basic" className='action-top' >
          <Badge bg="primary" className='img-cricle' >{employeeName?.split(" ").at(0)?.substring(0, 1) + employeeName?.split(" ").at(1)?.substring(0, 1)}</Badge>
          {/* <span>{email}</span> */}
          <span>{employeeName}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="action-dropdown" style={{ marginLeft: "85px", marginTop: "0px", borderRadius: "inherit", fontSize: "13px" }}>
          <Dropdown.Item as={Link} onClick={handleLogout}><AiOutlineLogout style={{ marginRight: "6px" }} /> Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  </>
  );
}