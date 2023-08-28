import React from 'react';

import bg2 from '../assets/images/bg2.png';
import hrmLogo from '../assets/images/hrmLogo.png';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

function Login() {
    return (
        <><div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-8" style={{ backgroundColor: "#f0f0ff" }}>
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto  ">
                                    <div>
                                        {/* <img src={hrmLogo} width={300}  />  */}

                                        <img src={bg2} alt="BigCo Inc. logo" />
                                        <h6 className="display-6" style={{ color: "#191a5a", marginLeft: "115px" }}><b>HR Management</b></h6>
                                    </div>
                                    {/* {/ <Button type="button" className="btn btn-primary btn-block shadow-lg" size="lg">Login With OKTA</Button> /} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-none d-md-flex" style={{ backgroundColor: "#dbdbf3" }}>



                    <Card className="login-form">

                        <Form className=''>
                            <img src={hrmLogo} width={180} height={120} style={{ marginLeft: "175px" }} />
                            <h3 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", color: "#383972" }}>Welcome to HRM!</h3><br></br>
                            <h6 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "50px", color: "#383972" }}>Please sign-in to your account and start your journey. </h6>

                            <div style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "82px", marginTop: "30px" }} className='text-left' >
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-1">Email</Form.Label>
                                    <Form.Control type="text" autoComplete="off" name="countryname" id="countryname"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-1">Password</Form.Label>
                                    <Form.Control type="text" autoComplete="off" name="countrycode" id="countrycode"
                                    />
                                </Form.Group>
                                <Form.Group className='m-0'>
                                    <input type="checkbox" name="remember" id="remember" />
                                    <label for="remember" class="ml-2">Remember me</label>
                                    <Button type="button" className="btn btn-primary btn-block shadow-lg m-0" size="lg">Login</Button>
                                    <div className="text-right pt-4"> <a href="/Forgot" >Forgot Password</a>
                                    </div>
                                </Form.Group>
                            </div>

                        </Form>

                    </Card>



                </div>
            </div>
        </div>
        </>
    )
}


export default Login;





