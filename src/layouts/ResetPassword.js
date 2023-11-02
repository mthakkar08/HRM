import React from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import bg2 from "../assets/images/bg2.png";
import Forgot_img from "../assets/images/Forgot_img.svg";
import { Nav, Navbar, Button, Form, Col, Row, Card } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import hrmLogo from "../assets/images/hrmLogo.png";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { decryptData } from "../services/EncryptDecrypt";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Notification } from "./Notification";
import { useEffect } from "react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  let resetToken = searchParams.get("token");

  
  useEffect(() => {
    debugger
    let decodedJwt = "";
    if (resetToken) {
      decodedJwt = JSON.parse(atob(resetToken.split(".")[1]));
      if (decodedJwt.exp * 1000 < Date.now()) {
        navigate("/forgot");
        Notification("Link expired please try again!", "ERROR");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    debugger
    console.log("inside handleSubmit");
    e.preventDefault();
    setIsSubmitted(true);

    const userProfile = {
      resetToken: resetToken,
      password: password,
    };
    let result;
    if (password && confirmPassword && password === confirmPassword) {
      try {
        const response = await axios.post(
          "http://192.168.1.106:8080/hrm/employee/reset",
          JSON.stringify(userProfile),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        debugger
        result = response?.data;
      } catch (error) {
        console.log("error in reset");
      }
    }

    if (result === "SUCCESS") {
      navigate("/");
      Notification("Password changed Successfully!", "SUCCESS");
    } else if (result === "ERROR") {
      navigate("/forgot");
      Notification("Link expired please try again!", "ERROR");
    }
  };

  function handleDisable() {
    return confirmPassword && matchPattern(password) && password;
  }

  function matchPattern(password) {
    const decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(decimal)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        <Card
          className="shadow rounded"
          style={{ width: "400px", minWidth: "300px" }}
        >
          <Form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            <img src={hrmLogo} width={180} height={120} />
            <h3 className="mb-0" style={{ color: "#383972" }}>
              Reset Password
            </h3>
            <br></br>

            <div
              style={{
                marginLeft: "82px",
                marginRight: "82px",
                marginBottom: "82px",
                marginTop: "30px",
              }}
              className="text-left"
            >
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
                <div className="input-group-append pass-group">
                  <Form.Control
                    type={passwordType}
                    autoComplete="off"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-end-0 rounded-end-0"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      passwordType === "password"
                        ? setPasswordType("text")
                        : setPasswordType("password")
                    }
                    className="bg-transparent border-bottom border-end border-start-0 border-top px-3 rounded-end rounded-start-0"
                    style={{ cursor: "pointer", color: "#00000096" }}
                  >
                    {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {!password && isSubmitted && (
                  <span style={{ color: "red" }}>Please Enter Password</span>
                )}
                {password && isSubmitted && !matchPattern(password) && (
                  <span style={{ color: "red" }}>
                    password should contain atleast one number and special
                    character
                  </span>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Confirm Password</Form.Label>
                <div className="input-group-append pass-group">
                  <Form.Control
                    type={passwordType2}
                    autoComplete="off"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-end-0 rounded-end-0"
                  />
                  {/* <Form.button type="button">{ passwordType==="password"? <FaEyeSlash/> : <FaEye/>}</Form.button> */}
                  <button
                    type="button"
                    className="bg-transparent border-bottom border-end border-start-0 border-top px-3 rounded-end rounded-start-0"
                    onClick={() =>
                      passwordType2 === "password"
                        ? setPasswordType2("text")
                        : setPasswordType2("password")
                    }
                    style={{ cursor: "pointer", color: "#00000096" }}
                  >
                    {passwordType2 === "password" ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
                {!confirmPassword && isSubmitted && (
                  <span style={{ color: "red" }}>
                    Please Enter confirm Password
                  </span>
                )}
                {confirmPassword &&
                  password &&
                  isSubmitted &&
                  confirmPassword !== password && (
                    <span style={{ color: "red" }}>
                      Confirm password should match password
                    </span>
                  )}
              </Form.Group>

              <Button
                type="submit"
                className="btn btn-primary btn-block shadow-lg m-0 "
                size="lg"
                disabled={!handleDisable()}
              >
                Reset Password
              </Button>
              <Link to="/">Login</Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
