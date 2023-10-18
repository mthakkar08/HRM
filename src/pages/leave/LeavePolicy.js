import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getLeavePolicyList, deleteLeavePolicy } from "../../services/LeavePolicyService.js";
import Bootbox from 'bootbox-react';
import { Notification } from "../../layouts/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate, Link } from 'react-router-dom';
import AddEditLeavePolicy from './AddEditLeavePolicy';

export default function LeavePolicy(props) {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentLeavePolicyId, setCurrentLeavePolicyId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const { setLoading } = useLoading();

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteLeavePolicy(currentLeavePolicyId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Leave policy deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentLeavePolicyId(null);
      setLoading(false);
    }
    getLeavePolicyDataList();
  }

  useEffect(() => {
    getLeavePolicyDataList();
  }, [])

  async function getLeavePolicyDataList() {
    setLoading(true);
    try {
      await getLeavePolicyList().then(res => {
        setEmployeeList(res)
      });
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
      Notification('Leave policy saved successfully!', 'SUCCESS')
      getLeavePolicyDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "leavePolicyId",
      text: "leavePolicyId",
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
        width: '40%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        columns.startFrom?.replace("/", "-")?.substring(0, 10)
      )
    },
    {
      dataField: "endTo",
      text: "End To",
      sort: true,
      style: {
        width: '40%',
        textAlign: 'left'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        columns.endTo?.replace("/", "-")?.substring(0, 10)
      )
    },
    {
      dataField: "leaveCount",
      text: "Leave Count",
      sort: true,
      style: {
        width: '12%'
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
            <button title="Edit" type="button" onClick={() => { setCurrentLeavePolicyId(columns.leavePolicyId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentLeavePolicyId(columns.leavePolicyId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
          </a>
        </div>
      )
    },
  ]

  return (
    <>
      {show && <AddEditLeavePolicy onDataSave={onDataSave} leavePolicyId={currentLeavePolicyId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Leave Policy </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentLeavePolicyId(0); handleShow() }} >+ Add Leave Policy</Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>

          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'leavePolicyId'}
              id='tbl_employee'
              data={employeeList}
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
            <Button className='btn btn-dft mr-2' type="submit"> <Link to="../../ManageLeave" style={{ textDecoration: 'none', color: "#333333" }}> Back</Link></Button>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this leave policy?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />

    </>
  )
}



