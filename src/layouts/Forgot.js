import React, { useState } from 'react';

import bg2 from '../assets/images/bg2.png';
import Forgot_img from '../assets/images/Forgot_img.svg';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import hrmLogo from '../assets/images/hrmLogo.png';
export default function Forgot() {

    const [email, setEmail] = useState("")

    const handleSubmit = () => {
        
    }


    return (
        <><div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-8" style={{ backgroundColor: "#f0f0ff" }}>
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto  ">
                                    <div>
                                        <img src={Forgot_img} alt="BigCo Inc. logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-none d-md-flex" style={{ backgroundColor: "#dbdbf3" }}>



                    <Card className="login-form">

                        <Form className='' onSubmit={handleSubmit}>
                            <img src={hrmLogo} width={180} height={120} style={{ marginLeft: "175px" }} />
                            <h3 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", color: "#383972" }}>Forgot Password?</h3><br></br>
                            <h6 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "50px", color: "#383972" }}>Enter your email to get a password reset link </h6>

                            <div style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "82px", marginTop: "30px" }} className='text-left' >
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-1">Email</Form.Label>
                                    <Form.Control type="text" autoComplete="off" name="email" id="email"
                                        placeholder="example@xyz.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className='m-0'>
                                    <Button type="button" className="btn btn-primary btn-block shadow-lg m-0" size="lg">Reset Password</Button>
                                    <div className="text-right pt-4">Remember your password? <a href="/Login" >Login</a>
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







