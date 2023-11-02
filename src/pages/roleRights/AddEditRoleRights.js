import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';

import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getManageRoleRightsDetail, getAccessRightsList, updateMenuAccessRights } from "../../services/ManageRoleRightsServices.js";
import { Notification } from "../../layouts/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { object } from 'yup';
import { ToastContainer } from 'react-toastify';

export default function AddEditRoleRights() {


  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [roleRightList, setRoleRightList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);
  const [MenuName, setMenuName] = useState("");
  const [RoleId,setRoleId]  = useState("");
  const [RoleName, setRoleName] = useState("");
  const [MenuId, setMenuId] = useState("");
  const { setLoading } = useLoading();
  const [ischecked, setChecked] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [currentMenuId, setCurrentMenuId] = useState(null);
  
  //const [accessRight, setAccessRight] = useState({})
  async function handleSave(e){
    debugger
    let MenuAccessRightList = [];
    var element = document.getElementById('tbl_employee');
    var checkboxes = element.getElementsByTagName('input');
    
    let message='';
      for (var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
          var splrow = checkboxes[i].value.split("_");
          const jsonObj={
            "RoleId" : location.state.id,
            "MenuId" : splrow[0],
            "AccessId" : splrow[1]
          }
          MenuAccessRightList.push(jsonObj);
        }
      }
      try{
        await updateMenuAccessRights(MenuAccessRightList).then(res => {
          message = res;
        });
      }catch (error) {
        message = error.message;
      }
      finally {
        setLoading(false);
        
          if (message == "SUCCESS") {
            Notification(message, "SUCCESS");
          }
          else {
            Notification(message, 'ERROR')
          }
        
      }
      
    
  }
  
  

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setDataLoading(true);
        let currentRoleId=location.state.id;
    
        if (currentRoleId != null && currentRoleId != 0) {
          await getManageRoleRightsDetail(currentRoleId).then(res => {
              setRoleRightList(res);
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
    setRoleName("");
    await getAccessRightsList("").then(res => { setEmployeeList(res) });

  }

  async function getEmployeeDataList() {
    setLoading(true);
    try {
      await getAccessRightsList(currentRoleId, RoleName, MenuId, MenuName).then(res => {
        setEmployeeList(res)
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
      dataField: "ViewRightId",
      text: "View",
      sort: true,
      style: {
        padding: '3px',
        margin: '0px',
        width: '15%',
        textAlign: 'center'
      },
      headerStyle: { textAlign : 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={roleRightList.value} style={{ display: 'inline-flex', padding:"4px" }} >
            <Form.Check inline name="group1" type="checkbox" value={columns.MenuId+"_1"} defaultChecked={cell} id={`viewId`}  /> 
          </a>
        </div>
      )
    },
    {
      dataField: "CreateRightId",
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
        {/* <a href={roleRightList.value} style={{ display: 'inline-flex', padding:"4px" }} > */}
        <Form.Check inline name="group1" type="Checkbox" value={columns.MenuId+"_2"} defaultChecked={cell} id={`viewId`}  />
        {/* </a> */}
        </div>
      )
    },
    {
      dataField: "EditRightId",
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
        <a href={roleRightList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" value={columns.MenuId+"_3"} defaultChecked={cell} id={`viewId`}  />
        </a>
        </div>
      )
    },
    {
      dataField: "DeleteRightId",
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
       <a href={roleRightList.value} style={{ display: 'inline-flex', padding:"4px" }} >
        <Form.Check inline name="group1" type="Checkbox" value={columns.MenuId+"_4"} defaultChecked={cell} id={`viewId`}  />
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
                  <Form.Control type="text" value={RoleName} onChange={(e) => setRoleName(e.target.value)}  />
                </Col>
              </Row>

            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'roleId'}
              id='tbl_employee'
              data={roleRightList}
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
            <Button className='btn btn-primary' type="submit"  onClick={(e) => { handleSave(e)}}>Save</Button> 
            </div>
        </ListGroup.Item>
      </ListGroup>

    </>
  )

            }


