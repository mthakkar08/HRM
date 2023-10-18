import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import {getLeaveHistory} from "../../services/LeaveService.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function LeaveHistory(props) {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLeaveId, setCurrentLeaveId] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const { setLoading } = useLoading();
  const location = useLocation();
  

  useEffect(() => {
    getLeaveHistoryData(location.state.id);
  }, [])

  async function getLeaveHistoryData(currentLeaveId) {
    setLoading(true);
    try {
      await getLeaveHistory(currentLeaveId).then(res => {
        setLeaveHistory(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  
  const columns = [
    {
      dataField: "leaveId",
      text: "LeaveId",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "leaveSubject",
      text: "Leave Subject",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "respondedBy",
      text: "Responded By",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: "responseMessage",
      text: "Response Message",
      sort: true,
      style: {
        width: '40%'
      }
    },
    {
      dataField: "createdDate",
      text: "Created Date",
      sort: true,
      style: {
        width: '12%'
      }
    },
  ]

  return (
    <>
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Leave History </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>

          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'leaveId'}
              id='tbl_employee'
              data={leaveHistory}
              columns={columns}
              striped
              hover
              condensed
              noDataIndication="No records found"
              pagination={paginationFactory({
                sizePerPageList: [10, 20, 30, 50]
              })}
            />
          </div>

          <div style={{ textAlign: "right", paddingRight: "13px", paddingBottom: "20px" }}>
            <Button className='btn btn-dft mr-2' type="submit"> <Link to="../../MyLeave" style={{ textDecoration: 'none', color: "#333333" }}> Back</Link></Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}



