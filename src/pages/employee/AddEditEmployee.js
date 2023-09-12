import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEmployeeDetail, addEmployee, bindDesignation } from "../../services/EmployeeService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../components/Notification.js'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddEditEmployee(props) {

  const [show, setShow] = useState(true);
  const currentemployeeId = props.employeeId;
  const [employeeName, setEmployeeName] = useState("");
  const [dob, setDob] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [defaultGender, setDefaultGender] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [designationList, setDesignationList] = useState([]);
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
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);
  let designationdata = [];
  const genderData = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" }
  ];

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
        let designationvalue;
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
            setDesignationName(res.designationId)
            setExperience(res.experience)
            setAddress(res.address)
            setDesignationId(res.designationId)
            setStatus(res.status)
            designationvalue = res.designationId
          
            const gender = genderData?.find(x => x.value == res.gender);
            if (gender) {
              setDefaultGender(gender);
            }
          });
        }
        await bindDesignationList();
        const designationListData = designationdata?.find(x => x.designationId == designationvalue);
      
        setDesignationName({ label: designationListData.designationName, value: designationvalue })
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

  async function bindDesignationList() {
    setLoading(true);
    try {
      await bindDesignation().then(res => {
        setDesignationList(res)
        designationdata = res;
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

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

  function genderHandler(e) {
    let item = e.value;
    if (item == null || item == "") {
      setGenderErr(true);
    } else {
      setGenderErr(false)
    }
    setGender(item);
    const gender = genderData?.find(x => x.value === item);
    if (gender) {
      setDefaultGender(gender);
    }
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

  function designationHandler(e) {
    debugger;
    let item = e.value;
    if (item == null || item == "") {
      setDesignationErr(true);
    } else {
      setDesignationErr(false)
    }
    setDesignationId(item);

    const DesignationData = designationList?.find(x => x.value === item);
    if (DesignationData) {
      setDesignationName(DesignationData);
    }
  }

  async function SaveEmployee(e) {
    debugger;
    e.preventDefault();
    setLoading(true);
    let message = '';

    let validate = true;

    try {
      if (employeeName == undefined || employeeName.trim() == null || employeeName.trim() == "") {
        validate = false;
        setEmployeeNameErr(true);
      }
      else {
        setEmployeeNameErr(false);
      }

      if (dob == undefined || dob == null || dob == "") {
        validate = false;
        setDobErr(true);
      }
      else {
        setDobErr(false);
      }

      if (phoneNumber == null || phoneNumber == "") {
        validate = false;

        setNumberValidation("Please enter phone number")
        setPhoneNumberErr(true);
      }
      else if (!numberRegex.test(phoneNumber)) {
        validate = false;
        setNumberValidation("Please enter valid phone number")
        setPhoneNumberErr(true);

      } else {
        setPhoneNumberErr(false);
      }


      if (email == null || email == "") {
        setEmailErr(true);
        setEmailAddressValidation("Please enter email address")
        validate = false;
      }
      else if (!emailRegex.test(email)) {
        setEmailAddressValidation("Please enter valid email address")
        setEmailErr(true);
        validate = false;
      } else {
        setEmailErr(false);
      }

      if (experience == undefined || experience.trim() == null || experience.trim() == "") {
        validate = false;
        setExperienceErr(true);
      }
      else {
        setExperienceErr(false);
      }

      if (hiringDate == undefined || hiringDate.trim() == null || hiringDate.trim() == "") {
        validate = false;
        setHiringDateErr(true);
      }
      else {
        setHiringDateErr(false);
      }

      if (designationId == null || designationId == "") {
        validate = false;
        setDesignationErr(true);
      }
      else {
        setDesignationErr(false);
      }

      if (gender == null || gender == "") {
        validate = false;
        setGenderErr(true);
      }
      else {
        setGenderErr(false);
      }

      await addEmployee(currentemployeeId, employeeName, dob, gender, phoneNumber, email, address, designationId, experience, status, hiringDate, joiningDate, terminationDate).then(res => {
        message = res.toString();
      });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      setLoading(false);
      if (validate) {
        if (message == "SUCCESS") {
          props.onDataSave(true, message);
        }
        else {
          Notification(message, 'ERROR')
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
                <Form.Label className="mb-1 required">Employee Name</Form.Label>
                <Form.Control type="text" autoComplete="off" name="employeeName" id="employeeName"
                  value={employeeName} onChange={EmployeeHandler} />{employeeNameErr ? <span style={{ color: 'red' }}>Please enter employee name</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1 required">Dob</Form.Label>
                <Form.Control type="date" autoComplete="off" name="dob" id="dob"
                  value={dob?.replace("/", "-")?.substring(0, 10)} onChange={DoBHandler} />{dobErr ? <span style={{ color: 'red' }} dateFormat="yyyy/MM/DD">Please select dob</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1 required">Phone Number</Form.Label>
                <Form.Control type="text" autoComplete="off" name="phoneNumber" id="phoneNumber"
                  value={phoneNumber} onChange={phoneNumberHandler} />{phoneNumberErr ? <span style={{ color: 'red' }}>{numberValidation}</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1 required">Email Address</Form.Label>
                <Form.Control type="text" autoComplete="off" name="email" id="email"
                  value={email} onChange={EmailHandler} />{emailErr ? <span style={{ color: 'red' }}>{emailAddressValidation} </span> : null}
              </Form.Group>

              <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1 required'>Gender</Form.Label>
                <Select
                  value={defaultGender}
                  options={genderData.map(({ label, value }) => ({ label: label, value: value }))}
                  onChange={genderHandler}
                  defaultValue={defaultGender}
                  defaultMenuIsOpen={false}
                  id="genderId">
                </Select>{genderErr ? <span style={{ color: 'red' }}>Please select gender</span> : null}
              </Form.Group>

              <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1 required'>Designation</Form.Label>
                <Select
                  //  value={designationName}
                  //  options={designation.map(({ label, value }) => ({ label: label, value: value }))}
                  options={designationList.map(({ designationId, designationName }) => ({ label: designationName, value: designationId }))}
                  onChange={designationHandler}
                  defaultValue={designationName}
                  defaultMenuIsOpen={false}
                  id="designationId">
                </Select>
                {designationErr ? <span style={{ color: 'red' }}>Please select designation</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1 required">Experience</Form.Label>
                <Form.Control type="text" autoComplete="off" name="experience" id="experience"
                  value={experience} onChange={experienceHandler} />
                {experienceErr ? <span style={{ color: 'red' }}>Please enter experience</span> : null}
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label className="mb-1">Address</Form.Label>
                <Form.Control type="address" autoComplete="off" name="address" id="address"
                  as="textarea" value={address} onChange={(e) => { setAddress(e.target.value) }}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1 required">Hiring Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="hiringDate" id="hiringDate"
                  value={hiringDate?.replace("/", "-")?.substring(0, 10)} onChange={hiringDateHandler} />{hiringDateErr ? <span style={{ color: 'red' }}>Please enter hiring date</span> : null}
              </Form.Group>



              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Joining Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="joiningDate" id="joiningDate"
                  value={joiningDate?.replace("/", "-")?.substring(0, 10)} onChange={(e) => setJoiningDate(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3 col-md-4">
                <Form.Label className="mb-1">Termination Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="terminationDate" id="terminationDate"
                  value={terminationDate?.replace("/", "-")?.substring(0, 10)} onChange={(e) => setTerminationDate(e.target.value)} />
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