import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEmployeeDetail, addEmployee } from "../../services/EmployeeServices.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../components/Notification.js'
import Select from 'react-select';

export default function AddEditEmployee(props) {

  const [show, setShow] = useState(true);
  const currentemployeeId = props.employeeId;
  const [employeeName, setEmployeeName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [hiringDate, setHiringDate] = useState("");
  const [status, setStatus] = useState("");
  const [joiningDate, setJoiningDate] =  useState("");
  const [terminationDate, setTerminationDate] =  useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const [dobErr, setDobErr] = useState(false);
  const [phoneNumberErr, setPhoneNumberErr] = useState(false);
  const [numberValidation, setNumberValidation] = useState("");

  const [genderErr, setGenderErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [emailAddressValidation, setEmailAddressValidation] = useState("");
  const [experienceErr, setExperienceErr] = useState(false);
  const [hiringDateErr, setHiringDateErr] = useState(false);
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);

  const genderData = [
    { label: "Male", value: "0" },
    { label: "Female", value: "1" }
  ];

  function genderHandler(e) {
    setGender(e.target.value);
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
        if (currentemployeeId != null && currentemployeeId != 0) {
          await getEmployeeDetail(currentemployeeId).then(res => {
            setEmployeeName(res.employeeName)
            setDob(res.dob)
            setPhoneNumber(res.phoneNumber)
            setEmail(res.email)
            setGender(res.gender)
            setDesignation(res.designation)
            setExperience(res.experience)
            setAddress(res.address)
            setHiringDate(res.hiringDate)
            setJoiningDate(res.joiningDate)
            setTerminationDate(res.terminationDate)
            setStatus(res.status)
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
  }, [currentemployeeId])

  function EmployeeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEmployeeNameErr(true)
    } else {
      setEmployeeNameErr(false)
    }
    setEmployeeName(item);
  }

  function DoBHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setDobErr(true)
    } else {
      setDobErr(false)
    }
    setDob(item);
  }

  const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  function phoneNumberHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setPhoneNumberErr(true)
    } else if (!numberRegex.test(item)) {
      setPhoneNumberErr(true)
    }
    setPhoneNumber(item);
  }


  const emailRegex = /^[a-zA-Z0-9-.]+@+[a-zA-Z0-9]+.+[A-z]/;

  function EmailHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEmailErr(true)
    } else if (!emailRegex.test(item)) {
      setEmailErr(true)
    }
    setEmail(item);
  };

  function experienceHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setExperienceErr(true)
    } else {
      setExperienceErr(false)
    }
    setExperience(item);
  }

  function hiringDateHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setHiringDateErr(true)
    } else {
      setHiringDateErr(false)
    }
    setHiringDate(item);
  }

  async function SaveEmployee(e) {
    debugger;
    e.preventDefault();
    setLoading(true);
    let message = '';
    let errormsg = '';
    let validate = true;

    try {
      if (employeeName == undefined || employeeName.trim() == null || employeeName.trim() == "") {
        validate = false;
        setEmployeeNameErr(true);
        return;
      }
      else {
        setEmployeeNameErr(false);
      }

      if (dob == undefined || dob.trim() == null || dob.trim() == "") {
        validate = false;
        setDobErr(true);
        return;
      }
      else {
        setDobErr(false);
      }

      if (phoneNumber == undefined || phoneNumber.trim() == null || phoneNumber.trim() == "") {
        validate = false;

        setNumberValidation("Please enter phone number")
        setPhoneNumberErr(true);
        return;
      }
      else if (!numberRegex.test(phoneNumber)) {
        validate = false;
        setNumberValidation("Please enter valid phone number")
        setPhoneNumberErr(true);

        return;
      } else {
        setPhoneNumberErr(false);
      }


      if (email == null || email == "") {
        setEmailErr(true);
        setEmailAddressValidation("Please enter email address")
        validate = false;
        return;
      }
      else if (!emailRegex.test(email)) {
        setEmailAddressValidation("Please enter valid email address")
        setEmailErr(true);
        validate = false;
        return;
      } else {
        setEmailErr(false);
      }

      if (experience == undefined || experience.trim() == null || experience.trim() == "") {
        validate = false;
        setExperienceErr(true);
        return;
      }
      else {
        setExperienceErr(false);
      }

      if (hiringDate == undefined || hiringDate.trim() == null || hiringDate.trim() == "") {
        validate = false;
        setHiringDateErr(true);
        return;
      }
      else {
        setHiringDateErr(false);
      }

      await addEmployee(currentemployeeId, employeeName, dob, gender, phoneNumber, email, address, designation, experience, status, hiringDate, joiningDate, terminationDate).then(res => {
      
        message = res.toString();
      });
    }
    catch (error) {
      errormsg = error.message;
    }
    finally {
      setLoading(false);
      if (validate) {
        if (errormsg !== '') {
          Notification(errormsg, 'ERROR')
        }
        else {
          props.onDataSave(true, message);
        }
      }
    }
  }

  return (
    <>
      <Modal
        show={show && !dataLoading}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        className="main-class lg2"
      >
        <Modal.Header closeButton>
          {currentemployeeId == null || currentemployeeId == 0 ? <Modal.Title>Add Employee</Modal.Title> : <Modal.Title>Update Employee</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEmployee}>
          <Modal.Body>
            <div className="row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Employee Name</Form.Label>
                <Form.Control type="text" autoComplete="off" name="employeeName" id="employeeName"
                  value={employeeName} onChange={EmployeeHandler} />{employeeNameErr ? <span style={{ color: 'red' }}>Please enter employee name</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Dob</Form.Label>
                <Form.Control type="date" autoComplete="off" name="dob" id="dob"
                  value={dob} onChange={DoBHandler} />{dobErr ? <span style={{ color: 'red' }}>Please select dob</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Phone Number</Form.Label>
                <Form.Control type="text" autoComplete="off" name="phoneNumber" id="phoneNumber"
                  value={phoneNumber} onChange={phoneNumberHandler} />{phoneNumberErr ? <span style={{ color: 'red' }}>{numberValidation}</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Email Address</Form.Label>
                <Form.Control type="text" autoComplete="off" name="email" id="email"
                  value={email} onChange={EmailHandler} />{emailErr ? <span style={{ color: 'red' }}>{emailAddressValidation} </span> : null}
              </Form.Group>

              {/* <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1'>Gender</Form.Label>
                <Select
                  value={gender}
                  options={genderData.map(({ label, value }) => ({ label: label, value: value }))}
                  onChange={genderHandler}
                  defaultMenuIsOpen={false}
                  id="genderId">
                </Select>
              </Form.Group> */}

              <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1'>Designation</Form.Label>
                <Select
                  // value = {designation}
                  // options={designation.map(({ label, value }) => ({ label: label, value: value }))}
                  // onChange={designationHandler}
                  defaultMenuIsOpen={false}
                  id="designationId">
                </Select>
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Experience</Form.Label>
                <Form.Control type="text" autoComplete="off" name="experience" id="experience"
                  value={experience} onChange={experienceHandler} />
                {experienceErr ? <span style={{ color: 'red' }}>Please enter Experience</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Address</Form.Label>
                <Form.Control type="address" autoComplete="off" name="address" id="address"
                  as="textarea" value={address} onChange={(e) => { setAddress(e.target.value) }}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Hiring Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="hiringDate" id="hiringDate"
                  value={hiringDate} onChange={hiringDateHandler} />{hiringDateErr ? <span style={{ color: 'red' }}>Please enter Hiring Date</span> : null}
              </Form.Group>

             

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Joining Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="joiningDate" id="joiningDate" 
                value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)}  />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Termination Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="terminationDate" id="terminationDate" 
                value={terminationDate} onChange={(e) => setTerminationDate(e.target.value)}  />
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}