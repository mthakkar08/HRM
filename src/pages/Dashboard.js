import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { BsFileEarmarkText } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { decryptData } from '../services/EncryptDecrypt';
import { FaUserFriends, FaSafari, FaUserLock } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { BiCog } from "react-icons/bi";

export default function Dashboard() {

  const navigate = useNavigate();



  // const cryptoEmail = ReactSession.get("email");
  // let email = decryptData(cryptoEmail);
  // const email = ReactSession.get("email");

  useEffect(() => {
    const authtoken = localStorage.getItem('accessToken')
    // console.log(token)
    if (!authtoken) {
      navigate('/');
    }
  }, []);

  return (
    <>

      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}>
              <div className="panel-body" style={{marginRight:"20px"}}>

                <div className="row" style={{ display: "flex" }}>

                  <Col sm={2}>
                  <Card style={{ width:'18rem' }}>
                      <Card.Body style={{ backgroundColor: "#fe555a" }}>
                      <Link to="/Employee" style={{ textDecoration: "none", textAlign:"center" }}>        
                      
                      <i className="icon-2x dashboard-icone" ><FaUserFriends /></i>
                          <Card.Subtitle className="mb-2 dashboard-card dashboard-card"> Employee</Card.Subtitle>
                          </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col sm={2}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body style={{ backgroundColor: "#ffa948" }}>
                        <Link to="/holiday" style={{ textDecoration: "none" }}>
                          <i className="icon-2x dashboard-icone" ><FaSafari /></i>
                          <Card.Subtitle className="mb-2 dashboard-card"> Holiday</Card.Subtitle>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={2}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body style={{ backgroundColor: "#00d2a5" }}>
                        <Link to="/MyLeave" style={{ textDecoration: "none" }}>
                          <i className="icon-2x dashboard-icone" ><IoIosBed /></i>
                          <Card.Subtitle className="mb-2 dashboard-card"> Leave</Card.Subtitle>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={2}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body style={{ backgroundColor: "#00a0c4" }}>
                        <Link to="/manageLeave" style={{ textDecoration: "none" }}>
                          <i className="icon-2x dashboard-icone" ><MdManageAccounts/></i>
                          <Card.Subtitle className="mb-2 dashboard-card"> Manage Leave</Card.Subtitle>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={2}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body style={{ backgroundColor: "#8660b7" }}>
                        <Link to="/manageRoleRights" style={{ textDecoration: "none" }}>
                          <i className="icon-2x dashboard-icone" ><FaUserLock/></i>
                          <Card.Subtitle className="mb-2 dashboard-card"> Manage RoleRights</Card.Subtitle>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col sm={2}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body style={{ backgroundColor: "#e44b9e" }}>
                        <Link to="/Finance" style={{ textDecoration: "none" }}>
                          <i className="icon-2x dashboard-icone" ><BiCog /></i>
                          <Card.Subtitle className="mb-2 dashboard-card"> Setting</Card.Subtitle>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </div>
            </Navbar.Brand>


          </Navbar >
        </ListGroup.Item>
      </ListGroup>




    </>
  )
}


