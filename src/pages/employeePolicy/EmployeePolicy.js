import "../../assets/styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect, useRef } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from "react-bootstrap";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEmployeeDetail, bindReportingEmployee } from "../../services/EmployeeService.js";
import { useLoading } from "../../LoadingContext.js";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import JoditEditor from 'jodit-react';

export default function EmployeePolicy(props) {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const handleBlur = () => {
        console.log(editor.current.value)
        setContent(editor.current.value)
      }

    const location = useLocation();
    const [show, setShow] = useState(true);
    const [employeeName, setEmployeeName] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [experience, setExperience] = useState("");
    const [address, setAddress] = useState("");
    const [reportingEmployees, setReportingEmployees] = useState("");
    const [designationName, setDesignationName] = useState("");
    const [hiringDate, setHiringDate] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [terminationDate, setTerminationDate] = useState("");
    let designationdata = [];
    let reportingdata = [];
    const genderData = [
        { label: "Male", value: "1" },
        { label: "Female", value: "2" },
    ];
    const navigate = useNavigate();

    let token = localStorage.getItem("accessToken");
    let employeeId;
    if (token) {
        const cryptoEmail = localStorage.getItem("email");
        employeeId = localStorage.getItem("employeeId");
    }

    useEffect(() => {
        if (!show) {
            props.onDataSave(false);
        }
    }, [show]);
    let currentemployeeId = null;
    currentemployeeId = localStorage.getItem("employeeId");
    useEffect(() => {
        (async function () {
            try {
                debugger;
                currentemployeeId =
                    location.state != null ? location.state.id : currentemployeeId;
                let designationvalue;
                let reportingemployeeData;
                if (currentemployeeId != null && currentemployeeId != 0) {
                    await getEmployeeDetail(currentemployeeId).then((res) => {
                        debugger;
                        setHiringDate(res.hiringDate);
                        setJoiningDate(res.joiningDate);
                        setTerminationDate(res.terminationDate);
                        setEmployeeName(res.employeeName);
                        setDob(res.dob);
                        setPhoneNumber(res.phoneNumber);
                        setEmail(res.email);
                        setGender(res.gender);
                        setDesignationName(res.designationName);
                        setReportingEmployees(res.reportingEmployeeNames);
                        setExperience(res.experience);
                        setAddress(res.address);
                        designationvalue = res.designationId;
                        reportingemployeeData = res.EmployeeId;
                        const gender = genderData?.find((x) => x.value == res.gender);
                    });
                }

                // await bindReportingEmployeeList();
                // await bindDesignationList();
                const designationListData = designationdata?.find(
                    (x) => x.designationId == designationvalue
                );

                setDesignationName({
                    label: designationListData.designationName,
                    value: designationvalue,
                });

                const reportingempData = reportingdata?.find(
                    (x) => x.EmployeeId == reportingemployeeData
                );
            } catch (error) {
            } finally {
                setTimeout(() => { }, 1200);
            }
        })();
    }, [currentemployeeId]);

    function demo() {
        alert("hi");
    }
    return (
        <>
            <div className="card" style={{ padding: "20px", lineHeight: "32px" }}>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header
                                as="h6"
                                style={{ backgroundColor: "#51438A", color: "white" }}
                            >
                                <Navbar
                                    collapseOnSelect
                                    expand="sm"
                                    variant="dark"
                                    style={{ marginTop: "-8px", marginBottom: "-8px" }}
                                >
                                    <Nav.Link style={{ color: "White", fontSize: "18px" }}>
                                        <BsFileEarmarkText /> Employee Policy{" "}
                                    </Nav.Link>

                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto"></Nav>
                                        <Nav>
                                            <Nav.Link onClick={demo}>
                                                <BsFillPencilFill />
                                            </Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                            </Card.Header>

                            <Card.Body>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    // config={config}
                                    tabIndex={1}
                                    onBlur={handleBlur}
                                    onChange={newContent => { }}
                                />

                                {/* {content} */}

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

            </div>
        </>
    );
}
