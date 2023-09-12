import React from 'react';
import CryptoJS from "crypto-js";
import axios from "axios";
import bg2 from '../assets/images/bg2.png';
import Forgot_img from '../assets/images/Forgot_img.svg';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import hrmLogo from '../assets/images/hrmLogo.png';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { decryptData } from '../services/EncryptDecrypt';
import { FaEyeSlash, FaEye } from "react-icons/fa";


export default function ResetPassword() {

    const navigate = useNavigate();
    const [passwordType, setPasswordType] = useState("password")
    const [icon, setIcon] = useState(FaEyeSlash)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    let email;

    // const secretPass = "XkhZG4fW2t2W";


    // const decryptData = (text) => {
    //     let bytes = CryptoJS.AES.decrypt(text, secretPass);
    //     email = bytes.toString(CryptoJS.enc.Utf8);
    //     // console.log(email)
    // };


    const [searchParams] = useSearchParams();
    let encEmail = searchParams.get('token');

    console.log('encEmail > ' + encEmail)
    // debugger
    encEmail && (email = decryptData(encEmail))
    console.log('email > ' + email)

    const handleSubmit = async (e) => {
        console.log("inside handleSubmit")
        e.preventDefault();
        setIsSubmitted(true);



        let userProfile = { email, password };
        let result;

        if (password && confirmPassword) {

            try {
                const response = await axios.post("http://192.168.1.106:8080/hrm/employee/reset",
                    JSON.stringify(userProfile),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                result = response?.data
            } catch (error) {
                console.log("error in reset")
            }

        }
        
        if (result === 'SUCCESS') {
            alert('Password Changes Successfully...')
            navigate('/');
        }

    }

    function handleDisable() {
        return confirmPassword && matchPattern(password) && password && confirmPassword === password;
    }

    function matchPattern(password) {
        const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (password.match(decimal)) {
            return true;
        }
        else {
            return false;
        }
    }


    return (
        <><div className="container d-flex align-items-center justify-content-center" style={{ height: "80vh" }} >

            <Card className="shadow rounded" style={{ width: "400px", minWidth: "300px" }}>

                <Form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                    <img src={hrmLogo} width={180} height={120} />
                    <h3 class="mb-0" style={{ color: "#383972" }}>Reset Password</h3><br></br>

                    <div style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "82px", marginTop: "30px" }} className='text-left' >

                        {/* <Form.Group className="mb-3">
                            <Form.Label className="mb-1">Email</Form.Label>
                            <Form.Control type="email" autoComplete="off" name="email" id="email"
                                placeholder="example@xyz.com"
                                value={data}
                                disabled
                            />
                        </Form.Group> */}

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1">New Password</Form.Label>
                            <Form.Control type="password" autoComplete="off" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {!password && isSubmitted && (<span style={{ color: "red" }}>Please Enter Password</span>)}
                            {password && isSubmitted && !matchPattern(password) && (<span style={{ color: "red" }}>password should contain atleast one number and special character</span>)}

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1">Confirm Password</Form.Label>
                            <Form.Control type={passwordType} autoComplete="off" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="button">
                            { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye"></i> }
                            </button>
                            {!confirmPassword && isSubmitted && (<span style={{ color: "red" }}>Please Enter confirm Password</span>)}
                            {confirmPassword && password && confirmPassword !== password && (<span style={{ color: "red" }}>Confirm password should match password</span>)}
                        </Form.Group>


                        <Button type="submit" className="btn btn-primary btn-block shadow-lg m-0 " size="lg" disabled={!handleDisable()}>Reset Password</Button>

                    </div>

                </Form>

            </Card>

        </div>
        </>
    )
}







