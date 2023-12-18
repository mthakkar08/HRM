import "../../assets/styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useRef } from "react";
import { Nav, Navbar, Col, Row, Card } from "react-bootstrap";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function EmployeePolicy(props) {

    // const navigate = useNavigate();
    // useEffect(() => {
    //     debugger;
    //     const token = localStorage.getItem("accessToken");
    //     let decodedJwt="";
    //     if(token == ''  || token == null){
    //         navigate("/");
    //     }else{
    //     decodedJwt = JSON.parse(atob(token.split(".")[1]));
    //     if (decodedJwt.exp * 1000 < Date.now()) {
    //         delete localStorage.removeItem("accessToken");
    //         navigate("/");
    //     }
    //     }
    // }, []);

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const handleBlur = () => {
        //console.log(editor.current.value)
        setContent(editor.current.value)
      }
    let token = localStorage.getItem("accessToken");
    let employeeId;
    if (token) {
        const cryptoEmail = localStorage.getItem("email");
        employeeId = localStorage.getItem("employeeId");
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
                                        {/* <Nav>
                                            <Nav.Link onClick={demo}>
                                                <BsFillPencilFill />
                                            </Nav.Link>
                                        </Nav> */}
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
