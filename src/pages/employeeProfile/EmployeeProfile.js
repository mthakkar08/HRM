import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEmployeeDetail, addEmployee, bindDesignation, bindReportingEmployee } from "../../services/EmployeeService.js";
import AddEditEmployee from './AddEditEmployeeProfile.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';

export default function EmployeeProfile(props) {



  const location = useLocation();



  const [show, setShow] = useState(true);
  let currentemployeeId;
  const [employeeName, setEmployeeName] = useState("");
  const [EmployeeName, setEmployeeNames] = useState("");
  const [dob, setDob] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [defaultGender, setDefaultGender] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [EmployeeId, setEmployeeId] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [reportingEmployees, setReportingEmployees] = useState("");
  const [designationName, setDesignationName] = useState("");

  const [hiringDate, setHiringDate] = useState("");
  const [status, setStatus] = useState(1);
  const [joiningDate, setJoiningDate] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const [dobErr, setDobErr] = useState(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [numberValidation, setNumberValidation] = useState("");

  const [genderErr, setGenderErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailAddressValidation, setEmailAddressValidation] = useState("");
  const [experienceErr, setExperienceErr] = useState(false);
  const [designationErr, setDesignationErr] = useState(false);
  const [hiringDateErr, setHiringDateErr] = useState(false);

  const [reportingEmpErr, setReportingEmpErr] = useState(false);
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);

  let designationdata = [];
  let reportingdata = [];
  const genderData = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" }
  ];
  const navigate = useNavigate();

  let token = localStorage.getItem('accessToken')
  let employeeId;
  if (token) {
    const cryptoEmail = localStorage.getItem('email')
    employeeId = localStorage.getItem('employeeId')
  }

  useEffect(() => {

    if (!show) {
      props.onDataSave(false);
    }
  }, [show])

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setDataLoading(true);
        {currentemployeeId = location.state.id !=null ? location.state.id : employeeId}
     //   currentemployeeId = location.state.id;
        let designationvalue;
        let reportingemployeeData;
        if (currentemployeeId != null && currentemployeeId != 0) {
          await getEmployeeDetail(currentemployeeId).then(res => {
            setHiringDate(res.hiringDate)
            setJoiningDate(res.joiningDate)
            setTerminationDate(res.terminationDate)
            setEmployeeName(res.employeeName)
            setDob(res.dob)
            setPhoneNumber(res.phoneNumber)
            setEmail(res.email)
            setGender(res.gender)
            setDesignationName(res.designationName)
            setReportingEmployees(res.reportingEmployees)
            setEmployeeNames(res.EmployeeId)
            setExperience(res.experience)
            setAddress(res.address)
            setEmployeeId(res.EmployeeId)
            setDesignationId(res.designationId)
            setStatus(res.status)
            designationvalue = res.designationId
            reportingemployeeData = res.EmployeeId
            const gender = genderData?.find(x => x.value == res.gender);
            if (gender) {
              setDefaultGender(gender);
            }
          });
        }
        
        // await bindReportingEmployeeList();
        // await bindDesignationList();
        const designationListData = designationdata?.find(x => x.designationId == designationvalue);

        setDesignationName({ label: designationListData.designationName, value: designationvalue })

        const reportingempData = reportingdata?.find(x => x.EmployeeId == reportingemployeeData);

        setEmployeeNames({ label: reportingempData.EmployeeName, value: reportingemployeeData })

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
  }, [currentemployeeId])


  function demo() {
    alert("hi");
  }
  return (
    <>

      <div className='card' style={{ padding: "20px", lineHeight: "32px" }}>
        <Row>
          <Col sm={8}>
            <Card>
              <Card.Header as="h6" style={{ backgroundColor: "#51438A", color: "white" }}>
                <Navbar collapseOnSelect expand="sm" variant="dark" style={{ marginTop: "-8px", marginBottom: "-8px" }} >
                  <Nav.Link style={{ color: 'White', fontSize: "18px" }}><BsFileEarmarkText /> Employee Profile </Nav.Link>

                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link onClick={demo}><BsFillPencilFill /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar >
              </Card.Header>

              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <h3 style={{ margin: "5px", padding: "5px" }}>{employeeName}</h3>
                    <table class="table table-borderless" style={{ backgroundColor: "white" }}>
                      <tbody>
                        <tr>
                          <th style={{ width: "100px" }}>Joining Date:</th>
                          <td>{joiningDate}</td>
                        </tr>
                        <tr>
                          <th style={{ width: "100px" }}>Designation:</th>
                          <td>{designationName}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col sm={8}>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th>Gender:</th>
                          <td><div>
          {
            gender == 1 ? (<span style={{ borderRadius: "2px", border: "none" }}>Male</span>) :
              <span style={{ borderRadius: "2px", border: "none" }}>Female</span>
          }
        </div></td>
                        </tr>
                        <tr>
                          <th>Dob:</th>
                          <td>{dob}</td>
                        </tr>
                        <tr>
                          <th>Experience:</th>
                          <td>{experience}</td>
                        </tr>
                        <tr>
                          <th>Hiring Date:</th>
                          <td>{hiringDate}</td>
                        </tr>
                        <tr>
                          <th>Termination Date:</th>
                          <td>{terminationDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <Button variant="primary">Send Message</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>

            <Card style={{ height: "334px" }}>
              <Card.Header as="h6" style={{ backgroundColor: "#51438A", color: "white" }}>
                <Navbar collapseOnSelect expand="sm" variant="dark" style={{ marginTop: "-8px", marginBottom: "-8px" }} >
                  <Nav.Link style={{ color: 'White', fontSize: "18px" }}><BsFileEarmarkText /> Contact Detail </Nav.Link>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link onClick={demo}><BsFillPencilFill /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar >
              </Card.Header>

              <Card.Body>
                <Row>
                  <Col sm={12}>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th style={{ width: "140px" }}>Phone Number</th>
                          <td>{phoneNumber}</td>
                        </tr>
                        <tr>
                          <th>Email:</th>
                          <td>{email}</td>
                        </tr>
                        <tr>
                          <th>Address:</th>
                          <td>{address}</td>
                        </tr>

                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

          </Col>
        </Row>





        <Row style={{ marginTop: "20px" }}>
          <Col sm={6}>
            <Card>
              <Card.Header as="h6" style={{ backgroundColor: "#51438A", color: "white" }}>
                <Navbar collapseOnSelect expand="sm" variant="dark" style={{ marginTop: "-8px", marginBottom: "-8px" }} >
                  <Nav.Link style={{ color: 'White', fontSize: "18px" }}><BsFileEarmarkText /> Reporting Employee </Nav.Link>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link onClick={demo}><BsFillPencilFill /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar >
              </Card.Header>

              <Card.Body>


                <table class="table table-borderless">
                  <tbody>
                
                    <ul className="list-group" style={{listStyleType:"none"}}>
                      {reportingEmployees?.split(",")?.map(reportingEmployees => (
                        <li >{reportingEmployees} </li>
                      ))}
                    </ul>     
                  </tbody>
                </table>

                <Button variant="primary">Send Message</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>

            <Card style={{ height: "334px" }}>
              <Card.Header as="h6" style={{ backgroundColor: "#51438A", color: "white" }}>
                <Navbar collapseOnSelect expand="sm" variant="dark" style={{ marginTop: "-8px", marginBottom: "-8px" }} >
                  <Nav.Link style={{ color: 'White', fontSize: "18px" }}><BsFileEarmarkText /> Leave Management </Nav.Link>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                      <Nav.Link onClick={demo}><BsFillPencilFill /></Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar >
              </Card.Header>

              <Card.Body>
                <Row>
                  <Col sm={12}>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <th style={{ width: "140px" }}>Start From </th>
                          <td>31/04/2023</td>
                        </tr>
                        <tr>
                          <th>End To</th>
                          <td>01/05/2024</td>
                        </tr>
                        <tr>
                          <th>Leave Count</th>
                          <td>15</td>
                        </tr>

                      </tbody>
                    </table>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

          </Col>
        </Row>

      </div>

    </>
  )
}



