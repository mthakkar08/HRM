import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import emailjs from '@emailjs/browser';
import Forgot_img from '../assets/images/Forgot_img.svg';
import { Button, Form, Card } from 'react-bootstrap';
import hrmLogo from '../assets/images/hrmLogo.png';
import { Navigate } from 'react-router-dom';
import CryptoJS from "crypto-js";
import { decryptData, encryptData } from '../services/EncryptDecrypt';
import { Link } from 'react-router-dom';
import { Notification } from './Notification';
import { ToastContainer } from 'react-toastify';
export default function Forgot() {
    const [email, setEmail] = useState("")
    const form = useRef();

    useEffect(() => {
        localStorage.getItem('myapp-email') && setEmail(decryptData(localStorage.getItem('myapp-email')))
    }, [])


    const secretPass = "XkhZG4fW2t2W";
    let data;
    const encryptData = () => {
        data = CryptoJS.AES.encrypt(
            email,
            secretPass
        ).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result;
        try {
            const response = await axios.post("http://192.168.1.106:8080/hrm/employee/forget",
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            result = response?.data
        }
        catch (error) {
          console.log("error > " > error)
        }
        finally {
            if (result == 'SUCCESS') {
              Notification('Reset Password link sent to your Email!', 'SUCCESS')
            } else {
              Notification(result, 'ERROR')
            }
   
          }

        // if (result) {
        //     let mailBody = {
        //         email,
        //         encEmail: encryptData(email)
        //     }

        //     emailjs.send('service_scn9587', 'template_90feo3j', mailBody, 'rwliDUuHzLR77kNuX')
        //         .then(function (response) {
        //             alert("Email sent to your emailId...")
        //         }, function (error) {
        //             alert("invalid Email..." + error)
        //         });
        // }
        // else {
        //     alert("invalid emailid")
        // }

    }



    return (
    <>
        <ToastContainer />
        <div className="container-fluid" style={{margin:"0px", padding:"0px"}}>
            <div className="row no-gutter"  style={{width:"102%",margin:"-20px"}}>
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
                        <Form ref={form} className='' onSubmit={handleSubmit}>
                            <img src={hrmLogo} width={180} height={120} style={{ marginLeft: "175px" }} />
                            <h3 className="mb-0" style={{ marginLeft: "82px", marginRight: "82px", color: "#383972" }}>Forgot Password?</h3><br></br>
                            <h6 className="mb-0" style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "50px", color: "#383972" }}>Enter your email to get a password reset link </h6>
                            <div style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "82px", marginTop: "30px" }} className='text-left' >
                                <Form.Group className="mb-3">
                                    <Form.Label className="mb-1">Email</Form.Label>
                                    <Form.Control type="email" autoComplete="off" name="email" id="email"
                                        placeholder="example@xyz.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className='m-0'>
                                    <Button type="submit" className="btn btn-primary btn-block shadow-lg m-0" size="lg" disabled={!email}>Reset Password</Button>
                                    <div className="text-right pt-4">Remember your password? <Link to="/">Login</Link>
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







