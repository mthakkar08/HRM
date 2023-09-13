import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import bg2 from '../assets/images/bg2.png';
import hrmLogo from '../assets/images/hrmLogo.png';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { decryptData, encryptData } from '../services/EncryptDecrypt';

import { ReactSession } from 'react-client-session';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPasswrd] = useState("");
  const [passwordType, setPasswordType] = useState("password")
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    localStorage.getItem('myapp-email') && setEmail(decryptData(localStorage.getItem('myapp-email')))
    localStorage.getItem('myapp-password') && setPasswrd(decryptData(localStorage.getItem('myapp-password')))
    // setEmail(localStorage.getItem('myapp-email'))
    // setPasswrd(localStorage.getItem('myapp-password'))
    const token = localStorage.getItem('accessToken')
    console.log(token)
    if (token) {
      navigate('/dashboard');
    }
  }, []);

  const emailInput = useCallback((email) => {
    if (email) {
      email.focus();
    }
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setisSubmitted(true);
    remember();
    let userProfile = { email, password };



    let accessToken, isEnabled;
    try {
      const response = await axios.post("http://192.168.1.106:8080/hrm/employee/login",
        JSON.stringify(userProfile),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      // console.log(response?.data?.userDetails?.enabled)
      isEnabled = response?.data?.userDetails?.enabled;
      accessToken = response?.data?.jwttoken;
      // accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaXJhdi50QGNlbWVudGRpZ2l0YWwuY29tIiwiZXhwIjoxNjk0NDI5NTczLCJpYXQiOjE2OTQ0MTE1NzN9.YyqQZxyBMSpD6UIcuyt_zKWubRqHT79i9_vVbOGbIE0wqKOR1TWo1a4pCPB5xaRt4a_v4h2WACY_4Uix2Nb_cA";
      console.log("accesstoken :" + accessToken)

    }
    catch (error) {
      console.log("error > " > error)
    }

    if (isEnabled) {

    }

    if (accessToken && isEnabled) {


      ReactSession.setStoreType("localStorage");
      let cryptoEmail = encryptData(email);
      ReactSession.set('email', cryptoEmail);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('email', cryptoEmail);
      navigate('/dashboard');
    }
    else if (isEnabled) {
      alert("Your account is disabled please contact support team!")
    }
    else {
      alert("invalid username or password")
    }

  };

  function handleDisable() {
    return email && password && matchPattern(password);
  }

  const remember = () => {

    if (isRemember) {
      let cryptoEmail = encryptData(email);
      let cryptoPassword = encryptData(password);
      localStorage.setItem("myapp-email", cryptoEmail); localStorage.setItem("myapp-password", cryptoPassword)
    }
    else {
      localStorage.removeItem("myapp-email"); localStorage.removeItem("myapp-password")
    }
  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    console.log("is > " + isRemember)
    setIsRemember(!isRemember)

  }

  function matchPattern(password) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal)) {
      return true;
    }
    else {
      return false;
    }
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
            <Form className='' onSubmit={handleSubmit}>
              <img src={hrmLogo} width={180} height={120} style={{ marginLeft: "175px" }} />
              <h3 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", color: "#383972" }}>Welcome to HRM!</h3><br></br>
              <h6 class="mb-0" style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "50px", color: "#383972" }}>Please sign-in to your account and start your journey. </h6>
              <div style={{ marginLeft: "82px", marginRight: "82px", marginBottom: "82px", marginTop: "30px" }} className='text-left' >
                <Form.Group className="mb-3">
                  <Form.Label className="mb-1">Email</Form.Label>
                  <Form.Control type="email" autoComplete="off" name="email" id="email"
                    placeholder="example@xyz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailInput}
                  />
                  {!email && isSubmitted && (
                    <span style={{ color: "red" }}>Please enter emailId</span>
                  )}
                </Form.Group>

                <Form.Label className="mb-1">Password</Form.Label>
                <Form.Group className="mb-3" style={{ display: "flex", width: "414px" }}>

                  <Form.Control type={passwordType} autoComplete="off" name="password" id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPasswrd(e.target.value)}
                    autoFocus
                  />
                  <Link onClick={() => passwordType === 'password' ? setPasswordType("text") : setPasswordType("password")} style={{ cursor: "pointer", color: "#333333", marginTop: "5px", marginLeft: "8px" }}>
                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}</Link>
                  {!password && isSubmitted && (
                    <span style={{ color: "red" }}>
                      Please Enter Password
                    </span>
                  )}
                  {password && !matchPattern(password) && (<span style={{ color: "red" }}>password should contain atleast one number and special character</span>)}
                </Form.Group>
                <Form.Group className='m-0'>
                  <input type="checkbox" name="remember" id="remember" checked={isRemember} onChange={handleChange} />
                  {/* <input type="checkbox" name="remember" id="remember" value={isRemember} onChange={isRemember?setIsRemember(false):setIsRemember(true)} /> */}
                  <label for="remember" class="ml-2">Remember me</label>
                  <Button type="submit" className="btn btn-primary btn-block shadow-lg m-0" size="lg" disabled={!handleDisable()}>Login</Button>
                  <div className="text-right pt-4"><Link to="/Forgot">Forgot Password</Link>
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





