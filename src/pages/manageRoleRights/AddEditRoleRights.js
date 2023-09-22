import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getManageRoleRightsList, addManageRoleRights, getManageRoleRightsDetail, getAccessRightsList} from "../../services/ManageRoleRightsServices.js";

import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { Checkbox } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';

export default function AddEditRoleRights() {


  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);
  const [MenuName, setMenuName] = useState("");
const [RoleId,setRoleId]  = useState("");
  const [RoleName, setRoleName] = useState("");
  const [MenuId, setMenuId] = useState("");
  const { setLoading } = useLoading();

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    (async function () {
      debugger;
      try {
        setLoading(true);
        setDataLoading(true);
        currentRoleId = location.state.id;
    
        if (currentRoleId != null && currentRoleId != 0) {
          await getManageRoleRightsDetail(currentRoleId).then(res => {
          debugger;
          setCurrentRoleId(res.RoleId)
          setMenuName(res.MenuName)
          setMenuId(res.MenuId)
          });
        }
 

      }
      catch (error) {

      }
      finally {
        setTimeout(() => {
          setDataLoading(false);
          setLoading(false);
        }, 1200);
      }
    })();
  }, [currentRoleId])





  const handleSearch = (e) => {
    e.preventDefault();
    getEmployeeDataList();
  };

  useEffect(() => {
    getEmployeeDataList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setMenuName("");
    await getAccessRightsList("").then(res => { setEmployeeList(res) });

  }

  async function getEmployeeDataList() {
    setLoading(true);
    try {
      await getAccessRightsList(currentRoleId, RoleName, MenuId,MenuName).then(res => {
         debugger;
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
      Notification('Employee saved successfully!', 'SUCCESS')
      getEmployeeDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "MenuId",
      text: "MenuId",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "MenuName",
      text: "MenuName",
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
        <a href={employeeList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" id={`viewId`}  />
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
        <a href={employeeList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" id={`viewId`}  />
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
        <a href={employeeList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" id={`viewId`}  />
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
        <a href={employeeList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" id={`viewId`}  />
        </a>
        </div>
      )
    }
  ]

  return (
    <>
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Edit Role</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
            
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
            <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Role Name</Form.Label>
                  <Form.Control type="text" value={MenuName} onChange={(e) => setMenuName(e.target.value)}  />
                </Col>
              </Row>

            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'roleId'}
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
          <div style={{textAlign:"right",paddingRight:"20px", paddingBottom:"20px"}}>
          <Button className='btn btn-dft mr-2' type="submit"> <Link to="../../ManageRoleRights" style={{textDecoration:'none', color:"#333333"}}> Back</Link></Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
            </div>
        </ListGroup.Item>
      </ListGroup>

    </>
  )
}



